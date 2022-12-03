# 6.1 함수 추출하기 - Extract Function

## 요약 

- 함수 추출은 코드를 독립된 함수로 묶는 것을 말한다. 함수의 목적은 함수의 이름에서 바로 알 수 있어야 하며, 구현되는 부분은 함수 본문 코드에 넣는다.

## 절차

1. 함수를 새로 만들고 목적을 잘 드러내는 이름을 붙인다.'어떻게' 가 아닌 '무엇을' 하는 지가 드러나야 한다.

2. 추출할 코드를 원본 함수에서 복사하여 새 함수에 붙여넣는다.

3. 추출한 코드 중 원본 함수의 지역 변수를 참조하거나 추출한 함수의 유효범위를 벗어나는 변수는 없는지 검사하고, 있다면 새로 생성한 함수에 매개변수로 전달한다.

4. 원본 함수에서 추출한 코드 부분은 새로 만든 함수로 호출한다.

5. 다른 코드에 방금 추출한 것과 똑같거나 비슷한 코드가 없는지 살피고 있다면 추출한 새 함수를 호출하도록 바꿀지 검토한다.

## 예시

## 출처 -> https://school.programmers.co.kr/learn/courses/30/lessons/12977

### 리팩터링 전

```js
function solution(nums) {
    let answer = 0, number=0;
    for(let i=0;i<nums.length-2;i++){
        for(let j=i+1;j<nums.length-1;j++){
            for(let l=j+1;l<nums.length;l++){
                number=nums[i]+nums[j]+nums[l];
                let cnt=0;
                for(let k=1;k<=number;k++){
                    if(number%k==0) cnt++;
                }
                if(cnt==2) answer++;
            }
        }
    }
    return answer;
}
```

### 리팩터링 후

```js
function isprime(n){
    for(var i=2;i<=Math.sqrt(n);i++){
        if(n%i == 0){
            return false;
        }
    }
    return true;    
}
function solution(nums){
    var cnt = 0;
    for(var i=0;i<nums.length-2;i++){
        for(var j=i+1;j<nums.length-1;j++){
            for(var w=j+1;w<nums.length;w++){

                    if(isprime(nums[i]+nums[j]+nums[w])){
                        cnt++;
                    }
            }
        }
    }
    return cnt;
}
```
