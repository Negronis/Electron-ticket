document.addEventListener('DOMNodeInserted', function(event){
  // 页面内容加载之前需要引入的一些代码
  if(!window['require']){
    window['require'] = require;
  }
});
document.addEventListener('DOMContentLoaded', function(event) {
  // 页面内容加载之后需要引入的一些操作

})
