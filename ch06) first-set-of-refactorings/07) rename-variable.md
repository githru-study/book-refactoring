# 6.7. 변수 이름 바꾸기 - Rename Variable

## 요약 & 배경

변수 이름을 잘 지으면, 프로그램이 하는 일에 대해 파악하는 것이 쉬워진다.

## 대상

- 역할을 잘 드러내지 못하는 이름을 가진 변수
    - 특히, 프로그램 내에서 오래 사용되는 변수

## 절차

1. 변수를 참조하는 곳을 모두 찾아 변경한다
    - 변수 캡슐화하기를 도입해서 함수를 통해 변수에 접근하도록 하고, 변수의 이름을 변경한다
    - 원본의 이름을 바꾸고, 원본의 기존 이름을 변수명으로 하는 복제본을 만든 다음 점진적으로 변경한다

## 예시

> [코드 출처](https://github.com/ooooorobo/githru-vscode-ext/blob/main/packages/view/src/types/global.ts)

### 리팩터링 전

```ts
// @view/src/types/global.ts
import type { ClusterNode } from "./NodeTypes.temp";

export type GlobalProps = { data: ClusterNode[] }; // 엔진이 넘겨준 클러스터 데이터
export type SelectedDataProps = ClusterNode[]; // 현재 사용자가 선택한 클러스터 리스트
```

### 리팩터링 후

```ts
// @view/src/types/global.ts
import type { ClusterNode } from "./NodeTypes.temp";

export type GlobalProps = { clusters: ClusterNode[] };
export type SelectedClusters = ClusterNode[];
```
