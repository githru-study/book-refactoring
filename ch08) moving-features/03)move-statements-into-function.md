# 8.3 문장을 함수로 옮기기 move statements into function

## 요약
- 함수와 같이 사용하는 문장을 함수 안으로 이동하는 것을 말한다.
- 호출되는 함수와 한 몸은 아니지만, 여전히 함께 호출돼야 하는 경우라면 둘을 합쳐 별개의 함수로 추출하는 방법도 있다.

## why?
- 중복을 제거하면 해당 코드만을 수정하면 되지만 중복이 있을경우 모든 중복 케이스를 수정을 해 주어야하기 때문이다.

## 절차

1. 반복 코드가 함수 호출 부분과 멀리 떨어져 있다면 문장 슬라이드하기를 적용해 근처로 옮긴다.

2. 타깃 함수를 호출하는 곳이 한 곳 뿐이면, 단순히 소스 위치에서 해당 코드를 잘라내어 피호출 함수로 복사하고 테스트 한다.
- 해당되는 경우(호출되는 곳이 한곳) 이면 나머지 단계는 무시한다.

3. 호출자가 둘 이상이면 호출자 중 하나에서 '타깃 함수 호출 부분과 그 함수로 옮기려는 문장들을 함께' 다른 함수로 추출한다. 추출한 함수에 기억하기 쉬운 임시 이름을 지어준다.

4. 다른 호출자가 모두 방금 추출한 함수를 사용하도록 수정한다. 하나씩 수정할 때마다 테스트 한다.

5. 모든 호출자가 새로운 함수를 사용하게 되면 원래 함수를 새로운 함수 안으로 인라인한 후 원래 함수를 제거한다.

6. 새로운 함수의 이름을 원래 함수의 이름으로 바꿔준다.

## 예시

## 출처 -> https://school.programmers.co.kr/learn/courses/30/lessons/12946

### 리팩터링 전

```js
const answer = [];

function solution(n) {
    hanoi(n, 1, 3, 2);
    return answer;
}

const hanoi = (n, src, dst, mid) => {
    if (n === 1) {
     return answer.push([src, dst]);
    }
    else {
        hanoi(n - 1, src, mid, dst);
        answer.push([src, dst]);
        hanoi(n - 1, mid, dst, src);
    }
}

```

### 리팩터링 후

```js
function solution(n) {
  const answer = [];
  const hanoi = (n, from, to, by) => {
    if (n === 1) {
      return answer.push([from, to]);
    }
    hanoi(n - 1, from, by, to);
    answer.push([from, to]);
    hanoi(n - 1, by, to, from);
  };
  hanoi(n, 1, 3, 2);
  return answer;
}
```