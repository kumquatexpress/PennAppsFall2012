var map;
var heatmap;
var app_state;
var sublet_markers = [];
var mapped_sublets = [];
var crime_markers = [];
var geocoder;
var sublets;

var t;

function initialize() {
      
    var center_lat = 39.8282;
    var center_long = -98.5795;
    var center = new google.maps.LatLng(center_lat, center_long);
  
    var mapOptions = {
        zoom: 5,
        center: center,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        backgroundColor: "black"
    };
    map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
    geocoder = new google.maps.Geocoder();

    eventListeners();
}

function doOnDelay(func, timeout) {
    clearTimeout(t);
    t = setTimeout(func,timeout);
}

function onMapChange() {
    doOnDelay(function() {
        updateCrimeMap();
        plotSublets(app_state == 'results');
    },500);
}

function eventListeners(){
    google.maps.event.addListener(map, 'zoom_changed', 
        onMapChange);
    google.maps.event.addListener(map, 'center_changed', 
        onMapChange);
    $('#search_form').submit(function() {
        event.preventDefault();
        search($('#search_input').val());
        plotSublets(true);
    });
    $('.back').click(function(){
        plotSublets(true);
    });
    $('.search').click(function(){
        setState('search');
    });
}


function generateMarker(type, lat, lon, image_url){
    var location = new google.maps.LatLng(lat, lon);

    marker = new google.maps.Marker({
        map:map,
        draggable:false,
        animation: google.maps.Animation.DROP,
        position: location,
        icon: image_url
    });
    if(type=="sublet") {
        sublet_markers.push(marker); 
    }
    else {
        crime_markers.push(marker);
    }
}

function clearCrimes(){
    if (crime_markers) {
        for (var i = 0; i < crime_markers.length; i++ ) {
            crime_markers[i].setMap(null);
        }
    }
    crime_markers = [];
}

function getViewport() {
    
    var viewport_ne = map.getBounds().getNorthEast();
    var viewport_sw = map.getBounds().getSouthWest();
                
    data = 
    {
        "max_lat": viewport_ne.lat(),
        "min_lat": viewport_sw.lat(),
        "max_lon": viewport_ne.lng(),
        "min_lon": viewport_sw.lng()
    }
    return data;
}


function updateCrimeMap(){
    console.log("Updating crime map...");
    $.getJSON("http://maps.hulce.net/crimes.php", getViewport(), function(data){
        var heatmapData = [];
        for(var i=0;i<data.length;i++) {
            var the_point = data[i];
            var elem = {
                location: new google.maps.LatLng(the_point.lat,the_point.lon),
                weight : the_point.level
            };
            heatmapData.push(elem);
        }
      
        if(heatmap!=null) {
            heatmap.setMap(null);
        }
        var rad;
        var z = map.getZoom();
        if(z < 13) {
            rad = 10;
        }
        if(z < 14) {
            rad = 20;
        }
        else if(z < 15) {
            rad = 40;
        }
        else {
            rad = 70;
        }
        heatmap = new google.maps.visualization.HeatmapLayer({
            data: heatmapData,
            radius: rad
        });
        console.log(heatmapData.length);
        heatmap.setMap(map);
    console.log("Done loading crime map...");
    });

}

function plotSublets(set_results) {
    console.log("Plotting sublets...");
    if(set_results) {
        setState('results');
    }
    $.getJSON('sublets.php',getViewport(),function(data) {
        if(set_results) {
            $('.results').html('');
        }
        for(i=0;i<data.length;i++) {
            var sub = data[i];
            if($.inArray(sub.id,mapped_sublets)==-1) {
                generateMarker('sublet',sub.lat,sub.lon,'img/sublet.png');
                mapped_sublets.push(sub.id);
            }
            if(set_results) {
                $('.results').append(
                    "<div class='sublet'><span class='identifier'>"+sub.id+"</span>"+
                    "<div class='glance'>"+
                    "<div class='rating'><img src='"+sub.image+"' /></div>"+
                    "<div class='price'>$"+sub.price+"</div>"+
                    "</div>"+
                    "<div class='info'>"+
                    "<div class='title'><span class='type'>"+sub.size+"</span></div>"+
                    "<div class='description'>"+sub.description+"</div>"+
                    "</div>\n\
</div>"
                    );
            }
            
        }
        if(set_results) {
            $('.sublet').click(function(){
                setSubletDetails($(this).find('.identifier').text());
            });
        }
    console.log("Done plotting sublets...");
        
    });
}

