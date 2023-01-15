# 9.6 매직 리터럴 바꾸기 - Replace Magic Literal

## 배경 & 대상 & 방식

코드 자체가 뜻을 분명하게 드러내도록 하기 위해, 소스코드 내 리터럴을 적절한 이름의 상수로 바꿔주는게 좋음  
ex) g = 9.81 => STANDARD_GRAVITY  
ex) π = 3.14 => PI  


## 절차

1) 상수를 선언하고 매직 리터럴을 대입
2) 해당 리터럴을 사용되는 곳을 모두 탐색
3) 찾은 곳마다 리터럴이 새 상수와 똑같은 의미로 쓰였는지 확인한 뒤 상수로 대체한 후 테스트


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
