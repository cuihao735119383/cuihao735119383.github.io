//操作数据，影响DOM

//vue不需要过多的操作DOM，主要把精力放在数据逻辑上

let store = (namespace, data) => {
    if (data) {
        return localStorage.setItem(namespace, JSON.stringify(data));
    }

    var store = localStorage.getItem(namespace);
    return (store && JSON.parse(store)) || [];
}

var list = store("yongsheng123");

//需求文档

//数据

/*var list = [
    {
        title:"hello",
        isChecked:true
    },
    {
        title:"hello123",
        isChecked:true
    },
    {
        title:"最后一条",
        isChecked:true
    }
]*/

//自定义一个过滤器

var filters ={
    all:function (todos){
        return todos;    
    },
    active:function (todos){
       return todos.filter(function (item){
            return !item.isChecked
       })     
    },
    completed:function (todos){
        return todos.filter(function (item){
            return item.isChecked
       })    
    }
}
//启动应用

var vm = new Vue({
	el:"#app",
    data:{
        list:list,
        editingItem:"",
        beforeEdtor:'',
        hash:'all'
    },
    watch:{
        list:{
            handler:function (){
               console.log("我变化了");  
                store("yongsheng123",this.list);
            },
            deep:true
        }
    },
    methods:{
        addItem:function (ev){
            //添加一条信息
            this.list.push({
                title:ev.target.value,
                isChecked:false
            });

            ev.target.value = '';
        },
        destroyItem:function (todo){
            //删除传过来的这一条
            this.list = this.list.filter(function (item){
                return item !== todo;
            })
        },
        edtorItem:function(todo){
            this.editingItem = todo;
            this.beforeEdtor = todo.title;
        },
        edtorOk:function(){
            this.editingItem = '';
            this.beforeEdtor = '';
        },
        cancelEdtor:function(todo){
            this.editingItem = '';

            todo.title = this.beforeEdtor;
            this.beforeEdtor = '';
        },
        destroySelectedAll:function(){
            this.list = filters['active'](this.list)
        }
    },
    computed:{
        filteredList:function (){
            return filters[this.hash](this.list);   
        },
        unCheckedLength:function(){
            return filters['active'](this.list).length
        },
        checkedLength:function (){
           return filters['completed'](this.list).length  
        },
        allDone:{
            get(){
                return  this.checkedLength === this.list.length 
            },
            set(value){
                console.log(value);

                this.list.forEach(function (item){
                    item.isChecked = value;
                })
            }
        }

    },
    directives:{
        focus:function(el,value){
            if( value ){
                el.focus();
            }
        }
    }
});

//先获取hash值
hashchange();
function hashchange(){
    var hash = window.location.hash.replace(/#/,"").trim();

    console.log(filters[hash]  );

    if(filters[hash]){
        vm.hash = hash;
    }else{
        vm.hash = 'all'
    }
}

window.addEventListener("hashchange",hashchange)


//vm.$mount("#app");

