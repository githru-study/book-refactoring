# 11.10 명령을 함수로 바꾸기

# 배경
- 로직이 복잡하지 않아서 명령이 필요없을 때 복잡성을 줄이기 위해서 함수로 바꿔준다

# 기법을 사용할 때 나타나는 효과 & 적용하는 시점
- 명령을 사용할 만큼 로직이 복잡하지 않을 때 적용한다

# 절차
1. 명령을 생성하는 코드와 명령의 실행 메서드를 호출하는 코드(예시에서는 class이다)를 함수로 추출한다
2. 실행함수가 호출하는 보조 메서드를 인라인한다(예시처럼 값을 반환한다면 변수로 추출한 후에 진행한다)
3. 생성자의 매개 변수를 실행 메서드로 옮기고, 참조하는 필드대신 매개 변수를 사용할 수 있게 수정한다
4. 생성자 호출과 명령의 실행 메서드 호출을 함수 안으로 인라인 해준 후 사용하지 않는 코드들은 전부 지운다. 


# 예시

## 리팩토링 전 코드

```js
Class ChargeCalculator{
    constructor(customer,usage,provider){
        this._customer = customer;
        this._usage = usage;
        this._provider = provider;
    }
    get baseCharge(){
        return this._customer.baseRate*this._usage;
    }
    get Charge(){
        return this.baseCharge+this._provider.connectionCharge;
    }
}

// 호출자
monthCharge = new ChargeCalculator(customer,usage,provider).charge;
```

## 리팩토링 과정 코드
```js
    function charge(customer,usage,provider){
        return new ChargeCalculator(customer,usage,provider).charge; //위에서 class를 생성하고 호출하는 부분을 함수로 추출함
    }
    //호출자
    monthCharge = charge(customer,usage,provider);
```
```js
    get baseCharge(){//보조 메서드
        return this._customer.baseRate*this._usage;
    }
    get Charge(){
       const baseCharge = this.baseCharge;//반환하는 값(baseCharge)을 변수로 지정
       return baseCharge + this._provider.connectionCharge;
    }

  //인라인 후
  get Charge(){
       const baseCharge = this._customer.baseRate*this._usage;//위에 있는 보조메서드를 인라인 함
       return baseCharge + this._provider.connectionCharge;
    }
  
```
```js
    constructor(customer,usage,provider){
        this._customer = customer;
        this._usage = usage;
        this._provider = provider;
    }// 이 부분을 charge로 옮긴다 -> 

    function charge(customer,usage,provider){
        return new ChargeCalculator(customer,usage,provider)
        .charge(customer,usage,provider)//함수에서는 이부분으로 적용이 된다
    }

    charge(customer,usage,provider){
       const baseCharge = this._customer.baseRate*this._usage;
       return baseCharge + this._provider.connectionCharge;
    }
```
```js
//charge에서 위에 있는 constuctor에서 받은 매개 변수를 직접 사용할 수 있게 한다
//constructor(c,u,p){}제거 한다

    charge(customer,usage,provider){
       const baseCharge = customer.baseRate*usage;
       return baseCharge + provider.connectionCharge;
    }
// 이렇게 고친 후에 최상위 charge함수로 인라인하고, class는 사용안하니까 지운다
```
## 리팩토링 최종 코드
```js
     function charge(customer,usage,provider){
        const baseCharge = customer.baseRate * usage;
        return baseCharge + provider.connectionRate;
     }
```