<?php 
    $code = $_GET["code"]; //获取学生考号
    // 模拟数据库中学生数据
    $data = array();
    $data["123"] = array("Name"=>"张三","Chinese"=>"122","Math"=>"133","English"=>"59");
    $data["234"] = array("Name"=>"李四","Chinese"=>"102","Math"=>"133","English"=>"140");
    $data["345"] = array("Name"=>"王五","Chinese"=>"22","Math"=>"144","English"=>"99");

?>
<?php 
    //判断学号是否存在
	if(array_key_exists($code, $data)){
		$result = $data[$code];
?>
<div>
    <h1><?php echo $result["Name"] ?>的成绩为：</h1>
    <ul>
        <li>语文：<?php echo $result["Chinese"] ?></li>
        <li>数学：<?php echo $result["Math"] ?></li>
        <li>英语：<?php echo $result["English"] ?></li>
    </ul>
</div>
<?php }else{ ?>

<div>无该考号的学生！请输入正确的考号</div>

<?php } ?>