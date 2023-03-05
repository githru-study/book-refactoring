# 12.1 메서드 올리기

# 배경 & 효과 & 적용하는 시점

- 서브 클래스에서 중복되는 메서드가 있으면 슈퍼클래스로 올려준다. 중복되는 코드들이 없어지는 효과를 기대할 수 있다.
- 서브 클래스에 중복되는 코드가 존재할 때 사용하지만,
  경우에 따라서는 함수의 매개변수화나 필드올리기 기법을 사용한 후에 사용하는 기법이다.

# 절차

1. 똑같이 동작하는 메서드인지와 메서드 안에서 호출하는 다른 메서드와 참조하는 필드들을 슈퍼 클래스에서도
   호출이 가능한 지를 확인한다.
2. 메서드의 이름과 파라미터가 다르다면, 메서드의 이름을 통일한다.
3. 서브 클래스중 하나의 메서드를 복사해서 슈퍼클래스로 옮기고 나머지 서브클래스들은 전부 지운다.

## ※템플릿 메서드

출처 -> https://refactoring.com/catalog/formTemplateMethod.html, https://refactoring.guru/ko/design-patterns/template-method

- 클래스들이 전체 흐름이 비슷하지만, 세부적인 코드 부분이 다를 때 사용한다.

# 예시

## 리팩토링 전 코드

```js
//annualCost(),totalAnualCost() 모두 중복되는 메서드를 가지고 있다.
class Employee extends Party {
  get annualCost() {
    return this.monthlyCost * 12;
  }
}
class Department extends Party {
  get totalAnnualCost() {
    return this.monthlyCost * 12;
  }
}
```

## 리팩토링 과정 코드

```js
// -> 메서드이름을 같게 한다
class Department extends Party{
  get annualCost() {
    return this.monthlyCost * 12;
  }
}

// 하나의 메서드를 슈퍼클래스로 올기고, 나머지 서브 클래스 메서드는 지운다.
Class Party{
    return this.monthlyCost * 12;
}
```

## 리팩토링 최종 코드

```js
class Party {
  get annualCost() {
    return this.monthlyCost * 12;
  }
}
class Employee extends Party {
  //....
}
class Department extends Party {
  //.....
}
```

※ 서브클래스 책임오류
서브클래스에서 부모클래스의 메소드가 필요하지 않은 경우일 때, 구현되지 않았다고 표시를 해줘야하는 경우를 말한다.

```js
class Party {
  get monthlyCost() {
    throw new sunClassResponsibilityError();
  }
  get annualCost() {
    return this.monthlyCost * 12;
  }
}
```
