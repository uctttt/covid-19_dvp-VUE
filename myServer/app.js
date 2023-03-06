//加载模块
const express = require('express')

const cors = require('cors')

const bodyParser = require('body-parser')

const multiparty = require('connect-multiparty')

const app = express()

//处理跨域与各种格式的传参
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(multiparty())

//启动服务器
app.listen(3000, () => {
    console.log(`服务器已运行于3000端口`);
})

class Response {
    constructor(isSucceed, msg, code, data) {
        this.isSucceed = isSucceed;
        this.msg = msg;
        this.code = code;
        this.data = data;
    }
}

const { conMysql } = require('./mysql')

//检测数据库链接
app.get('/getUser', (req, res) => {
    let sql = 'select * from users';
    conMysql(sql).then(result => {
        res.send(result);
    }).catch(err => {
        res.send(`数据库连接出错：${err}`)
    })
})

//登陆
app.post('/login', (req, res) => {
    let sql = `select * from users where username = '${req.body.username}'`;
    conMysql(sql).then(result => {
        if (result && result.length) {
            if (result[0].password === req.body.password) {
                let response = new Response(true, '登录成功', 200, result);
                res.send(response);
            } else {
                let response = new Response(false, '密码错误，请重新输入', 500);
                res.send(response);
            }
        } else {
            let response = new Response(false, '用户名错误，请检查用户名', 500);
            res.send(response);
        }
    }).catch(err => {
        res.send(`数据库连接出错：${err}`);
    })
})

//注册
app.post('/register', (req, res) => {
    let sql = `select * from users where username = '${req.body.username}'`;
    conMysql(sql).then(result => {
        if (result && result.length) {
            let response = new Response(false, '该用户名已被使用', 300, result);
            res.send(response);
        } else {
            let sql = `insert into users (username,password,name) values ('${req.body.username}','${req.body.password}','${req.body.name}')`;
            conMysql(sql).then(result => {
                if (result) {
                    let response = new Response(true, '注册成功，返回主页', 200, result);
                    res.send(response);
                } else {
                    let response = new Response(false, '注册失败,请稍后重试', 500);
                    res.send(response);
                }
            }).catch(err => {
                res.send(`数据库连接出错：${err}`);
            })
        }
    })
})

//查询用户
app.post('/checkUser', (req, res) => {
    let sql = `select * from users where username = '${req.body.username}'`;
    conMysql(sql).then(result => {
        if (result && result.length) {
            let response = new Response(true, '查询到用户信息，进入下一步', 200, result);
            res.send(response);
        } else {
            let response = new Response(false, '无该用户信息,请检查用户名', 400, result);
            res.send(response);
        }
    }).catch(err => {
        res.send(`数据库连接出错：${err}`);
    })
})

//密码修改
app.post('/reset', (req, res) => {
    let sql = `select * from users where username = '${req.body.username}'`;
    conMysql(sql).then(result => {
        if (result[0].password === req.body.newPassword) {
            let response = new Response(false, '新旧密码不可相同', 300);
            res.send(response);
        } else {
            let sql = `update users set password = '${req.body.newPassword}' where username = '${req.body.username}'`;
            conMysql(sql).then(result => {
                if (result.affectedRows == 1) {
                    let response = new Response(true, '密码修改成功，返回主页', 200, result);
                    res.send(response);
                } else {
                    let response = new Response(false, '修改失败,请稍后重试', 500);
                    res.send(response);
                }
            })
        }
    }).catch(err => {
        res.send(`数据库连接出错：${err}`);
    })
})