# 6.2. 함수 인라인 하기 - Inline function

## 요약 

- 함수 인라인은 함수 본문코드를 인라인해서 써버리고 함수 이름과 block 을 제거한다. 

## 절차

1. 다형 메서드인지 확인한다.
2. 인라인할 함수를 호출하는 곳을 모두 찾는다.
3. 찾아낸 호출하는 곳들은 모두 함수 본문으로 교체한다.
4. 함수 정의를 삭제한다.

## 예시

## 출처 -> https://school.programmers.co.kr/learn/courses/30/lessons/12937

### 리팩터링 전

```js
function solution(num) {
    if (num % 2 == 0) {
    return "Even";
  } else {
    return "Odd";
  }
}
```

### 리팩터링 후

```js
function solution(num) {
    return num % 2 ? "Odd" : "Even";
}
```
