<?php 
	$con = mysqli_connect("localhost","root","");

	if (!$con) {
		die('Could not connect: ' . mysql_error());
	}


	// 连接数据库
	mysqli_select_db($con,"my_demo");



	$name = $_POST['user_name'];  
	$password = $_POST['user_password'];
	$old_name = $_POST['old_name'];  
	if(empty($name)){  
	   echo "用户名不能为空";  
	   exit;  
	} 
	
	if(empty($password)){  
	   echo "密码不能为空";  
	   exit;  
	}




	$query=mysqli_query($con,"UPDATE user SET name = '{$name}',password = '{$password}' WHERE name = '$old_name'");  
	if($query){ 
		echo "1";  
	}

	mysqli_close($con);

?>