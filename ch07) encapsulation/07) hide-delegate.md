# 7.7 위임 숨기기 - Hide Delegate

## 요약

위임 객체의 존재를 숨긴다 (↔ 중개자 제거하기)


## 배경 & 대상 & 방식

호스트 코드가 타겟 객체 내부의 위임 객체를 직접 접근하는 구조일 때  
=> 위임 객체의 인터페이스가 바뀌면, 이 인터페이스를 사용하는 모든 호스트 코드를 수정해야함  
=> 타겟 객체에 위임 메서드를 만들어서 위임 객체의 존재를 숨긴다


## 절차

1. 위임 객체의 각 메서드에 해당하는 위임 메서드를 타겟 객체에 생성 (=옮길 인터페이스 생성)
2. 호스트코드가 위임 객체 대신 타겟 객체의 위임 메서드를 호출하도록 수정함 (=인터페이스 호출 경로 변경)
3. 모두 수정했다면, 타겟 객체의 위임 객체를 얻는 모든 접근자를 제거함


## 예시

```typescript
manager = person.department.manager;  // 이 사람의 부서의 매니저를 알려줘

↓↓↓

manager = person.manager;  // 이 사람의 매니저를 알려줘 (무슨 부서인지는 모르겠고)

class Person {
  private department: Department;
  get manager() { return this.department.manager; }
}
```

---
[목차](../README.md)
