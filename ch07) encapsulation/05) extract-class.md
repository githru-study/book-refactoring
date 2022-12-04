# 7.5 클래스 추출하기 - Extract Class

## 요약

연관된 데이터와 메서드를 따로 묶는다 (↔ 클래스 인라인하기)


## 배경 & 대상 & 방식

데이터와 연산이 추가되면서 클래스가 비대해지기 시작함  
=> 메서드와 데이터를 따로 묶을 수 있다면 분리


## 절차

1. 클래스의 역할을 분리할 방법을 정의 (=연관성이 강한 데이터와 연산 찾기)
2. 분리될 역할을 담당할 클래스를 새로 생성
3. 원래 클래스의 생성자에서 새로운 클래스의 인스턴스를 생성하여 필드에 저장
4. 분리될 역할에 필요한 필드들을 새 클래스로 옮김 (=데이터 옮기기)
5. 메서드들도 새 클래스로 옮김 (=연산 옮기기)
6. 양쪽 클래스의 인터페이스를 살펴보면서 불필요한 메서드를 제거하고, 이름도 새로운 환경에 맞게 변경함
7. 새 클래스를 외부로 노출할지 결정


## 예시

```typescript
class Person {
  private _officeAreaCode: string;
  private _officeNumber: string;
  get officeAreaCode() { return this._officeAreaCode; }
  get officeNumber() { return this._officeNumber; }
  get telephoneNumber() { return `(${this._officeAreaCode}) ${this._officeNumber}`; }
}

↓↓↓

class Person {
  private telephonNumber: TelephonNumber;
  get officeAreaCode() { return this.telephonNumber.areaCode; }  // 호스트코드의 변화는 없다
  get officeNumber() { return this.telephonNumber.number; }  // 호스트코드의 변화는 없다
  get telephoneNumber() { return this.telephonNumber.toString(); }  // 호스트코드의 변화는 없다
}

class TelephonNumber {
  private _areaCode: string;
  private _number: string;
  get areaCode() { return this._areaCode; }
  get number() { return this._number; }
  toString() { return `(${this._areaCode}) ${this._number}`; }
}
```

---
[목차](../README.md)
