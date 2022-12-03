# 6.3 변수 추출하기 - Extract Variable

## 요약 

- 표현식에 이름을 붙이고 싶을 때 변수 추출을 한다

## 절차

1. 추출하려는 표현식에 부작용은 없는지 확인한다.
2. const 같은 불변 변수를 하나 선언하고 이름을 붙이고 코드를 옮긴다.
3. 원본 표현식의 정의를 삭제한다.
## 예시

## 출처 -> https://school.programmers.co.kr/learn/courses/30/lessons/120924

### 리팩터링 전

```js
function solution(common) {
    const sameMinus = common[1]-common[0] === common[2]-common[1]
    if(sameMinus) {
        return common[common.length-1]+common[1]-common[0]
    } else {
        return common[common.length-1]*(common[1]/common[0])
    }
}
```

### 리팩터링 후

```js
function solution(common) {
    const sameMinus = common[1]-common[0] === common[2]-common[1]
    const size =  common.length
    if(sameMinus) {
        return common[size-1]+common[1]-common[0]
    } else {
        return common[size-1]*(common[1]/common[0])
    }
}

```
