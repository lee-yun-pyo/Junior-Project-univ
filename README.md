# 두유노 닷컴
**데이터베이스 프로그래밍 프로젝트**

#### 💡 주제
국뽕과 관련해서 두유노 지성팍 두유노 BTS와 같은 밈이 존재. 이 두유노 밈에 착안을 해서 서비스 이름을 **두윤호닷컴** 으로 정함.

이에 어디까지가 국뽕인지, 어디까지가 두유노, 즉 국뽕 라인에 해당되는지 궁금하였음. 
그래서 이런 실시간 순위와 접목시켜 국뽕 순위를 매겨보고자 함. 그리고 **사용자들이 직접 인물에 정보를 추가해가는 형식**을 원했기 때문에 **순위를 제공**하는 국뽕 사전, 두윤호닷컴을 프로젝트로 정함. 

___
#### 📌 Using
- Node.js v14.17.0
- express
- mongoDB
- mongoose
- pug
- scss
- babel
___
### 🎨 UI
**홈 화면**
![Home](https://user-images.githubusercontent.com/41375597/209525991-b3ca684c-24f4-4104-bacc-14e62161de2c.png)

**게시글 상세화면**
___
#### 📝 기능

___
#### 🗒 CRUD Table
| |게시글|회원|댓글|
|:--:|:--:|:--:|:--:|
|회원가입| |C| |
|로그인| |R| |
|회원정보 수정| |R, U| |
|계정삭제|R, U|R, D| |
|게시글 업로드|C|R, U| |
|게시글 수정|R, U| | |
|게시글 삭제|R, D|R, U|D|
|게시글 검색|R| | |
|댓글 작성|R, U|R, U|C|
|댓글 수정| | |R, U|
|댓글 삭제|R, U|R, U|R, D|
