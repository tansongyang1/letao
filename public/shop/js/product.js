$(function () {

  var productId = getSearch('productId')
  $.ajax({
    url: '/product/queryProductDetail',
    type: 'get',
    data: {
      id: productId
    },
    dataType: 'json',
    success: function (info) {
      console.log(info)
      $('.lt_main .mui-scroll').html(template('mmp', info));
      // 手动初始化轮播图
      // 获得slider插件对象
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 3000 //自动轮播周期，若为0则不自动播放，默认为0；
      });
      // 手动初始化 数字框
      mui('.mui-numbox').numbox();
    }


  })
  // 选中尺码
  $('.lt_main').on('click', '.lt_size span', function () {
    $(this).addClass('current').siblings().removeClass('current')
  })
  // 添加购物车

  $('#addCart').on('click', function () {
    var size = $('.lt_size span.current').text() //尺码
    var num = $('.mui-numbox-input').val() //数量
    if (!size) {
      mui.toast('请选择尺码')
      return
    }
    $.ajax({
      type: 'post',
      url: '/cart/addCart',
      data: {
        productId: productId,
        num: num,
        size: size
      },
      success: function (info) {
        console.log(info);
        if (info.success) {
          // 添加成功, 弹出一个确认框
          mui.confirm("添加成功", "温馨提示", ["去购物车", "继续浏览"], function (e) {
            if (e.index === 0) {
              // 去购物车
              location.href = "cart.html";
            }
          })
        }

        if (info.error === 400) {
          // 跳转到登录页, 将来登录成功, 需要跳回来
          // 可以将当前页面的地址传递给登录页, 将来登录成功后, 获取传递过来的地址, 跳回来
          location.href = "login.html?retUrl=" + location.href;
        }


      }

    })
  })


})