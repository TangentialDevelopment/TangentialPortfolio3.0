function init() {
  $(window).ready(function() {
    $('.popup-load').show();
    $('#overlay').show();

    // scroll disable
    // if ('scrollRestoration' in history) {
    //   history.scrollRestoration = 'manual';
    // }

    // window.scrollTo(0,0);
  });

  setInterval(function() {
    var display = document.getElementById('cursor').style.display;
    document.getElementById('cursor').style.display = (display == 'inline') ? 'none' : 'inline';
  }, 450);

  let section = '.'
    // $('.experience').addClass('hide');
    $('.education').addClass('hide');
    $('.games').addClass('hide');
    
    $('.selector').on('click', function click(){
      $('.current').removeClass("current");
      $('.container-fluid').addClass('hide');
      $('.skills-row').hide();
  
      $(this).addClass('current');
      // if (this.innerHTML == 'Skills') {
      //   $('.skills-row').show();
      // }
      text = section +this.innerHTML.toLowerCase();
      text = text.split(' ')[0];
      $(text).removeClass('hide');
    });

    // $('#webdev').hover(
    //   function() {
    //     $('.row-1').addClass('clicked');
    //     $('.row-2').addClass('clicked');
    //   }, function() {
    //     $('.row-1').removeClass('clicked');
    //     $('.row-2').removeClass('clicked');
    //   }
    // )

    // $('#ux').hover(
    //   function() {
    //     $('.row-3').addClass('clicked');
    //   }, function() {
    //     $('.row-3').removeClass('clicked');
    //   }
    // )

    //the overlay
    document.addEventListener("click", (event) => {
      $('.popup-load').hide();
      $('#overlay').hide();
    });
}

init();