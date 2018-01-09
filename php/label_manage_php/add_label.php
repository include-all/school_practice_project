<?php 
	$con = mysqli_connect("localhost","root","");

	if (!$con) {
		die('Could not connect: ' . mysql_error());
	}


	// 连接数据库
	mysqli_select_db($con,"my_demo");


	$name = $_POST['name'];
	$flag1 = $_POST['flag1'];  
	$flag2 = $_POST['flag2'];  


	$selete_result = mysqli_query($con,"SELECT flag1,flag2 FROM user WHERE  name = '$name'");

	$row = mysqli_fetch_array($selete_result);
	if($row[0] =='1' or $flag1 == '1'){
		$flag1 = '1';
	}

	if($row[1] =='1' or $flag2 == '1'){
		$flag2 = '1';
	}



	$query=mysqli_query($con,"UPDATE user SET flag1 = '{$flag1}',flag2 = '{$flag2}' WHERE name = '$name'");  
	if($query){ 
		echo "1";  
	}

	mysqli_close($con);

?>