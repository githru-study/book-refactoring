# 함수 선언 바꾸기 - Change Function Declaration 

## 요약 

- 함수 선언 바꾸기는 함수명을 함수의 역할을 잘 드러내도록 명확히 하는것,매개변수를 정리하는 것 이라는 두가지 원칙을 가진다. 

## 절차

### 간단한 절차
1. 매개변수 제거 시, 참조하는 곳이 있는지 확인한다.
2. 메서드 선언을 변경한다.
3. 기존의 선언을 참조하는 부분을 찾아서 바뀐 형태로 수정한다.
4. 테스트한다.

### 마이그레이션 절차 
1. 함수 본문을 새 함수로 추출한다
2. 새 함수에 인자 추가 시 간단한 절차로 추가 후에 테스트한다.
3. assertion을 추가하여 실제로 사용하는지 검사가 가능한지 확인한다.
4. 기존 함수가 새 함수를 호출하도록 전달 함수로 수정한다.
5. 예전 함수를 쓰는 코드를 새 함수를 호출하도록 수정한다.
6. 임시 이름을 붙인 새 함수를 원래 이름으로 수정한다.

## 예시

## 출처 -> https://school.programmers.co.kr/learn/courses/30/lessons/43165

### 리팩터링 전

```js

function solution(numbers, target) {
  let answer = 0;

  function dfs(depth, sum) {
    if (depth === numbers.length) {
      if (sum === target) {
        answer += 1;
      }
      return;
    }
    dfs(depth + 1, sum + numbers[depth]); // 왼쪽
    dfs(depth + 1, sum - numbers[depth]); // 오른쪽
  }

  dfs(0, 0);

  return answer;
}
```

### 리팩터링 후

```js
let checked = 0;
function solution(numbers, target) {
    let answer = 0;
    dfs(numbers, 0, 0, target)
    answer = checked
    return answer;
}


function dfs(array, idx, sum, target) {
    if (idx === array.length) {
        if (sum === target) {
            checked++
        }
        return
    }

    dfs(array, idx+1, sum+array[idx], target)
    dfs(array, idx+1, sum-array[idx], target)
}
```
