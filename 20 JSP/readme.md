## tomcat

### tomcat 目录
1. bin：可执行文件（startup.bat、shutdown.bat 等）
2. conf：配置文件目录（server.xml）等
3. lib: tomcat 依赖的 jar 文件
4. log：日志文件目录
5. temp：临时文件
6. webapps：可执行的项目（将开发的项目放入该目录）
7. work：存放由 jsp 翻译成的java，以及编译成的 class 文件（jsp --> java --> class）

### 配置 tomcat
1. 配置 CATALINA_HOME：在系统环境变量中新增 CATALINA_HOME ，路径为 tomcat 跟目录
2. 双击bin/startup.bat 启动tomcat 可能会与其他服务的端口号冲突，tomcat 默认的端口是 8080，建议修改此端口
  + 修改方法：修改 conf/server.xml 文件，在 70行左右修改 port = 8888
3. 修改webapps目录中项目的默认访问文件：在 项目的 WEB-INF 目录下的 web.xml 文件，配置如下内容，即可设置默认访问文件
  <welcome-file-list>
	  <welcome-file>index.jsp</welcome-file>
  </welcome-file-list>

4. 虚拟路径配置：将 web 项目配置到 webapps 以外的目录
  + 方式一：缺点：配置好后需要重启 tomcat 
    - 修改 conf/server.xml 文件，在 <Host> 标签内添加 <Context> 标签：如下
    - <Context docBase=""  path="" />
    - docBase: 项目存放在磁盘中的实际路径
    - path：虚拟路劲（可以写绝对路径和相对路径【相对于webapps目录】的形式）
    - eg：<Context docBase="D:\study\jsp_project" path="/jsp_project">
  
  + 方式二：不需要重启
    - 在 /conf/Catalina/localhost 目录下创建对应项目的 xml 文件，如：jspProject.xml
    - 将上面方式配置的 <Context> 标签添加到 xml 文件中



+ 常见状态码：
  - 200：一切正常
  - 404：资源不存在
  - 403：权限不足(如访问 a 目录，但a目录设置不可见)
  - 3XX：
    300/301：页面重定向
  - 500：服务器内部错误（代码有错误）



## JSP
### jsp 简介
+ jsp：在html中嵌套java代码
+ jsp 执行流程
  - 客户端在网页上输入 jsp 页面时，如果是第一次访问，服务端将 jsp 翻译成 java（Servlet 文件），再将 java 编译成 class 文件。jsp 可以和 Servlet 相互转换
  - 第二次访问时直接将之前编译好的 class 文件返回，如果服务端代码修改了，服务端会重新翻译和编译
+ jsp 的页面元素
  - 脚本script
    1. <% 
          java代码、定义局部变量 
          String name = "zhangsan"
          out.print("hello " + name)
        %>
    2. <%! 
          定义全局变量、方法 
          public String bookName
          public void init(){ bookName = "java书本" }
        %>
    3. <%= 
          输出表达式
        %>
    4. <%                                    <%=
          out.print("hello world")  等价于      "hello world"  
        %>                                   %>
  
  - 指令
    1. page 指令： <%@ page ... %>
      + page 指令的属性：
        - language：指定 jsp 页面使用的脚本语言
        - import：导入类
        - pageEncoding：jsp 文件自身编码
        - contentType：浏览器解析 jsp 的编码

  - 注释：
    1. html 注释: <!-- -->
    2. java注释: //, /*...*/
    3. jsp注释： <%-- --%>

