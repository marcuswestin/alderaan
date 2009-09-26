<?php
	include '../util.php.inc';
	
	$dir = $_GET['dir'];
	$path = bespin_get_file_name($dir);
	
	// Open a known directory, and proceed to read its contents
	if (is_dir($path)) {
	    if ($dh = opendir($path)) {
	        echo '<ul class="jqueryFileTree" style="display: none;">';
	        while (($file = readdir($dh)) !== false) {
	            if (substr($file, 0, 1) == '.') { continue; }
                $class_name = is_dir("$path/$file") ? 'directory' : 'file ext_css';
	            $postfix = is_dir("$path/$file") ? '/' : '';
	            echo "<li class=\"$class_name collapsed\"><a href=\"#\" rel=\"$dir/$file$postfix\">$file</a></li>";	                
	        }
	        closedir($dh);
	    }
	}
?>