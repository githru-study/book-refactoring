# 11.5 매개변수를 질의 함수로 바꾸기 - Replace Parameter with Query


## 배경 & 대상 & 방식

매개변수 목록은 함수의 변동요인을 모아놓은 곳이며, 여기에서도 중복을 피하는게 좋음.  
..피호출함수가 스스로 쉽게 결정할 수 있는 값을 매개변수로 건네는 것도 일종의 중복임.  
..다른 매개변수에서 얻을 수 있는 값을 별도 매개변수로 전달하는 것은 아무 의미가 없음.  

(메모1)  
매개변수를 제거하면 값을 결정하는 책임 주체가 달라진다.  
매개변수가 있다면 결정주체가 호출자가 되고, 매개변수가 없다면 피호출함수가 된다.  
호출하는 쪽을 간소하게 함수를 작성한다? → 책임소재를 피호출 함수로 옮긴다!  
매개변수를 복잡하게 함수를 작성한다? → 책임소재를 호출 함수(호스트 코드) 로 옮긴다!  

(메모2)  
매개변수를 제거하면 피호출함수에 원치않는 의존성이 생길때는, 매개변수를 질의함수로 바꾸는것은 적합하지 않음  
ex) 해당함수가 알지 못했으면 하는 요소에 접근해야하는 상황 (=기존 파라미터로 접근할수있는 값이지만, 명시적으로 외부에서 꺼내서 파라미터로 전달해서 숨겨야하는 상황)  

(메모3)  
함수의 참조 투명성(referntial transparency)..?  
함수를 똑같은 값으로 호출하면 항상 똑같이 동작해야 하는 원칙  



## 절차

1) 대상 매개변수의 값을 계산하는 코드를 별도 함수로 추출함
2) 함수 본문에서 해당 매개변수로의 참조를 모두 찾아서 위에서 만든 표현식을 참조하도록 변경함
3) 대상 매개변수를 제거


## 예시1

```typescript
avaliableVacation(employee, employee.grade)

function avaliableVacation(employee: Employee, grade: number) {
    // ...
}
```

↓↓↓

```typescript
avaliableVacation(employee)

function avaliableVacation(employee: Employee) {
    const grade = employee.grade
    // ...
}
```


## 예시2

```typescript
class Product {
    get finalPrice() {
        const basePrice = this.quantity * this.itemPrice
        
        let discountLevel
        if (this.quantity > 100) discountLevel = 2
        else discountLevel = 1

        return this.discountedPrice(basePrice, discountLevel)
    }

    discountedPrice(basePrice: number, discountLevel: 1 | 2) {
        switch (discountLevel) {
            case 1: return basePrice * 0.95;
            case 2: return basePrice * 0.9;
        }
    }
}
```

↓↓↓

```typescript
class Product {
    get finalPrice() {
        const basePrice = this.quantity * this.itemPrice
        return this.discountedPrice(basePrice)
    }

    get discountLevel() {                       // 호스트코드 내 계산식을 내부 표현식으로 분리
        return (this.quantity > 100) ? 2 : 1;
    }

    discountedPrice(basePrice: number) {
        switch (this.discountLevel) {           // 내부 표현식으로 참조 변경
            case 1: return basePrice * 0.95;
            case 2: return basePrice * 0.9;
        }
    }
}
```

---
[목차](../README.md)
