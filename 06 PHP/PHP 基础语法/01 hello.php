<?php 
    echo '<h1>hello world</h1>'; //输出字符串

    echo "你" . "好"; //字符串拼接

    $arr = array("张三","李四","王五"); //数组定义1
    $arr2 = array(); //数组定义2
    $arr2[0] = "语文";
    $arr2[0] = "数学";
    $arr2[0] = "英语";

    /* 自定义数组下标 */
    $arr3 = array("name1"=>"张三","name2"=>"李四","name3"=>"王五");
    print_r($arr); //输出复杂类型
    var_dump($arr3);//输出复杂类型
    echo json_encode($arr2); //输出json字符串

    /* 遍历数组 */
    // 1. for循环遍历
    for($i=0; $i<count($arr2); $i++){
        echo $arr2[$i] . "<br>";
    }
    //2. foreach 遍历
    foreach($arr2 as $key => $value){
        echo $key . "-->" . $value . "<br>";
    }

    $_GET["username"]; // 获取get请求参数为 username 的值
    $_POST["password"]; // 获取post请求参数为 password 的值

?>