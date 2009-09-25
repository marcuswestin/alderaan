<?php
    // error_reporting(0);//E_ERROR | E_WARNING | E_PARSE);

    $bespin_bases = array(
        'Default' => '/Library/WebServer/Documents/marcuswestin.com/simply-bespin/Store'
    );
    
    function bespin_error($message) {
        header("HTTP/1.0 404 Not Found");
        echo $message;
        exit(0);
    }
    
    function bespin_get_file_name($path, $base = '') {
        // if (!$base || $base == '') { 
        //     global $bespin_bases;
        //     
        // }
        global $bespin_bases;
        $base = $bespin_bases['Default']; 
        $file = $base . $path;
        if (strpos($file, '..') == FALSE and strpos($file, '~') == FALSE) {
            return $file;
        } else {
            bespin_error('.. and ~ are not allowed in file paths');
        }
    }
?>