+ JSP 9大内置对象（自带的，不需要 new 也能使用的对象）
  1. out：输出对象，向客户端输出内容

  2. pageContext：JSP 页面容器

  3. request：请求对象，存储客户端向服务端发送的请求信息
    - 常见方法：
      1. String getParameter(String name)：根据请求的字段名 key，返回字段值 value
      2. String[] getParameterValues(String name): 根据请求的字段名 key，返回多个字段值 value
      3. void setCharacterEncoding("编码格式")：设置请求编码
      4. getRequestDispatcher("b.jsp").forward(request, response)：请求转发的方式跳转页面 A --> B，数据保留，地址栏不会改变，任然时转发前的页面地址
      5. ServletContext getServletContext(): 获取项目的 servletContext 对象, 就是 jsp 的内置对象 application
      6. HttpSession getSession(): 获取 HttpSession 对象，就是 jsp 的内置对象 session

  4. response：响应对象
    - 常见方法
      1. void addCookie(Cookie cookie)：服务端向客户端增加一个 cookie
      2. void sendRedirect(String location)：重定向：页面跳转的一种方式，会导致数据丢失
      3. void setContentType(String type)：设置服务端响应的编码（contentType 类型）
      4. void setCharacterEncoding("编码格式")：设置响应的编码, 与 request.setCharacterEncoding("编码格式") 对应
      5. PrintWriter getWriter()：获取 PrintWriter 对象，就是 jsp 的内置对象 out

  5. session：保存在服务端，同一个客户请求时共享
    - 常见方法
      1. String getId(): 获取 sessionId
      2. boolean isNew()：判断是否是第一次访问
      3. void invalidate()：使 session 失效（退出登录、注销时）
      4. void setAttribute()：往 session 中添加属性
      5. Object getAttribute()：取 session 中的属性值
      6. void setMaxInactiveInterval()：设置最大有效非活动时间，单位 s
      6. int getMaxInactiveInterval()：获取最大有效非活动时间，单位 s

  6. application：全局对象
    - 常见方法
      1. String getContextPath()：获取虚拟路径
      2. String getRealPath(String name)：获取虚拟路径对应的绝对路径

  7. config：配置对象（服务器配置信息）

  8. page：当前 JSP 页面对象（相当于 java 中的 this）

  9. exception：异常对象

+ 统一请求的编码方式：request
  - get 方式请求，如果出现乱码，解决：
   1. 统一每一个变量的编码：new String(name.getBytes("iso-8859-1"), "utf-8"); 不推荐
   2. 修改 server.xml，一次性的更改 tomcat 默认get 提交方式的编码
  - post 方式请求出现乱码，解决
    1. request.setCharacterEncoding("utf-8");


+ 请求转发和重定向的区别
  1. 请求转发不改变地址栏，重定向改变地址栏
  2. 请求转发保留第一次请求时的数据，重定向不保留 
  3. 请求转发只请求服务端一次，重定向请求两次
  4. 请求转发跳转发生的位置是在服务端，重定向时客户端发送第二次跳转请求

+ Cookie 和 session
  1. Cookie：客户端对象，不是内置对象，由服务端产生，再发送给客户端保存。相当于本地缓存的作用
    - 作用：提高服务端访问的效率，但是安全性较差
    - cookie 包含 name 和 value，由 javax.servlet.http.Cookie 产生
    - 常见方法：
    ```java
      // 构造方法
      public Cookie(String key, String value){}
      String getName()
      String getValue()
      void setMaxAge()  ：设置最大有效期，单位 s
    ```
    - 服务端发送 cookie 给客户端：response.addCookie(Cookie cookie); 页面跳转（转发、重定向）
    - 客户端获取 cookie：request.getCookies()
  2. session：会话：浏览网站开始到关闭该网站就是一次会话。session 保存在服务端
    - session 机制：客户端第一次请求服务端时，服务端会产生一个 session 对象（用于保存该客户的信息），并且每个 session 对象都会有一个唯一的 sessionId（用于区分其他session），服务端会产生一个 cookie ，并且该 cookie 的name = JSESSIONID， value = 服务端 sessionId 的值。然后服务端会在响应客户端的同时，将该 cookie 发送给客户端，至此，客户端就有了一个 cookie（JSESSIONID），因此，客户端的 cookie 就可以和服务端的 session 一一对应。客户端第二/n次访问服务端时，服务端会先用客户端 cookie 中的 JSESSIONID 去服务端的 session 中匹配 sessionId，如果匹配成功，说明此用户不是第一次访问，就无需登录
  3. cookie 和 session 的区别
    - cookie 保存在客户端，session 保存在服务端
    - session 保存的数据较为安全（服务端保存），cookie 保存的数据不安全（客户端保存）
    - cookie 保存的内容都是字符串，session 保存的内容是 Object

  
+ JSP 9 大内置对象中的四种范围对象(小  -->  大)
  1. pageContext：jsp 页面容器：当前页面有效，页面跳转后无效
  2. request：请求对象：同一次请求有效，（请求转发后有效，重定向后无效）
  3. session：session 对象：同一次会话有效（无论怎么跳转都有效，关闭/切换浏览器后无效）
  4. application：全局对象：全局有效（整个项目运行期间都有效，服务关闭后无效）
  + 以上四个对象共有的方法
    - Object getAttribute(String name)：根据属性名获取属性值
    - void setAttribute(String name, Object obj)：设置属性值（新增、修改）
    - void removeAttribute(String name)：删除属性值
  + 以上范围对象尽量使用最小的范围，因为对象的范围越大，造成的损耗越大