function setState(state) {
    switch(state) {
        case "search":
            $('#search_input').val("");
            $('#search_input').focus();
            $('#sidebar').fadeOut();
            $('.overlay').each(function(){
                $(this).fadeIn();
            });
            $('.results').html('');
            app_state = "search";
            break;
        case "results":
            if(app_state == 'details') {
                $('.back').css('display',"none");
                $('.search').css('display',"inline");
            }
            $('#sidebar').fadeIn();
            $('.overlay').each(function(){
                $(this).fadeOut();
            });
            $('.results').html("<img class='loading' src='img/loading.gif'/>");
            app_state = "results";
            break;
        case "details":
            $('#sidebar').fadeIn();
            $('.overlay').each(function(){
                $(this).fadeOut();
            });
            $('.back').css('display',"inline");
            $('.search').css('display',"none");
            $('.results').html("<img class='loading' src='img/loading.gif'/>");
            app_state = "details";
            break;
    }
}

function generateSubletBubble(sub, marker){
    var contentString = 
    '<div class="marker-info">'+'<div class="clheader">'+sub.description+
    '<div class="address">Address: '+
    sub.address+'</div><div class="price">Price: $'+
    sub.price+'</div>'+'<div class="link">Craigslist Ad: '+
    sub.listing_url+'</div></div>';

    bubble = new InfoBubble({
        maxWidth: 300,
        content: contentString,
        disableAutoPan: true,
        hideCloseButton: true
    });


    google.maps.event.addListener(marker, 'mouseover', function() {
        if (!bubble.isOpen()) {
            infoBubble.open(map, marker);
        //updateStyles();
        }
    });
    google.maps.event.addListener(marker, 'mouseout', function() {
        if (bubble.isOpen()) {
            infoBubble.close(map, marker);
        }
    });
        


}

function search(address){
    geocoder.geocode( {
        'address': address
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.panTo(results[0].geometry.location);
            map.setZoom(15);
        } else {
            console.log(status);
            $('#search_input').animate({
                margin: '45% 31% 0%'
            },100,function(){});
            $('#search_input').animate({
                margin: '45% 30% 0%'
            },100,function(){});
            $('#search_input').animate({
                margin: '45% 31% 0%'
            },100,function(){});
            $('#search_input').animate({
                margin: '45% 30% 0%'
            },100,function(){});
        }
    });
}




function setSubletDetails(id) {
    
    setState('details');
    $.getJSON('/details.php', {
        'id': id
    }, function(data){
        if(data.info.price>0) {
            $('.results').html('');
            console.log('sublet loaded');
            console.log(data);
            map.panTo(
                new google.maps.LatLng(data.info.lat, data.info.lon)
                );
            var crimes = "<div class='crime-box'>";
            for(var i=0;i<data.crime.crimes.length;i++) {
                var crime = data.crime.crimes[i];
                crimes += "<div class='crime'><img src='"+crime.type+".png'/>"+crime.address+" at "+crime.time+"</div>";
            }
            crimes += "</div>";
            $('.results').html(
                "<div class='sublet-detail'>"+
                "<div class='title'>"+data.info.description+"</div>"+
                "<div class='crime-data'>"+crimes+"</div>"+
                "</div>"
                );
        }
        else {
            setState('results');
        }
            
    });
}
$(document).ready(function() {
    initialize();
    $('#search_input').focus();
});