<?php

// 连接数据库
	$con = mysqli_connect("localhost","root","");

	if (!$con) {
		die('Could not connect: ' . mysql_error());
	}


	// 连接数据库
	mysqli_select_db($con,"my_demo");




	$result = mysqli_query($con,"SELECT * FROM user");  

	if($result){
		while($row = mysqli_fetch_array($result))
		{
			if($row['name'] !='manager'){
				$user[] = array("name"=>$row['name'],"password"=>$row['password']);
			}
		}
		echo json_encode($user);
	}


?>