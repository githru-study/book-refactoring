# 12.2 필드 올리기 Pull Up Field

## 요약

서브클래스 간에 중복된 필드가 있을 경우 슈퍼클래스로 끌어올린다

## 배경

서브클래스가 독립적으로 개발되거나 나중에 계층 구조로 리팩터링된 경우 일부 기능이 중복될 수 있다. 특히 필드가 중복되기 쉽다. 중복된 필드는 하는 역할은 같지만 이름은 다를 수 있다. 따라서 중복을 찾으려면 필드가 하는 일을 잘 분석해야 한다.

이렇게 하면 두 가지 중복을 없앨 수 있다.

1. 데이터 중복 선언
2. 필드와 관련된 동작 이동 (서브클래스 ⇒ 슈퍼클래스)

## 대상

서브클래스 간에 역할이 중복되는 필드

## 절차

1. 후보 필드들이 모두 같은 역할로 사용되는지 확인한다
2. 필드들의 이름이 다르다면 똑같은 이름으로 바꾼다
3. 슈퍼클래스에 새로운 필드를 생성한다. 접근제어자는 protected로 한다.
4. 서브클래스의 필드들을 삭제한다

## 예시

### as-is

```cs
public class abstract GameManager {
    public abstract void InitGame();
    public abstract void OnGameStart();
    public abstract void OnGameStop();
    public abstract void CheckGameClear();
    public abstract void CheckGameOver();
    public abstract void GameClear();
    public abstract void ChangeProgress();
    public abstract void GoNextStage();
}

public class AvoidStageGameManager: GameManager {
    public Button btnNextStage;
    private float timeLimit = 0;
    private int avoidObjectId;

    // 메소드 구현 ...
}

public class CleanStageManager : GameManager {
    public Button btnNextStage;
    private float timeLimit = 0;
    private int goalCount;

    // 메소드 구현 ...
}
```

### to-be

```cs
public class StageGameManager: GameManager {
    public Button btnNextStage;
    private float timeLimit = 0;
}

public class AvoidStageGameManager: StageGameManager {
    private int avoidObjectId;

    // 메소드 구현 ...
}

public class CleanStageManager : StageGameManager {
    private int goalCount;
    
    // 메소드 구현 ...
}
```

---
[목차](../README.md)
