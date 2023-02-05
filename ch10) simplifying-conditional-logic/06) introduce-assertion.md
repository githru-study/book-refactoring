# 10.6. 어서션 추가하기 Introduce Assertion

`console.assert`

[https://developer.mozilla.org/ko/docs/Web/API/console/assert](https://developer.mozilla.org/ko/docs/Web/API/console/assert)

## 요약 & 배경

어떤 코드들은 특정 조건이 참이여야만 제대로 동작한다. 이런 조건은 주석보다는 어서션으로 추가해 두면 명확해진다.

어셔션은 디버깅 수단이자 다른 개발자와의 소통 수단이다. 그렇기 때문에 어서션의 존재가 프로그램의 기능에 영향을 주면 안 된다.

어서션을 적절한 곳에 추가하면 오류의 출처를 찾는 데 도움이 될 수 있다.

## 대상

- **반드시** 참이라고 가정되는 조건
- 프로그래머가 오류를 일으킬만한 조건
    - 외부 데이터에서 가져오는 값이라면, 그 값은 로직 상에서 검증해야 한다

(아마도?)
- 단위 테스트를 추가하기 어려운 상황이나 코드

## 절차

1. 참이라고 가정되는 조건을 명시하는 어서션을 추가한다

## 예시

### as-is

```tsx
class Pagination {
    constructor(private readonly page: number, private readonly count: number) {     }

    public getRange(): PageRange {
        return {
            start: this.page * this.count,
            end: (this.page + 1) * this.count
        }
    }
}
```

### to-be
```tsx
class Pagination {
    constructor(private readonly page: number, private readonly count: number) {     
				console.assert(this.page >= 0 && this.count >= 0, "페이지 인덱스와 포스트 개수는 0 이상이어야 함");
		}

    public getRange(): PageRange {
				console.assert(this.page >= 0 && this.count >= 0, "페이지 인덱스와 포스트 개수는 0 이상이어야 함");
        return {
            start: this.page * this.count,
            end: (this.page + 1) * this.count
        }
    }
}
```

---
[목차](../README.md)
