/**
 * Created by Wenson Smith
 * @email wensonsmith@gmail.com
 * @date 2014/3/6 下午 5:06
 */

var cubeBox = $("#cube-unlock");

//拖动序列
var sequence = '';
//拖动的次数
var dragTime = 0;
//尝试进行解锁
var tryUnlock = function(){
    dragTime ++;
    sequence += this.data('code');
    var unlockKey = getUnlockKey();
    if(dragTime == 2)
        $.post('/x/unlock',{key:unlockKey,sequence:sequence},unlockHandle);
}

//获取拖动后的编码
var getUnlockKey = function(){
    var unlockKey = '';
    cubeBox.find('li').each(function(){
        unlockKey += $(this).data('code');
    })
    return unlockKey;
}

//解锁后的处理
var unlockHandle = function(data){
    if(data.status ==1)
        window.location.href = 'x/dashboard';
    if(data.status == -1)
        alert('你丫在破解吧？ 每天给你三次机会哟 ：）');
}

//初始化魔方解锁
var cubeInit = function(element){
    element.dragsort({
        dragSelector: "div",
        dragBetween: false,
        placeHolderTemplate: "<li class='place-holder'><div></div></li>",
        dragEnd:tryUnlock
    });
}



cubeInit(cubeBox);