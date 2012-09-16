<?php
require 'utils.php';
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
    'url' => $_info['listing_url'],
    'lat' => $_info['lat'],
    'lon' => $_info['long']
);
$min_lat = $_info['lat'] - .00175;
$max_lat = $_info['lat'] + .00175;
$min_lon = $_info['long'] - .00175;
$max_lon = $_info['long'] + .00175;
$q_lat = "`lat` >= '$min_lat' AND `lat` <= '$max_lat'";
$q_lon = "`long` >= '$min_lon' AND `long` <= '$max_lon'";
$query_crimes = "SELECT * FROM crimes WHERE $q_lat AND $q_lon ORDER BY `date` DESC";
$q_crime = mysql_query($query_crimes,$conn) or die(mysql_error());
$crimes = array();
$times = array();
$types = array();
while($crime = mysql_fetch_assoc($q_crime)) {
    $dt = strtotime($crime['date']);
    $times[date('G',$dt)]++;
    $types[$crime['crime_type']]++;
    if($dt > (time()-60*60*24*7)) {
        $crimes[] = array(
           'type' => $crime['crime_type'],
           'lat' => $crime['lat'], 
           'lon' => $crime['long'], 
           'address' => $crime['address'],
           'time' => date('g:ia',$dt)
        );
    }
}
echo json_encode(array(
    'info'=>$info,
    'crime'=>array(
        'crimes' => $crimes,
        'types' => $types,
        'times' => $times
    )
    ));
?>
