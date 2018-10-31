
/*
  功能：实现让盒子从向右运动
  参数：
    node 标识将来要运动哪个元素 元素节点
    targetValue 目标值 数字
    v 用户传入代码  函数 可选的
*/
function animate(node, targetValue,v) {
  clearInterval(node.num);
  node.num = setInterval(function () {
    // 获取原有的值
    var x = node.offsetLeft;
    // 判断是否到达目标
    if (x == targetValue) {
      clearInterval(node.num);
      if (v instanceof Function) {
        v();
      }
      return;
    }
    // 表示的是没一段时间要做多远（步长）
    //公式 var step = (目标值 - 原有值) / 基数
    // 基数越大，运动速度越快。基数越小，运动速度越慢
    var step = (targetValue - x) / 10;
    if (step > 0) {
      step = Math.ceil(step);
    } else {
      step = Math.floor(step);
    }
    node.style.left = x + step + 'px';
  }, 10);
}