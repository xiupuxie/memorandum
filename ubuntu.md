# ubuntu

- ls 查看目录
- cd 进入目录 ../代表上一级
- mkdir 创建文件夹
- sudo 代表管理员权限执行
- sudo apt update  ubuntu安装软件之前,更新系统包索引, 你可以理解为更新npm镜像之类的
- sudo apt install xxx 安装软件  xxx代表什么类型的软件
- curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash   添加nodejs的源地址给系统
- 刚才问题是一开始 apt install nodejs 然后用了apt-get 版本冲突了.系统不知道该保留哪一个了
- sudo dpkg -i --force-overwrite /var/cache/apt/archives/nodejs_16.20.2-deb-1nodesource1_amd64.deb 这个是遇到文件的时候强制覆盖  跟git 提交的时候--force差不多
- whereis nginx  就是告诉你nginx在哪里 后面可以跟其他的  
- ll跟ls差不多 都是看目录,但是可以看到是否读写权限之类的
-  nginx.conf 就是nginx的配置文件
-  systemctl status nginx可以查看服务状态
- nginx -s reload  重启nginx 一般配置文件修改之后需要执行
- nginx -v 查看版本 都一样
- 访问如果出现这个 welcome  就是nginx安装成功了
- vim nginx.conf  就是查看并且修改,默认状态下有几种操作
  - : 冒号的时候 后续可以跟参数 比如
    - :q就是退出
    - :wq 就是保存退出
    - 遇到问题了 :!q 强制退出 不对本次内容进行保存就好
- 然后安装mysql `sudo apt install mysql-server`
- 遇到这种粉红色页面,可以tab按键来切换到ok 或者cancel
- mysql> exit 一般进入到这种模式下就不是在系统里面输入命令了,输入的就是对应软件的可读命令,通常退出就是quit 或者exit 就可以退出了.
- 都安装上了,你现在还要整啥  后台放上去么还是啥子
- 

 