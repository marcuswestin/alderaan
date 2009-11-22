<?php
	include '../util.php.inc';
	
	global $bespin_bases;
    $dir = $bespin_bases['Default'];

	echo "[";
	
    passthru("cd $dir; find . | egrep -v '^\\.$|/\\.' | sed 's_\(.*\)/\(.*\)_{\"name\":\"\\2\",\"dir\":\"\\1\"},_'");
	echo '{}';
	
	echo "]";
?>