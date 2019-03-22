$(function () {
  var pageSize = 5;
  var currentPage;
  render(1)

  // 模态框
  $('#addbtn').on('click', function () {
    $('#secondModal').modal('show')
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      type: 'get',
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        // console.log(info);
        $('.dropdown-menu').html(template('logo', info))
      }
    })
  })
  $('.dropdown-menu').on('click', 'a', function () {
    var txt = $(this).text();
    console.log(txt);
    var id = $(this).data('id')
    console.log(id);
    $('.dropdown-text').text(txt)
    $('[name="categoryId"]').val( id )
    $('#form2').data("bootstrapValidator").updateStatus("categoryId", "VALID")
  })
  // 文件上传
  $("#filess").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      console.log(data);
      var picAddr = data.result.picAddr;
      // 设置图片路径
      $('#img img').attr('src', picAddr)
      // 将路径存储到隐藏域input上
      $('[name="brandLogo"]').val( picAddr )
          // 重置校验状态
          $('#form2').data("bootstrapValidator").updateStatus("brandLogo", "VALID")
    }
  });
  // 表单校验
  $("#form2").bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-hand-right',
      invalid: 'glyphicon glyphicon-hand-left',
      validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      categoryId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      brandLogo: {
          validators: {
            //不能为空
            notEmpty: {
              message: '请上传图片'
            }
          }
        },

        brandName: {
            validators: {
              //不能为空
              notEmpty: {
                message: '请输入二级分类'
              }
            }
          }
        
      
    }
  })
  $("#form2").on('success.form.bv', function (e) {
    e.preventDefault();
    console.log($("#form2").serialize());
    
    $.ajax({
      url:'/category/addSecondCategory',
      type : 'post',
      data : $("#form2").serialize(),
      success : function(info){
        console.log(info);
        
        $('#secondModal').modal('hide')
        $('#form2').data("bootstrapValidator").resetForm( true );
        render(1)
         // 找到下拉菜单文本重置
         $('.dropdown-text').text("请选择1级分类")
         // 找到图片重置
         $('#img img').attr("src", "images/none.png")

      }
    })
});


  function render(page) {
    // console.log(page)
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      type: 'get',
      data: {
        page: page,
        pageSize: pageSize
      },
      // dataType: 'json',
      success: function (info) {
        console.log(info);
        var tmp = template("sed", info);
        $('tbody').html(tmp);
        currentPage = info.page
        paginator(info, render);
      }
    })
  }
})