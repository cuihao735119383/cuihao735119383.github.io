/* 饼图组件对象 */

var H5ComponentPie = function( name , cfg ){
    var component = new H5ComponentBase( name , cfg );

    var w = cfg.width;
    var h = cfg.height;

    var r = w/2;

    //绘制环图背景层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('z-index', 1);
    component.append(cns);

    ctx.beginPath();
    ctx.fillStyle = '#eee';
    ctx.arc( r , r , r , 0 , 2 * Math.PI);
    ctx.fill();

    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('z-index', 2);
    component.append(cns);

    //绘制数据层背景
    var s_angle = 1.5 * Math.PI;
    var e_angle = cfg.data[0][1] * 2 * Math.PI - 0.5 * Math.PI;

    var step = cfg.data.length;
    //备用颜色(chrome随机吸取的，不一定好看)
    var colors = ['#D9A6A6','#6BB7C6','#CFACF1','#E93C87','#98FF33','#FFE265'];

    for (var i=0; i<step; i++){
        ctx.beginPath();
        ctx.moveTo( r ,r );

        ctx.arc( r, r , r ,s_angle , e_angle);

        ctx.fillStyle = cfg.data[i][2] ? cfg.data[i][2] : colors.pop();
        //ctx.closePath();
        ctx.fill();

        //填充项目文本
        var item = $('<div class="item"></div>');
        var name = $('<div class="item_text">'+ cfg.data[i][0] +'</div>');
        var per = $('<div class="item_per">'+ cfg.data[i][1]*100 +'%</div>');
        var x = r/2 + Math.cos(s_angle + Math.abs((e_angle-s_angle)/2) ) * r/2;// 以中间角度放置文本
        var y = r/2 + Math.sin(s_angle + Math.abs((e_angle-s_angle)/2) ) * r/2;

        item.width('40');
        item.height('40');
        if ( x > r/2 ){
            item.css('left', x + 5 );
        }else {
            item.css('left' , x - 40 );
        }
        if ( y > r/2 ){
            item.css('top' , y + 5 );
        }else {
            item.css('top' , y - 40 );
        }
        if ( cfg.data[i][2] ){
            item.css('color', cfg.data[i][2] );
        }
        item.css('transition', 'all .5s '+ (1.5 + 0.5 * i) +'s' );

        item.append(name).append(per);
        component.append(item);

        s_angle = e_angle;
        if (cfg.data[i+1]) {
            e_angle += cfg.data[i + 1][1] * 2 * Math.PI;
        }
    }

    //创建一个画布，用于遮盖数据层( 蒙版层 )
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('z-index', 3);
    component.append(cns);

    //使用环图背景色，美化环图动画
    ctx.fillStyle = '#eee';
    function draw( per ) {

        s_angle = 1.5 * Math.PI;
        ctx.clearRect( 0 , 0 , w , h );
        ctx.beginPath();
        ctx.moveTo( r ,r );

        if ( per <=0){
            ctx.arc(r, r, r + 1, 0, 2 * Math.PI );
        }else {
            ctx.arc(r, r, r + 1, s_angle, s_angle + 2 * Math.PI * per ,true);//绘制一个可以完全覆盖数据层的圆
        }

        ctx.fill();
    }
    draw(0);

    //绘制饼图伸展动画效果，步长为100

    component.on('onLoad',function(){
        var s = 0;
        for ( var i=0; i<100; i++ ) {
            setTimeout(function(){
                s += 0.01;
                draw( s );
                i++;
            }, 10 * i + 500 );//加500ms延迟
        }
        return false;
    });
    component.on('onLeave',function(){
        var s = 1;
        for ( var i=0; i<100; i++ ) {
            setTimeout(function(){
                s -= 0.01;
                draw( s );
                i++;
            }, 10 * i );
        }
        return false;
    });

    $('.iphone').append( component);

    return component;
}










