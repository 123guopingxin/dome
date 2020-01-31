<?php
   //链接数据库;
  $db=mysqli_connect("127.0.0.1","root","","qqq");
  //print_r($db);
  //编写sql语句查询数据库数据
  $sql="SELECT * FROM content_goods";
 // print_r($spl);
 //把数据以json格式返回
 $result = mysqli_query($db,$sql);
$size=mysqli_num_rows($result);
    #设每页16个数据
	$count=ceil($size/16);//向上取整
	//数组里的key和vlue
	$data=array("count"=>$count);
	echo json_encode($data,true);
	
	//print_r($count);

 //print_r($size);
 
 
 
 //$data = mysqli_fetch_all($result,MYSQLI_ASSOC);
 //print_r($data);
 
 //echo json_encode($data,true);
 
?>