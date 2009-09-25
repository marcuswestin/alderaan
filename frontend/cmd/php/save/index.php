<?php
	include '../util.php.inc';
	
	$file = bespin_get_file_name($_GET['path']);
	$fh = fopen($file, 'w') or bespin_error("Could not open file " . $file . " for writing");
	fwrite($fh, file_get_contents('php://input'));
	fclose($fh);
?>

