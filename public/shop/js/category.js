$(function () {

  var renderleft = function () {
    $.ajax({
      url: '/category/queryTopCategory',
      type: 'get',
      success: function (info) {
        console.log(info);
        $('.lt_category_left ul').html(template('category_left', info))
        renderright(info.rows[0].id)
      }
    })
  }

  renderleft();
  $('.lt_category_left').on('click','li',function(){
    $(this).addClass('current').siblings().removeClass('current');
    var id = $(this).data('id')
    renderright(id)
  })








  var renderright = function (id) {
    $.ajax({
      url: '/category/querySecondCategory',
      type: 'get',
      data: {
        id: id
      },
      success: function (info) {
        console.log(info)
        $('.lt_category_right ul').html(template('category_right', info))
      }
    })
  }




















})