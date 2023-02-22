# 11.6 질의 함수를 매개변수로 바꾸기

# 배경

- 함수 안에서 전역 변수를 참조하거나, 제거 대상인 원소를 참조할 때 원소를 매개변수로 바꾸어서 사용한다.

# 기법을 사용할 때 나타나는 효과

- 똑같은 값을 건네면 매번 똑같은 결과를 내는 함수라서 다루기 쉽다(참조 투명성).
- https://stackoverflow.com/questions/210835/what-is-referential-transparency

- 모듈을 개발할 때 순수 함수를 따로 구분하고, 프로그램의 입출력과 기타 가변 원소들을 다루는 로직으로 순수 함수들의
  겉은 감싸는 패턴을 사용한다.
- ※순수함수 -> 동일한 인자를 가지고 있을 때 동일한 결과를 반환하고, 외부의 상태를 변경하지 않는 함수이다.
- https://en.wikipedia.org/wiki/Pure_function

# 적용하는 시점

- 함수에서 투명하지 않은 원소에 접근할 때 사용한다

# 절차

1. 질의 코드를 함수의 나머지 코드와 분류한 후, 질의 코드를 사용하지 않는 부분들을 함수로 따로 추출한다
2. 만든 변수를 인라인 하여 제거 후, 원래 함수를 인라인 한다

# 예시

## 리팩토링 전 코드

```js
class HeatingPan(){
get targetTemperature(){
    if (thermostat.selectedTemperature > this._max) return this._max;
    else if (thermostat.selectedTemperature < this._min) return this._min;
    else return thermostat.selectedTemperature;
}
}

if (thePlan.targetTemperature > thermostat.currentTemperature) setToHeat();
else if(thePlan.targetTemperature < thermostat.currentTemperature) setToCool();
else setOff();

```

## 리팩토링 과정 코드

```js
get targetTemperature(){
    const selectedTemperature = thermostat.selectedTemperature; //제거 대상인 원소를 변수로 지정해줌
    return this. TargetTemperature(selectedTemperature);
}

TargetTemperature(selectedTemperature){     //질의코드를 사용하지 않는 부분들은 따로 분리해서 함수로 만들어줌
    if (selectedTemperature> this._max) return this._max;
    else if (selectedTemperature < this._min) return this._min;
    else return selectedTemperature;
}
```

```js
// 추출한 변수를 인라인 하여 지우고, 밑에 있는 호출자도 인라인해준다
get targetTemperature(){
    return this. TargetTemperature(thermostat.selectedTemperature); // 이 부분에 분리한 부분들을 TargetTemperature(selectedTemperature) 안에 있는 부분들을 다시 채워준다
}

if (thePlan.targetTemperature(thermostat.selectedTemperature) >
thermostat.currentTemperature)
    setToHeat();
else if(thePlan.targetTemperature(thermostat.selectedTemperature) < thermostat.currentTemperature)
    setToCool();
else
    setOff();

```

## 리팩토링 최종 코드

```js
class HeatingPan(){
    get TargetTemperature(selectedTemperature){
    if (selectedTemperature> this._max) return this._max;
    else if (selectedTemperature < this._min) return this._min;
    else return selectedTemperature;
}
}

if (thePlan.targetTemperature(thermostat.selectedTemperature) >
thermostat.currentTemperature)
    setToHeat();
else if(thePlan.targetTemperature(thermostat.selectedTemperature) < thermostat.currentTemperature)
    setToCool();
else
    setOff();
```
