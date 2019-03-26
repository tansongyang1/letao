$(function () {
  render()

  function render() {
    $.ajax({
      url: '/cart/queryCart',
      type: 'get',
      dataType: "json",
      success: function (info) {
        console.log(info);
        if (info.error === 400) {
          // 用户没登陆, 跳转到登录页, 在跳转时, 将页面地址拼接
          location.href = "login.html?retUrl=" + location.href;
          return;
        }

        $('.lt_main ul').html(template('lt_cart', {
          arr: info
        }))


      }
    })
  }

  $('.lt_main').on('click', '.btn_delete', function (e) {
    // e.preventDefault()
    var id = $(this).data('id');
    console.log(id);
    $.ajax({
      type: 'get',
      url: '/cart/deleteCart',
      data: {
        id: [id]
      },
      success: function (info) {
        console.log(info);

        if (info.success) {
          render()
        }

      }
    })

  })


})