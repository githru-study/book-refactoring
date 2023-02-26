# 11.13 예외를 사전확인으로 바꾸기 - REPLACE EXCEPTION WITH PRECHECK


## 배경 & 대상 & 방식

예외는 예외적으로 동적할때만 쓰여야 함.  
함수 수행시 문제가 될 수 있는 조건을 함수 호출 전에 검사할 수 있다면, 예외를 던지는 대신 호출하는 곳에서 조건을 검사하는게 좋음  
(cf. 10-3 중첩조건문을 보호구문으로 바꾸기)  



## 절차

1) 예외유발 검사용 조건문을 추가  
1-1) catch블록 내용을 조건문의 조건절로 옮기고,  
1-2) try블록 내용을 나머지 다른 조건절로 옮김  
2) catch블록에 어서션 추가 + 테스트  
3) try블록, catch블록 제거 + 테스트  



## 예시1

```typescript
const values: Array<Value> = [ /* ... */ ]

function getValueForPeriod(periodNumber: number) {
  try {
    return values[periodNumber]
  } catch(e: ArrayIndexOutOfBoundsException) {
    return 0;
  }
}

↓↓↓

function getValueForPeriod(periodNumber: number) {
  return (periodNumber >= values.length) ? 0 : values[periodNumber]
}

↓↓↓

function getValueForPeriod(periodNumber: number) {
  if (periodNumber >= values.length) return 0
  return values[periodNumber]
}
```


## 예시2
```typescript
class ResourcePool {
    private available: Deque<Resource>
    private allocated: List<Resource>

    public getResource() {
        let result: Resource

        try {
            result = this.available.pop()     // pool에 있으면 있는거 반환
            this.allocated.add(result)
        } catch(e: NoSuchElementException) {
            result = Resource.create()        // pool에 없으면 새로 생성해서 반환
            this.allocated.add(result)
        }

        return result
    }
}
```

↓↓↓


```typescript
class ResourcePool {
    private available: Deque<Resource>
    private allocated: List<Resource>

    public getResource() {
        let result: Resource

        if (this.available.isEmpty()) {
            result = Resource.create()        // pool에 없으면 새로 생성해서 반환
            this.allocated.add(result)
        }

        try {
            result = this.available.pop()     // pool에 있으면 있는거 반환
            this.allocated.add(result)
        } catch(e: NoSuchElementException) {
            throw new AssertionError("도달 불가")
        }

        return result
    }
}
```

↓↓↓


```typescript
class ResourcePool {
    private available: Deque<Resource>
    private allocated: List<Resource>

    public getResource() {
        let result: Resource

        if (this.available.isEmpty()) {
            result = Resource.create()        // pool에 없으면 새로 생성해서 반환
            this.allocated.add(result)
        } else {
            result = this.available.pop()     // pool에 있으면 있는거 반환
            this.allocated.add(result)
        }

        return result
    }
}
```



---
[목차](../README.md)
