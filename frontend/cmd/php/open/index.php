<?php
	include '../settings.php.inc';
	
	$file = bespin_get_file_name($_GET['path']);
	
	if (file_exists($file)) {
		readfile($file);
	} else {
		header("HTTP/1.0 404 Not Found");
	}
?>