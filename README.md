# RightManage
use vs2017
core 可以分离出去 使得修改项目不至于每次登录

后端 .net mvc

前端 react +flux+typescript

- 一般页面：

    思路：前端页面传替一个参数： 表名（与实体名一致）， 通过反射实体，获取字段名和类型（使用特性来声明类型.中文显示，控件类型等等），如果没有这张表 ，可以自动生成数据库相应的表，如果有了的话就获取数据。
    
特殊页面：
按照自己意愿来操作

# 使用
  1. RightManage\sql 目录下的数据库脚本
  2. 在 RightManage中修改数据库连接字段
  3. iis发布根目录 _output\Web\Ataw.WebSite

  # 2017-06-05 新增日志功能
  	使用log4net实现
  # 2017-06-05 新增分页功能
  	样式待处理