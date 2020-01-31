<?php
   //链接数据库;
  $db=mysqli_connect("127.0.0.1","root","","qqq");
  //print_r($db);
  //编写sql语句查询数据库数据
  #一:0
  #二:16
  #三:32
  #第N页  (n-1)*16
  $page=$_REQUEST["page"];
  $start=($page-1)*16;
  
  $type=$_REQUEST["type"];
  if($type=="default"){
	  $sql="SELECT * FROM content_goods LIMIT $start,16";
  }elseif($type=="desc"){
	$sql="SELECT * FROM content_goods ORDER BY number DESC LIMIT $start,16";  
  }elseif($type=="price"){
	  	$sql="SELECT * FROM content_goods ORDER BY price DESC LIMIT $start,16";  
  }
  
 // print_r($spl);
 //把数据以json格式返回
 $result = mysqli_query($db,$sql);
 $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
 //print_r($data);
 
 echo json_encode($data,true);
 
?>