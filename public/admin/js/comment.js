$(function () {
  // 进度条
  //  ajaxStart 所有的 ajax 开始调用
  $(document).ajaxStart(function () {
    NProgress.start()
  })
  // ajaxStop 所有的 ajax 结束调用
  $(document).ajaxStop(function () {
    // 模拟网络延迟
    setTimeout(function () {
      NProgress.done()
    }, 500)
  })

  // 模态框 
  $('.icon_logoout').click(function () {
    // 让模态框显示
    $('#logoutModal').modal("show");
  })

  //  二级分类切换功能
  $('.category').click(function () {
    $(this).next().stop().slideToggle();
  });
  //  顶部菜单栏切换显示功能
  $('.icon_menu').click(function () {
    $('.lt_aside').toggleClass("hidemenu");
    $('.lt_main').toggleClass("hidemenu");
    $('.lt_topbar').toggleClass("hidemenu");
  });

  //  logoutBtn 退出按钮, 点击事件
  $('#logoutBtn').click(function () {

    // 访问退出接口, 进行退出
    $.ajax({
      url: "/employee/employeeLogout",
      type: "get",
      dataType: "json",
      success: function (info) {

        if (info.success) {
          location.href = "login.html"
        }
      }
    })
  })

})
// 封装分页
    function paginator(info,render) {
      $('#paginator').bootstrapPaginator({
        // 版本号
        bootstrapMajorVersion: 3,
        // 当前页
        currentPage: info.page,
        // 总页数
        totalPages: Math.ceil(info.total / info.size),
  
        // 给页码添加点击事件
        onPageClicked: function (a, b, c, page) {
          // 将选中的页码更新到 currentPage
          // currentPage = page;
          // 重新渲染
          render(page);
        }
      })
    }