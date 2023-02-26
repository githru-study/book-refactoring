# 12.4 메서드 내리기 - PUSH DOWN METHOD


## 배경 & 대상 & 방식

특정 서브클래스와 관련된 메서드는 슈퍼클래스에서 제거하고 해당 서브클래스로 내리는 편이 깔끔함  
(↔ 12-1 매서드 올리기)


## 절차

1) 대상 메서드를 모든 서브클래스에 복사  
2) 슈퍼클래스에서 대상 메서드를 제거 + 테스트  
3) 대상 메서드를 사용하지 않는 나머지 서브클래스에서 제거 + 테스트  



## 예시1

```typescript
class Employee {
    get quota() { /* ... */ }
}

class Engineer extends Employee {}
class Salesperson extends Employee {}
```

↓↓↓


```typescript
class Employee {}

class Engineer extends Employee {}
class Salesperson extends Employee {
    get quota() { /* ... */ }            // 할당량 관련 기능은 영업사원만 대상이므로, 관련 메서드를 서브클래스로 내림
}
```



---
[목차](../README.md)
