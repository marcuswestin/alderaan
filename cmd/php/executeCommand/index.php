<?php
    include '../util.php.inc';
    // nice and simple :)
    global $bespin_bases;
    $dir = $bespin_bases['Default'];

    passthru("cd $dir; " . urldecode($_GET['commandString']) . ' 2>&1');
?>