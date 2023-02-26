# 11.12 오류 코드를 예외로 바꾸기 - Replace Error Code with Exception

## 요약

## 배경 & 대상

예외를 사용하면 오류 코드를 일일이 검사하거나 오류를 식별해 콜스택 위로 던지는 일을 신경 쓰지 않아도 된다.

예외에는 독자적인 흐름이 있어서 프로그램의 나머지에서는 오류 발생에 따른 복잡한 상황에 대처하는 코드를 작성하거나 읽을 일이 없게 해준다.

## 대상

예외는 정확히 예상 밖의 동작일 때만 쓰여야 한다. 즉, 프로그램의 정상 동작 범주에 들지 않는 오류를 나타낼 때만 쓰여야 한다. 예외를 던지는 코드를 프로그램 종료 코드로 바꿔도 프로그램이 여전히 정상 동작할지를 따져보는 것이다. 정상 동작하지 않을 것 같다면 예외를 사용하지 말라는 신호이다.

## 절차

1. 콜스택 사우이에 해당 예외를 처리할 예외 핸들러를 작성한다.
2. 해당 오류 코드를 대체할 예외와 그 밖의 예외를 구분할 식별 방법을 찾는다.
3. catch절을 수정하여 직접 처리할 수 있는 예외는 적절히 대처하고 그렇지 않은 예외는 다시 던진다.
4. 오류 코드를 반환하는 곳 모두에서 예외를 던지도록 수정한다.
5. 모두 수정했다면 그 오류 코드를 콜스택 위로 전달하는 코드를 모두 제거한다.

## 예시

### as-is

```ts
type TCountry =
  | "KOREA"
  | "JAPAN"
  | "CHINA"
  | "AUSTRAILIA"
  | "USA"
  | "THAILAND"
  | "CANADA"
  | "ENGLAND";
type TShippingRule =
  | "Different bait is used to catch different fish."
  | "Always disconnect the power supply before changing the light bulb."
  | "Loosen any equipment you may need to jettison in a hurry."
  | "Acceptable for a vegetarian diet"
  | "Don't forget to take your anti-malaria tablets before, during and after your trip."
  | "What goes up must come down."
  | "The timer can be set up to 7 days in advance."
  | "Look where you are going, not where your skis are pointing.";
type TProduct =
  | "bike seat"
  | "piggy bank"
  | "usb key"
  | "crib"
  | "shelf"
  | "basket"
  | "telephone";
type TAmount = number;
type CountryData = { shippingRules: { [key in TCountry]: TShippingRule } };
type OrderData = { country: TCountry; product: TProduct; amount: TAmount };

const countryData: CountryData = {
  shippingRules: {
    KOREA: "Different bait is used to catch different fish.",
    JAPAN: "Always disconnect the power supply before changing the light bulb.",
    CHINA: "Loosen any equipment you may need to jettison in a hurry.",
    AUSTRAILIA: "Acceptable for a vegetarian diet",
    USA: "Don't forget to take your anti-malaria tablets before, during and after your trip.",
    THAILAND: "What goes up must come down.",
    CANADA: "The timer can be set up to 7 days in advance.",
    ENGLAND: "Look where you are going, not where your skis are pointing.",
  },
};

class ShippingRules {
  rule: TShippingRule;
  constructor(rule: TShippingRule) {
    this.rule = rule;
  }

  get shippingRule() {
    return this.rule;
  }
}

const localShippingRules = (country: TCountry): ShippingRules | number => {
  const data = countryData.shippingRules[country];
  if (data) return new ShippingRules(data);
  else return -23;
};

const calculateShippingCosts = (anOrder: OrderData) => {
  // 관련 없는 코드

  const shippingRules = localShippingRules(anOrder.country);
  if (typeof shippingRules === "number" && shippingRules < 0)
    return shippingRules; // 오류 전파
  else {
    return shippingRules;
  }
  // 더 관련 없는 코드
};

const index = () => {
  const shippingCountry: TCountry[] = [
    "KOREA",
    "JAPAN",
    "CHINA",
    "AUSTRAILIA",
    "USA",
    "THAILAND",
    "CANADA",
    "ENGLAND",
  ];

  const orderDataList: OrderData[] = [
    {
      country: "AUSTRAILIA",
      product: "piggy bank",
      amount: 10,
    },
    { country: "ENGLAND", product: "basket", amount: 200 },
  ];
  const errorList: { order: OrderData; errorCode: number | ShippingRules }[] =
    [];
  orderDataList.map((singleOrder) => {
    const status = calculateShippingCosts(singleOrder);
    if (status < 0) errorList.push({ order: singleOrder, errorCode: status });
    if (Math.random() < 0.5)
      errorList.push({ order: singleOrder, errorCode: 12 });
  });

  return errorList;
};

export default index;
```

### to-be

```ts
// typing과 data는 생략

class ShippingRules {
  rule: TShippingRule;
  constructor(rule: TShippingRule) {
    this.rule = rule;
  }

  get shippingRule() {
    return this.rule;
  }
}

class OrderProcessingError extends Error {
  code: number;
  constructor(errorCode: number) {
    super(`주문 처리 오류: ${errorCode}`);
    this.code = errorCode;
  }
  get name() {
    return "OrderProcessingError";
  }
}

const localShippingRules = (country: TCountry): ShippingRules | number => {
  const data = countryData.shippingRules[country];
  if (data) return new ShippingRules(data);
  else throw new OrderProcessingError(-23);
};

const calculateShippingCosts = (anOrder: OrderData) => {
  // 관련 없는 코드

  const shippingRules = localShippingRules(anOrder.country);
  if (typeof shippingRules === "number" && shippingRules < 0)
    return shippingRules; // 오류 전파
  else {
    return shippingRules;
  }
  // 더 관련 없는 코드
};

const index = () => {
  const orderDataList: OrderData[] = [
    {
      country: "AUSTRAILIA",
      product: "piggy bank",
      amount: 10,
    },
    { country: "ENGLAND", product: "basket", amount: 200 },
  ];
  const errorList: { order: OrderData; errorCode: number | ShippingRules }[] =
    [];
  orderDataList.map((singleOrder) => {
    try {
      calculateShippingCosts(singleOrder);
    } catch (e) {
      if (e instanceof OrderProcessingError) {
        errorList.push({ order: singleOrder, errorCode: e.code });
      } else {
        throw e;
      }
    }
  });

  return errorList;
};

export default index;
```
