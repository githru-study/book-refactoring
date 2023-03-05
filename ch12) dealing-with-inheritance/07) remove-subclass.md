# 12.7 서브클래스 제거하기- REMOVE SUBCLASS


## 배경 & 대상 & 방식

시간이 지나면서 서브클래스로 분리했었던 내용들이 다른 모듈로 이동하거나 완전히 사라지기도 함  
=> 더이상 쓰이지 않는 서브클래스는 슈퍼클래스의 필드(ex. 타입코드) 로 올려버리는게 좋음  



## 절차

1) 서브클래스 생성 로직을 팩터리함수로 이동
2) 서브클래스의 타입을 나타내는 필드를 슈퍼클래스에 추가
3) 서브클래스를 참조하는 메서드를 타입코드 필드를 참조하도록 변경
4) 서브클래스 제거



## 예시1

```typescript
class Person {
  get genderCode() { return 'X'; }
}
class Male extends Person {
  get genderCode() { return 'M'; }
}
class Female extends Person {
  get genderCode() { return 'F'; }
}

class PersonFactory {
    static create(name, type) {
        switch (type) {
            case 'male' : return new Male();
            case 'female' : return new Female();
            default: return new Person();
        }
    }
}
```

↓↓↓

```typescript
class Person {
  private genderCode: string;

  constructor(type?: string) {           // 불필요한 서브클래스 내용들을 슈퍼클래스로 끌어올림
    switch(this.type) {
      case 'male' : this.genderCode = 'M';
      case 'female' : this.genderCode = 'F';
      default : this.genderCode = 'X';
    }
  }

  get genderCode() {
    return this.genderCode;
  }
}

class PersonFactory {
    static create(name, type) {
      switch (type) {
        case 'male' : return new Person('male');     // 팩토리에서는 슈퍼클래스 생성자를 타입코드로 호출하도록 변경
        case 'female' : return new Person('female');
        default: return new Person();
      }
    }
}
```


---
[목차](../README.md)
