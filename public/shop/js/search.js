$(function () {

  // 封装读取历史记录
  function gethistory() {
    var history = localStorage.getItem('search_list')
    var arr = JSON.parse(history) || []
    return arr

  }
  // 读取本地历史记录渲染页面
  function render() {
    var arr = gethistory();
    $('.lt_history').html(template('s_history', {
      arr: arr
    }))

  }
  render()

  // 点击清空记录
  $('.lt_history').on('click', '.btn_empty', function () {
    mui.confirm('你确定要清空历史记录？', '温馨提示', ['取消', '确认'], function (e) {
      // 点击确认
      if (e.index == 1) {
        // 移除本地历史
        localStorage.removeItem("search_list");
        // 重新渲染
        render();
      }
    })
  })


  // 删除单条历史记录

  $('.lt_history').on('click', '.btn_delete', function () {
    var that = this
    mui.confirm('你确定要删除此条历史记录？', '温馨提示', ['取消', '确认'], function (e) {
      // 点击确认
      if (e.index == 1) {
        var index = $(that).data('index')
        var arr = gethistory()
        arr.splice(index, 1)
        var jsp = JSON.stringify(arr)

        // 存入本地历史
        localStorage.setItem("search_list", jsp);
        // 重新渲染
        render();
      }
    })
  })
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
    render()
    $('.search_input').val('')

    location.href = "searchList.html?key=" + key;




  })


















})