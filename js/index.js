//index.js

//左侧菜单栏统计分析的下拉菜单
$("#menu_ana").click(function(event){

    /*切换折叠指示图标*/
    $(this).find("span:last").toggleClass("glyphicon-chevron-down");
    $(this).find("span:last").toggleClass("glyphicon-chevron-up");
    $(this).next("#down_menu").toggleClass('change_display');

 });


 //顶部标签页点击切换
$(".main").find("li").click(function(event){

  $(this).addClass("active")
  .siblings('li').removeClass("active");

  var index = $(".tab_ul li").index(this);
  $(".main>#content>div").eq(index).show()
  .siblings("div").hide();

});


 //标签页的关闭
$(".main").find("span").click(function(event) {

  var $tab_li = $(this).parent().parent("li");
  $tab_li.hide();
  
  if($tab_li.hasClass('active')){
    $tab_li.removeClass("active");
    var $tab_li_left = $tab_li.prev();
    
    //display是css样式，不能用attr()方法，只能用css()
    while($tab_li_left.css('display') == "none"){
      $tab_li_left = $tab_li_left.prev();
    }

    $tab_li_left.addClass('active');
    var index = $(".tab_ul li").index($tab_li_left);
    $(".main>#content>div").eq(index).show()
    .siblings("div").hide();
  }

  //阻止事件冒泡很关键，不然会触发切换标签栏的点击事件
  event.stopPropagation();

});


 //点击左侧出现标签页
$(".sidebar").find('li[data-index]').click(function(event) {

   var index = $(".sidebar li[data-index]").index(this);
    
   $(".tab_ul li").eq(index).show().addClass('active')
   .siblings('li').removeClass('active');

   $(".main>#content>div").eq(index).show()
   .siblings("div").hide();

});



 // 点击加号出现模态框，添加或删除自定义导航栏
$("#add_my_nav").click(function(event) {
   /* Act on the event */
   $('#myModal').modal({
     keyboard: true
   })

});
