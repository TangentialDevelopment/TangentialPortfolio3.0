function init() {
  // const content1 = document.getElementsByClassName('content1');
  // const content2 = document.getElementsByClassName('content2');
  // const content3 = document.getElementsByClassName('content3');

  // for (var i=0;i<content2.length;i+=1) {
  //   content2[i].style.display = "none";
  // }
  // content2[0].style.display='none';
  const selector = '.content';
  
  $('.content2').addClass('hide');
  $('.content3').addClass('hide');
  
  $('.nav-link').on('click', function click(){
    $('.active').removeClass("active");
    $('.content').addClass('hide');

    $(this).addClass('active');
    console.log($(this));

    blocktext = selector + this.id.toString().slice(-1);
    $(blocktext).removeClass('hide');
  });
}

init();