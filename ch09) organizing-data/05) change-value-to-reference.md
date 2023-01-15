# 9.5 값을 참조로 바꾸기 - Change Value to Reference

## 배경 & 대상 & 방식

공유 객체의 값 변경 상황에서는 일관성 유지를 위해 모든 복제본을 갱신해야되는 이슈 발생함  
=> 복제된 데이터들을 모두 참조로 바꿔주는게 좋음  
=> 일종의 저장소(repository) 개념을 도입해서 필요한 객체를 얻어가는 방식을 사용  


## 절차

1) 비슷한 객체들을 보관하기 위한 저장소를 작성
2) 필요한 객체를 이 저장소에서 찾아가도록 호스트 코드를 수정


## 예시

```typescript
order1 = {
  customer: new Customer(customerData);  // 동일한 값객체를
}
order2 = {
  customer: new Customer(customerData);  // 매번 생성하는것보다는
}
order3 = { ... }

↓↓↓

order1 = {
  customer: customerRepository.get(customerData.id)  // 저장소로부터 
}
order2 = {
  customer: customerRepository.get(customerData.id)  // 해당 객체의 참조를 얻어옴
}
order3 = { ... }
```

---
[목차](../README.md)
