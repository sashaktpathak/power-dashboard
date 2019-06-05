# power-dashboard

*Open database.js in Folder **config** and change username and password according to your machine*

Run following commands in the power-dashboard drectory

 `npm i`
 
 `node server.js`
 
Then open localhost:1337 on the browser 

Login using 

  **user :** sashakt
  
  **password :** 1234
  
 or you can register yourself.
 
 To reflect immediate Change in Site when db is changed you need to enable Bin Logging in Mysql. 

#Enabling Bin Logging

Open my.cnf/my.ini configuration file of Mysql

On Linux System File will be located at

`/etc/mysql`
Add Following lines Under Title **[mysqld]**

```server-id		= 1
binlog_format    = row
log_bin			= /var/log/mysql/mysql-bin.log
```

For more Details Refer site 

https://jinyuwang.weebly.com/for-mysql/how-to-enable-binary-logging-for-mysql
