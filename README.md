# GloomyDate

이 프로젝트는 FE개발자 [GloomyStore](https://www.gloomy-store.com)의 날짜 계산 라이브러리입니다.

## 사용법

간단합니다.

### 설치

- **Node.js (ESM)**:
  - `npm i gloomydate`로 설치합니다.

- **일반 HTML 프로젝트 (MPA)**:
  - `<script src='https://cdn.gloomy-store.com/gloomyDate/gloomyDate.cjs.js'></script>`로 추가합니다.

### 사용

#### ESM 방식

```javascript
import gloomyDate from 'gloomydate';

const result = gloomyDate.date('2022-05-02 14:10:44');
console.log(result); // 예상 출력: '1년 전'
```

#### MPA 방식

```html
<script src='https://cdn.gloomy-store.com/gloomyDate/gloomyDate.js'></script>
<script>
  const result = window.gloomyDate.date('2022-05-02 14:10:44');
  console.log(result); // 예상 출력: '1년 전'
</script>
```

### 입력 (Input)

- **세 가지 입력 방식**을 지원합니다:
  1. `'2023-04-25 14:55:40'` 형태의 문자열 (string)
  2. `'20230425145540'` 형태의 문자열 (string)
  3. `20230425145540` 형태의 숫자 (number)
  4. `Date` 객체 (JavaScript Date 객체)

  예) `gloomyDate.date('20230425145540')`  // 예상 출력: '1년 전'
  예) `gloomyDate.date(new Date())`       // 현재 시간에 대한 결과

- **외국어 인자**:
  - `ko`, `en`, `jp` 총 3개 국어에 대응합니다.
  - 예) `gloomyDate.date('20230425145540', 'en')`
    예상 출력: `1 years ago`

### 출력 (Output)

- **자동으로 계산된 문자열**을 반환합니다:
  - `X년 전`, `X달 전`, `X일 전`, `X시간 전`, `X분 전`, `방금 전` 등의 형식
  - 2번째 인자로 `en` 또는 `jp`를 넣으면 해당 언어로 출력됩니다.

### 실제 사용 사례

```javascript
import gloomyDate from 'gloomydate';

const [data, setData] = useState([
  { title: 'title1', date: '2022-05-10 10:55:40' },
  { title: 'title2', date: '2023-02-11 15:50:30' }
]);

useEffect(() => {
  const newData = [...data];
  newData.forEach(e => e.date = gloomyDate.date(e.date));
  setData(newData);
}, []);

return (
  <div className="list-bg">
    {data.map((e, i) =>
      <div key={i}>
        <p className="date">{e.date}</p> {/* 예상 출력: '2달 전' */}
      </div>
    )}
  </div>
);
```

### 실제로 렌더된 HTML 예시

```html
<div class="list-bg">
    <p class="date">11달 전</p>
    <p class="date">2달 전</p>
</div>
```

## 시작하기

터미널에서 `npm install gloomydate` 명령어로 `gloomydate` 모듈을 설치하십시오.
설치 후, `npm start` 또는 `yarn start` 명령어로 앱을 시작하십시오.

---

이제 `GloomyDate`를 ESM 환경과 MPA 환경 모두에서 쉽게 사용할 수 있습니다! 🎉