<?php

// 连接数据库
	$con = mysqli_connect("localhost","root","");

	if (!$con) {
		die('Could not connect: ' . mysql_error());
	}


	// 连接数据库
	mysqli_select_db($con,"myblog_db");




	$result = mysqli_query($con,"SELECT * FROM article");  

	if($result){
		while($row = mysqli_fetch_array($result))
		{
			$article[] = array("article_title"=>$row['article_title'],"article_content"=>$row['article_content']);
		}
		echo json_encode($article);
	}


?>