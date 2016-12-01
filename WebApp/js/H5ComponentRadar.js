/* 雷达图组件对象 */
var H5ComponentRadar = function( name , cfg ){
    var component = new H5ComponentBase( name, cfg);

    var w = cfg.width;
    var h = cfg.height;

    //创建一个画布（ 背景层 ）
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    var r = w/2;
    var step = cfg.data.length;

    //  计算一个圆周上的坐标（计算多边形的顶点坐标）
    //  已知：圆心坐标(a,b)、半径 r；角度deg。
    //  rad = ( 2*Math.PI / 360 ) * ( 360 / step ) * i （角度制转弧度制）
    //  x = a + Math.sin( rad ) * r;
    //  y = b + Math.cos( rad ) * r;

    //  绘制网格背景（分面绘制，分为10份）
    var isBlue = false;
    for ( var s=10; s > 0; s--) {
        //这里使用递减而不使用递增，是因为使用递增后面绘制的面积比较大，会覆盖先前的填充，从而显示最后一个最大的颜色
        ctx.beginPath();
        for (var i = 0; i < step; i++) {

            var rad = ( 2 * Math.PI / 360 ) * ( 360 / step ) * i;
            var x = r + Math.sin(rad) * r * (s/10) ;
            var y = r + Math.cos(rad) * r * (s/10) ;

            ctx.lineTo(x, y);

        }
        ctx.closePath();
        ctx.fillStyle = (isBlue = !isBlue)? '#99c0ff' :  '#f1f9ff';
        ctx.fill();
    }

    //  绘制伞骨图
    ctx.beginPath();
    for (var i = 0; i < step; i++) {
        ctx.moveTo( 200, 200);
        var rad = ( 2 * Math.PI / 360 ) * ( 360 / step ) * i;
        var x = r + Math.sin(rad) * r ;
        var y = r + Math.cos(rad) * r ;

        ctx.lineTo(x, y);

        //填充项目文本
        var name = $('<div class="name">'+ cfg.data[i][0] +'</div>');
        if ( x > w/2 ){
            name.css({left : x/2 - 5});
        }else{
            name.css({ right : (w-x)/2 - 5});
        }
        if ( y > h/2 ){
            name.css({top : y/2 +5});
        }else{
            name.css({ bottom : (h-y)/2 +5});
        }
        if( cfg.data[i][2] ){
            name.css('color',cfg.data[i][2])
        }

        name.css('transition', 'all .5s '+ (1.5 + 0.5 * i) +'s' );

        component.append(name);
    }
    ctx.strokeStyle = '#e0e0e0';
    ctx.stroke();

    //创建一个画布（ 数据层 ）
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    function draw( per ) {
        ctx.clearRect( 0 , 0 , w , h );
        //绘制数据点
        for (var i = 0; i < step; i++) {
            ctx.beginPath();
            var rad = ( 2 * Math.PI / 360 ) * ( 360 / step ) * i;
            var x = r + Math.sin(rad) * r * cfg.data[i][1] * per ;
            var y = r + Math.cos(rad) * r * cfg.data[i][1] * per ;

            ctx.arc(x, y, 3, 0, 2 * Math.PI);
            ctx.fillStyle = '#ff7676';
            ctx.fill();
        }
        //绘制折线
        ctx.beginPath();
        ctx.strokeStyle = '#f00';
        for (var i = 0; i < step; i++) {

            var rad = ( 2 * Math.PI / 360 ) * ( 360 / step ) * i;
            var x = r + Math.sin(rad) * r * cfg.data[i][1] * per ;
            var y = r + Math.cos(rad) * r * cfg.data[i][1] * per ;

            ctx.lineTo(x, y);

        }
        ctx.closePath();
        ctx.stroke();
    }

    //绘制雷达图生长动画效果，步长为100

    component.on('onLoad',function(){
        var s = 0;
        for ( var i=0; i<100; i++ ) {
            setTimeout(function(){
                s += 0.01;
                draw( s );
                i++;
            }, 10 * i + 500 );//加500ms延迟
        }
        return false; //防止page接收到onload事件而发生死循环
    });
    component.on('onLeave',function(){
        var s = 1;
        for ( var i=0; i<100; i++ ) {
            setTimeout(function(){
                s -= 0.01;
                draw( s );
                i++;
            }, 10 * i );//设置100个定时器同时启动，但延时不同，以此时间差来绘制canvas产生生长动画效果
        }
        return false;
    });

    $('.iphone').append(component);

    return component;
}


