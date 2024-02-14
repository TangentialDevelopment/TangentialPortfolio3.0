function init() {
    section = '.'
    $('.experience').addClass('hide');
    $('.education').addClass('hide');
    
    $('.selector').on('click', function click(){
      $('.current').removeClass("current");
      $('.container-fluid').addClass('hide');
  
      $(this).addClass('current');
      text = section +this.innerHTML.toLowerCase();
      $(text).removeClass('hide');
    });
  }
  
  init();