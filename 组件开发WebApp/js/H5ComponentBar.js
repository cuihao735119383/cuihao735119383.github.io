/* 柱图组件对象 */
var H5ComponentBar = function( name , cfg ){
    var component = new H5ComponentBase( name , cfg);

    //颜色
    var colors = ['#D9A6A6','#6BB7C6','#CFACF1','#E93C87','#98FF33','#FFE265'];

    $.each( cfg.data , function( key , item ){

        var line = $('<div class="line line_'+ key +'"></div>');
        var name = $('<div class="name">'+ item[0] +'</div>');
        var rate = $('<div class="rate"></div>');
        var per = $('<div class="per">'+ item[1]*100+'%' + '</div>');

        var width = item[1]*100 + '%';

        rate.width( width );

        var color = item[2] || ( item[2] = colors.pop() );
        var bgStyle = 'style="background-color:'+ color +'"';

        rate.html( '<div class="bg" '+bgStyle+'></div>' );
        per.css( 'left', ( item[1] + 0.05 ) * cfg.width/2 + 60 );//动态控制右侧百分比位置 - 项目名称的宽度

        line.append(name).append(rate).append(per);

        component.append(line);
    });

    $('.iphone').append(component);

    return component;
}

