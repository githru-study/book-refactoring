# 12.6 타입 코드를 서브클래스로 바꾸기 - REPLACE TYPE CODE WITH SUBCLASSES


## 배경 & 대상 & 방식

비슷한 대상들을 특성에 따라 구분할 때, 타입코드 필드를 사용함  

이 타입코드별로 다르게 동작하는 기능들을 별도로 묶어서, 서브클래스로 분리할수있음  
ex) `Employee` => `Salesperson extends Employee`, `Engineer extends Employee`

또는 이 타입코드 자체를 추상화하여 각 타입별 서브클래스로 구분할수도있음  
ex) `type: string` => `type: EmployeeType`



## 절차

1) 타입코드를 캡슐화
2) 각 타입코드별로 분기 동작하는 서브클래스 작성
3) 상위클래스를 각 타입코드별로 생성해주는 팩토리함수를 추가
4) 상위클래스에서 타입코드 필드 제거



## 예시1

```typescript
class Employee {
    private name: string;
    private type: string;
    private salesGoal: number;

    constructor(name:string, type:string) {
        this.name = name;
        this.type = type;
        if (type === 'salesperson') {  // type에 따라 분기 동작하는 코드들
            this.salesGoal = 0;
        }
    }

    set salesGoal(goal:number) {
        if (type === 'salesperson') {  // type에 따라 분기 동작하는 코드들
            this.salesGoal = goal;
        }
    }

    get salesGoal() {
        if (type === 'salesperson') {  // type에 따라 분기 동작하는 코드들
            return this.salesGoal;
        }
    }
}


/* 호스트코드에서 */
const salesperson = new Employee('홍길동', 'salesperson');
const engineer = new Employee('성춘향', 'engineer');
```

↓↓↓

```typescript
class Employee {
    private name: string;

    constructor(name:string) {
        this.name = name; // 상위클래스에서는 공통필드만 유지
    }
}

class EmployeeFactory {
    static createEmployee(name, type) {
        switch (type) {
            case 'salesperson' : return new Salesperson(name);
            case 'engineer' : return new Engineer(name);
            default: throw new Error('invalid type');
        }
    }
}

class Salesperson extends Employee { // 특성별 서브클래스로 분리
    private salesGoal: number;

    constructor(name:string) {
        super(name);
        this.salesGoal = 0; // 특성별 필드는 서브클래스로 분리
    }

    set salesGoal(goal:number) { // 특성별 메서드 역시 서브클래스로 분리
        this.salesGoal = goal;
    }

    get salesGoal() {
        return this.salesGoal;
    }
}

class Engineer extends Employee { // 특성별 서브클래스로 분리
    // ...
}


/* 호스트코드에서 */
const salesperson = EmployeeFactory.createEmployee('홍길동', 'salesperson');  // 팩토리로 인스턴스 생성
const engineer = EmployeeFactory.createEmployee('성춘향', 'engineer');
```



## 예시2 (간접상속: 타입코드 자체를 "속성클래스" 로 전환)

```typescript
class Employee {
    private name:string;
    private type:string;

    constructor(name:string, type:string) {
        this.validateType(type);
        this.name = name;
        this.type = name;
    }

    private validateType(type: string) {
        if(!['engineer', ' manager', 'salesperson'].includes(type)) {    // 타입코드에 대한 검증처리가 엉뚱한곳에서 동작하고있음
            throw new Error(`${type} 라는 직원유형은 존재하지 않습니다.`);
        }
    }

    // ...
}

class FulltimeEmployee extends Employee {}  // Employee의 서브클래스가 이미 존재
class ParttimeEmployee extends Employee {}  // Employee의 서브클래스가 이미 존재
```

↓↓↓

```typescript
class EmployeeType {                        // 타입코드를 클래스로 분리
    constructor(private type: string) {}
    get type() { return this.type; }
}
class SalespersonType extends EmployeeType {}
class EngineerType extends EmployeeType {}

class EmployeeTypeFactory {
    static create(type) {
        switch (type) {
            case 'salesperson' : return new SalespersonType(type);   // 타입코드 유효성검사 책임을 팩토리함수로 이동
            case 'engineer' : return new Engineertype(type);
            default: throw new Error('invalid type');
        }
    }
}

class Employee {
    private name: string;
    private type: EmployeeType;

    constructor(name:string, type: EmployeeType) {
        this.name = name;
        this.type = EmployeeTypeFactory.create(type);  // 타입코드에 대한 관심사 제거
    }

    // ...
}

class FulltimeEmployee extends Employee {}  // Employee의 다른 서브클래스에서도 타입코드 관련 검증처리 동일하게 동작함
class ParttimeEmployee extends Employee {}
```

---
[목차](../README.md)
