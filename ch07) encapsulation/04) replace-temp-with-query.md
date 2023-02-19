# 7.4 임시 변수를 질의 함수로 바꾸기 - Replace Temp with Query

## 요약

## 배경 & 대상

- 어떤 코드의 결과값을 임시 변수로 선언한 것을 그 변수를 각각의 함수로 만들면, 변수를 따로 전달할 필요가 없어져 수월해진다.
- 추출한 함수와 원래 함수의 경계가 더 분명해져 부자연스러운 의존 관계나 부수효과를 찾고 제거하는 데에 도움이 된다.
- 동일한 로직을 사용하는 경우가 있다면 재사용성이 높아진다.

## 절차

1. 임시 변수가 확실히 결정되는지, 변수를 사용할 때마다 계산 로직이 매번 다른 결과를 내지는 않는지 확인한다.
2. 읽기 전용으로 만들 수 있는 변수는 읽기전용으로 만든다.
3. 변수 대입문을 함수로 추출한다.
4. 변수 인라인하기로 임시 변수를 제거한다.

## 예시

### as-it

```typescript
const makeMonthDay = (timeStamp: number) => {
  const dataFormat = new Date(timeStamp);
  const makeTwo = `${this.num}`.length < 2 ? `0${this.num}` : `${this.num}`;

  const month = makeTwoDigits(dataFormat.getMonth() + 1);
  const day = makeTwoDigits(dataFormat.getDate());
  return `${dataFormat.getFullYear()}.${month}.${day}`;
};
```

### to-be

```typescript
class DateController {
  constructor(timeStamp) {
    this.timeStamp = timeStamp;
    this.currentDate = new Date(timeStamp);
  }
  get dataFormat() {
    return this.currentDate;
  }
  makeTwoDigits(value: number) {
    return value.toString().padStart(2, "0");
  }
  getYYYYMMDD() {
    return `${dataFormat.getFullYear()}.${makeTwoDigits(
      dataFormat.getMonth() + 1
    )}.${makeTwoDigits(dataFormat.getDate())}`;
  }
}
const makeMonthDay = (timeStamp: number) => {
  const today = new DateController(timeStamp);
  return today.getYYYYMMDD();
};
```
