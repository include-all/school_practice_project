<?php 
	$con = mysqli_connect("localhost","root","");

	if (!$con) {
		die('Could not connect: ' . mysql_error());
	}


	// 连接数据库
	mysqli_select_db($con,"my_demo");



	$delete_name = $_POST['delete_name'];  

	

	$query = mysqli_query($con,"DELETE from user where name = '$delete_name'");  

	if($query){ 
		echo "1";  
	}

	mysqli_close($con);

 ?>