<?php
	$name = $_POST["name"];
	$password = $_POST["password"];

	$con = mysqli_connect("localhost","root","");

	if (!$con) {
		die('Could not connect: ' . mysql_error());
	}

	mysqli_select_db($con,"my_demo");

	$result = mysqli_query($con,"SELECT * FROM user WHERE name = '$name'");


	$row = mysqli_fetch_array($result);
	$real_password = $row["password"];



	if($password == $real_password){



		echo "<script>
			  window.location.href='../html/index.html';</script>";
	}
	else{
		echo "<script>
			  	alert('name or password error');
				window.location.href='../html/login.html';
			  </script>";
	}

	mysqli_close($con);




  ?>