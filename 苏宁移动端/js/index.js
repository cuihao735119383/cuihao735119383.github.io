var pixelRatio=1/window.devicePixelRatio;			
document.write('<meta name="viewport" content="width=device-width,initial-scale='+pixelRatio+',minimum-scale='+pixelRatio+',maximum-scale='+pixelRatio+'"/>');
			
window.addEventListener('resize',setSize,false);
function setSize(){
	var	html=document.getElementsByTagName('html')[0];
	var pageWidth=document.documentElement.clientWidth;
		html.style.fontSize=pageWidth/16+'px';
	}
setSize();

window.onload=function(){
	fnMove('img_list','img_btn');
	fnMove('jh_list','jh_btn');
	
	function fnMove(imgId,btnId){
		var oImgList=document.getElementById(imgId);
		var aBtn=document.getElementById(btnId).getElementsByTagName('a');
		var iWidth=document.documentElement.clientWidth;
		var iScroll=0;
		var iNow=0;
		var iStartX=0;
		var iStartScroll=0;
		oImgList.innerHTML+=oImgList.innerHTML;
		oImgList.style.width=oImgList.offsetWidth*2+'px';
		
		oImgList.addEventListener('touchstart',function(ev){
			clearInterval(oTimer);
			clearInterval(oImgList.timer);
			if(iNow<=0){
				iNow+=aBtn.length;
				iScroll=-iNow*iWidth;
				css(oImgList,'translateX',iScroll);
			}
			iStartX=ev.changedTouches[0].pageX;
			iStartScroll=iScroll;
		})
		
		oImgList.addEventListener('touchmove',function(ev){
			var disX=ev.changedTouches[0].pageX-iStartX;
			iScroll=iStartScroll+disX;
			css(oImgList,'translateX',iScroll);
		})
		
		oImgList.addEventListener('touchend',function(ev){
			var disX=ev.changedTouches[0].pageX-iStartX;
			var iNum=Math.round(disX/iWidth);
			iNow-=iNum;
			fnNext();
			autoPlay();
		})
		
		function fnNext(){
			iScroll=-iNow*iWidth;
			for(var i=0;i<aBtn.length;i++){
				aBtn[i].className='';
			}
			aBtn[iNow%aBtn.length].className='active';
			if(iNow>=aBtn.length-1){
				tweenMove(oImgList,{translateX:iScroll},300,'easeOut',function(){
				iNow=iNow%aBtn.length;
				iScroll=-iNow*iWidth;
				css(oImgList, 'translateX', iScroll);
				});
			}
			else{
				tweenMove(oImgList,{translateX:iScroll},300,'easeOut');
			}
		}
		function autoPlay(){
			oTimer=setInterval(function(){
				iNow++;
				fnNext();
			},3000)
		}
		autoPlay();
	}
	
	var aTime=getElementsByClassName(document,'time_item');
	var iNewTime=new Date('June 5 2016 15:20:30');
	setInterval(function(){
		var iNowTime=new Date();
		var t=Math.floor((iNewTime-iNowTime)/1000);
		if(t>=0){
			aTime[0].innerHTML=toZero(Math.floor(t%86400/3600));
			aTime[1].innerHTML=toZero(Math.floor(t%86400%3600/60));
			aTime[2].innerHTML=toZero(Math.floor(t%60));
		}
	},1000)
	
	function toZero(n){return n<10?'0'+n:n}
	
	function getElementsByClassName(oParent,sClass){
		var arr=[];
		var reg=new RegExp('\\b'+sClass+'\\b');
		var aEle=oParent.getElementsByTagName('*');
		for(var i=0;i<aEle.length;i++){
			if(reg.test(aEle[i].className)){
				arr.push(aEle[i]);
			}
		}
		return arr;
	}
	
}