/* 环图组件对象 */
var H5ComponentRing = function ( name , cfg ){
    cfg.type = 'pie';
    if(cfg.data.length>1){  //  环图只有一个数据
        cfg.data = [cfg.data[0]];
    }
    var component =  new H5ComponentPie( name ,cfg );

    var wrap = $('<div class="wrap"></div>')
    var name = $('<div class="name">'+ cfg.data[0][0] +'</div>');
    var per = $('<div class="per">'+ cfg.data[0][1]*100 +'%</div>');

    wrap.css('z-index', 5);
    if ( cfg.data[0][2]){
        wrap.css('color', cfg.data[0][2]);
    }

    component.find('.item').remove();
    wrap.append(name).append(per);
    component.append(wrap);

    return component;
}
