# 9.2 필드 이름 바꾸기 - Rename Field

## 배경 & 대상 & 방식

데이터에 대한 이해가 깊어질수록 프로그램에 그 이해를 반영하고 싶어함  
=> 기존 레코드의 필드명을 바꾸고 싶다 or 게터/세터를 바꾸고싶다 (=사용자 입장에선 동일)  
=> 테스트 코드를 유지하면서 변경 절차 진행  


## 절차

1) 레코드 캡슐화 진행 (private 필드명)
2) 변경하고자 하는 필드명을 생성자/게터/세터 한묶음으로 변경 (게터/세터 명은 유지)
3) 생성자 파라미터에 변경하고자 하는 필드명을 추가 (old/new 동시 허용, new 우선)
4) 게터/세터 변경


## 예시

```typescript
class Organization {
  private _name: string;
  constructor(data) {
    this._name = data.name
  }
  get name() { this._name }
  set name(name) { this._name = name }
}

new Organization ({ name: "애크미 구스베리" })
org.name
```

↓↓↓

```typescript
class Organization {
  private _title: string;                  // private
  constructor(data) {
    this._title = data.name                // 필드명을
  }
  get name() { this._title }               // 먼저
  set name(name) { this._title = name }    // 바꿔준다
}

const org = new Organization ({ name: "애크미 구스베리" })
org.name
```

↓↓↓

```typescript
class Organization {
  private _title: string;
  constructor(data) {
    this._title = data.title !== undefined ? data.title : data.name  // 생성자 파라미터를 확장 (old/new 둘다 허용)
  }
  get name() { this._title }
  set name(name) { this._title = name }
}

const org = new Organization ({ name: "애크미 구스베리" })     // 이시점에서 
const org2 = new Organization ({ title: "애크미 구스베리2" })  // name, title 둘다 허용
org.name   // but 게터세터는
org2.name  // old만 유지
```

↓↓↓

```typescript
class Organization {
  private _title: string;
  constructor(data) {
    if ()
    this._title = data.title  // 생성자 파라미터를 확장 제거 (new 만 허용)
  }
  get title() { this._title }               // 게터/세터
  set title(title) { this._title = title }  // 인터페이스 변경
}

const org = new Organization ({ title: "애크미 구스베리" })
org.title // 게터세터 호출부 함께 변경

// const org = new Organization ({ name: "애크미 구스베리" })  // err (old 허용되지 않음)
// org.name // err (old 허용되지 않음)
```

---
[목차](../README.md)
