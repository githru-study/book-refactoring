# 11.2. 함수 매개변수화하기

## 배경

어떤 함수들의 로직이 아주 비슷한데 리터럴만 다르다면, 그 리터럴을 매개변수로 받는 공통 함수를 만들어 중복을 없앤다.

## 대상

- 로직이 유사한 두 개 이상의 함수에서 리터럴만 다른 경우

## 절차

1. 함수들 중 하나를 선택하고, 리터럴을 매개변수로 추가한다
2. 해당 함수를 호출하는 모든 곳에서 적절한 리터럴을 매개변수로 전달한다
3. 매개변수로 받은 값을 사용하도록 본문을 수정한다
4. 비슷한 다른 함수를 호출하는 곳에서 1번의 함수를 사용하도록 변경한다

## 예시

### as-is

```tsx
function convertWebPxToMm(px: number) {
    return px * 25.4 / 96;
}

function convertPrintPxToMm(px: number) {
    return px * 25.4 / 300;
}
```

### to-be

```tsx
function convertPxToMm(px: number, dpi: number) {
    return px * 25.4 / dpi;
}
```

---
[목차](../README.md)
