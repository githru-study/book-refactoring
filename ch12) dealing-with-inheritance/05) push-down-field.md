# 12.5 필드 내리기 Push Down Field

## 요약

서브클래스에서만 사용하는 필드는 해당 서브클래스로 옮긴다.

## 절차

1. 대상 필드를 모든 서브클래스에 모두 정의한다
2. 슈퍼클래스에서 필드를 삭제한다
3. 필드를 사용하지 않는 서브클래스에서 필드를 삭제한다.

## 예시

### as-is

```csharp

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
    private bool useTimeLimit = false;
    
    // 메소드 구현 ...
}

```

### to-be
```csharp

public class StageGameManager: GameManager {
    public Button btnNextStage;
}

public class TimeLimitStageGameManager: StageGameManager {
    private float timeLimit = 0;
}

public class AvoidStageGameManager: TimeLimitStageGameManager {
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
