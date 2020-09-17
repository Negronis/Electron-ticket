// function throttle
let Throttle = function (func) {
   let time;
   return function () {
      if (time) {
         return;
      }
      time = setTimeout(() => {
         func();
         time = null ; 
         clearInterval(time);
      }, 500)
   }
}
module.exports = {
   Throttle
}