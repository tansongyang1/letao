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


// 封装分页
function paginator(info, render) {
  // console.log(info)
  $('#paginator').bootstrapPaginator({
    // 版本号
    bootstrapMajorVersion: 3,
    // size: 调整尺寸
    size: 'normal',
    // 当前页
    currentPage: info.page,
    // 显示多少页
    numberOfPages: 10,
    // 使用bootstrap的tooltip组件
    useBootstrapTooltip: true,
    // 控制每个按钮的显示内容
    itemTexts: function (type, page, current) {
      // console.log(type, page, current)
      switch (type) {
        case 'first':
          return '首页'
        case 'prev':
          return '上一页'
        case 'next':
          return '下一页'
        case 'last':
          return '尾页'
        default:
          return page
      }
    },
    // 总页数
    totalPages: Math.ceil(info.total / info.size),

    // 给页码添加点击事件
    onPageClicked: function (a, b, c, p) {
      // 将选中的页码更新到 currentPage
      currentPage = p;
      // 重新渲染
      render(currentPage);
    }
  })
}