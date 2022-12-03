# 6.4 변수 인라인 하기 - Inline Variable

## 요약 

- 변수명이 원래 표현식과 다를바 없을 때 사용한다.

## 절차

1. 인라인할 표현식에 이상한 부분이 없는지 확인한다.
2. 상수인지 확인하고 상수로 수정 후 테스트한다.
3. 변수에 값이 단 한번만 대입되는지 확인한다.
4. 변수를 표현식으로 교체한다.

## 예시

## 출처 -> https://school.programmers.co.kr/learn/courses/30/lessons/12901

### 리팩터링 전

```js
function solution(a,b){
    let day  = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
      date = new Date(`${a}/${b}/2016`).getDay();
    return day[date];
}
```

### 리팩터링 후

```js
function solution(month, date) {
    return ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] [new Date(`${month}/${date}/2016`).getDay()];
}
```
