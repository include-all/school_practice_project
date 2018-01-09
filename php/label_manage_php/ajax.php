<?php 
	$con = mysqli_connect("localhost","root","");

	if (!$con) {
		die('Could not connect: ' . mysql_error());
	}


	// 连接数据库
	mysqli_select_db($con,"my_demo");



	$user_name = $_POST['user_name'];  

	

	$result = mysqli_query($con,"SELECT * from user where name = '$user_name'");  

	$row = mysqli_fetch_array($result);
	$flag[] = array("flag1"=>$row['flag1'],"flag2"=>$row['flag2']);
	echo json_encode($flag);

	mysqli_close($con);

 ?>