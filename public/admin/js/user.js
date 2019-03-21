$(function () {
  var pageSize = 5;
  var currentPage;
  render(1)
  var id, isDelete;
  $('tbody').on('click', '.btn', function () {
    // console.log(11);
    $('#userModal').modal('show')
    id = $(this).parent().data("id");
    isDelete = $(this).text() === '启用' ? 1 : 0;
  })
  $('.updata').on('click', function () {
    // 发送ajax请求
    $.ajax({
      type: 'post',
      url: '/user/updateUser',
      data: {
        id: id,
        isDelete: isDelete
      },
      success: function (info) {
        if (info.success) {

          // 关闭模态框
          $('#userModal').modal('hide')
          // 重新渲染
          render(currentPage)
        }
      }
    })
  })


  // 渲染
  function render(page) {
    // console.log(page)
    $.ajax({
      url: '/user/queryUser',
      type: 'get',
      data: {
        page: page,
        pageSize: pageSize
      },
      // dataType: 'json',
      success: function (info) {
        // console.log(info);
        var tmp = template("tmp", info);
        $('tbody').html(tmp);
        currentPage = info.page
        paginator(info, render);
      }
    })
  }


})











// // 分页初始化
// $('#paginator').bootstrapPaginator({
//   // 版本号
//   bootstrapMajorVersion: 3,
//   // 当前页
//   currentPage: info.page,
//   // 总页数
//   totalPages: Math.ceil(info.total / info.size),

//   // 给页码添加点击事件
//   onPageClicked: function (a, b, c, page) {
//     // 将选中的页码更新到 currentPage
//     currentPage = page;
//     // 重新渲染
//     render();
//   }
// })