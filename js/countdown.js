var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT =768;
var RADIUS =  8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;
const endTime = new Date(2015,6,5,10,10,10);
var curShowTImeSeconds =0;//当前时间距最终时间的差距

var balls = [];//存储生成小球
//随机抽取颜色
var colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#669900","#FFBB33","#FF8800","#FF4444","#CC0000","#HH0000"];

window.onload = function () {
	WINDOW_WIDTH = document.documentElement.clientWidth;
	WINDOW_HEIGHT = document.documentElement.clientHeight;

	MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);  //这里有疑问
	RADIUS =  Math.round(WINDOW_WIDTH*4/5/108)-1;//这里有疑问？？？
	MARGIN_TOP = Math.round(WINDOW_WIDTH / 5);


	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

	canvas.width = WINDOW_WIDTH;
	canvas.height =  WINDOW_HEIGHT;
	curShowTImeSeconds = getCurShowTime();
	setInterval(function () {
		render(context);
		update();
	}, 50);
	//render(context);
};
//获取当前时间距最终时间的秒数 
function getCurShowTime () {
	var curTime = new Date();
	var ret = endTime.getTime() - curTime.getTime();
	ret = Math.round(ret/1000);
	return ret >= 0 ? ret : 0;
}

function update () {
	var  nextShowTimeSeconds = getCurShowTime();
	var nextHours = parseInt(nextShowTimeSeconds / 3600);
	var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60);
	var nextSeconds = nextShowTimeSeconds % 60;
    
    var curHours =  parseInt(curShowTImeSeconds / 3600);
	var curMinutes = parseInt((curShowTImeSeconds - curHours * 3600) / 60);
	var curSeconds = curShowTImeSeconds % 60;
	if(nextSeconds != curSeconds){
		//判断改变了哪些数字，先判断小时的十位数发生了改变
		if(parseInt(curHours / 10) != parseInt(nextHours / 10)){
            //加小球，小时的十位数在的位置以及数字
            addBalls(MARGIN_LEFT+0 , MARGIN_TOP+0 ,parseInt(curHours/10));
		}
		if(parseInt(curHours % 10) != parseInt(nextHours % 10)){
			addBalls(MARGIN_LEFT+ 15*(RADIUS+1) , MARGIN_TOP+0 ,parseInt(curHours%10));
		}
		if(parseInt(curMinutes / 10) != parseInt(nextMinutes/ 10)){
           addBalls(MARGIN_LEFT+ 39*(RADIUS+1) , MARGIN_TOP+0 ,parseInt(curMinutes/10));
		}
		if(parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)){
           addBalls(MARGIN_LEFT+ 54*(RADIUS+1) , MARGIN_TOP+0 ,parseInt(curMinutes%10));
		}
		if(parseInt(curSeconds /10) != parseInt(nextSeconds /10)){
             addBalls(MARGIN_LEFT+ 78*(RADIUS+1) , MARGIN_TOP+0 ,parseInt(curSeconds/10));
		}
		if(parseInt(curSeconds % 10) != parseInt(nextSeconds %10)){
             addBalls(MARGIN_LEFT+ 93*(RADIUS+1) , MARGIN_TOP+0 ,parseInt(curSeconds%10));
		}
		curShowTImeSeconds = nextShowTimeSeconds;
	}
	//对已经存在的小球进行
	updateBalls();
}

function updateBalls () {
	for(var i = 0 ; i < balls.length; i++){
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;

		if(balls[i].y >= WINDOW_HEIGHT - RADIUS){
			balls[i].y = WINDOW_HEIGHT -RADIUS;
			balls[i].vy = -balls[i].vy*0.75;
		}
	}
	var cnt = 0 ;
	for(var i = 0; i < balls.length; i++){
		if(balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH){
			//balls.shift(i);
			balls[cnt++] = balls[i];
		}
	}
		
		while(balls.length > Math.min(300,cnt)){
			balls.pop();
		}
}
function addBalls (x,y,num) {
	for(var i = 0 ; i < digit[num].length ; i++){
		for(var j = 0 ; j < digit[num][i].length ; j++){
			if(digit[num][i][j] == 1){
				var aBall = {
					x:x+j*2*(RADIUS+1)+(RADIUS+1),
					y:y+i*2*(RADIUS+1)+(RADIUS+1),
					g:1.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
					vy:-5,
					color:colors[Math.floor(Math.random()*colors.length)]
				};
				balls.push(aBall);
			}
		}
	}
}
function render (cxt) {
	//获取当前的时间
	/*
	var hours = 12;
	var minutes = 34;
	var seconds = 56;*/
	//刷新当前屏幕内的图像
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
	var hours =  parseInt(curShowTImeSeconds / 3600);
	var minutes = parseInt((curShowTImeSeconds - hours * 3600) / 60);
	var seconds = curShowTImeSeconds % 60;

	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);
	renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt);
	renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt);
	renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);
	renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);
	renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,cxt);
	renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
	renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);
/*	var left = renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);
	left += renderDigit(MARGIN_LEFT+left*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt);
	left += renderDigit(MARGIN_LEFT + left * (RADIUS+1),MARGIN_TOP,10,cxt);
	left += renderDigit(MARGIN_LEFT + left * (RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);
	left += renderDigit(MARGIN_LEFT + left * (RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);
	left += renderDigit(MARGIN_LEFT + left * (RADIUS+1),MARGIN_TOP,10,cxt);
	left += renderDigit(MARGIN_LEFT + left * (RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
	left += renderDigit(MARGIN_LEFT + left * (RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);*/
    //绘制小球
   for (var i = 0; i < balls.length; i++) {
   	 cxt.fillStyle = balls[i].color;
   	 cxt.beginPath();
   	 cxt.arc(balls[i].x, balls[i].y, RADIUS ,0 ,2*Math.PI);
   	 cxt.closePath();
   	 cxt.fill();
   }
}
function renderDigit (x,y,num,cxt) {
	var r = 10;
	cxt.fillStyle = 'rgb(0,102,153)';
	for(var i = 0 ; i < digit[num].length;i++){
		for(var j = 0 ; j < digit[num][i].length; j++){
			if(digit[num][i][j] == 1){
		        cxt.beginPath();
		        var _x = x + j*2*(RADIUS+1)+(RADIUS+1);
		        var _y =  y + i*2*(RADIUS+1)+(RADIUS+1); 
				cxt.arc(_x,_y,RADIUS,0,2*Math.PI);
				cxt.fill();
				cxt.closePath();
			}
		}
		
	}
}