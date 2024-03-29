# 📚 [리팩터링 2판](https://product.kyobobook.co.kr/detail/S000001810241) 독서 스터디

| [<img src="https://avatars.githubusercontent.com/kmin-jeong" width="100">](https://github.com/kmin-jeong) | [<img src="https://avatars.githubusercontent.com/ooooorobo" width="100">](https://github.com/ooooorobo) | [<img src="https://avatars.githubusercontent.com/blcklamb" width="100">](https://github.com/blcklamb) | [<img src="https://avatars.githubusercontent.com/anpaul0615" width="100">](https://github.com/anpaul0615) |
| :---------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: |
|                                                [김민정](https://github.com/kmin-jeong)                                                 |                                                 [조예진](https://github.com/ooooorobo)                                                  |                                                 [김채정](https://github.com/blcklamb)                                                  |                                                 [안바울](https://github.com/anpaul0615)                                                  |

- **기간**: 22.11.06 ~ 23.02.26 (예정)
- **매주 일요일 21시**에 온라인으로 진행합니다. (공휴일 제외)
    - ⭐️ 아무리 늦어도 22시 30분에는 종료합니다.
- 발표 담당자는 스터디 시간 전까지 **5개의 기법을 md 파일로** 정리해 올립니다.
    - 기법 당 **요약 / 배경 / 절차 / 예시**를 정리합니다.
      - 예시에 사용되는 언어 -> js(es6) & ts & python, 리액트 등 프레임워크 OK
    - **파일명 규칙**
      - `{기법 번호}) {기법 영어명}.md`
      - 영어 소문자 사용
      - ex) `1) extract-function.md`
    - 정리한 기법은 README 파일의 목차에 추가합니다.
- **발표 순서**: 민정님 → 예진님 → 채정님 → 바울님

## 목차

### CHAPTER 06. 기본적인 리팩터링

| 기법명                                                                                                                                                              | 담당  |
|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------|:---:|
| [1) 함수 추출하기](https://github.com/githru-study/book-refactoring/blob/main/ch06\)%20first-set-of-refactorings/01\)extract-function.md)                              | 김민정 |
| [2) 함수 인라인 하기](https://github.com/githru-study/book-refactoring/blob/main/ch06\)%20first-set-of-refactorings/02\)inline-function.md)                             | 김민정 |
| [3) 변수 추출하기](https://github.com/githru-study/book-refactoring/blob/main/ch06\)%20first-set-of-refactorings/03\)extract-variable.md)                              | 김민정 |
| [4) 변수 인라인 하기](https://github.com/githru-study/book-refactoring/blob/main/ch06\)%20first-set-of-refactorings/04\)inline-variable.md)                             | 김민정 |
| [5) 함수 선언 바꾸기](https://github.com/githru-study/book-refactoring/blob/main/ch06\)%20first-set-of-refactorings/05\)change-function-declaration.md)                 | 김민정 |
| [6) 변수 캡슐화하기](https://github.com/githru-study/book-refactoring/blob/main/ch06\)%20first-set-of-refactorings/06\)%20encapsulate-variable.md)                      | 조예진 |
| [7) 변수 이름 바꾸기](https://github.com/githru-study/book-refactoring/blob/main/ch06\)%20first-set-of-refactorings/07\)%20rename-variable.md)                          | 조예진 |
| [8) 매개변수 객체 만들기](https://github.com/githru-study/book-refactoring/blob/main/ch06\)%20first-set-of-refactorings/08\)%20introduce-parameter-object.md)             | 조예진 |
| [9) 여러 함수를 클래스로 묶기](https://github.com/githru-study/book-refactoring/blob/main/ch06\)%20first-set-of-refactorings/09\)%20combine-functions-into-class.md)        | 조예진 |
| [10) 여러 함수를 변환 함수로 묶기](https://github.com/githru-study/book-refactoring/blob/main/ch06\)%20first-set-of-refactorings/10\)%20combine-functions-into-transform.md) | 조예진 |
| [11) 단계 쪼개기](https://github.com/githru-study/book-refactoring/blob/main/ch06\)%20first-set-of-refactorings/11\)%20split-phase.md)                                | 김채정 |


### CHAPTER 07. 캡슐화

| 기법명                                                                       | 담당  |
|:--------------------------------------------------------------------------|:---:|
| [1) 레코드 캡슐화하기](./ch07\)%20encapsulation/01\)%20encapsulate-record.md)     | 김채정 |
| [2) 컬렉션 캡슐화하기](./ch07\)%20encapsulation/02\)%20encapsulate-collection.md) | 김채정 |
|||
| [5) 클래스 추출하기](./ch07\)%20encapsulation/05\)%20extract-class.md)           | 안바울 |
| [6) 클래스 인라인하기](./ch07\)%20encapsulation/06\)%20inline-class.md)           | 안바울 |
| [7) 위임 숨기기](./ch07\)%20encapsulation/07\)%20hide-delegate.md)             | 안바울 |
| [8) 중개자 제거하기](./ch07\)%20encapsulation/08\)%20remove-middle-man.md)       | 안바울 |
| [9) 알고리즘 교체하기](./ch07\)%20encapsulation/09\)%20substitute-algorithm.md)   | 안바울 |

### CHAPTER 08. 기능 이동

| 기법명                                                                                    |담당|
|:---------------------------------------------------------------------------------------|:----:|
|||
| [6) 문장 슬라이드하기](./ch08\)%20moving-features/06\)%20slide-statements.md)                  | 조예진 |
| [7) 반복문 쪼개기](./ch08\)%20moving-features/07\)%20split-loop.md)                          | 조예진 |
| [8) 반복문을 파이프라인으로 바꾸기](./ch08\)%20moving-features/08\)%20replace-loop-with-pipeline.md) | 조예진 |
| [9) 죽은 코드 제거하기](./ch08\)%20moving-features/09\)%20remove-dead-code.md)                 | 조예진 |

### CHAPTER 09. 데이터 조직화

| 기법명                                                          | 담당  |
|:-------------------------------------------------------------|:---:|
| [1) 변수 쪼개기](./ch09\)%20organizing-data/01\)%20split-variable.md) | 조예진 |
