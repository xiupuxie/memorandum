# 登录login页面

##### 获取网站总的访问量

	接口地址：/login/getvisitorcount
	
	请求方式：Get
	
	入参案例：无
	
	出参案例：

```
{"code":1,"msg":"ok","count":39}
```

##### 公告

```
接口地址：/login/noticeboard

请求方式：Get

入参案例：
```

```
无
```

```
出参案例：
```

```
{
    title:"",
    id:"",
    text:""
}
```

##### 登录

```
接口地址：/login

请求方式：Post

入参案例：
```

```
{"password":"","username":""}
```

```
出参案例：
```

```
{
    "code": 1,
    "msg": "ok",
    "userid": 1,
    "name": "admin",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoxLCJtc2ciOiJvayIsInVzZXJpZCI6MSwibmFtZSI6ImFkbWluIiwiaWF0IjoxNzAzNzM0MTI5LCJleHAiOjE3MDM4MjA1Mjl9.aaOY6lNinLuLDEuHKkK6U9TOgqNnK2xIn2CmywjPX4c"
}
```

# 录入管理

##### 新增备忘录

	接口地址：/setaddlist
	
	请求方式：Post
	
	入参案例：

```
{"name":"12312","delivery":false,"text":"12312","date":"2023-12-19"}
```

	出参案例：

```
{"code":1,"msg":"提交成功"}
```

# 查询历史单

##### 获取所有历史单

	接口地址：/getlist
	
	请求方式：Post
	
	入参案例：

```
{"page":1}   // 默认page：1 直接传即可
```

	出参案例：

```
{
    "code": 1,
    "msg": "ok",
    "list": [
        {
            "id": 2,
            "title": "对接标签打印(公众)",
            "text": "实时对接标签打印\n二维码不对, 可能是id没传,等待测试\n\n品胜打印暂时异常,但是品胜的人预览是没有问题的, 还在对接",
            "data": "2023-12-01",
            "state": "2"
        },
        {
            "id": 5,
            "title": "fttr能力(公众)",
            "text": "入参 暂时是死的\n上线测试前记得改回来, \n后期会返回值, 要做关联\n目前加在工具箱中测试\n测试中.....\n看下怎么拿返回值\n返回值正在对接.......",
            "data": "2023-12-01",
            "state": "2"
        },
    ],
    "total": 11    // 返回数据的条数
}
```

##### 查询历史单

	接口地址：/getlist
	
	请求方式：Post
	
	入参案例：

```
{
"type":"inquire",       // 查询的标识，必填
"title":"",            // 查询的标题
"data":["2023-12-07","2024-01-19"]       // 查询的日期区间
}
```

	出参案例：

```
{
    "code": 1,
    "msg": "ok",
    "list": [
        {
            "id": 115,
            "title": "12312",
            "text": "12312",
            "data": "2023-12-19",
            "state": "2"
        }
    ],
    "totalshai": 1    // 返回数据的条数
}
```

##### 编辑历史单

	接口地址：/getlist/getcompile
	
	请求方式：Post
	
	入参案例：

```
{"id":115,"title":"12312","text":"123123432","data":"2023-12-19","state":false}
```

	出参案例：

```
{"code":1,"msg":"修改成功"}
```

##### 删除历史单

	接口地址：/getlist/getdelete
	
	请求方式：Post
	
	入参案例：

```
{"id":115}
```

	出参案例：

```
{"code":1,"msg":"删除成功"}
```

# 用户信息

##### 获取邮箱验证码

```
接口地址：/User

请求方式：Post

入参案例：
```

```
{userid:"1"}
```

```
出参案例：
```

```
{"code":1,"msg":"发送成功!"}
```

##### 修改用户密码

```
接口地址：/User/password

请求方式：Post

入参案例：
```

```
{userid:"1",password:""}
```

```
出参案例：
```

```
{"code":1,"msg":"修改成功!"}
```

# 前端技术

##### 发布文章

```
接口地址：/publish

请求方式：Post

入参案例：
```

```
{"userid":1,"username":"admin","name":"admin","type":"3D","title":"123123123","text":"<p>123123123123121231231231231212312312312312123123123123121231231231231212312312312312</p>","size":0,"time":"2024-02-21"}
```

```
出参案例：
```

```
{"code":1,"msg":"发布成功!"}
```

##### 获取文章列表 ( 传入不同类型返回不不同类型的列表 )

##### 文章详情

# 个人中心

##### 文章列表

##### 个人信息

##### 个人信息修改

