$(function () {
  // 封装读取历史记录
  function gethistory() {
    var history = localStorage.getItem('search_list') || '[]'
    var arr = JSON.parse(history)
    return arr

  }
  // // 读取本地历史记录渲染页面
  // function render() {
  //   var arr = gethistory();
  //   $('.lt_history').html(template('s_history', {
  //     arr: arr
  //   }))

  // }
  // render()
  // 点击搜索添加历史记录
  $('.search_btn').on('click', function () {
    var key = $('.search_input').val()
    console.log(key);
    if (key.trim() === '') {
      mui.toast('请输入关键字', {
        duration: 3000
      })
      return
    }
    // 获取数组
    var arr = gethistory()
    var index = arr.indexOf(key)
    console.log(index);
    if (index > -1) {
      arr.splice(index, 1)
    }
    if (index >= 10) {
      arr.pop()
    }
    arr.unshift(key)
    var jsp = JSON.stringify(arr)
    localStorage.setItem("search_list", jsp)

    location.href = "searchList.html?key=" + key;
  })

  var key = getSearch("key");
  $('.search_input').val(key);
  console.log(key);

  render()
  // 获取数据渲染页面
  function render() {
    $('.lt_product').html('<div class="loading"></div>')

    var params = {}
    params.proName = $('.search_input').val()
    params.page = 1
    params.pageSize = 100

    // 判断是否有current类名进行排序
    var current = $('.lt_sort a.current')
    if (current.length > 0) {
      var sort = current.data('type')
      var value = current.find('i').hasClass('fa-angle-down') ? 2 : 1
      params[sort] = value
    }

    setTimeout(function () {
      $.ajax({
        url: '/product/queryProduct',
        type: 'get',
        data: params,
        dataType: 'json',
        success: function (info) {
          console.log(info);
          $('.lt_product').html(template('prts', info))
        }
      })
    }, 1000)
  }

  // 点击价格或者库存切换类名
  $('.lt_sort a[data-type]').on('click', function () {
    if ($(this).hasClass('current')) {
      $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up')
    } else {
      $(this).addClass('current').siblings().removeClass('current')
      $('.lt_sort i').addClass('fa-angle-down').removeClass('fa-angle-up')

    }

    render()


  })





})