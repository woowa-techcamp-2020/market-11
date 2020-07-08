const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');

const Database = require('nedb');
//자동 로드 및 데이터베이스 파일 생성
const db = new Database({ filename: 'user.db', autoload: true });

app.set('views', __dirname + '/../frontend/views'); // 서버가 읽을 수 있도록 html의 위치를 정의해줌.
app.set('view engine', 'ejs'); // ejs는 템플릿 엔진, pug도 템플릿 엔진, 서버가 html을 렌더링 할때 ejs엔진을 사용하도록 설정
app.engine('html', require('ejs').renderFile);

const server = app.listen(3000, function () {
  console.log('Express server has started on port 3000');
});

app.use(express.static('../frontend/public')); // 정적파일의 루트 지정 : html에서 사용되는 .js 파일, css 파일, image파일 등
// 서버에서 정적파일을 다룰땐 express.static() 메소드를 사용하면 된다.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
const router = require('./router/main')(app, fs, db); // main.js 에서 export한 함수에 app을 파라미터로 넣어줌.
// 라우터 모듈인 main.js를 불러와서 app에 전달해줌
