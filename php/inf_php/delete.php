<?php 
	$con = mysqli_connect("localhost","root","");

	if (!$con) {
		die('Could not connect: ' . mysql_error());
	}


	// 连接数据库
	mysqli_select_db($con,"my_demo");



	$delete_title = $_POST['delete_title'];  

	if(empty($delete_title)){  
	   echo "删除标题不能为空";  
	   exit;  
	} 
	

	$selete_result = mysqli_query($con,"SELECT article_content FROM article WHERE  article_title = '$delete_title'");

	$row = mysqli_fetch_array($selete_result);
	if(!$row[0]){
		echo "没有您输入的标题，请重新输入";
		exit;
	}

	$query = mysqli_query($con,"DELETE from article where article_title = '$delete_title'");  

	if($query){ 
		echo "1";  
	}

	mysqli_close($con);

 ?>