# 8.6. 문장 슬라이드하기 slide-statements

## 요약

코드의 위치를 이동시켜 관련된 코드가 가까운 곳에 모여 있게 만들기

## 배경

관련된 코드가 모여 있는 것이 이해하기 더 쉽다. 하나의 데이터 구조를 사용하는 코드가 여기저기 흩어져 있다면, 코드의 위치를 데이터 구조와 가까운 위치로 옮겨 주는 게 좋다. 이렇게 하면 다른 리팩터링을 수행하는 데 도움이 될 수 있다. (주로 함수 추출하기)

## 대상

- 변수를 선언하는 곳과 사용하는 곳이 떨어져 있는 경우
- 함수로 추출하려는 코드가 흩어져 있는 경우

## 절차

1. 코드를 어디로 이동시킬지 찾는다
    1. 코드를 이동시켰을 때 동작이 달라지는 부분이 있는지 확인한다 (슬라이드하는 코드와 건너뛰려는 코드 모두 확인)
        1. 슬라이드하는 코드와 건너뛰려는 코드가 공통으로 참조하는 데이터를 한 쪽이 수정한다면, 슬라이드할 수 없다
        2. 건너뛰려는 코드가 부수 효과가 없는 코드라면, 자유롭게 재배치할 수 있다
2. 코드를 이동시키고, 테스트한다

## 예시

as-is

```tsx
// https://github.com/githru/githru-vscode-ext/blob/main/packages/analysis-engine/src/csm.ts

// L90~93
const prDictByMergedCommitSha = pullRequests.reduce(
    (dict, pr) => dict.set(`${pr.detail.data.merge_commit_sha}`, pr),
    new Map<string, PullRequest>()
  );

// L168
const pr = prDictByMergedCommitSha.get(csmNode.base.commit.id);
```

to-be (8.7 리팩토링 수행했다고 할 때)

```tsx
const prDictByMergedCommitSha = pullRequests.reduce(
    (dict, pr) => dict.set(`${pr.detail.data.merge_commit_sha}`, pr),
    new Map<string, PullRequest>()
  );

csmNodes.forEach((csmNode) => {
		const pr = prDictByMergedCommitSha.get(csmNode.base.commit.id);
		// ...
```
