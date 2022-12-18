# 8.8. 반복문을 파이프라인으로 바꾸기 replace loop with pipeline

## 요약

컬렉션을 순회하는 복잡한 반복문 로직을 파이프라인을 사용해 나타내기

## 배경

컬렉션 파이프라인(Collection Pipeline)을 이용해 처리 과정을 일련의 연산으로 표현한다. 각 연산은 컬렉션을 입력받아 다른 컬렉션을 반환한다. 반복문 안에서 수행되는 로직을 파이프라인으로 나타내면 코드를 이해하기 더 쉬워진다.

## 대상

- 컬렉션을 순회하는 복잡한 반복문

## 절차

1. 반복문 각각의 단위 행위를 적절한 컬렉션 파이프라인으로 만든다
2. 반복문의 모든 동작을 대체했다면 반복문을 삭제한다

## 예시

as-is

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

to-be

```tsx
/** 함수 선언 생략 .. **/

const prDictByMergedCommitSha = pullRequests.reduce(
    (dict, pr) => dict.set(`${pr.detail.data.merge_commit_sha}`, pr),
    new Map<string, PullRequest>()
  );

const csmNodes = stemNodes
		.map((commitNode) => squash(commitNode, commitDict, stemDict))
		.map((csmNode) => checkPrBasedMergeCommit(prDictByMergedCommitSha, csmNode));
```

### 예시 2

as-is

```tsx
// https://github.com/ooooorobo/2022-githru-tutorial/blob/main/parser/ooooorobo/src/index.ts
function parseLogIntoCommit(log: string): Commit[] {
    const commits = [];
    const commitLogs = log.split(LOG_PREFIX);
    for (const commitLog of commitLogs) {
        if (commitLog.length === 0) return;
        
        const lines = commitLog.split('\n');
            const [parentHash, commitHash, authorName, authorMail, committedAt, title] = lines[0].split(LOG_DELIMITER);
            const commit: Commit = {
            parentHashList: parentHash.split(' ').filter(Boolean),
            commitHash,
            committedAt: new Date(committedAt),
            title,
            author: {
                name: authorName,
                email: authorMail
            },
            editedFileInfoList
        };
            
        commits.push(commit);
    }
    return commits;
}
```

to-be

```tsx
function parseLog(log: string): Commit[] {
  return log
    .split(LOG_PREFIX)
    .filter(Boolean)
    .map((commitLog) => commitLog.split("\n")[0])
    .map((line) => line.split(LOG_DELIMITER))
    .map(
      ([parentHash, commitHash, authorName, authorMail, committedAt, title]) =>
        ({
          parentHashList: parentHash.split(" ").filter(Boolean),
          commitHash,
          committedAt: new Date(committedAt),
          title,
          author: {
            name: authorName,
            email: authorMail,
          },
          editedFileInfoList,
        } as Commit)
    );
}
```
