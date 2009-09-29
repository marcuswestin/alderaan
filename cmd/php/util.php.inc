<?php
    // error_reporting(0);
    error_reporting(E_ERROR | E_WARNING | E_PARSE);
    // error_reporting(E_ERROR | E_PARSE);

    // Bases should *not* end in a /
    $bespin_bases = array(
        'Default' => '../../..'
    );
    
    function bespin_error($message) {
        header("HTTP/1.0 404 Not Found");
        echo $message;
        exit(0);
    }
    
    function bespin_get_file_name($path, $base = 'Default') {
        global $bespin_bases;
        
        if (!array_key_exists($base, $bespin_bases)) { 
            bespin_error('Not an allowed base: '. $base); 
        }
        
        $path = str_replace('//', '/', $path);
        if (strpos($path, '..') != FALSE or strpos($path, '~') != FALSE) {
            bespin_error('tsk tsk, stay in your sandbox (.., // and ~ are not allowed in file paths)');
        }
        
        if (substr($path, 0, 1) != '/') {  $path = '/' . $path; }
        
        return $bespin_bases[$base] . $path;
    }
?>
