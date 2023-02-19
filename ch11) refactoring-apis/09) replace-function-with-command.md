# 11.9 함수를 명령으로 바꾸기 - Replace Function with Command


## 배경 & 대상 & 방식

함수를 명령객체(Command) 로 재구성하여 사용 (=커맨드패턴)  

※ CQRS 에서의 Command 와는 조금 의미가 다름  
=> CQRS : 객체의 겉보기 상태를 변경하는 메서드  
=> Command Pattern : 함수 요청을 캡슐화 한 객체  

※ 일급함수를 지원하는 프로그래밍언어에서는(like js, kotlin, java8, ...) 굳이 커맨드패턴을 사용하지 않아도 함수자체를 전달할 수 있음  
=> but, Command객체로 만들어서 복잡한 함수를 작은 단위로 리팩토링하면 가독성이나 테스트 면에서 더 나을수도 있음  
=> 그밖에 커맨드패턴을 사용했을때 더 나은 경우 있을 수 있음  



## 절차

1) 대상 함수의 기능을 옮길 Command클래스를 작성  
2) 함수 내용을 클래스 안쪽으로 이동  
3) 함수 파라미터를 클래스 생성자로 이동  



## 예시1

```typescript
interface Candidate { originState: unknown }
interface MedicalExam { isSmoker: boolean }
interface ScoringGuide {
    stateWithLowCertification(state: Candidate['originState']): boolean {}
}

// 선언부
function score(candidate: Candidate, medicalExam: MedicalExam, scoringGuide: ScoringGuide) {
    // ...

    if ( scoringGuide.stateWithLowCertification(candidate.originState) ){
        // LowCertification이면, ~~~~ 해라~~
    }
}

// 실행부
const scoringGuide: ScoringGuide = { /* ... */ }
const candidate = { originState:1 }
const medicalExam = { isSmoker: false }

const scoreResult = score(candidate, medicalExam, scoringGuide)
```

↓↓↓

```typescript
interface Candidate { originState: unknown }
interface MedicalExam { isSmoker: boolean }
interface ScoringGuide {
    stateWithLowCertification(state: Candidate['originState']): boolean {}
}

// 선언부
interface Command {
    public execute(): void
}
class Scorer implements Command {
    constructor(candidate: Candidate, medicalExam: MedicalExam, scoringGuide: ScoringGuide) {
        // 함수 파라미터
    }

    public execute(): void {
        // 함수가 하는일
        // ...
    }
}

// 실행부
const scoringGuide: ScoringGuide = { /* ... */ }
const candidate = { originState:1 }
const medicalExam = { isSmoker: false }

const scorer = new Scorer(candidate, medicalExam, scoringGuide)
scorer.execute()
```


## 예시2

```typescript
class Score implements Command { /* ... */ }
class Refund implements Command { /* ... */ }
class Surcharge implements Command { /* ... */ }
class CommandExecutor {
    public static executeAll(commands: Command[]) {
        for (const cmd of this.commands) {
            cmd.execute()
        }
    }
}

const scores: Score[] = [ new Score(...candidate1), new Score(...candidate2), new Score(...candidate3), ... ]
CommandExecutor.executeAll([
    ...scores,  // 대상자 요율점수 계산하고
    refund,     // 반환할꺼 반환하고
    surcharge,  // 추징할꺼 추징하고
])
```


## 예시3

```typescript
class Action {
  public commit() {}
  public rollback() {}
}

class DrawAction extends Action {}
class ImageAction extends Action {}
class TextAction extends Action {}

const actionQueue: Action[] = [ commit1, commit2, /* rollback */ commit4 ]
```


---
[목차](../README.md)
