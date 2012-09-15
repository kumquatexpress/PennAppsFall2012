$(document).ready(function() {
    $('#search_form').submit(function() {
          event.preventDefault();
          var val = search($('#search_input').val());
          console.log(val);
              $('.overlay').each(function() {
                            $(this).fadeOut();
                    });
              $('#map_canvas').animate({width: "75%"},700,function(){
                    $('#sidebar').css('z-index','1');
              });
      });
    $('#search_input').focus();
    $('.controls .search').click(function(){
          $('#search_input').val('');
          $('#sidebar').css('z-index','-1');
          $('#map_canvas').animate({width: "100%"},700,function(){
              $('.overlay').each(function() {
                            $(this).fadeIn();
                    });
            });
    });
    $('.sublet').hover(function() {
        $(this).toggleClass('hovered');
        $(this).animate({height: "100px"},300);
    }, function(){
        $(this).animate({height: "60px"},300,function() {
            $(this).toggleClass('hovered');
        });
    });
});