$(function () {
  var pageSize = 5;
  var currentPage;
  render(1)

  function render(page) {
    // console.log(page)
    $.ajax({
      url: '/product/queryProductDetailList',
      type: 'get',
      data: {
        page: page,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var tmp = template("prt", info);
        $('tbody').html(tmp);
        currentPage = info.page
        paginator(info, render);
      }
    })
  }
})