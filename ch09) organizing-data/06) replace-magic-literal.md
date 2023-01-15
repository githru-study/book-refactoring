# 9.6 매직 리터럴 바꾸기 - Replace Magic Literal

## 배경 & 대상 & 방식

코드 자체가 뜻을 분명하게 드러내도록 하기 위해, 소스코드 내 리터럴을 적절한 이름의 상수로 바꿔주는게 좋음  
ex) g = 9.81 => STANDARD_GRAVITY  
ex) π = 3.14 => PI  


## 절차

1) 비슷한 객체들을 보관하기 위한 저장소를 작성
2) 필요한 객체를 이 저장소에서 찾아가도록 호스트 코드를 수정


## 예시

```typescript
function potentialEnergy(mass, height) {
  return mass * 9.81 * height;
}

↓↓↓

const STANDARD_GRAVITY = 9.81

function potentialEnergy(mass, height) {
  return mass * STANDARD_GRAVITY * height;
}
```

---
[목차](../README.md)
