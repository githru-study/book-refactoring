# 12.8 슈퍼클래스 추출하기

# 배경 & 효과 & 적용하는 시점

- 유사한 두 클래스가 보이면 비슷한 부분을 공통의 슈퍼클래스로 추출하여 중복을 제거하는 기법이다.
- 부모-자식 관계가 아니더라도 슈퍼클래스로 끌어올리고 싶은 공통 요소가 있을때도 사용한다.
- 중복 동작을 상속으로 해결하는지, 위임으로 해결하는지에 따라 클래스 추출하기와 슈퍼클래스 추출하기로 분류된다.

# 절차

1. 비어있는 슈퍼클래스를 만들고, 기존의 클래스들이 새클래스를 상속하게 한다.
2. 공통적인 코드를 슈퍼 클래스로 옮긴다. (본문 올리기,메서드 올리기,필드 올리기)
3. 서브 클래스에 남은 메서드들 중에서 공통되는 코드를 함수로 추출해서 슈퍼클래스로 올려준다.

# 예시

## 리팩토링 전 코드

```js
class Employee {
  constructor(name, id, monthlyCost) {
    this._id = id;
    this._name = name;
    this._monthlyCost = monthlyCost;
  }
  get monthlyCost() {
    return this._monthlyCost;
  } // 월간 비용
  get name() {
    return this._name;
  } // 이름
  get id() {
    return this._id;
  }

  get annualCost() {
    return this.monthlyCost * 12;
  }
}

class Department {
  constructor(name, staff) {
    this._name = name;
    this._staff = staff;
  }
  get staff() {
    return this._staff.slice();
  }
  get name() {
    return this._name;
  } // 이름

  get totalMonthlyCost() {
    return this.staff
      .map((e) => e.monthlyCost)
      .reduce((sum, cost) => sum + cost);
  }
  get headCount() {
    return this.staff.length;
  }
  get totalAnnualCost() {
    return this.totalMonthlyCost * 12;
  }
}
```

## 리팩토링 과정 코드

```js
// 빈 슈퍼클래스를 만들고 두 클래스가 확장하게 한다.
class Party {}

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super();
    this._id = id;
    this._name = name;
    this._monthlyCost = monthlyCost;
  }
  // ...
}

class Department extends Party {
  constructor(name, staff) {
    super();
    this._name = name;
    this._staff = staff;
  }
  // ...
}
```

```js
//이름 속성, 메서드를 올려준다.
class Party {
  constructor(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
}

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super(name);
    this._id = id;
    this._monthlyCost = monthlyCost;
  }
  // ...
}

class Department extends Party {
  constructor(name, staff) {
    super(name);
    this._staff = staff;
  }
  // ...
}
```

```js
class Employee {
  //...
  get monthlyCost() {
    return this._monthlyCost;
  }

  get annualCost() {
    return this.monthlyCost * 12;
  }
}
class Department {
  //...
  get totalMonthlyCost() {
    return this.staff
      .map((e) => e.monthlyCost)
      .reduce((sum, cost) => sum + cost);
  }

  get totalAnnualCost() {
    return this.totalMonthlyCost * 12;
  }
}
// monthlyCost(),totalMonthlyCost()는 의도는 같으니까 이름을 monthlyCost로 통일한다.
// annualCost(),totalAnnualCost()이름도 annualCost()로 통일한다.
```

```js
//메서드 올리기를 적용한다.
class Party {
  get annualCost() {
    return this.monthlyCost * 12;
  }
}
```

## 리팩토링 최종 코드

```js
class Party {
  constructor(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  get annualCost() {
    return this.monthlyCost * 12;
  }
}
class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super(name);
    this._id = id;
    this._monthlyCost = monthlyCost;
  }
  get id() {
    return this._id;
  }
  get monthlyCost() {
    return this._monthlyCost;
  }
  get annualCost() {
    return this.monthlyCost * 12;
  }
}
class Department extends Party {
  constructor(name, staff) {
    super(name);
    this._staff = staff;
  }
  get headCount() {
    return this.staff.length;
  }
  get monthlyCost() {
    return this.staff
      .map((e) => e.monthlyCost)
      .reduce((sum, cost) => sum + cost);
  }
  get annualCost() {
    return this.monthlyCost * 12;
  }
}
```
