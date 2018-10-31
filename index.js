// 样式设计上：目前是在一行显示的（定位）。
// 将来在轮播图操作中，不论怎么操作，本质上都在做一件事。  就是让在轮播区【当前】显示的div  和   【下一个】要显示的div一起轮播。
// 【准备工作】
// 获取左侧按钮
var leftBtn = document.querySelector('#leftBtn');
// 获取右侧按钮
var rightBtn = document.querySelector('#rightBtn');
// 获取ul
var control = document.querySelector('#control');
// 获取一组li
var lis = control.children;
// 获取一组轮播项
var items = document.querySelectorAll('#content .item');
// 获取轮播图模块
var banner = document.querySelector('#banner');
// 定义一个变量表示显示的项的当前索引是多少，默认是0
var index = 0;

// 【功能1：点击右侧按钮实现轮播】
// 1. 给右侧按钮注册点击
rightBtn.onclick = function () {
    // 2. 当前的是index   下一个index++
    // 2.1 当前的显示项向右侧运动（0→ 790）
    animate(items[index], 790);
    // 2.2 把对应的小点点切换样式白色（去掉类名 active）
    lis[index].className = '';
    // 3. 下一个 index++     index 变成了下一个
    index++;
    // 限制索引
    if (index > 6) {
        index = 0;
    }
    // 3.1 下一个显示项，向右侧运动（-790→ 0）
    // 3.2 下一个显示项先设定样式改变left值为 -790
    items[index].style.left = '-790px';
    // 3.3 开始运动
    animate(items[index],0)
    // 3.4 把对应的小点点切换样式红色（加类名 active） 
    lis[index].className = 'active';

    console.log(index);
};


// 【功能2：点左侧按钮实现轮播】
// 1. 给左侧按钮注册点击事件
leftBtn.onclick = function () {
    // 2. 当前的显示项从右向左运动(0→ -790)
    animate(items[index], -790);
    // 3. 对应的小点切换样式变成白色（去掉 active类名）
    lis[index].className = '';
    // 4. 下一项  index--
    index--;
    // 5. 限制索引
    if (index < 0) {
        index = 6;
    }
    // 6. 把下一项先设定到位置 790
    items[index].style.left = '790px';
    // 7. 运动下一项  790 → 0
    animate(items[index],0);
    // 8.对应的小点切换样式变成红色（加 active类名）
    lis[index].className = 'active';
};

// 【功能3：点击小点按钮实现轮播】
// 1. 循环遍历每一个li，并且给每一li元素对象添加一个属性 num，表示当前的li是这一组中的第几个（从0开始）
for (var i = 0; i < lis.length; i++) {
    lis[i].num = i;
}
// 2. 给ul注册点击事件（事件委托→性能），在事件中要确定点击的是否是ul中li
control.onclick = function (e) {
    //2.1 通过事件对象获取最先触发的元素
    var node = e.target;
    // 3. 若点击的li。 index是当前的  下一项li.num
    if (node.tagName == 'LI') {
        // 4. 比较当前的和下一个索引大小，确定运动方向
        if (node.num > index) { // 向右走
            // 4.1 当前的从0 → 790
            animate(items[index], 790);
            // 4.2 对应的li要去掉类名active
            lis[index].className = '';
            // 4.3下一项
            index = node.num;
            // 4.4 设定下一项的样式left→-790
            items[index].style.left = '-790px';
            // 4.5 开始运动 -790→ 0
            animate(items[index], 0);
            lis[index].className = 'active';
        } else if (node.num < index) {// 向左走
            // 5.1 当前显示项从0 → -790
            animate(items[index], -790);
             // 5.2 对应的li要去掉类名active
            lis[index].className = '';
            // 5.3下一项
            index = node.num;
            // 5.4 设定下一项的样式left→790
            items[index].style.left = '790px';
            // 5.5 开始运动 790→ 0
            animate(items[index], 0);
            lis[index].className = 'active';

        }
    }
     

};


// 【功能4：自动实现轮播】
// 1. 创建一个定时器，在定时器中，每间隔3秒，触发一次右侧按钮点击事件
var flag; // 定时器标识
function autoPlay() {
    flag = setInterval(function () {
        rightBtn.onclick();
    }, 3000);
    
}
// 启动自动轮播
autoPlay();
// 【功能5：鼠标进入轮播区时，停止自动轮播。 鼠标离开轮播区时，启动轮播】
banner.onmouseenter = function () {
    // 清除自动轮播
    clearInterval(flag);  
};

banner.onmouseleave = function () {
    // 启动自动轮播
    autoPlay();
}