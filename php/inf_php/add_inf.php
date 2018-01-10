<?php 
	$con = mysqli_connect("localhost","root","");

	if (!$con) {
		die('Could not connect: ' . mysql_error());
	}


	// 连接数据库
	mysqli_select_db($con,"my_demo");

	//在表中创建数据库
	$sql = "CREATE TABLE article
	(
	article_title varchar(200) primary key,
	article_content longtext,
	article_name varchar(20),
	article_time varchar(200)
	)";

	mysqli_query($con,$sql);

	$title = $_POST['title'];  
	$txt = $_POST['txt'];  
	$name = $_POST['name'];
	$time = $_POST['time'];
	if(empty($title)){  
	   echo "标题不能为空";  
	   exit;  
	} 
	
	if(empty($txt)){  
	   echo "文章内容不能为空";  
	   exit;  
	}


	$selete_result = mysqli_query($con,"SELECT article_content FROM article WHERE  article_title = '$title'");
	if (!$selete_result) {
	 printf("Error: %s\n", mysqli_error($con));
	 exit();
	}

	$row = mysqli_fetch_array($selete_result);
	if($row[0]){
		echo "标题重复，请重新输入";
		exit;
	}



	$query=mysqli_query($con,"INSERT into article(article_title,article_content,article_name,article_time)
						values('{$title}','{$txt}','{$name}','{$time}')");  
	if($query){ 
		echo "1";  
	}

	mysqli_close($con);

?>