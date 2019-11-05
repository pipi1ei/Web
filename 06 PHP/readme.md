### PHP相关知识

### 网站分类：静态网站和动态网站
1. 静态网站：
    全部由HTML 代码格式页面组成的网站，没有数据库的支持，在网站制作和维护方面的工作量巨大。
2. 动态网站：
    动态网站不是指具有动画功能的网站，而是指网站的内容可以根据不同情况动态变更的网站。一般情况下动态网站通过数据库进行架构。一般动态网站体现在网页一般是以asp，jsp，php，aspx等结尾，动态网页以数据库为基础，可以大大降低网站维护的工作量，维护方便

### PHP语法的基本结构
1. 所有的PHP代码都要写到<?php ... ?>里面
2. PHP文件何以和HTML相互结合进行使用
3. PHP文件默认文件扩展名是“.php”
4. PHP代码必须在服务器上执行

### PHP语法
1. echo：将字符串输出到浏览器中，可以在字符串中添加标签，echo 后面智能输出字符串
2. print_r: 输出复杂类型
3. var_dump: 输出复杂类型
4. 变量的声明和使用都要添加 $ 符号
5. 字符串拼接使用 . 符号
6. 数组相关语法：
    a.数组定义：$arr = array(); $arr[0] = "zhangsan"; $arr[1] = "lisi";   $arr = array("zhangsan","lisi");
    b.在浏览器中输出数组：print_r($arr) 或 var_dump($arr) 或 echo json_encode($arr): json_encode(): 将数组转化为json格式的字符串
    c.数组下标索引自定义：$arr = array("name1" => "zhangsan","lisi"),未被自定义过的下标索引从 0 开始计算。
7. 二维数组：
    a.二维数组定义：$arr = array(); $arr[0] = array("name"=>"zhangsan","age"=>18); $arr[1] = array("name"=>"li","age"=>20);
8. 数组遍历：
    a.普通for循环：
        $arr = array("zhangsan","lisi","wangwu"); 
        for($i=0; $i<count($arr); $i++){
            echo $arr[$i] . "<br/>";
        }
        
    b.foreach，这种方式更常用
    foreach($arr as $key => $value){
        echo $key . "-->" . $value . "<br/>";
    }
9. 函数：
    A.系统函数：
        a). json_encode(): 将数组转化为json格式的字符串
        b). print_r(): 输出复杂类型
        c). var_dump(): 输出复杂类型
        d). count(): 返回数组的长度
        e). array_key_exists(key,array): 判断 array 数组中是否存在下标为 key 的值

    B.自定义函数：和 js 类似，使用 function 进行声明：
        function add($num1, $num2){
            return $num1 + $num2
        }
        $result = add(2,3);
        echo "计算结果为：" . $result;
10. 预定义变量：
    A.请求类型：请求有时是需要携带参数的，用来标识特定的要求，根据参数携带位置的不同可以简单的把请求分为 get 和 post 请求
        get请求：参数在 url 后面，多个参数用 & 符号连接
        post请求：参数在请求体中
    B.获取请求参数值：$_GET[], $_POST[]
        $username = $_GET["username"] //获取 get 请求参数为“username”的值