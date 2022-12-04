# 7.8 중개자 제거하기 - Remove Middle Man

## 요약

위임 객체의 존재를 드러낸다 (↔ 위임 숨기기)


## 배경 & 대상 & 방식

위임 숨기기를 유지하다 보면, 호스트 코드에서 위임 객체의 다른 기능을 사용해야할때마다 위임 메서드를 추가해야함  
=> 이렇게 위임 메서드를 추가하다보면 어느순간 단순전달용 메서드가 점점 많아지게 됨 (=타겟 객체가 단순 중개역할로 전락)  
=> 차라리 호스트 코드에서 직접 위임 객체에 접근하도록 허용


## 절차

1. 위임 객체를 얻는 게터를 생성 (=위임 객체를 바라보는 인터페이스 생성)
2. 위임 메서드를 호출하는 클라이언트가 모두 이 게터를 거치도록 수정 (=인터페이스 호출 경로 변경)
3. 모두 수정했다면 위임 메서드를 삭제


## 예시

```typescript
manager = person.manager;      // 이 사람의 매니저를 알려줘 (무슨 부서인지는 모르겠고)
deptName = person.deptName;    // 이 사람의 부서이름을 알려줘 (무슨 부서인지는 모르겠고)
deptLocation = person.deptLocation;  // 이 사람의 부서위치를 알려줘 (무슨 부서인지는 모르겠고)

class Person {
  private department: Department;
  get deptName() { return this.department.name; }
  get deptManager() { return this.department.manager; }
  get deptLocation() { return this.department.location; }
}

↓↓↓

dept = person.department;  // 이 사람의 부서의 ~
deptName = dept.name;          // 이름을 알려줘
deptManager = dept.manager;    // 매니저를 알려줘 
deptLocation = dept.location;  // 위치를 알려줘

class Person {
  private _department: Department;
  get department() { return this._department; }
}
```

---
[목차](../README.md)
