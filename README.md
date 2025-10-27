# GloomyDate

[![npm version](https://img.shields.io/npm/v/gloomydate.svg)](https://www.npmjs.com/package/gloomydate)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/gloomydate)](https://bundlephobia.com/package/gloomydate)

A lightweight, zero-dependency date utility library for converting dates into human-readable relative time strings. Perfect for displaying timestamps in social media feeds, comment sections, and real-time applications.

Developed by [GloomyStore](https://www.gloomy-store.com) 🚀

## ✨ Features

- 🌍 **Multi-language Support**: English, Korean, and Japanese
- 📅 **Universal Date Format Support**: Handles ISO 8601, Unix timestamps, custom formats, and more
- ⚡ **Lightning Fast**: Zero dependencies, minimal bundle size
- 🔮 **Past & Future Dates**: Automatically handles both historical and upcoming dates
- 🎯 **TypeScript Ready**: Full TypeScript support with type definitions
- 🌐 **Universal**: Works in Node.js, browsers, and all modern frameworks (React, Vue, Svelte, etc.)

## 📦 Installation

### Node.js (ESM/CommonJS)

```bash
npm install gloomydate
# or
yarn add gloomydate
# or
pnpm add gloomydate
```

### CDN (Browser)

```html
<!-- Latest version -->
<script src="https://cdn.gloomy-store.com/gloomyDate/gloomyDate.js"></script>

<!-- CommonJS version -->
<script src="https://cdn.gloomy-store.com/gloomyDate/gloomyDate.cjs.js"></script>
```

## 🚀 Quick Start

### ESM (Modern JavaScript)

```javascript
import gloomyDate from "gloomydate"

const result = gloomyDate.date("2022-05-02 14:10:44", "en")
console.log(result) // "2 years ago"
```

### CommonJS (Node.js)

```javascript
const gloomyDate = require("gloomydate")

const result = gloomyDate.date(new Date(), "en")
console.log(result) // "now"
```

### Browser (Global)

```html
<script src="https://cdn.gloomy-store.com/gloomyDate/gloomyDate.js"></script>
<script>
  const result = window.gloomyDate.date("2024-10-27T10:30:00Z", "en")
  console.log(result) // "3 days ago"
</script>
```

## 📖 API Reference

### `gloomyDate.date(input, lang?)`

Converts a date into a human-readable relative time string.

#### Parameters

- **input** (required): `number | string | Date`
  - The date/time to convert
- **lang** (optional): `'en' | 'ko' | 'jp'`
  - Language for output (default: `'en'`)

#### Returns

- `string`: Formatted relative time string
- Returns original input if parsing fails

## 🎯 Supported Input Formats

GloomyDate supports virtually **all common date formats**:

### ISO 8601 Standard Formats

```javascript
gloomyDate.date("2022-12-12T10:10:10Z", "en") // ✅ With UTC timezone
gloomyDate.date("2022-12-12T10:10:10", "en") // ✅ Without timezone
gloomyDate.date("2022-12-12T10:10:10.000", "en") // ✅ With milliseconds
gloomyDate.date("2022-12-12T10:10:10.000Z", "en") // ✅ Full ISO format
gloomyDate.date("2022-12-12T10:10:10+09:00", "en") // ✅ With timezone offset
```

### Custom Formats

```javascript
gloomyDate.date("20221212101010", "en") // ✅ YYYYMMDDHHMMSS (14 digits)
gloomyDate.date("2022-12-12 10:10:10", "en") // ✅ Legacy format
gloomyDate.date("2022-12-12", "en") // ✅ Date only
gloomyDate.date("2022/12/12", "en") // ✅ Slash format
gloomyDate.date("12/12/2022", "en") // ✅ US format
```

### Natural Language

```javascript
gloomyDate.date("December 17, 2024", "en") // ✅ Full text
gloomyDate.date("Dec 17 2024", "en") // ✅ Abbreviated
```

### Unix Timestamps

```javascript
gloomyDate.date(1671696610000, "en") // ✅ Milliseconds (13 digits)
gloomyDate.date(1671696610, "en") // ✅ Seconds (10 digits)
```

### JavaScript Date Objects

```javascript
gloomyDate.date(new Date(), "en") // ✅ Current date
gloomyDate.date(new Date("2022-12-12"), "en") // ✅ Specific date
```

## 🌍 Multi-Language Support

### English (en)

```javascript
gloomyDate.date("2023-10-27 12:00:00", "en")
// Past: "1 year ago", "2 months ago", "7 days ago", "5 hours ago", "30 minutes ago", "now"
// Future: "1 year later", "2 months later", "7 days later", "5 hours later", "30 minutes later", "moments later"
```

### Korean (ko)

```javascript
gloomyDate.date("2023-10-27 12:00:00", "ko")
// Past: "1년 전", "2달 전", "7일 전", "5시간 전", "30분 전", "방금 전"
// Future: "1년 후", "2달 후", "7일 후", "5시간 후", "30분 후", "잠시 후"
```

### Japanese (jp)

```javascript
gloomyDate.date("2023-10-27 12:00:00", "jp")
// Past: "1年前", "2月前", "7日前", "5時間前", "30分前", "今"
// Future: "1年後", "2月後", "7日後", "5時間後", "30分後", "少し後"
```

## 💡 Real-World Examples

### React with Hooks

```jsx
import { useState, useEffect } from "react"
import gloomyDate from "gloomydate"

function CommentList() {
  const [comments, setComments] = useState([
    { id: 1, text: "Great post!", timestamp: "2024-10-26T14:30:00Z" },
    { id: 2, text: "Thanks for sharing", timestamp: "2024-10-27T09:15:00Z" },
    {
      id: 3,
      text: "Looking forward to the next one",
      timestamp: "2024-10-28T18:00:00Z",
    },
  ])

  return (
    <div className="comments">
      {comments.map((comment) => (
        <div key={comment.id} className="comment">
          <p>{comment.text}</p>
          <span className="timestamp">
            {gloomyDate.date(comment.timestamp, "en")}
          </span>
        </div>
      ))}
    </div>
  )
}

// Output:
// "1 day ago"
// "18 hours ago"
// "4
```

