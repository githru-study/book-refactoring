# 7.6 클래스 인라인하기 - Inline Class

## 요약

역할이 약한 클래스를 다른 클래스로 통합한다 (↔ 클래스 추출하기)


## 배경 & 대상 & 방식

클래스를 추출하다보면 원래 클래스에 남은 역할이 거의 없을 때가 발생  
=> 이때는 해당 클래스를 가장 많이 호출하는 다른 클래스로 통합함


## 절차

1. 소스 클래스의 각 public메서드에 대응하는 메서드들을 타겟 클래스에 생성함 (=위임 메서드 임시 생성)
2. 소스 클래스의 메서드를 사용하는 코드를 모두 타깃 클래스의 위임 메서드를 사용하도록 변경 (=호출 인터페이스 옮기기)
3. 소스 클래스의 메서드와 필드를 모두 타깃 클래스로 옮김 (=실행 코드 인라인)
4. 소스 클래스 삭제


## 예시

```typescript
class Person {
  private telephonNumber: TelephonNumber;
  get officeAreaCode() { return this.telephonNumber.areaCode; }
  get officeNumber() { return this.telephonNumber.number; }
  get telephoneNumber() { return this.telephonNumber.toString(); }
}

class TelephonNumber {
  private _areaCode: string;
  private _number: string;
  get areaCode() { return this._areaCode; }
  get number() { return this._number; }
  toString() { return `(${this._areaCode}) ${this._number}`; }
}

↓↓↓

class Person {
  private _officeAreaCode: string;
  private _officeNumber: string;
  get officeAreaCode() { return this._officeAreaCode; }  // 호스트코드의 변화는 없다
  get officeNumber() { return this._officeNumber; }  // 호스트코드의 변화는 없다
  get telephoneNumber() { return `(${this._officeAreaCode}) ${this._officeNumber}`; }  // 호스트코드의 변화는 없다
}
```

---
[목차](../README.md)
