/*loading动画方法*/
var H5_loading = function ( images ){

    var id = this.id;

    if ( this._images === undefined ){ //第一次进入

        this._images = ( images || [] ).length;
        this._loaded = 0 ;

        window[id] = this;      //   把当前对象存储在全局对象 window 中，用来进行某个图片加载完成之后的回调

        for ( var s in images ){
            var img = new Image();
            img.src = images[s];
            img.onload = function () {
                window[id].loader();//  每一个图片对象加载完后的回调
            }
        }

        $('#rate').text('0%');
        return this;

    }else {
        //  每个图片对象加载完后，都会进入这里执行一次，因为第二次回调以后_images都是有定义的
        this._loaded ++ ;
        $('#rate').text(  parseInt( this._loaded / this._images  *100) + '%' );

        if ( this._loaded < this._images ){
            return this;//  防止图片未全部加载完就执行下面显示页面的方法
        }
    }

    window[id] = null;

    //复制H5对象的load方法
    this.el.fullpage({
        onLeave : function(index,nextIndex,direction){
            $(this).find('.h5_component').trigger('onLeave');
        },
        afterLoad : function(anchorlink,index){
            $(this).find('.h5_component').trigger('onLoad');
        }
    });
    this.page[0].find('.h5_component').trigger('onLoad');
    this.el.show();
}
