<?php
error_reporting(E_ALL);
$conn = mysql_pconnect("hulce.net", "pennapps", "pennapps") or die(mysql_error());
mysql_select_db("pennappsfa2012",$conn);
//==================
//SUBLET INFORMATION
//==================
$query_sub = "SELECT * FROM houses WHERE `id` = " . $_GET['id'];
$q_sub = mysql_query($query_sub,$conn) or die(mysql_error());
$_info = mysql_fetch_assoc($q_sub);
$info = array(
    'id' => $_info['id'],
    'price' =>$_info['price'],
    'size' => strtoupper($_info['size']),
    'description' =>$_info['listing_header'],
    'location'=> $_info['address'],
    'url' => $_info['listing_url']
);
echo json_encode(array('info'=>$info,'crimes'=>$crimes));
?>
