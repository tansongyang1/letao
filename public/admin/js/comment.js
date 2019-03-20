$(function () {
  //  ajaxStart 所有的 ajax 开始调用
  $(document).ajaxStart(function () {
    NProgress.start();
  });


  // ajaxStop 所有的 ajax 结束调用
  $(document).ajaxStop(function () {
    // 模拟网络延迟
    setTimeout(function () {
      NProgress.done();
    }, 500)
  });
})