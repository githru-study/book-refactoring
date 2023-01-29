# 10.2 조건식 통합하기 - consolidate-conditional-expression

## 요약&배경

- 비교하는 조건은 다르지만 그 결과로 수행하는 동작은 똑같은 코드들이 있다면 조건 검사도 하나로 통합한다.
- ‘and’ 연산자와 ‘or’ 연산자를 사용하여 여러 개의 로직을 하나로 합친다.

## 절차
  1. 해당 조건식들 모두에 부수효과가 없는지 확인한다.
  2. 조건문 두 개를 선택하여 두 조건문의 조건식들을 논리 연산자로 결합한다.
  3. 테스트한다.
  4. 조건이 하나만 남을 때까지 2~3 과정을 반복한다.
  5. 하나로 합쳐진 조건식을 함수로 추출할지 고려해본다.

## 예시

## 출처
-직접 구현

### 리팩토링 전

```typescript
// 결석이 3번 이상, 총 점수 30점 미만이면 F학점이다
function ScoreConditional(Student) {
  if (Student.AbsencesNumber > 3) return F;
  if (Student.TotalScore < 30) return F;
}
```

### 리팩토링 후

```typescript

function Credit(Student) {
  if (ScoreConditional()) return F;
}

function isNotEligibleForDisability() {
  return ((Student.AbsencesNumber > 3) 
        || (Student.TotalScore < 30);
  );
}
```
