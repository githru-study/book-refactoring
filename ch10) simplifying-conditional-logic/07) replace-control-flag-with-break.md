# 10.7. 제어 플래그를 탈출문으로 바꾸기 Replace Control Flag with Break

## 배경

주로 반복문에서, 어딘가에서 계산된 값을 다른 조건문에서 검사하기 위해 사용된다. 이런 것들은 `break`, `continue`, `return` 문을 사용하면 대부분 대체 가능하다.

## 대상

- 제어 플래그를 사용하는 코드

## 절차

1. 제어 플래그를 갱신하는 코드 각각을 적절한 제어문으로 바꾼다.
2. 모두 수정한 후 제어 플래그를 삭제한다

## 예시

### as-is

```tsx
let foundIdx = -1;
let found = false;

for (let i = 0; i < dataList.length; i++) {
    const data = dataList[i];
    for (const element of data.list) {
        if (element === 5) {
            found = true;
            foundIdx = i;
            break;
        }
    }
    if (found) {
        break;
    }
}
```

### to-be

```tsx
// (1)
let foundIdx = -1;

for (let i = 0; i < dataList.length; i++) {
    const data = dataList[i];
    for (const element of data.list) {
        if (element === 5) {
            foundIdx = i;
            break;
        }
    }
    if (foundIdx > -1) {
        break;
    }
}

// (2)
for (let i = 0; i < dataList.length; i++) {
    const data = dataList[i];
    const foundFive = data.list.findIndex(element => element === 5);
    if (foundFive > -1) {
        foundIdx = i;
        break;
    }
}

// (3)
const foundIdx = dataList.findIndex(({list}) => !!list.find(element => element === 5));
```

---
[목차](../README.md)
