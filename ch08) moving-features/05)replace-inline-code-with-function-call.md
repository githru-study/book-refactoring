# 8.5 인라인 코드를 함수로 바꾸기 replace inline code with functioncall

## 요약
- 코드를 반복하는 방법 대신 함수로 대체하는 것을 말한다.

## 언제 사용하는지?
- 인라인할 코드를 대체할 함수가 존재하지 않으면 함수 추출하는 기법을 사용하는 것이고, 있으면 인라인 코드를 함수 호출로 바꾸는 기법을 적용한다.

## 절차
1. 인라인 코드를 함수 호출로 대체한다.

2. 테스트 한다.

## 예시

## 출처

- 책에 있는 코드

### 리팩터링 전

```js
let appliesToMass = false;
for(const current of state){
    if(s === "MA") appliesToMass = true;
}
```

### 리팩터링 후

```js
appliesToMass = states.includes("MA")

```
