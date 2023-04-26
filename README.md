# GloomyDate

이 프로젝트는 FE개발자 [GloomyStore](https://www.gloomy-store.com)의 날짜구하기 라이브러리 입니다.

## 사용법

간단합니다.

* `설치`

    * `npm i gloomydate`로 설치합니다 \
    일반 HTML 프로젝트의 경우  `<script src='https://cdn.gloomy-store.com/gloomyDate/gloomyDate.js'></script>`로 추가합니다.

* `사용`

    * `import {gloomyDate} from gloomydate` \
    로 글루미데이트를 임포트합니다.
    * `gloomyDate.date('2022-05-02 14:10:44')` 를 입력할 경우, `1년 전`이 return됩니다.

* `input`
    * **세 가지 방식**입니다. 세 형태중 아무형태로 넣어도 날짜가 반환됩니다.
    1. `'2023-04-25 14:55:40'` 형태의 string 
    2. `'20230425145540'` 형태의 string
    3. `20230425145540` 형태의 number\
    예) gloomyDate.date('20230425145540')` // 1년 전
    * `외국어 인자`
        * `ko, en, jp` 총 3개 국어에 대응합니다.
    * gloomyDate.date('20230425145540', `'en'`)\
    예상 output) `1 years ago`

* `output`

    * X년 전, X달 전, X일 전, X시간 전, X분 전, 방금 전으로 \
    자동으로 계산된 string의 return 합니다. 
        \
    영어, 외국어 인자인 en, 혹은 jp를 2번 째 인자로 넣을 경우 외국어로 출력 됩니다.

* `실제 사용 사례`
```js
import {gloomyDate} from gloomydate
const [data,setData] = useState([{ title: 'title1', date: '2022-05-10 10:55:40'}, { title: 'title2', date: '2023-02-11 15:50:30'}])
useEffect(()=>{
    const newData = [...data]
    newData.forEach(e=> e.date = gloomyDate.date(e.date))
    setData(newData)
},[])


<div className="list-bg">
    {
      data.map((e,i)=>
        <div key={i}>
          <p className="date">{e.date}</p> {/* expected: 2달 전 */}
        </div>
      )
    }

</div>

```
* 실제로 렌더된 HTML
```js
<div class="list-bg">
    <p class="date">11달 전</p> 
    <p class="date">2달 전</p> 
</div>
```

## 시작

터미널상에서 `npm install gloomydate` 명령어로 node module을 설치하십시오.\
그 후 `npm start` 혹은 `yarn start` 등으로 앱을 시작하십시오.