<?php 
	$con = mysqli_connect("localhost","root","");

	if (!$con) {
		die('Could not connect: ' . mysql_error());
	}


	// 连接数据库
	mysqli_select_db($con,"my_demo");



	$name = $_POST['user_name'];  
	$password = $_POST['user_password'];  
	if(empty($name)){  
	   echo "用户名不能为空";  
	   exit;  
	} 
	
	if(empty($password)){  
	   echo "密码不能为空";  
	   exit;  
	}


	$selete_result = mysqli_query($con,"SELECT password FROM user WHERE  name = '$name'");

	$row = mysqli_fetch_array($selete_result);
	if($row[0]){
		echo "标题重复，请重新输入";
		exit;
	}



	$query=mysqli_query($con,"INSERT into user(name,password,flag1,flag2)
						values('{$name}','{$password}',0,0)");  
	if($query){ 
		echo "1";  
	}

	mysqli_close($con);

?>