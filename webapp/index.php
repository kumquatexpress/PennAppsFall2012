<!DOCTYPE html>
<html>

  <head>

    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">


    <script src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>
    <script type="text/javascript" src="js/jquery-1.8.1.js"></script>
    <script type="text/javascript" src="js/maps.js"></script>
    <script type="text/javascript" src='js/ui.js'></script>
    <script type="text/javascript" src="http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobubble/src/infobubble.js"></script>

  </head>
    <link rel=stylesheet href="css/style.css" type="text/css" media=screen>
<body>
  <div id="search_overlay" class="overlay"></div>
    <form id="search_form">
    <input class="overlay" placeholder="search for a place..." id="search_input" />
    </form>
    <div id="map_canvas"></div>
<div id="sidebar">
	<div class='content'>
        <div class="controls">
            <a class='search' href='#'>
            	<img src='img/back_64.png'/><span>search</span>
            </a>
            <a class='back' href='#'>
            	<img src='img/back_64.png'/><span>back</span>
            </a>
        </div>
        <div style="clear:both"></div>
        <div class="results">
            <div class="sublet">
            	<div class="glance">
                    <div class="rating"><img src="img/32/80.png" /></div>
                    <div class="price">$900</div>
                </div>
                <div class='info'>
                    <div class="title"><span class="type">2BR 3BATH</span></div>
                    <div class="description">This is a fine apartment over lookin the river on a nice lake in front of a city dump. Call for details!</div>
            </div>
        </div>
    </div>
</div>
  </body>
</html>