# 6.9. 여러 함수를 클래스로 묶기 - Combine Functions into Class

## 요약

클래스를 활용해 데이터와 함수를 한 곳에 묶기

## 배경

어떤 데이터 뭉치를 공통으로 사용하는 함수가 여러개 있다면, 클래스로 데이터와 함수를 묶을 수 있다. 클래스로 묶으면 함수들이 공유하는 공통 환경을 명확히 표현할 수 있고, 클래스가 데이터를 가지고 있기 때문에 함수에 전달하는 인수를 줄일 수 있다.

클래스로 데이터와 함수를 묶으면 파생 객체를 일관되게 관리할 수 있다. 데이터와 관련된 함수가 한 곳에서 관리되기 때문에, 이미 함수가 있다는 것을 모르고 유사한 로직을 다시 작성하는 것을 방지할 수 있다.

## 대상

- 공통 데이터 레코드가 있고, 이와 관련된 함수가 여러 개일 경우
- 어떤 데이터 레코드를 활용한 비슷한 로직이 많을 경우
- 위의 상황에 해당하면서, 데이터가 갱신될 수 있는 경우 (가변적인 데이터를 다루는 경우)

## 절차

1. 함수에서 사용되는 공통 데이터 레코드를 캡슐화한다
2. 공통 레코드를 사용하는 함수를 클래스로 옮긴다
3. 데이터를 조작하는 로직을 함수로 추출한다

## 예시