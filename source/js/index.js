function init() {
  $(window).ready(function() {
    // $('.popup-load').show();
    // $('#overlay').show();

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    window.scrollTo(0,0);
  });

  section = '.'
    $('.experience').addClass('hide');
    $('.education').addClass('hide');
    
    $('.selector').on('click', function click(){
      $('.current').removeClass("current");
      $('.container-fluid').addClass('hide');
      $('.skills-row').hide();
  
      $(this).addClass('current');
      if (this.innerHTML == 'Skills') {
        $('.skills-row').show();
      }
      text = section +this.innerHTML.toLowerCase();
      $(text).removeClass('hide');
    });

    $('#webdev').hover(
      function() {
        $('.row-1').addClass('clicked');
        $('.row-2').addClass('clicked');
      }, function() {
        $('.row-1').removeClass('clicked');
        $('.row-2').removeClass('clicked');
      }
    )

    $('#ux').hover(
      function() {
        $('.row-3').addClass('clicked');
      }, function() {
        $('.row-3').removeClass('clicked');
      }
    )

    //the overlay
    $(function() {
      $('.close').click(function() {
        $('.popup-load').hide();
        $('#overlay').hide();
        return false;
      });
    });
}

init();