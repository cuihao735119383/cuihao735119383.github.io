/* 柱图组件对象 */
var H5ComponentPolyline = function ( name , cfg ) {
    var component = new H5ComponentBase( name ,cfg );

    //  绘制网格线 - 背景层
    var w = cfg.width;
    var h = cfg.height;

    //  加入一个画布（网格线背景）
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#AAAAAA';

    //  水平网格线  100 份 -> 10份
    
    var step = 10;
    //水平网格线
    for (var i = 0; i< step + 1 ; i++){
        var y = h/step * i;
        ctx.moveTo( 0 , y);
        ctx.lineTo( w , y );

        ctx.stroke();

    }
    //  垂直网格线  根据项目数量来分
    var step = cfg.data.length ;
    //水平网格线
    for (var i = 0; i< step + 2 ; i++){ //加上两边的边框线，垂直总线加2
        var x = w/ (step + 1) * i; //因为绘制项目点是从第2条线开始画，所以实际宽度要多除以一个
        ctx.moveTo( x , 0);
        ctx.lineTo( x , h );

        ctx.stroke();

    }

    //  加入一个画布（数据层）
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    component.append(cns);

    /**
     * 绘制折线的函数
     * 注意不要把上面的创建画布的声明放进函数，因为每次都会产生一个新的画布
     * 将会引起当前画布的clearRect无法作用上一个画布而产生重叠动画
     * float per
     */
    function draw ( per ) {
        //清除生长动画层叠效果
        ctx.clearRect( 0 , 0 , w , h);

        var rows_w = w / (step + 1);
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#FF8878';

        //绘制数据点
        for (var i = 0; i < step; i++) {
            ctx.beginPath();

            x = rows_w * (i + 1); //从第2条垂直线开始绘制第一个点
            y = ( 1 - cfg.data[i][1] * per ) * h ;
            ctx.arc(x, y, 5, 0, 2 * Math.PI);

            ctx.stroke();
        }

        //绘制折线
        ctx.beginPath();
        for (var i = 0; i < step; i++) {

            x = rows_w * (i + 1); //从第2条垂直线开始绘制第一个点
            y = ( 1 - cfg.data[i][1] * per ) * h ;

            ctx.lineTo(x, y);
        }
        ctx.stroke();
        //绘制阴影
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 136, 120, 0)';//用描边透明度设置为0来隐藏绘制的闭合线
        ctx.fillStyle = 'rgba(255, 136, 120, 0.2)';//阴影填充色
        for (var i = 0; i < step; i++) {

            x = rows_w * (i + 1); //从第2条垂直线开始绘制第一个点
            y = ( 1 - cfg.data[i][1] * per ) * h ;

            ctx.lineTo(x, y);
        }

        ctx.lineTo(x, h);
        ctx.lineTo(rows_w, h);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    function drawText(){

        //绘制数据点
        for (var i = 0; i < step; i++) {

            var per = $('<div class="per">'+ cfg.data[i][1] * 100 +'%</div>');
            var name = $('<div class="name">'+ cfg.data[i][0] +'</div>');

            var text_w = w/2/cfg.data.length;//为使文本可居正中显示，在这里定义宽度方便定义left值
            per.width( text_w );
            name.width( text_w );

            //定义局部变量x和y，避免与全局变量冲突
            var x = w / (step + 1) * (i + 1)/2 - text_w/2;//减去一半文本容器的宽度
            var y = ( 1 - (cfg.data[i][1] + 0.1) ) * h/2 ;//相比折线的点高一点

            if ( cfg.data[i][2] ) per.css('color', cfg.data[i][2] );
            per.css({
                left: x,
                top : y,
            });
            name.css({
                left: x,
                top : h/2,
            });

            component.append(per).append(name);
        }
    }

    drawText();

    //绘制折线生长动画效果，步长为100

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

    component.append( cns );
    $('.iphone').append(component);

    return component;
}


