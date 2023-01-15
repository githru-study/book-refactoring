# 9.3 파생 변수를 질의 함수로 바꾸기 - Replace Derived Variable with Query

## 배경 & 대상 & 방식

가변 데이터는 서로 다른 두 코드 사이에서 예측하기 어려운 문제를 발생시킴  
=> 최대한 가변 데이터 사용을 지양해야함... 가변 데이터의 유효범위를 좁혀야 함  
=> 그 중 효과가 좋은 방법 중 하나가 "계산해날수있는 변수들을 제거하는 것"  


## 절차

1) 변수 값이 갱신되는 지점을 모두 찾음
2) 해당 변수의 값을 계산해주는 함수를 작성
3) 해당 변수가 사용되는 모든 곳에 assertion 추가 (기존 변수값 ↔ 신규 함수계산결과 비교)
4) 테스트
5) 기존 변수를 읽는 코드를 신규 함수로 교체
6) 코드정리


## 예시

```typescript
class Price {
  private _discount:number
  private _discountedTotal:number

  get discountedTotal() { return this._discountedTotal }
  set discount(num) {
    const old = this._discount
    this._discount = num
    this._discountedTotal += (old - num)
  }
}
```

↓↓↓

```typescript
class Price {
  private _discount:number

  constructor(private readonly _baseTotal:number) {}

  get discountedTotal() { return this._baseTotal - this._discount }
  set discount(num) {
    this._discount = num
  }
}
```


---
[목차](../README.md)
