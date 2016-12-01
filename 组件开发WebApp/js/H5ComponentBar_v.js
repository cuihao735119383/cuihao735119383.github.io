/* 垂直柱图组件对象 */
var H5ComponentBar_v = function( name , cfg ){
    var component = new H5ComponentBase( name , cfg);

    var len = cfg.data.length;
    var width = parseInt(cfg.width/2/len) ;//每个柱形图父级的平均宽度-左右外边距

    //颜色
    var colors = ['#D9A6A6','#6BB7C6','#CFACF1','#E93C87','#98FF33','#FFE265'];

    $.each( cfg.data , function( key , item ){

        var line = $('<div class="line line_'+ key +'"></div>');
        var name = $('<div class="name">'+ item[0] +'</div>');
        var rate = $('<div class="rate"></div>');
        var per = $('<div class="per">'+ item[1]*100+'%' + '</div>');

        var height = item[1]*100 + '%';

        line.width( width );
        line.css( 'left', width * key );
        rate.height( height );
        per.css( 'top', (1-( item[1] + 0.1 )) * 100 + '%' );//动态控制顶部百分比位置

        var color = item[2] || ( item[2] = colors.pop() );
        var bgStyle = 'style="background-color:'+ color +'"';

        rate.html('<div class="bg" '+bgStyle+'></div>');
        line.append(per).append(rate).append(name);

        component.append(line);
    });

    $('.iphone').append(component);


    return component;
}


