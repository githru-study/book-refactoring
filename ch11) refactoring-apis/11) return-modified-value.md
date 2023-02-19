# 11.11 수정된 값 반환하기

## 요약

함수 밖의 데이터를 수정하는 부분이 있다면, 수정된 값을 반환하는 형태로 바꾸기

## 배경

같은 데이터를 읽고 수정하는 곳이 여러 곳이라면 데이터가 수정되는 흐름을 추적하기 어렵다. 그래서 데이터가 수정된다면 그 사실을 명확히 알리는 게 좋다.

함수 안에서 함수 바깥의 변수를 수정하는 형태라면 함수 바깥에서는 이 변수가 변경된다는 것을 알아차리기 어렵다. 함수 안에서 바깥의 변수를 직접 수정하는 형태가 아니라, 함수를 호출해서 값을 계산한 다음 그 값을
변수에 대입하는 방식으로 바꿔야 데이터 변경의 흐름이 명확해진다.

## 대상

- 값 하나를 계산한다는 분명한 목적이 있는 함수
- 함수 옮기기를 적용하기 전

### 적합하지 않은 경우

- 값 여러 개를 갱신하는 함수

## 절차

1. 함수가 수정된 값을 반환하게 하고, 호출자는 그 값을 자신의 변수에 저장한다
2. 피호출 함수 안에 반환할 값을 가리키는 새로운 변수를 선언한다
3. 계산이 선언과 동시에 이뤄지도록 통합한다 (선언 시점에 계산 로직을 바로 실행해 대입한다)
    1. 이 변수는 불변으로 지정하는 게 좋다
4. 피호출 함수의 변수 이름을 적당히 바꿔준다

## 예시

```tsx
let totalAscent = 0;
calcAscent();

function calcAscent() {
  for (let i = 1; i < points.length; i++) {
    const verticalChange = points[i].elevation - points[i - 1].elevation;
    totalAscent += (verticalChange > 0) ? verticalChange : 0;
  }
}
```

(1)

```tsx
let totalAscent = 0;
totalAscent = calcAscent();

function calcAscent() {
  for (let i = 1; i < points.length; i++) {
    const verticalChange = points[i].elevation - points[i - 1].elevation;
    totalAscent += (verticalChange > 0) ? verticalChange : 0;
  }
  return totalAscent;
}
```

(2)

```tsx
const totalAscent = calcAscent();

function calcAscent() {
  let result = 0;
  for (let i = 1; i < points.length; i++) {
    const verticalChange = points[i].elevation - points[i - 1].elevation;
    result += (verticalChange > 0) ? verticalChange : 0;
  }
  return result;
}
```

---
### 2.

(0)

```tsx
let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합

const sceneInfo = [
   {
      type: 'sticky',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
   },
   {
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
   },
    // ...
]

function scrollLoop() {
   enterNewScene = false;
   prevScrollHeight = 0;
   
   for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
   }

	// ...
}

function playAnimation() {
   const objs = sceneInfo[currentScene].objs;
   const values = sceneInfo[currentScene].values;
   const currentYOffset = yOffset - prevScrollHeight;
    // ...
}
```

(1)

```tsx
function calcPrevScrollHeight(sceneNumber: number) {		       
   let prevScrollHeight = 0;
   
   for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
   }
   
   return prevScrollHeight;
}

function playAnimation() {
   const objs = sceneInfo[currentScene].objs;
   const values = sceneInfo[currentScene].values;
   
   const prevScrollHeight = calcPrevScrollHeight(currentScene);
   const currentYOffset = yOffset - prevScrollHeight;
    // ...
}
```
