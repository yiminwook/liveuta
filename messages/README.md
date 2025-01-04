# 번역

## 파일 구조

```json
{
  // 모든 패이지에 사용되는 전역 컴포넌트들 번역
  "global": {
    // 각각의 네임스페이스에 사용되는 컴포넌트들 번역
    "component1": {
      "element1": "Ado"
    },
    ...
  },
  // 각 페이지 별 번역
  "page1": {
    "title": "page1",
    "element1": "Show",
    "component1": {
      "element1": "Ready for my show"
    },
    "component2": {},
    ...
  },
  "page2": {
    "title": "page2"
  },
  ...
  ,
  // 에러들
  "error": {
    "someError": "some error"
  }
}
```

## 번역 규칙

1. 구조화를 위해 위 서식을 지켜주세요.
2. 한 파일에서 작업한 내용은 다른 파일에도 반영해주세요. 번역하지 않은 텍스트를 넣어주세요.
