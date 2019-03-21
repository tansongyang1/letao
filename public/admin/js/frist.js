$(function () {
  var pageSize = 5;
  var currentPage;
  render(1)

  // 模态框
  $('#addbtn').on('click', function () {
    $('#addModal').modal('show')
  })
  // 表单校验
  var $form = $('#form')
  $form.bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-hand-right',
      invalid: 'glyphicon glyphicon-hand-left',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '一级分类名不能为空'
          }
        }
      }
    }
  })
  $form.on('success.form.bv', function (e) {
    // 阻止浏览器的默认行为
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: $form.serialize(),
      success: function (info) {
        console.log(info);
        if (info.success) {
          // 关闭模态框
          $('#addModal').modal('hide')
          // 重置表单
          $form.data('bootstrapValidator').resetForm(true)
          render(1)
        }

      }
    })
  })

  function render(page) {
    // console.log(page)
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      type: 'get',
      data: {
        page: page,
        pageSize: pageSize
      },
      // dataType: 'json',
      success: function (info) {
        console.log(info);
        var tmp = template("mp", info);
        $('tbody').html(tmp);
        currentPage = info.page
        paginator(info, render);
      }
    })
  }

})
