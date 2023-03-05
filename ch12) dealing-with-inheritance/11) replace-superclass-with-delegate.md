# 12.11 슈퍼클래스를 위임으로 바꾸기 - Replace Superclass with Delegate

## 요약

서브클래스를 상속되는 것에서 위임받는 것으로 교체한다.

## 배경

상속(서브클래스 만들기)은 기능을 재활용하는 수단이기도 하지만 혼란과 복잡도를 키울 수 있다.
서브클래스가 슈퍼클래스의 모든 기능을 사용함은 물론, 서브 클래스의 인스턴스를 슈퍼블래스의 인스턴스로도 취급할 수 있어야 한다.
상속하여 서브클래스를 만드는 것보다 위임을 이용하면 기능 일부만 빌려오고, 서로 별개인 개념을 만들 수 있다.

## 대상

타입-인스턴스 동형이의어일 때
`마틴 파울러 왈: 왠만하면 상속을 먼저 적용하고 만일 나중에 문제가 생기면 슈퍼클래스를 위임으로 바꾸라!`

### 위임의 단점

위임의 기능을 이용할 호스트의 함수 모두를 전달 함수로 만들어야 한다.

## 절차

1. 슈퍼클래스 객체를 참조하는 필드를 서브클래스에 만든다.
2. 위임 참조를 새로운 슈퍼클래스 인스턴스로 초기화한다.
   위임 참조: 리팩터링 후 슈퍼클래스가 위임 객체가 될 것을 예상하여 지칭
3. 슈퍼클래스의 동작 각각에 대응하는 전달 함수를 서브클래스에 만든다.
   서로 관련된 함수끼리 그룹으로 묶어 진행한다.
4. 슈퍼클래스와 동작 모두가 전달 함수로 오버라이드되었다면 상속 관계를 끊는다.

## 예시

### as-is

```ts
interface CatalogInfo {
  id: string;
  title: string;
  tags: string[];
}

class CatalogItem {
  id: CatalogInfo["id"];
  title: CatalogInfo["title"];
  tags: CatalogInfo["tags"];
  constructor({ id, title, tags }: CatalogInfo) {
    this.id = id;
    this.title = title;
    this.tags = tags;
  }

  get getId() {
    return this.id;
  }

  get getTitle() {
    return this.title;
  }

  hasTag(arg: string) {
    return this.tags.includes(arg);
  }
}

type getDate = (cleanedDate: number, currentDate: number) => number;
interface Scrollnfo extends CatalogInfo {
  dateLastCleaned: number;
}

const ONE_DAY = 24 * 60 * 60 * 1000;
class Scroll extends CatalogItem {
  dateLastCleaned: number;
  constructor({ id, title, tags, dateLastCleaned }: Scrollnfo) {
    super({ id, title, tags });
    this.dateLastCleaned = dateLastCleaned;
  }

  needsCleaning() {
    const threshold = this.hasTag("revered") ? 700 : 1500;
    return this.daysSinceLastCleaning(this.dateLastCleaned) > threshold;
  }

  daysSinceLastCleaning(targetDate: number) {
    const dateDiff = Math.round(
      Math.abs((new Date().getTime() - targetDate) / ONE_DAY)
    );
    return dateDiff;
  }
}

interface documentData {
  id: string;
  catalogData: {
    title: string;
    tags: string[];
  };
  lastCleaned: number;
}

const scrollData: documentData[] = [
  {
    id: "6c213e1c-bb31-11ed-afa1-0242ac120002",
    catalogData: {
      title: "밥 맛있게 먹는 법",
      tags: ["요리", "생활"],
    },
    lastCleaned: 1678008932333,
  },
  {
    id: "b0dd946a-bb31-11ed-afa1-0242ac120002",
    catalogData: {
      title: "한 달 만에 10kg 감량 하는 법",
      tags: ["생활", "건강"],
    },
    lastCleaned: 1672544542000,
  },
  {
    id: "ce7b3d9c-bb31-11ed-afa1-0242ac120002",
    catalogData: {
      title: "엄청난 개발자 되는 법",
      tags: ["IT", "기술"],
    },
    lastCleaned: 1662003742000,
  },
];

const index = () => {
  const newScrollData = scrollData.map(
    (data) =>
      new Scroll({
        id: data.id,
        title: data.catalogData.title,
        tags: data.catalogData.tags,
        dateLastCleaned: data.lastCleaned,
      })
  );
  const searchData = [];
  const randomScroll =
    newScrollData[Math.floor(Math.random() * newScrollData.length)];
  searchData.push(randomScroll.getId);
  searchData.push(randomScroll.getTitle);
  searchData.push(randomScroll.hasTag("IT"));
  searchData.push(randomScroll.needsCleaning());

  return searchData;
};

export default index;
```

### to-be

```ts
interface CatalogInfo {
  /// 생략
}

class CatalogItem {
  id: CatalogInfo["id"];
  title: CatalogInfo["title"];
  tags: CatalogInfo["tags"];
  constructor({ id, title, tags }: CatalogInfo) {
    this.id = id;
    this.title = title;
    this.tags = tags;
  }

  get getId() {
    return this.id;
  }

  get getTitle() {
    return this.title;
  }

  hasTag(arg: string) {
    return this.tags.includes(arg);
  }

  get(id: string): CatalogItem {
    // id로 일치하는 인스턴스 반환
    return;
  }
}

interface Scrollnfo {
  dateLastCleaned: number;
  catalogID: string;
  catalog: CatalogItem[];
  id: string;
}

const ONE_DAY = 24 * 60 * 60 * 1000;
class Scroll {
  dateLastCleaned: number;
  catalogItem: CatalogInfo;
  id: string;
  constructor({ id, dateLastCleaned, catalogID, catalog }: Scrollnfo) {
    this.catalogItem = catalog.get(catalogID);
    this.dateLastCleaned = dateLastCleaned;
    this.id = id;
  }

  get getId() {
    return this.id;
  }

  get getTitle() {
    return this.catalogItem.title;
  }

  hasTag(arg: string) {
    return this.catalogItem.tags.includes(arg);
  }

  needsCleaning() {
    const threshold = this.hasTag("revered") ? 700 : 1500;
    return this.daysSinceLastCleaning(this.dateLastCleaned) > threshold;
  }

  daysSinceLastCleaning(targetDate: number) {
    const dateDiff = Math.round(
      Math.abs((new Date().getTime() - targetDate) / ONE_DAY)
    );
    return dateDiff;
  }
}

interface documentData {
  id: string;
  catalogData: {
    title: string;
    tags: string[];
  };
  lastCleaned: number;
}

const scrollData: documentData[] = [
  /// 생략
];

const index = () => {
  const catalog = scrollData.map(
    (data) =>
      new CatalogItem({
        id: data.id,
        title: data.catalogData.title,
        tags: data.catalogData.tags,
      })
  );
  const newScrollData = scrollData.map(
    (data) =>
      new Scroll({
        id: data.id,
        dateLastCleaned: data.lastCleaned,
        catalogID: data.id,
        catalog: catalog,
      })
  );
  const searchData = [];
  const randomScroll =
    newScrollData[Math.floor(Math.random() * newScrollData.length)];
  searchData.push(randomScroll.getId);
  searchData.push(randomScroll.getTitle);
  searchData.push(randomScroll.hasTag("IT"));
  searchData.push(randomScroll.needsCleaning());

  return searchData;
};

export default index;
```
