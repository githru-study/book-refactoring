# 10.3 중첩 조건문을 보호구문으로 바꾸기 - replace nested conditional with guard clauses

## 요약&배경

- 보호구문을 활용할 때 조건문 안의 조건문을 중첩으로 사용하는 것 보다 로직을 이해하기 편해서 사용한다.

## 절차

1. 교체해야 할 조건 중 가장 바깥 것을 선택하여 보호 구문으로 바꾼다.
2. 테스트한다.
3. 1~2 과정을 필요한 만큼 반복한다.
4. 모든 보호 구문이 같은 결과를 반환한다면 보호 구문들의 조건식을 통합한다.

## 예시

## 출처
=직접 구현

### 리팩토링 전

```typescript

// 2022년 유방암 건강검진 대상자는 짝수년도 생이고 만 40세 이상 여성이다.

function check2022Health(person){
    if(person.isMale){
        return false;
    }else{
        if(person.year % 2 === 1){
            return false;
        }else{
            if(person.age < 40){
                return false;
            }else{
                return true;
            }
        }
    }
}
```

### 리팩토링 후

```typescript
function check2022Health(person){
    if(person.isMale){
        return false;
    }
    if(person.year % 2 === 1){
        return false;
    }
    if(person.age < 40){
        return false;
    }
   return true;
}
```
