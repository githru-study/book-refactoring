# 8.7. 반복문 쪼개기 split loop

## 요약

한 번에 두 가지 이상의 일을 하는 반복문을 하나의 일만 처리하는 여러개의 반복문으로 바꾸기

## 배경

당장 하나의 반복문 안에서 두 가지 일을 한 번에 처리할 수 있다고 해서 하나의 반복문에서 두 가지 일을 처리하는 경우가 있다. 이런 경우 반복문에 수정이 생길 때 두 가지 일을 모두 이해하고 있어야 한다. 하나의 반복문이 하나의 일만 처리하게 변경되면 함수로 추출해낼 때도 유리하다.

## 대상

- 한 반복문 안에서 두 가지 이상의 일을 하고 있는 경우

## 절차

1. 반복문을 복제해 두 개로 만든다
2. 부수 효과를 만드는 부분이 있다면 한 쪽에만 남긴다
3. (더 가다듬기) 나뉜 각 반복문을 함수로 추출해본다
4. (더더 나아가기) 반복문을 파이프라인으로 만든다 (8.8)

## 예시

as-is

```tsx
// https://github.com/githru/githru-vscode-ext/blob/main/packages/analysis-engine/src/csm.ts

// L107
const csmNodes: CSMNode[] = [];
stemNodes.forEach((commitNode) => {
    const csmNode: CSMNode = {
      base: commitNode,
      source: [],
    };
	
		/*
     * ... squash 처리하기
		 */

		// check pr based merged-commit
    const pr = prDictByMergedCommitSha.get(csmNode.base.commit.id);
    if (pr) {
      const {
        data: { title, body, additions, deletions },
      } = pr.detail;

      // csm.base 커밋내용을 pr.detail 으로 교체
      csmNode.base.commit.message = `${title}\n\n${body}`;
      csmNode.base.commit.differenceStatistic.totalInsertionCount = additions;
      csmNode.base.commit.differenceStatistic.totalDeletionCount = deletions;

      // if squash-merge-commit
      if (csmNode.source.length === 0) {
        csmNode.source = buildCSMSourceFromPRCommits(csmNode, pr);
      }
    }

    csmNodes.push(csmNode);
});
```

to-be

```tsx
const csmNodes: CSMNode[] = [];
stemNodes.forEach((commitNode) => {
    const csmNode: CSMNode = {
      base: commitNode,
      source: [],
    };
	
		/*
     * ... squash 처리하기
		 */

		csmNodes.push(csmNode);
});

csmNodes.forEach((csmNode) => {
		const pr = prDictByMergedCommitSha.get(csmNode.base.commit.id);
    if (pr) {
      const {
        data: { title, body, additions, deletions },
      } = pr.detail;

      // csm.base 커밋내용을 pr.detail 으로 교체
      csmNode.base.commit.message = `${title}\n\n${body}`;
      csmNode.base.commit.differenceStatistic.totalInsertionCount = additions;
      csmNode.base.commit.differenceStatistic.totalDeletionCount = deletions;

      // if squash-merge-commit
      if (csmNode.source.length === 0) {
        csmNode.source = buildCSMSourceFromPRCommits(csmNode, pr);
      }
    }
});
```

to-be + 함수 추출하기

```tsx
function squash(
  commitNode: CommitNode,
  commitDict: Map<string, CommitNode>,
  stemDict: Map<string, Stem>
): CSMNode {
		// ...
}

function checkPrBasedMergeCommit(
  prDict: Map<string, PullRequest>,
  csmNode: CSMNode
): CSMNode {
		// ...
}

const csmNodes = stemNodes.map((commitNode) => squash(commitNode, commitDict, stemDict));

const prDictByMergedCommitSha = pullRequests.reduce(
    (dict, pr) => dict.set(`${pr.detail.data.merge_commit_sha}`, pr),
    new Map<string, PullRequest>()
  );

csmNodes.map((csmNode) => checkPrBasedMergeCommit(prDictByMergedCommitSha, csmNode));
```
