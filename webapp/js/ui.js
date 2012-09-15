$(document).ready(function() {
    $('#search_form').submit(function() {
              event.preventDefault();
              $('.overlay').each(function() {
                            $(this).fadeOut();
                    });
              $('#map_canvas').animate({width: "75%"},2000,function(){
                                                                                                                            $('#sidebar').css('z-index','1');
                                                                                                                            });
      });
    $('#')
});