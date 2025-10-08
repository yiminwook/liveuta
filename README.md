\* 프로젝트 시작일 2023.3.11

### 📢 Pull Request는 dev 브랜치에 부탁드립니다.

Main - https://liveuta.vercel.app

Dev - https://liveuta-dev.vercel.app

## 개발환경
- node v22.14.0
- pnpm v9.15


## Environments Example

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# 미사용
HOLODEX_API_KEY=
# Youtube Data v3 API
GOOGLE_API_KEY=AIz...

# Auth 
NEXTAUTH_SECRET=
ACCESS_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
KAKAO_CLIENT_ID=
KAKAO_CLIENT_SECRET=
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=

# Google Sheet v4 API, Firebase Cloud Messaging
FIREBASE_CLIENT_EMAIL=firebase-adminsdk...
FIREBASE_PROJECT_ID=liveuta-...
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...
NEXT_PUBLIC_FIREBASE_VAPID_KEY=BAKlP...

MONGODB_URI=

ORACLEDB_CONNECTSTRING=
ORACLEDB_PASSWORD=

# optional
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_AUTH_TOKEN=
```


<br /> 
<br /> 
<br /> 
<br /> 
<br /> 



# 주요기능

라이브우타 프로젝트는 **V-Singer**를 등록하여 쉽게 모아볼 수 있도록 스케줄을 제공과 함께 
사용자에게 편의를 위한 기능을 제공합니다.

<br /> 

## 스케줄 페이지
 
<br /> 

### 1. 스케줄 페이지 화면 - https://liveuta.vercel.app/ko/schedule

<img src="https://github.com/yiminwook/liveuta/blob/main/doc/schedule-page.png?raw=true" /> 

<br /> 

지원하는 필터링 기능

1. 즐겨찾기 및 차단
2. 기간별 필터링
3. 동영상, 라이브방송 필터링
4. 채널검색

<br /> 

### 2. 스케줄 페이지 라이브 시청기능 - https://liveuta.vercel.app/ko/schedule?isFavorite=true&t=live

<img src="https://github.com/yiminwook/liveuta/blob/main/doc/schedule-live.png?raw=true" /> 

<br /> 

채팅창과 함께 방송을 시청할 수 있습니다.

<br /> 

### 3. Pip 플레이어 지원 (Desktop only)

<img src="https://github.com/yiminwook/liveuta/blob/main/doc/schedule-pip-player.png?raw=true" />

<br /> 

시청중인 방송을 페이지 이동시에도 계속해서 시청 가능합니다.

<br />
<br /> 
<br /> 
<br /> 
<br /> 



## 채널 페이지

<br /> 

### 1. 채널 페이지 화면 - https://liveuta.vercel.app/ko/channel

<img src="https://github.com/yiminwook/liveuta/blob/main/doc/channel-page.png?raw=true" />

<br />  

전체 채널을 조회하여 구독자 및 해당 채널의 유투브로 이동할 수 있습니다.

<br />

### 2. 채널 요청 기능 - https://liveuta.vercel.app/ko/request

<img src="https://github.com/yiminwook/liveuta/blob/main/doc/channel-request.png?raw=true" />

<br />

원하는 유투버의 채널을 관리자에게 직접 요청할 수 있습니다.
관리자가 확인하는데에 약 1일이 소요됩니다.

<br />
<br /> 
<br /> 
<br /> 
<br /> 



## 멀티뷰 (Desktop only) - https://liveuta.vercel.app/ko/multi

<img src="https://github.com/yiminwook/liveuta/blob/main/doc/multiview.png?raw=true" />

<br />

한번에 여러개의 영상을 원하는 위치 크기에 맞춰 시청할 수 있습니다.

<br /> 
<br /> 
<br /> 
<br /> 
<br /> 

## 세트리스트 페이지 - https://liveuta.vercel.app/ko/setlist/3E-2zCflWZU

<img src="https://github.com/yiminwook/liveuta/blob/main/doc/setlist-page.png?raw=true" />

<br /> 

해당 방송에서 불렀던 노래를 검색하고, 타임스탬프를 클릭시 해당 타임라인으로 이동합니다.

<br /> 
<br /> 
<br /> 
<br /> 
<br /> 


## 사용자 설정

<br /> 


### 1. 앱설정 페이지 - https://liveuta.vercel.app/ko/setting

<img src="https://github.com/yiminwook/liveuta/blob/main/doc/user-settings.png?raw=true" />

<br /> 

설정 가능한 기능

1. 테마설정 (라이트테마 3가지, 다크테마 2가지) 

2. 언어설정 (한국어, 영어, 일본어)

3. 앱 네트워크 요청 캐시시간 (react query stale-time) 조정

<br /> 

### 2. 즐겨찾기 및 차단 목록 (로그인 필수) - https://liveuta.vercel.app/ko/my

<img src="https://github.com/yiminwook/liveuta/blob/main/doc/user-faverite-and-block-list.png?raw=true" />

<br /> 