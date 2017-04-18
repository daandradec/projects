<?php

$type = $_POST['type'];
$url = $_POST['linkAddress'];

switch($type){

	case "zillowData":
		header('Content-type: application/xml');
		$id = $_POST['id'];
		$address = $_POST['houseAddress'];
		$cityCode = $_POST['cityCode'];
		$url = $url . "?" .  "zws-id=" . $id . "&" . "address=" . $address . "&" . "citystatezip=" .  $cityCode . "&" . "rentzestimate=true";
		break;

	case "rentrentData":
		header('Content-type:text/plain');
		break;

	case "realStateUsa":
		header("Content-type: text/x-csv");
		break;
		
	default :
		echo "error No Valid Type";
		break;	
}

$handle = fopen($url, "r");
			if ($handle) {
			   while (!feof($handle)) {
			        $buffer = fgets($handle, 4096);
			        echo $buffer;
			    }
			    fclose($handle);
			}
?>