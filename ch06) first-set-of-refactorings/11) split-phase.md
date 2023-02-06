# 6.11. 단계 쪼개기 - Split Phase

## 요약

서로 다른 두 대상을 다루는 코드를 각각 별개의 모듈로 나누기

## 배경

코드를 수정해야할 때 두 대상을 동시에 생각할 필요 없이 하나에만 집중하기 위해서다.

## 대상

- 서로 다른 두 대상을 다루는 코드가 있을 때
- 입력이 처리 로직에 적합하지 않은 형태로 들어올 때
- 덩치가 큰 소프트웨어일 때

## 절차

(처리 단계가 두 가지가 있다고 가정)

1. 두 번째 단계에 해당하는 코드를 독립 함수로 추출한다.
2. 중간 데이터 구조를 만들어서 앞에서 추출한 함수의 인수로 추가한다.
3. 추출한 두 번째 단계 함수의 매개변수를 하나씩 검토한다. 그 중 첫 번째 단계에서 사용되는 것은 중간 데이터 구조로 옮긴다.
   1. 두 번째 단계에서 사용하면 안 되는 매개변수가 있을 때는 각 매개변수를 사용한 결과를 중간 데이터 구조의 필드로 추출하고, 이 필드의 값을 설정하는 문장을 호출한 곳으로 옮긴다.
4. 첫 번째 단계 코드를 함수로 추출하면서 중간 데이터 구조를 반환하도록 만든다.
   1. 이때 첫 번째 단계를 변환기 객체로 추출해도 좋다.

## 예시

### as-it

```typescript
interface Props {
  product: {
    basePrice: number;
    discountThreshold: number;
    discountRate: number;
  };
  quantity: number;
  shippingMethod: {
    discountThreshold: number;
    discountedFee: number;
    feePerCase: number;
  };
}

const mockData = {
  product: {
    basePrice: 15000,
    discountThreshold: 1000,
    discountRate: 70,
  },
  quantity: 500,
  shippingMethod: {
    discountThreshold: 200,
    discountedFee: 10,
    feePerCase: 50,
  },
};

const priceOrder = ({ product, quantity, shippingMethod }: Props) => {
  const basePrice = product.basePrice * quantity;
  const discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;
  const shippingPerCase =
    basePrice > shippingMethod.discountThreshold
      ? shippingMethod.discountedFee
      : shippingMethod.feePerCase;
  const shippingCost = quantity * shippingPerCase;
  const price = basePrice - discount + shippingCost;
  return price;
};
```

### to-be

```typescript
interface Props {
  product: {
    basePrice: number;
    discountThreshold: number;
    discountRate: number;
  };
  quantity: number;
  shippingMethod: {
    discountThreshold: number;
    discountedFee: number;
    feePerCase: number;
  };
}

interface ShipppingProps {
  priceData: {
    basePrice: number;
    quantity: number;
    discount: number;
  };
  shippingMethod: {
    discountThreshold: number;
    discountedFee: number;
    feePerCase: number;
  };
}

interface PriceDataProps {
  product: {
    basePrice: number;
    discountThreshold: number;
    discountRate: number;
  };
  quantity: number;
}

const mockData = {
  product: {
    basePrice: 15000,
    discountThreshold: 1000,
    discountRate: 70,
  },
  quantity: 500,
  shippingMethod: {
    discountThreshold: 200,
    discountedFee: 10,
    feePerCase: 50,
  },
};

const priceOrder = ({ product, quantity, shippingMethod }: Props) => {
  const priceData = calculatePricingData({ product, quantity });
  return applyShipping({
    priceData,
    shippingMethod,
  });
};

function calculatePricingData({ product, quantity }: PriceDataProps) {
  const basePrice = product.basePrice * quantity;
  const discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;
  return { basePrice: basePrice, quantity: quantity, discount: discount };
}

const applyShipping = ({ priceData, shippingMethod }: ShipppingProps) => {
  const shippingPerCase =
    priceData.basePrice > shippingMethod.discountThreshold
      ? shippingMethod.discountedFee
      : shippingMethod.feePerCase;
  const shippingCost = priceData.quantity * shippingPerCase;
  return priceData.basePrice - priceData.discount + shippingCost;
};
```
