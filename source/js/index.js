function init() {
  // const content1 = document.getElementsByClassName('content1');
  // const content2 = document.getElementsByClassName('content2');
  // const content3 = document.getElementsByClassName('content3');

  // for (var i=0;i<content2.length;i+=1) {
  //   content2[i].style.display = "none";
  // }
  // content2[0].style.display='none';
  // const selector = '.content';
  
  // $('.content2').addClass('hide');
  // $('.content3').addClass('hide');
  
  // $('.nav-link').on('click', function click(){
  //   $('.active').removeClass("active");
  //   $('.content').addClass('hide');

  //   $(this).addClass('active');
    
  //   blocktext = selector + this.id.toString().slice(-1);
  //   $(blocktext).removeClass('hide');
  // });
  
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
      var overlay = $('#overlay');
      overlay.show();
      $('.popup-load').show();
      $('.close').click(function() {
        $('.popup-load').hide();
        overlay.appendTo(document.body).remove();
        return false;
      });
    });
}

init();