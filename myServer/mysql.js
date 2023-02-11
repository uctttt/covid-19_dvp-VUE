let mysql = require('mysql')
const db_config = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: "3306", // 默认端口号
        database: 'node_sql' // 数据库名称
    }
    // 链接数据库
function conMysql(sql) {
    let connect = mysql.createConnection(db_config)
    connect.connect(function(err) {
        if (err) {
            console.log(`连接失败: ${err}!`)
        } else {
            console.log('SQL连接')
        }
    })
    return new Promise((resolve, reject) => {
        connect.query(sql, (err, result) => {
            if (err) {
                reject(err)
            } else {
                let res = JSON.parse(JSON.stringify(result))
                closeMysql(connect)
                resolve(res)
            }
        });
    })
}

//关闭数据库
function closeMysql(connect) {
    connect.end((err) => {
        if (err) {
            console.log(`关闭失败:${err}!`)
        } else {
            console.log('SQL关闭')
        }
    })
}
//导出
exports.conMysql = conMysql