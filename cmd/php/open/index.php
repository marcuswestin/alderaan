<?php
	include '../util.php.inc';
	
	$file = bespin_get_file_name($_GET['path']);
	
	if (file_exists($file)) {
		readfile($file);
	} else {
		touch($file) or bespin_error("Could not create file: " . $file);
	}
?>