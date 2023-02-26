# 12.3 생성자 본문 올리기

# 배경

- 서브클래스 생성자의 중복 코드를 올리는 기법이다.
- 생성자의 경우 할수 있는 일과 호출 순서에 제약이 있기 때문에 접근하는 방법이 2가지 방법으로 나뉘어진다.

1. 공통 코드가 먼저 오거나 순서가 상관없는 경우
2. 공통 코드가 나중에 올 때

# 적용하는 시점

- 생성자에 중복되는 코드들이 있을 때 적용한다.

# 절차

1. 슈퍼 클래스에 생성자가 있는 지와 서브 클래스 생성자에서 이 생성자가 호출 되는 지 확인한다.
2. 공통 코드가 먼저 오는지, 나중에 오는지, 순서가 상관없는 지를 확인한다.
   2-1. 공통 코드가 먼저 오거나 순서가 상관없는 경우에는 슈퍼클래스 생성자로 옮긴 후 super()로 호출한다.
   2-2. 공통 코드가 나중에 올 때는 공통 코드를 함수로 추출하여 슈퍼클래스로 옮긴 후 호출한다.

# 예시

## 리팩토링 전 코드- 1번 예제

```js
Class Party{..}

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super();
    this._id = id;
    this._name = name;
    this._monthlyCost = monthlyCost;
  }
  ///.........
}

class Department extends Party {
  constructor(name, staff) {
    super();
    this._name = name;
    this._staff = staff;
  }
  ///.........
}
// this._name = name; 이 부분이 중복된다.
```

## 리팩토링 과정 코드

```js

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super();
    this._name = name;// super 바로 아래로 name을 옮겨준다.
    this._id = id;
    this._monthlyCost = monthlyCost;
  }
  ///.........
}

//->>//this._name = name; 이 부분을 빼서 슈퍼클래스인 파티 클래스로 옮겨준다.
class Party{
    constructor(name){
        this._name = name;
    }
}

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super(name);
    this._id = id;
    this._monthlyCost = monthlyCost;
  }
  ///.........
}

class Department extends Party {
  constructor(name, staff) {
    super(name);
    this._staff = staff;
  }
}
```

## 리팩토링 최종 코드

```js
Class Party{
    constructor(name){
        this._name = name;
    }
}

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super(name);
    this._id = id;
    this._monthlyCost = monthlyCost;
  }
  ///.........
}

class Department extends Party {
  constructor(name, staff) {
    super(name);
    this._staff = staff;
  }
}

```

## 리팩토링 전 코드- 2번 예제

```js

Class Employee(){
    constructor(name){...}
    get isPrivileged(){...}
    assignCar(){...}
}

Class Manager extends Employee{
    constructor(name,grade){
        super(name);
        this._grade = grade;
        if (this.isPrivileged) this.assignedCar();
    }

    get isPrivileged(){
    return this._grade >4;
    }
}

// 공통 부분은 if (this.isPrivileged) this.assignedCar();
```

## 리팩토링 과정 코드

```js
Class Manager extends Employee{
    constructor(name,grade){
        super(name);
        this._grade = grade;
        this.finishConstruction();
    }
}

//finishConstruction()함수로 추출한다
finishConstruction(){
    if (this.isPrivileged) this.assignedCar();
}

//추출한 함수를 슈퍼클래스로 옮긴다 (employee)
Class Employee(){
    finishConstruction(){
    if (this.isPrivileged) this.assignedCar();
    }
}

```

## 리팩토링 최종 코드

```js
Class Employee(){
    //...constructor,assignedCar
    finishConstruction(){
    if (this.isPrivileged) this.assignedCar();
    }
}

Class Manager extends Employee{
    constructor(name,grade){
        super(name);
        this._grade = grade;
        this.finishConstruction();
    }

    get isPrivileged(){
    return this._grade >4;
}
}
```
