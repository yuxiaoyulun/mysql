//引入模块
var express = require('express');
var app = express();


//引入数据库模块
var mysql = require('mysql');

//数据库链接
var conn = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'920928',
	database:'k7905'
})

//链接数据库
conn.connect();
//主页
app.get('/',function(req,res){
	res.send('欢迎光临本站！');
});

//注册前端页面
app.get('/reg',function(req,res){
	res.sendFile(__dirname+'/reg.html');
});

app.get('/regdo',function(req,res){
	var uname = req.query.username;
	var usertel = req.query.usertel;

	if(uname.length<3 || usertel.length!=11){
		console.log('用户名不规范');
		res.send('不规范');
		// res.end();
	}else{
		// console.log(uname+usertel);
		// res.end();
		// res.send(uname+usertel);
		//入库
		var addsql = "INSERT INTO users(username,usertel) VALUES (?,?)";
		var addData = [uname,usertel];
		conn.query(addsql,addData,function(err,result){
			if(err){
				res.send('注册失败');
				console.log('register fail');
			}else{
				res.send("注册成功");
				console.log(result);
				// ;
			}
		});
	}
});

//列表
app.get('/list',function(req,res){
	var start = 0;
	var pagerecord = 3;
	var totalpages = '';
    var totalhtml = '';
	//获取总记录数
	var countsql = "SELECT id FROM users";
	var totalrecords = '';

	//接受页码
	var page = req.query.page;
	if(!page){
		page = 1;
	}
	//开始读取的位置
	start = pagerecord*(page-1);
	conn.query(countsql,function(err,result){
		totalrecords = result.length;
		// console.log(totalrecords)
		// 获取总页码数
		totalpages = Math.ceil(totalrecords/pagerecord);
		//虚幻读取页码数
		for(var i =0;i<totalpages+1;i++){
			totalhtml += '<a href="list?page='+i+'">'+i+'</a>';
		}
	})
	//读库
	var selectsql = "SELECT id,username,usertel FROM users LIMIT"+start+","+pagerecord;
	conn.query(selectsql,function(err,result){
		if(err){
			console.log("读取数据失败");
			res.send("抱歉，数据读取失败");
		}else{
			var alldata = '';
			var len = result.length;
			for(var i =0 ;i<len;i++){
                alldata += '<tr><td>'+result[i].id+'</td><td>'+result[i].username+'</td><td>'+result[i].usertel+'</td><td></td></tr>';
			}
			var head = '<html><head><meta charset="utf-8"><title>会员列表</title></head><body><table>'+alldata+totalhtml+'</table></body></html>'
		    res.send(head);
		}
	})
})





//开启服务器
app.listen(3000,function(){
	console.log('Server running at localhost:3000');
})