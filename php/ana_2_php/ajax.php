<?php

// 连接数据库
	$con = mysqli_connect("localhost","root","");

	if (!$con) {
		die('Could not connect: ' . mysql_error());
	}


	// 连接数据库
	mysqli_select_db($con,"my_demo");

	$flag = $_POST['flag'];


	if($flag == "201710"){

		$result = mysqli_query($con,"SELECT * FROM ana_2_t201710");  

		if($result){
			while($row = mysqli_fetch_array($result))
			{
				$table_data[] = array("code"=>$row['code'],"name"=>$row['name'],"amount"=>$row['amount'],
				"rate1"=>$row['rate1'],"rate2"=>$row['rate2'],"total"=>$row['total'],"rate3"=>$row['rate3'],"rate4"=>$row['rate4'],
				"per"=>$row['per'],"rate5"=>$row['rate5'],"rate6"=>$row['rate6']);
			}
			echo json_encode($table_data);
		}
	}

	if($flag == "201708"){

		$result = mysqli_query($con,"SELECT * FROM ana_2_t201708");  

		if($result){
			while($row = mysqli_fetch_array($result))
			{
				$table_data[] = array("code"=>$row['code'],"name"=>$row['name'],"amount"=>$row['amount'],
				"rate1"=>$row['rate1'],"rate2"=>$row['rate2'],"total"=>$row['total'],"rate3"=>$row['rate3'],"rate4"=>$row['rate4'],
				"per"=>$row['per'],"rate5"=>$row['rate5'],"rate6"=>$row['rate6']);
			}
			echo json_encode($table_data);
		}
	}


?>