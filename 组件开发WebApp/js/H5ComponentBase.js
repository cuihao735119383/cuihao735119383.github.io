/* 基本图文组件对象 */
var H5ComponentBase = function( name,cfg ){
    var cfg = cfg || {};
    var id = ('h5_c_'+Math.random()).replace('.','_');
    var cls = 'h5_component_'+cfg.type;
    var component = $('<div class="h5_component '+cls+' h5_component_name_'+ name +'" id="'+id+'"></div>');

    cfg.text && component.text(cfg.text);
    cfg.width && component.width(cfg.width/2);//针对retina高清屏幕所做的修改
    cfg.height && component.height(cfg.height/2);

    cfg.css && component.css( cfg.css );
    cfg.bg && component.css('backgroundImage','url('+cfg.bg+')');

    if (cfg.center === true){
        component.css({
            marginLeft : (cfg.width/4 * -1) + 'px',//这里有个marginLeft要为负值，不是太懂为什么
            left : '50%',
        })
    }

    //   可能的自定义的参数
    if( typeof cfg.onclick === 'function' ){
        component.on('click',cfg.onclick);
    }

    component.on('onLoad',function(){
        component.addClass(cls+'_load').removeClass(cls+'_leave');
        cfg.animateIn && component.animate( cfg.animateIn );
        return false; //阻止事件冒泡
    });
    component.on('onLeave',function(){
        component.addClass(cls+'_leave').removeClass(cls+'_load');
        cfg.animateOut && component.animate( cfg.animateOut );
        return false; //阻止事件冒泡
    });

    return component;
}

