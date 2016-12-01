/* 散点图表组件对象 */
var H5ComponentPoint = function ( name , cfg ){

    var component = new H5ComponentBase( name , cfg );

    var base = cfg.data[0][1];

    $.each( cfg.data, function( key ,item ){

        var point = $('<div class="point point_'+key+'">');

        var name = $('<div class="name">'+ item[0] +'</div>');
        var rate = $('<div class="per">'+ item[1]*100 +'%'+'</div>');

        var per = (item[1]/base*100)+'%';

        point.width(per).height(per);

        if ( item[2] ){
            point.css('background-color', item[2]);
        }

        if ( item[3] !==undefined && item[4] !==undefined ){
            point.css({
                'left' : item[3],
                'top' : item[4]
            })
        }

        name.append( rate );
        point.append( name );
        component.append( point );

    });

    $('.iphone').append(component);
    component.find('.point').on('click',function(){
        //console.log('here');
        $('.h5_component_point').find('.point').removeClass('point_focus');
        $(this).addClass('point_focus');

        return false;//直接结束，防止事件冒泡
    }).eq(0).addClass('point_focus');

    return component;
}

