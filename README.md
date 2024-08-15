# GloomyDate

This project is a date calculation library developed by the FE developer [GloomyStore](https://www.gloomy-store.com).

## Usage

It's simple.

### Installation

- **Node.js (ESM)**:
  - Install using `npm i gloomydate`.

- **General HTML Project (MPA)**:
  - Add it using `<script src='https://cdn.gloomy-store.com/gloomyDate/gloomyDate.cjs.js'></script>`.

### How to Use

#### ESM Method

```javascript
import gloomyDate from 'gloomydate';

const result = gloomyDate.date('2022-05-02 14:10:44');
console.log(result); // Expected output: '1년 전'
```

#### MPA Method

```html
<script src='https://cdn.gloomy-store.com/gloomyDate/gloomyDate.js'></script>
<script>
  const result = window.gloomyDate.date('2022-05-02 14:10:44', 'en');
  console.log(result); // Expected output: 'before 1 year'
</script>
```

### Input

- **Supports three input formats**:
  1. String in the format `'2023-04-25 14:55:40'`
  2. String in the format `'20230425145540'`
  3. Int timestamp in the format `1723729654882` (number)
  4. `Date` object (JavaScript Date object)

  Example: `gloomyDate.date('20230425145540')`  // Expected output: '1년 전'
  Example: `gloomyDate.date(new Date())`       // Output for the current time

- **Language Option**:
  - Supports `ko`, `en`, `jp` for three languages. The default output is in Korean if the second argument is not provided.
  - Example: `gloomyDate.date('20230425145540', 'en')`
    Expected output: `1 year ago`

### Output

- **Returns an automatically calculated string**:
  - Formats like `X년 전`, `X달 전`, `X일 전`, `X시간 전`, `X분 전`, `방금 전` in Korean.
  - If you pass `en` or `jp` as the second argument, the output will be in that language.

- **Future Date Handling**:
  - Now, it can handle future dates as well as past dates. Outputs like `1년 후`, `2달 후`, `3일 후` are possible. This is handled automatically by the `gloomyDate.date` function.
  - Example: `gloomyDate.date('2025-08-15 10:00:00')` // Expected output: '1년 후'
  - Example: `gloomyDate.date('2023-10-01 10:00:00')` // Expected output: '1달 전'

### Real-World Usage Example

```javascript
import gloomyDate from 'gloomydate';

const [data, setData] = useState([
  { title: 'title1', date: gloomyDate.date('2022-05-10 10:55:40') },
  { title: 'title2', date: gloomyDate.date('2023-02-11 15:50:30') },
  { title: 'title3', date: gloomyDate.date('2025-08-15 10:00:00') } // Example of a future date
]);

return (
  <div className="list-bg">
    {data.map((e, i) =>
      <div key={i}>
        <p className="date">{e.date}</p> {/* Expected output: '2달 전', '1년 전', '1년 후' */}
      </div>
    )}
  </div>
);
```

### Example of Rendered HTML

```html
<div class="list-bg">
    <p class="date">11달 전</p>
    <p class="date">2달 전</p>
    <p class="date">1년 후</p>
</div>
```

## Getting Started

Install the `gloomydate` module by running `npm install gloomydate` in your terminal.
After installation, start the app with `npm start` or `yarn start`.

---

Now, you can easily use `GloomyDate` in both ESM and MPA environments, and it can handle both past and future dates! 🎉