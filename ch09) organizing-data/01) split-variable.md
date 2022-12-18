# 9.1.변수 쪼개기 split variable

## 요약

역할을 두 개 이상 가지는 변수 쪼개기

## 배경

변수 하나는 역할 하나만 가져야 한다. 반복문을 돌 때 사용하는 루프 변수나 메서드 동작 중 값을 저장하기 위한 수집 변수 외에는 값이 단 한 번만 할당돼야 한다. 두 번 이상 할당된다면 그 변수의 역할이 하나가 아니라는 의미이다. 변수가 역할을 여러개 가지면 읽는 사람에게 혼란을 주기 때문에, 변수 하나 당 역할 하나만 가지도록 쪼개야 한다.

## 대상

- 역할이 둘 이상인 변수
- 대입이 두 번 이상 이뤄지는 변수
- 입력 파라미터의 값을 수정하는 경우

## 절차

1. 변수를 선언하고 처음 값을 할당한 부분의 이름을 바꾼다
    1. 가능한 불변으로 선언한다
2. 두 번째 할당하는 부분에서 원래 이름으로 변수를 선언한다
3. 마지막 할당까지 1~2를 반복한다

## 예시

as-is (책에서 리팩터링 한 번 거친 후) + 재할당 없는 변수 const로 설정

```tsx
interface Scenario {
  mass: number;
  primaryForce: number;
  secondaryForce: number;
  delay: number;
}

/**
 * 1. 초기 힘을 받아 일정한 가속도로 전파
 * 2. delay 후에 두 번째 힘을 받음
 * => 이동 거리는?
 * @param scenario
 * @param time
 * @return 이동 거리
 */
function distanceTrabelled(scenario: Scenario, time: number): number {
  let result;
  const primaryAcceleration = scenario.primaryForce / scenario.mass;
  const primaryTime = Math.min(time, scenario.delay);
  result = 0.5 * primaryAcceleration * primaryTime * primaryTime;
  const secondaryTime = time - scenario.delay;
  if (secondaryTime > 0) {
    const primaryVelocity = primaryAcceleration * scenario.delay;
    const secondaryAcceleration =
      (scenario.primaryForce + scenario.secondaryForce) / scenario.mass;
    result +=
      primaryVelocity * secondaryTime +
      0.5 * secondaryAcceleration * secondaryTime * secondaryTime;
  }
  return result;
}
```

1. 첫 번째 계산 후, 두 번째 힘으로 생긴 거리 계산하지 않는다면 바로 return

```tsx
function distanceTrabelled(scenario: Scenario, time: number): number {
  let result;

  const primaryAcceleration = scenario.primaryForce / scenario.mass;
  const primaryTime = Math.min(time, scenario.delay);
  result = 0.5 * primaryAcceleration * primaryTime * primaryTime;

  const secondaryTime = time - scenario.delay;
  if (secondaryTime === 0) return result;

  const primaryVelocity = primaryAcceleration * scenario.delay;
  const secondaryAcceleration =
    (scenario.primaryForce + scenario.secondaryForce) / scenario.mass;
  result +=
    primaryVelocity * secondaryTime +
    0.5 * secondaryAcceleration * secondaryTime * secondaryTime;
  return result;
}
```

2. 첫 번째로 선언한 result의 이름을 바꾸고, 인라인

```tsx
function distanceTrabelled(scenario: Scenario, time: number): number {
  const primaryAcceleration = scenario.primaryForce / scenario.mass;
  const primaryTime = Math.min(time, scenario.delay);
  const primaryDistance = 0.5 * primaryAcceleration * primaryTime * primaryTime;

  const secondaryTime = time - scenario.delay;
  if (secondaryTime === 0) return primaryDistance;

  const primaryVelocity = primaryAcceleration * scenario.delay;
  const secondaryAcceleration =
    (scenario.primaryForce + scenario.secondaryForce) / scenario.mass;
  const result =
    primaryDistance +
    primaryVelocity * secondaryTime +
    0.5 * secondaryAcceleration * secondaryTime * secondaryTime;
  return result;
}
```

3. 변수 인라인 한 번 더

```tsx
function distanceTrabelled(scenario: Scenario, time: number): number {
  const primaryAcceleration = scenario.primaryForce / scenario.mass;
  const primaryTime = Math.min(time, scenario.delay);
  const primaryDistance = 0.5 * primaryAcceleration * primaryTime * primaryTime;

  const secondaryTime = time - scenario.delay;
  if (secondaryTime === 0) return primaryDistance;

  const primaryVelocity = primaryAcceleration * scenario.delay;
  const secondaryAcceleration =
    (scenario.primaryForce + scenario.secondaryForce) / scenario.mass;
  return (
    primaryDistance +
    primaryVelocity * secondaryTime +
    0.5 * secondaryAcceleration * secondaryTime * secondaryTime
  );
}
```
