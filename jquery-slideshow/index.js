$(function() {
  var $li = $('.slideshow li');
  var count = $li.length-1;
  //右边按钮
  $('.slideshow .right').on('click',function(){
    count--;
    //当切换到最后一张图片时，下一张为第一张图片
    count = count == -1?$li.length-1:count;
    $li.eq(count).fadeIn().siblings().fadeOut();
  })
  //左边按钮
  $('.slideshow .left').on('click',function(){
    count++;
    count = count == $li.length?0:count;
    $li.eq(count).fadeIn().siblings().fadeOut();
  })
});
