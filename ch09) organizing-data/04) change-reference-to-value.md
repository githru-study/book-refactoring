# 9.4 참조를 값으로 바꾸기 - Change Reference to Value

## 배경 & 대상 & 방식

데이터를 참조로 다루는 경우에는 외부로 전달된 값이 변경될수있는 위험이 존재함  
=> 참조가 아닌 값으로 다루게 되면, 데이터 구조가 불변(immutable)이 되어 참조를 관리하지 않아도 됨  
=> 그 방법중 하나가 값객체(VO, Value Object) 를 활용하는 것임  


## 절차

1) 대상 필드의 세터를 VO를 저장하는 것으로 교체
2) VO 클래스에 equals 메서드를 만들어 new/old 의 값비교가 동일한지 검증
3) 테스트코드에서 old/new 각 필드를 동치성검사를 수행해야함


## 예시

```typescript
class Product {
  private _price: { amount: number }

  get price() {return this._price }
  applyDiscount(discount) { this._price.amount -= discount }  // 내부필드의 속성 일부를 변경 (참조 유지)
}
```

↓↓↓

```typescript
class Product {
  private _price: Money

  get price() {return this._price }
  applyDiscount(discount) { this._price = new Money(this._price.amount - discount)}  // discount가 바뀔때마다 새로운 VO로 대체 (참조 분리)
}

class Money {
  constructor(private readonly _amount) {}
  get amount() {this._amount}
}
```


---
[목차](../README.md)
