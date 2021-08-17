const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()
const port = process.env.PORT || 3000
const fortune = require('./lib/fortune')/* ./ : node_modules 디렉터리에서 모듈을 찾지 말라는 의미. 이 부분 생략시 임포트 실패. */


// 핸들바 뷰 엔진 설정
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

app.use(express.static(__dirname+'/public'))
app.get('/', (req, res) => res.render('home'))

app.get('/about', (req, res) => {
    res.render('about', {fortune:fortune.getFortune()})
})

// custom 404 page
app.use((req, res) => {
    res.status(404)
    res.render('404')
})

// custom 500 page
app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(500)
    res.render('500')
})

app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; ` +
    `press Ctrl-C to terminate.`))