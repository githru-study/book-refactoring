# 6.6. 변수 캡슐화하기 - Encapsulate Variable

## 요약

객체가 가지고 있는 값을 객체 밖에서 직접 참조할 수 없도록 캡슐화하는 함수를 만들기

## 배경

변수를 다루는 것은 함수를 다루는 것보다 까다롭다. 함수는 호출하는 것이기 때문에, 다른 곳으로 옮기거나 혹은 함수 내부에서 다른 함수를 호출하도록 마이그레이션하는 식으로 조금씩 리팩토링 하는 게 가능하다. 변수를 변경하려면 변수를 참조하는 모든 곳을 수정해야 한다. (전역 변수를 피해야 하는 이유이기도 하다)

변수를 보다 쉽게 다루기 위해서, 변수 캡슐화를 사용할 수 있다. 변수 캡슐화를 통해, 변수를 직접 다루는 게 아니라 함수를 다루도록 변환한다. 변수에 접근하는 방법을 어떤 함수가 독점하도록 하는 식으로 캡슐화할 수 있다.

이렇게 변수를 캡슐화하면, 변수를 참조하기 전후로 값을 검증하거나 추가 로직을 쉽게 추가할 수 있다. 데이터 간의 결합도가 높아지는 것도 방지할 수 있다.

## 대상

- 객체 바깥에서 직접 접근할 수 있는 데이터 (public field)

### 대상이 아닌 것

- 불변 데이터
    - 데이터가 변경되지 않으므로 값 변경 시 검증이나 추가 작업이 필요 없다
    - 옮길 필요 없이 복제하면 된다

## 절차

1. 변수를 참조하고 수정하는 역할을 전담하는 캡슐화 함수를 만든다
    - 객체를 참조하는 경우, 객체를 수정하지 못하도록 불변 객체로 만들어 반환할 수도 있다.
        - `Object.assign({}, obj);` (물론 얕은 복사이기 때문에 주의가 필요하다)
2. 변수를 직접 참조하는 부분을 캡슐화 함수를 호출하도록 변경한다
3. 변수의 접근 범위를 제한한다 (public ⇒ private)
4. 테스트한다
5. 변수 값이 레코드라면, 레코드 캡슐화하기를 고려해본다.

## 예시

> [코드 출처](https://github.com/ooooorobo/githru-vscode-ext/commit/7c08d49b6156d1524d0ad0044649cc09b2818dd9)

### 리팩터링 전

```ts
import { CommitRaw } from "./CommitRaw";

export interface CommitNode {
  // 순회 이전에는 stemId가 존재하지 않음.
  stemId?: string; // stemId
  commit: CommitRaw;
}
```

### 리팩터링 후

1. 변수를 참조하고 수정하는 역할을 전담하는 캡슐화 함수를 만든다

```ts
import { CommitRaw } from "./CommitRaw";

export interface CommitNode {
  // 순회 이전에는 stemId가 존재하지 않음.
  stemId?: string;
  commit: CommitRaw;
}

// 기존 인터페이스와 혼동되지 않도록 Class를 붙임. 
// TODO: CommitNode로 rename
export class CommitNodeClass {
  // eslint-disable-next-line no-useless-constructor
  constructor(public commit: CommitRaw, public stemId: string) {}

  public setStemId(id: string) {
    this.stemId = id;
  }

  public getStemId(): string {
    return this.stemId;
  }

  public getCommit(): CommitRaw {
    return { ...this.commit };
  }
}
```

1. 변수를 직접 참조하는 부분을 캡슐화 함수를 호출하도록 변경한다
2. 변수의 접근 범위를 제한한다 (public ⇒ private)
   - 일단 private으로 바꾸고 → 빌드 돌렸을때 나오는 오류를 보고 수정하면 편하다