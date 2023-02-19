# 11.4 객체 통째로 넘기기 - Preserve Whole Object

## 요약

객체에서 받아오는 함수의 인자가 두 개 이상의 경우 합쳐서 통째로 넘긴다.

## 배경

레코드를 통째로 넘기면 변화에 대응하기 쉽다.
그 함수가 더 다양한 데이터를 사용하도록 바뀌어도 매개변수 목록은 수정할 필요가 없다.
매개변수 목록이 짧아져서 일반적으로는 함수 사용법을 이해하기 쉬워진다.

어떤 객체로부터 값 몇 개를 얻은 후 그 값들만으로 무언가를 하는 로직
-> 로직을 객체 안으로 집어넣어야 함을 알려주는 악취

## 대상

하나의 레코드에서 값 두어 개를 가져와 인수를 넘기는 경우

- 매개변수 객체 만들기 후 산재한 수많은 데이터 더미를 새로운 객체로 묶은 후 적용
- 한 객체가 제공하는 기능 중 항상 똑같은 일부만을 사용하는 코드가 많은 경우, 그 기능만 따로 묶어서 클래스로 추출
- 다른 객체의 메서드를 호출하면서 호출하는 객체 자신이 가지고 있는 데이터 여러 개를 건네는 경우
  -> 데이터 여러 개 대신 객체 자신의 참조만 건네도록 수정

## 예외

함수가 레코드 자체에 의존하기를 원치 않을 때
레코드와 함수가 서로 다른 모듈에 속한 상황일 때

## 절차

1. 매개변수들은 원하는 형태로 받는 빈 함수를 만든다.
2. 새 함수의 본문에서는 원래 함수를 호출하도록 하며, 새 매개변수와 원래 함수의 매개변수를 매핑한다.
3. 모든 호출자가 새 함수를 사용하게 수정한다.
4. 함수를 인라인한다.
5. 새 함수의 이름을 적절히 수정하고 모든 호출자에 반영한다.

## 예시

### as-is

```tsx
interface Temperature {
  daysTempRange: {
    low: number;
    high: number;
  };
}

const aRoom: Temperature = {
  daysTempRange: {
    low: 20,
    high: 22,
  },
};

const bRoom: Temperature = {
  daysTempRange: {
    low: 20,
    high: 27,
  },
};

class HeatingPlan {
  data: Temperature;
  constructor(data: Temperature) {
    this.data = data;
  }

  withinRange(bottom: number, top: number) {
    return (
      bottom >= this.data.daysTempRange.low &&
      top <= this.data.daysTempRange.high
    );
  }
}

const aLow = aRoom.daysTempRange.low;
const aHigh = aRoom.daysTempRange.high;
const bLow = bRoom.daysTempRange.low;
const bHigh = bRoom.daysTempRange.high;
const aPlan = new HeatingPlan({ daysTempRange: { low: 19, high: 23 } });

const alerts: string[] = [];
if (!aPlan.withinRange(aLow, aHigh))
  alerts.push("방 온도가 지정 범위를 벗어났습니다.");
if (!aPlan.withinRange(bLow, bHigh))
  alerts.push("방 온도가 지정 범위를 벗어났습니다.");

const index = () => {
  return alerts;
};

export default index;
```

### to-be

```tsx
interface Temperature {
  daysTempRange: {
    low: number;
    high: number;
  };
}

const aRoom: Temperature = {
  daysTempRange: {
    low: 20,
    high: 22,
  },
};

const bRoom: Temperature = {
  daysTempRange: {
    low: 20,
    high: 27,
  },
};

class HeatingPlan {
  data: Temperature;
  constructor(data: Temperature) {
    this.data = data;
  }

  withinRange(aNumberRange: Temperature["daysTempRange"]) {
    return (
      aNumberRange.low >= this.data.daysTempRange.low &&
      aNumberRange.high <= this.data.daysTempRange.high
    );
  }
}

const aPlan = new HeatingPlan({ daysTempRange: { low: 19, high: 23 } });

const alerts: string[] = [];
if (!aPlan.withinRange(aRoom.daysTempRange))
  alerts.push("방 온도가 지정 범위를 벗어났습니다.");
if (!aPlan.withinRange(bRoom.daysTempRange))
  alerts.push("방 온도가 지정 범위를 벗어났습니다.");

const index = () => {
  return alerts;
};

export default index;
```
