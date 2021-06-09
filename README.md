# Flexilis
**Flexilis**는 스트레칭 알림 데스크톱 애플리케이션입니다.
알람이 등록된 시간에 선택한 부위의 스트레칭 영상이 팝업으로 재생됩니다.
알림 영상 하단에는 광고를 게시할 수 있으며 이를 관리하기 위한 admin 페이지가 존재합니다.
admin 페이지에서는 결제를 통해 광고를 등록할 수 있으며 사용자가 등록한 광고의 대시보드를 확인할 수 있습니다.

![Flexilis](/src/assets/electron.png)

- Deploy Address: https://flexilis.xyz/


## Table of Contents
- [Motivation](#-motivation)
- [Installation](#-installation)
- [Features](#-features)
- [Skills](#-skills)
- [Project Control](#-project-control)
- [Deploy](#-deploy)


## Motivation
- 부트캠프 교육을 받고 집에 돌아와 누우면 허리도 아프고, 무릎도 쑤셔서 남동생에게 하소연한 적이 있습니다. 그때 남동생이 ‘오래 앉아있는 일을 할 때는 무엇보다 스트레칭하는 것이 중요하다’고 얘기했던 적이 있는데 그때 기억으로 인해서 지정한 시간에 스트레칭을 할 수 있으면 좋겠다는 생각에서 이 프로젝트에 대한 아이디어가 나오게 되었습니다.
- 또한 최근에 오랜 시간 책상에 앉아서 일하거나 온종일 서 있는 직장인들 사이에 허리디스크가 나이를 불문하고 나타나고 있는데, 이런 질환들을 예방하기 위해서 적어도 1시간은 한 번씩은 자리에서 일어나 가볍게 스트레칭을 해주는 것이 좋다는 기사를 보고 꾸준하게 스트레칭을 할 수 있도록 도와주는 앱이 있으면 좋겠다고 생각했습니다.


## Installation
### Client
```
git clone https://github.com/Team-HHH/vaco9-team-frontend.git
cd vaco9-team-frontend
npm install
npm start
```
### Server
```
git clone https://github.com/Team-HHH/vaco9-team-server.git
cd vaco9-team-frontend
npm install
npm start
```


## Features
- 지정된 시간에 스트레칭 앱 알림 설정
- 연령, 성별, 국적별 광고 타겟 설정 및 비용 예측
- 광고를 등록했을 때 영상 하단의 광고가 어떻게 뜨는지 확인하는 미리보기 기능
- iamport를 이용한 광고 등록 결제 기능
- 광고 마케팅 정보에 대한 데이터를 D3.js를 통해 시각화한 대시보드


## Skills
### Frontend
- ES2015+
- React
- React Router
- Redux
- Redux-hooks
- Redux-thunk
- D3.js

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- AWS Simple Cloud Storage (S3)

### Electron
- Electron
- Electron Forge

### Third Party Stack
- Git
- Json Web Token
- Styled-component


## Project Control
- Git Branch 기반 개발 진행
- Notion을 이용한 Task Management


## Deploy
### Frontend
netlify를 이용한 Github Repository 배포

### Backend
AWS Elastic Beanstalk(EB)을 이용해 배포
