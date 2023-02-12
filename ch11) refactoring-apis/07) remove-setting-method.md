# 11.7. 세터 제거하기 Remove Setting Method

## 요약

불변 필드의 세터를 제거하고 생성자의 매개변수로만 설정 가능하게 하기

## 배경

어떤 필드는 객체가 생성된 이후에는 변경되면 안 되는 경우가 있다. 이 경우 그 필드의 세터를 제거해서 값을 수정하지 않겠다는 의도를 드러낼 수 있다. 필요하다면 생성자의 매개변수로 값을 받아서 생성자 안에서 객체를 생성할 때 값을 설정할 수 있다.

## 대상

- 객체가 생성된 뒤에는 값이 변경되면 안 되는 필드

## 절차

1. 설정하는 값을 생성자의 매개변수에 추가하고, 생성자 내에서 적절한 세터를 호출한다
2. 생성자 밖에서 세터를 호출하는 곳을 제거하고, 1번에서 수정한 생성자를 사용하도록 한다.
    1. 만약 새로운 객체를 생성하는 방식으로 세터 호출을 대체할 수 없다면, 이 리팩터링을 수행할 수 없다.
3. 세터 메서드를 인라인한다. 해당 필드는 가능하면 불변으로 만든다.

## 예시

### as-is

```tsx
/**
 * 유저 정보 모델
 */
class User {
  private _id: string = '';
  private _name: string = '';

  get id() {
    return this._id;
  }
  set id(id: string) {
    this._id = id;
  }
  get name() {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }
}

/**
 * 로그인한 유저 정보를 관리
 */
class UserStore {
  private user: User;
  
  public login(id: string, name: string) {
    this.user = new User();
    this.user.id = id;
    this.user.name = name;
  }

  public changeName(newName: string) {
    this.user.name = newName;
  }
}
```

### to-be

```tsx
/**
 * 유저 정보 모델
 */
class User {
  private readonly _id: string = '';
  private _name: string = '';
  
  constructor(id: string) {
    this._id = id;
  }

  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  set name(name: string) {
    this._name = name;
  }
}

/**
 * 로그인한 유저 정보를 관리
 */
class UserStore {
  private user: User = new User('');

  public login(id: string, name: string) {
    // id는 생성자에서만 변경 가능하므로 새로운 user 객체 생성
    this.user = new User(id);
    this.user.name = name;
  }

  public changeName(newName: string) {
    this.user.name = newName;
  }
}
```

---
[목차](../README.md)
