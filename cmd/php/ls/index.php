<?php
	include '../util.php.inc';
	
	$dir = $_GET['dir'];
	$path = bespin_get_file_name($dir);
	
    $folder_array = array();
    $file_array = array();

	if (is_dir($path)) {
	    if ($dh = opendir($path)) {
	        while (($entry = readdir($dh)) !== false) {
	            if (substr($entry, 0, 1) == '.') { continue; }
                if (is_dir("$path/$entry")) {
                    $folder_array[] = $entry;
                } else {
                    $file_array[] = $entry;
                }
            }
            closedir($dh);
        }
    }

    sort($folder_array);
    sort($file_array);

    echo '<ul class="jqueryFileTree" style="display: none;">';
    foreach ($folder_array as $folder) {
        echo "<li class=\"directory collapsed\"><a href=\"#\" rel=\"$dir/$folder/\">$folder</a></li>";
    }
    foreach ($file_array as $file) {
        echo "<li class=\"file ext_css\"><a href=\"#\" rel=\"$dir/$file/\">$file</a></li>";
    }
    echo '</ul>'
?>