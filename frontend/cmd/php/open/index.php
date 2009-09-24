<?php
	include '../settings.php.inc';
	
	$file = $BASES['Default'] . $_GET['path'];
	if (file_exists($file)) {
		readfile($file);
	} else {
		header("HTTP/1.0 404 Not Found");
	}
?>