# 12.9 계층 합치기

# 배경 & 효과 & 적용하는 시점

- 어떤 클래스가 부모와 너무 비슷해져 독립할 이유가 없을 때 두 클래스 중 제거할 클래스를 고른 후 하나로 합치는 기법이다.
- 불필요한 클래스를 제거하는 효과가 있다.

# 절차

1. 두 클래스 중 제거할 클래스를 고른다.
2. 필드 올리기,메서드 올리기,필드내리기,메서드 내리기와 같은 기법들을 적용해서 제거하는 클래스에 있는 요소들을 나머지로 옮긴다.
3. 제거하는 클래스를 참조하는 코드들을 남겨지는 클래스를 참조하도록 고치고, 제거하는 클래스를 지운다.

# 예시

## 리팩토링 전 코드

```js
class Employee {
  //...
  get monthlyCost() {
    return this._monthlyCost;
  }
  get additionalCost() {
    return daycost * 0.48;
  }
  get annualCost() {
    return this.monthlyCost * 12 - additionalCost;
  }
}
class Salesperson extends Employee {
  //...
  get totalmonthlyCost() {
    return this._monthlyCost;
  }
  get additionalfee() {
    return daycost * 0.48;
  }
  get annualCost() {
    return this.monthlyCost * 12 - additionalfee;
  }
}
```

## 리팩토링 과정 코드

```js
//monthlyCost(), additionalCost()로 이름을 통일하고, 위에서 겹치는 부분들은 없애고, 하나로 통합한다.
class Salesperson extends Employee {
  //...
  get totalmonthlyCost() {
    return this._monthlyCost;
  }
  get additionalfee() {
    return daycost * 0.48;
  }
  get annualCost() {
    return this.monthlyCost * 12 - additionalfee;
  }
}
```

## 리팩토링 최종 코드

```js
class Employee {
  get monthlyCost() {
    return this._monthlyCost;
  }
  get additionalCost() {
    return daycost * 0.48;
  }
  get annualCost() {
    return this.monthlyCost * 12 - additionalCost;
  }
}
```
