# 11.8 생성자를 팩터리 함수로 바꾸기 - Replace Constructor with Factory Function

## 요약

생성자를 팩터리함수에 숨겨서 생성자의 제약을 피하기

## 배경 & 대상

생성자에는 다음과 같이 일반 함수에는 없는 제약이 있기 때문에 사용성이 떨어진다.

ex) Java의 경우

- 반드시 그 생성자를 정의한 클래스의 인스턴스를 반환해야 한다, 서브클래스의 인스턴스나 프락시를 반환할 수는 없다.
- 생성자의 이름도 고정되어, 기본 이름보다 더 적절한 이름이 있어도 사용할 수 없다.
- 생성자를 호출하려면 특별한 연산자를 사용해야 해서 일반 함수가 오길 기대하는 자리에는 쓰기 어렵다.

ex) Javascript의 경우

- 함수 이름의 첫 글자는 대문자로 시작한다.
- 반드시 'new' 연산자를 붙여 호출한다.

## 절차

1. 팩터리 함수를 만든다. 팩터리 함수의 본문에서는 원래의 생성자를 호출한다.
2. 생성자를 호출하던 코드를 팩터리 함수 호출로 바꾼다.
3. 생성자가 호출되는 곳을 최대한 줄인다.

## 예시

### as-is

```tsx
interface IEmployee {
  nameInfo: string;
  typeCode: "E" | "M" | "S";
}

class Employee {
  nameInfo: IEmployee["nameInfo"];
  typeCode: IEmployee["typeCode"];
  constructor({ nameInfo, typeCode }: IEmployee) {
    this.nameInfo = nameInfo;
    this.typeCode = typeCode;
  }

  get name() {
    return this.nameInfo;
  }

  get type() {
    return Employee.legalTypeCodes[this.typeCode];
  }

  static get legalTypeCodes() {
    return { E: "Engineer", M: "Manager", S: "Salesperson" };
  }
}

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

const employeeDocument: Optional<IEmployee, "typeCode">[] = [
  {
    nameInfo: "Andy",
    typeCode: "S",
  },
  {
    nameInfo: "Ronald",
  },
];

const candidate = new Employee({
  nameInfo: employeeDocument[0].nameInfo,
  typeCode: employeeDocument[0].typeCode,
});

const leadEngineer = new Employee({
  nameInfo: employeeDocument[1].nameInfo,
  typeCode: employeeDocument[1].typeCode,
});
```

### to-be

```tsx
interface IEmployee {
  nameInfo: string;
  typeCode: "E" | "M" | "S";
}

class Employee {
  nameInfo: IEmployee["nameInfo"];
  typeCode: IEmployee["typeCode"];
  constructor({ nameInfo, typeCode }: IEmployee) {
    this.nameInfo = nameInfo;
    this.typeCode = typeCode;
  }

  get name() {
    return this.nameInfo;
  }

  get type() {
    return Employee.legalTypeCodes[this.typeCode];
  }

  static get legalTypeCodes() {
    return { E: "Engineer", M: "Manager", S: "Salesperson" };
  }
}

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

const employeeDocument: Optional<IEmployee, "typeCode">[] = [
  {
    nameInfo: "Andy",
    typeCode: "S",
  },
  {
    nameInfo: "Ronald",
  },
];

const createSalesperson = (name: IEmployee["nameInfo"]) => {
  return new Employee({ nameInfo: name, typeCode: "S" });
};

const createEngineer = (name: IEmployee["nameInfo"]) => {
  return new Employee({ nameInfo: name, typeCode: "E" });
};

const candidate = createSalesperson(employeeDocument[0].nameInfo);
const leadEngineer = createEngineer(employeeDocument[1].nameInfo);

const index: () => Employee[] = () => {
  return [candidate, leadEngineer];
};

export default index;
```