### JDBC
+ 简介：Java Database Connectivity
+ JDBC API：提供各种操作访问接口：Connection、Statement、PrepareStatement、ResultSet
  - 主要功能：java 程序和 数据库 建立连接，发送 sql 语句，数据库返回执行结果
  - DriverManager：管理 jdbc 驱动
  - Connection：连接数据库
  - Statement(PrepareStatement)：增删改查
  - ResultSet：返回的结果集
+ JDBC DriverManager：管理不同的数据库驱动
+ JDBC 访问数据库的步骤
  1. 导入数据库驱动包，加载具体的驱动类
  2. 与数据库建立连接
  3. 发送 sql 语句，执行
  4. 处理结果 集

### JavaBean
  + JavaBean 的定义
    1. 必须是 public 修饰的类，public 无参构造函数
    2. 所有的属性都是 private，并且提供 set/get 方法，如果属性是 boolean，get 可以替换成 is
  + 使用层面 JavaBean 分为两大类
    1. 封装业务逻辑的 JavaBean，用于操作一个封装数据的 JavaBean
    2. 封装数据的 JavaBean，对应数据库中的一张表 （实体类）
  + 作用：
    1. 减轻 jsp 复杂度，提高代码复用


### MVC 设计模式
+ M：Model：模型，一般表示一个功能
+ V：View：视图，用于展示、以及与用户交互，使用 html
+ C：Controller：控制器，接受请求，将请求跳转到模型进行处理，模型处理完毕后，再将处理结果返回给请求处。一般使用 Servlet 实现

+ Servlet：是一个 java 类
 - 必须继承 javax.servlet.http.HttpServlet
 - 必须重写其中的 doGet() 或 doPost() 方法
 - doGet() 接受并处理所有的 get 请求
 - doPost() 接受并处理所有的 post 请求
 - servlet 要想使用，必须配置
  1. Servlet2.5：在 web.xml 中添加 servlet 和 servlet-mapping 配置
  2. Servlet3.0：在 Servlet 类上添加 @WebServlet 注解，请求地址与 @WebServlet 中的值进行匹配，如果匹配成功，则说明请求的就是该注解所对应的类

+ servlet 生命周期：5个阶段
  1. 加载
  2. 初始化：init()：该方法会在 servlet 被加载并被实例化之后执行
  3. 服务：service() --> doGet(), doPost()
  4. 销毁：destroy()：servlet 被系统回收时执行
  5. 卸载
  - 第一次访问 servlet 时，init 执行一次，后面就不会再执行了，每次调用 servlet 时都会执行 service() 方法，关闭 tomcat 服务时会执行一次 destroy() 方法


### EL表达式
+ 作用：可以替代 jsp 中的 java 代码
+ 语法：${域对象.域对象中的属性.属性...级联属性}  或  ${域对象[域对象中的属性][属性][...级联属性]}。中括号中的属性要加引号
  - 点操作符使用方便
  - 中括号更加强大，可以包含特殊字符（. 、 -），可以获取变量值：例如存在变量 name，则可以 ${requestScope[name]}。可以访问数组：例如${requestScope[hobbies][0]}
+ empty 运算符：${empty 变量}：如果变量不存在或者为 null 则返回 true， 否则返回 false
+ EL 表达式中的隐式对象（不需要 new 的对象）
  - 作用域访问对象（EL域对象）:如果不指定域对象，则默认根据作用域从小到大的顺序取值
    1. pageScope
    2. requestScope
    3. sessionScope
    4. applicationScope
  - 参数访问对象：获取表单数据
    1. ${param.参数名}：相当于 request.getParameter(参数名)
    2. ${paramValues.参数名}：相当于 request.getParameterValues(参数名)
  - jsp 隐式对象
    1. pageContext：在 jsp 中可以通过 该对象可以获取其他 jsp 内置对象。因此，如果要在 EL中使用 jsp 隐式对象，则可以通过 pageContext 获取。例如${pageContext.request} 就是获取 jsp 的 request 对象