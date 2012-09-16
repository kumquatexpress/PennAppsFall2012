<?php
$conn = mysql_pconnect("hulce.net", "pennapps", "pennapps") or die(mysql_error());
mysql_select_db("pennappsfa2012",$conn);
$GLOBALS['start_time'] = microtime(true);
register_shutdown_function('shutdown');
function recordQuery($query) {
    $page = $_SERVER["SCRIPT_NAME"];
    $query = addslashes($query);
    mysql_query("INSERT INTO utils (query,page) VALUES ('$query','$page')");
}
function shutdown() {
    $page = $_SERVER["SCRIPT_NAME"];
    $ending = microtime(true);
    $val = $ending - $GLOBALS['start_time'];
    mysql_query("INSERT INTO utils (time,page) VALUES ('$val','$page')");
}
?>
