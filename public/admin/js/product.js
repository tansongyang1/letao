$(function () {
  var pageSize = 5;
  var currentPage;
  var picArr = []; // 用来 存图片
  render(1)
  // 模态框
  $('#addbtn').on('click', function () {
    $('#addModal').modal('show')
    $.ajax({
      url: "/category/querySecondCategoryPaging",
      type: 'get',
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (info) {
        // console.log(info);
        $('.dropdown-menu').html(template('erd', info))
      }
    })
  })
  //事件委托
  $('.dropdown-menu').on('click', 'a', function () {
    var txt = $(this).text();
    // console.log(txt)
    var id = $(this).data('id')
    // console.log(id)
    $('.dropdown-text').text(txt)
    $('[name="brandId"]').val(id)
    $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID")
  })
  // 上传图片
  $("#filess").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      // console.log(data);
      // 获取图片地址对象
      var picObj = data.result;
      // 获取图片地址
      var picAddr = picObj.picAddr
      // 将获取到的图片地址对象放在数组的最前面
      picArr.unshift(picObj)
      // 将图片添加到预览
      $('#img').prepend('<img src = "' + picAddr + '" width= "100">')
      // 判断上传图片的长度
      if (picArr.length > 3) {
        // 删除数组的最一项
        picArr.pop()
        // 将预览最后一张图片删掉
        $('#img img:last-of-type').remove()
      }
      if (picArr.length === 3) {
        $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID")
      }


    }
  });
  // 表单校验
  $('#form').bootstrapValidator({
    // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-hand-right',
      invalid: 'glyphicon glyphicon-hand-left',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      //校验用户名，对应name表单的name属性
      // 二级分类
      brandId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },
      // 商品名称
      proName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品名称'
          }
        }
      },
      // 商品描述
      proDesc: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品描述'
          }
        }
      },
      // 商品库存
      num: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品库存'
          },
          //正则校验
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存格式, 必须是非零开头的数字'
          }
        }
      },
      // 商品尺码
      size: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品尺码'
          },
          //正则校验
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺码格式, 必须是 32-40'
          }
        }
      },
      // 商品原价
      oldPrice: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品原价'
          }
        }
      },
      // 商品现价
      price: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品现价'
          }
        }
      },
      // 上传图片
      picStatus: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请上传三张图片'
          }
        }
      }
    }
  })

  // 阻止默认提交
  $("#form").on("success.form.bv", function (e) {
    // 阻止默认的提交
    e.preventDefault();
    console.log(JSON.stringify(picArr));
    
    var pars = $("#form").serialize()
    pars += '&picArr=' + JSON.stringify(picArr);
    console.log(pars);
    
    $.ajax({
      url: '/product/addProduct',
      type: 'post',
      data: pars,
      success: function (info) {
        console.log(info);
       if(info.success){
        $('#addModal').modal('hide')
        $('#form').data("bootstrapValidator").resetForm(true);
        render(1)
        // 找到下拉菜单文本重置
        $('.dropdown-text').text("请选择二级分类")
        // 找到图片重置
        $('#img img').remove()
        picArr = []

       }
      }
    })

  })




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
        // console.log(info);
        var tmp = template("prt", info);
        $('tbody').html(tmp);
        currentPage = info.page
        paginator(info, render);
      }
    })
  }
})