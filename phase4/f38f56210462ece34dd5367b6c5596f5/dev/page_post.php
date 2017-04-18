<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <meta name="All Things Fresh and Frugal" content="">
    <meta name="Niveah Abraham" content="">
    <title>Search- Freshtables</title>

    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
     <link href="css/freshtables.css" rel="stylesheet">

    <!-- Theme CSS -->
    <link href="css/business-casual.css" rel="stylesheet">

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Josefin+Slab:100,300,400,600,700,100italic,300italic,400italic,600italic,700italic" rel="stylesheet" type="text/css">


   
     
</head>

<body>
	  <div class="tagline-upper text-center text-heading text-shadow text-white mt-4 hidden-md-down">Freshtables!!</div>
    <div class="tagline-lower text-center text-expanded text-shadow text-uppercase text-white mb-4 hidden-md-down">Niveah Abraham</div>

    <!-- Navigation -->
    <nav class="navbar navbar-toggleable-md navbar-light navbar-custom bg-faded py-lg-4">
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarExample" aria-controls="navbarExample" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="container">
            <a class="navbar-brand text-uppercase text-expanded font-weight-bold hidden-lg-up" href="#">Freshtables</a>
            <div class="collapse navbar-collapse" id="navbarExample">
                <ul class="navbar-nav mx-auto">
                    <li class="nav-item active px-lg-4">
                        <a class="nav-link text-uppercase text-expanded" href="index.html">Home </a>
                    </li>
                     <li class="nav-item px-lg-4">
                        <a class="nav-link text-uppercase text-expanded" href="search.html">Search<span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item px-lg-4">
                        <a class="nav-link text-uppercase text-expanded" href="about.html">About</a>
                    </li>
                    <li class="nav-item px-lg-4">
                        <a class="nav-link text-uppercase text-expanded" href="contact.html">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
<div class="bg-faded p-4 my-4">
            <hr class="divider">
            <h2 class="text-center text-lg text-uppercase my-0">Your Total Current<strong> Cost for veggies during the <?php echo date('F');?> season</strong></h2>
            <hr class="divider">
            <div class="wrapper">
           
            </div>
<div id align="center">
            <?php
 

$month = date('n'); //month
//echo $month;
$content = explode("\r\n",file_get_contents("Data/vegetables.csv"));
//remove the first entry = header
array_shift($content);

// make a multi-dimentional array
foreach( $content as $entry=>$str )
    $content[$entry] = explode(",",$str);

// make array to store results
$vegs = array();
$cost = array();

// put emails in to new array
foreach( $content as $entry ){
    array_push($vegs, $entry[0] );
    $cost[$entry[0]] = $entry[$month];
}

unset( $content );
$array_get = $_GET;

$total=0;
//print_r($vegs);
//print_r($cost);


foreach($array_get as $key => $value){
    //echo $key . " : " . $value . "<br>";
    ?>
  
    <h2 class="text-center text-lg text-uppercase my-0"> <?php if($value!=0){echo $key; echo " - "; echo $value; echo " * "; echo $cost[$key]; echo "/ pound"; }  ?></h2>
    <?php
    $total = $total + (float)$value*(float)$cost[$key];
   
    
}
//echo "Your Total cost is: $";
//echo $total;


            ?>
            <hr class="divider">
            <h2 class="text-center text-lg text-uppercase my-0" style="color:#ff0000"> <?php echo "Total Cost = $"; echo $total;?></h2>
            <hr class="divider">
            
 </div>
    </div>
</body
</html>