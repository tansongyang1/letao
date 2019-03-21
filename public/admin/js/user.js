$(function () {
  var currentPage = 1;
  var pageSize = 5;
  render();
  // 渲染
  function render() {
    $.ajax({
      url: '/user/queryUser',
      type: 'get',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      // dataType: 'json',
      success: function (info) {
        // console.log(info);

        var tmp = template("tmp", info);
        $('tbody').html(tmp);
        // page();
        // 分页初始化
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
            currentPage = page;
            // 重新渲染
            render();
          }
        })
      }

    })
  }


})