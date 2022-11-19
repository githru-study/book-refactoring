# 6.8 매개변수 객체 만들기 - Introduce Parameter Object

## 요약

여러 함수의 파라미터에서 공통적으로 받고 있는 데이터 무리를 Value Object로 만들기

## 배경

여러 함수에서 공통적으로 필요로 하는 데이터들이 있을 수 있다. 이런 값들을 모아서 데이터 구조로 모아주면 아래와 같은 이점이 있다.

- 함수가 받는 파라미터 개수가 줄어든다
- 같은 데이터 구조를 받는 함수가 데이터 속성을 참조할 때 같은 값을 사용하므로 일관성이 생긴다
- 같은 데이터 구조를 사용하는 함수를 모아 구조화할 수 있다
    - 데이터 구조와 함수를 결합해 클래스를 만들기

## 대상

- 데이터 항목 여러 개가 여러 함수의 파라미터로 사용될 경우

## 절차

1. 데이터 구조를 새로 만든다 (주로 value object로 만들기)
2. 함수에 데이터 구조를 새 매개변수로 추가한다
    1. 함수를 호출하는 부분에는 추가된 자리에 null 값을 보내도록 해둔다
3. 함수 호출 시 데이터 구조 인스턴스를 넘기도록 수정한다
4. 함수 내부에서 기존 매개변수를 사용하던 부분을 데이터 구조의 값을 사용하도록 변경한다
5. 모두 바꿨다면 기존 매개변수를 제거한다 (선언부, 호출부 모두)

※ 3번, 4번은 하나씩 순차적으로 진행하며 테스트를 함께 진행해준다

※ 가능하다면, 4번 부분을 value object의 메서드로 만든다

## 예시

> [코드 출처](https://github.com/ooooorobo/ooooorobo.github.io/blob/main/src/service/postService.ts)

### 리팩터링 전

```ts
function getPosts(
    page: number,
    count: number
): Promise<PostListElement[]> {
    const [start, end] = [page * count, (page + 1) * count];
    const dirFiles = this.getAllPostNames(true).slice(start, end);
    return this.getPostMetaList(dirFiles);
}

async function getPostsByTag(
    page: number,
    count: number,
    tag: string
): Promise<PostListElement[]> {
    const [start, end] = [page * count, (page + 1) * count];
    return (await this.getAllPostMeta())
        .filter((p) => p.meta.tags.includes(tag))
        .slice(start, end);
}
```

### 리팩터링 후

1. 데이터 구조를 새로 만든다

```ts
class Pagination {
    constructor(private page: number, private count: number) { /**/
    }
}
```

2. 데이터 구조를 새 매개변수로 추가한다

```ts
// 선언부
function getPosts(
    page: number,
    count: number,
    pagination: Pagenation
): Promise<PostListElement[]> {
    const [start, end] = [page * count, (page + 1) * count];
    const dirFiles = this.getAllPostNames(true).slice(start, end);
    return this.getPostMetaList(dirFiles);
}

async function getPostsByTag(
    page: number,
    count: number,
    tag: string,
    pagination: Pagenation
): Promise<PostListElement[]> {
    const [start, end] = [page * count, (page + 1) * count];
    return (await this.getAllPostMeta())
        .filter((p) => p.meta.tags.includes(tag))
        .slice(start, end);
}

// 호출부
await getPosts(1, 10, null);
```

3. 함수 호출 시 데이터 구조 인스턴스를 넘기도록 수정한다

```ts
const pagination = new Pagination(1, 10);
await getPosts(1, 10, pagination);
```

4. 함수 내부에서 기존 매개변수를 사용하던 부분을 데이터 구조의 값을 사용하도록 변경한다

```ts
function getPosts(
    page: number,
    count: number,
    pagination: Pagenation
): Promise<PostListElement[]> {
    const [start, end] = [pagination.page * pagination.count, (pagination.page + 1) * pagination.count];
    const dirFiles = this.getAllPostNames(true).slice(start, end);
    return this.getPostMetaList(dirFiles);
}

async function getPostsByTag(
    page: number,
    count: number,
    tag: string,
    pagination: Pagenation
): Promise<PostListElement[]> {
    const [start, end] = [pagination.page * pagination.count, (pagination.page + 1) * pagination.count];
    return (await this.getAllPostMeta())
        .filter((p) => p.meta.tags.includes(tag))
        .slice(start, end);
}
```

※ 가능하다면, 4번 부분을 value object의 메서드로 만든다

```ts
interface PageRange {
    start: number;
    end: number;
}

class Pagination {
    constructor(private page: number, private count: number) { /**/
    }

    public getRange(): PageRange {
        return {
            start: this.page * this.count,
            end: (this.page + 1) * this.count
        }
    }
}

function getPosts(
    pagination: Pagenation
): Promise<PostListElement[]> {
    const {start, end} = pagination.getRange();
    const dirFiles = this.getAllPostNames(true).slice(start, end);
    return this.getPostMetaList(dirFiles);
}

async function getPostsByTag(
    tag: string,
    pagination: Pagenation
): Promise<PostListElement[]> {
    const {start, end} = pagination.getRange();
    return (await this.getAllPostMeta())
        .filter((p) => p.meta.tags.includes(tag))
        .slice(start, end);
}

// 호출부
await getPosts(new Pagination(1, 10));
```

5. 모두 바꿨다면 기존 매개변수를 제거한다 (선언부, 호출부 모두)