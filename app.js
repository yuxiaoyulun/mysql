//引入mysql模块
var mysql = require('mysql');
//数据库链接参数配置
var conn = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'920928',
	database:'k7905'
});

//连接数据库
conn.connect();

//测试数据库链接
conn.query('SELECT 2 AS solution',function(err,results,fields){
	if(err){
		throw err;
 	}else{
 		console.log("数据库链接成功");
 	}
})


//新增数据
// var addsql= 'INSERT INTO users(username,usertel) VALUES (?,?)';
// var addData= ['jerryJerry','13332223445'];
// conn.query(addsql,addData,function(err,result){
// 	if(err){
// 		console.log(err.message);
// 		return;
// 	}else{
// 		console.log(result);
// 	}
// })

//读取数据
// var selectsql = 'SELECT *FROM users';
// conn.query(selectsql,function(err,result){
// 	if(err){
// 		console.log(err.message);
// 		return;
// 	}else{
// 		console.log(result);
// 	}
// })

//修改数据
// var renewsql = "UPDATE users SET username=?,usertel=? WHERE id=?";
// var renewData = ["jack",'12322321234',19];
// conn.query(renewsql,renewData,function(err,result){
// 	if(err){
// 		console.log(err.message);
// 	}else{
//         console.log(result);
// 	}
// })

//删除数据
var delsql = "DELETE FROM users WHERE id=19";
conn.query(delsql,function(err,result){
    if(err){
    	console.log(err.message);
    }else{
    	console.log(result);
    }
})