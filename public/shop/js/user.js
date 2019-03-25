$(function () {

  $.ajax({
    url: '/user/queryUserMessage',
    type: 'get',
    dataType: 'json',
    success: function (info) {
      console.log(info)
      if (info.error === 400) {
        location.href = 'login.html'
        return
      }
      $('#userInfo').html(template('tpl', info))
    }
  })

  $('#logout').on('click', function () {
    $.ajax({
      url: '/user/logout',
      type: 'get',
      dataType: 'json',
      success: function (info) {
        if (info.success) {
          // 退出成功, 跳转到登录页
          location.href = "login.html";
        }


      }


    })





  })





})