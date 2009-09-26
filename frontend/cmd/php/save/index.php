<?php
	include '../util.php.inc';
	
    $path = $_GET['path'];
	$file = bespin_get_file_name($path);
	$fh = fopen($file, 'w') or bespin_error("Could not open file " . $file . " for writing");
	fwrite($fh, file_get_contents('php://input'));
	fclose($fh);
	echo "Saved file: $path";
?>

