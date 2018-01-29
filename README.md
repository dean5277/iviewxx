# iview-dtable
**已经兼容了 2.9.0 Agent A版本** <br />


基于完成功能为目的，如果有天iview更新相关功能，请以iview为准。 <br />
如果有Bug，请提交一下issues <br />

### 已完成功能
2017/05/11 完成table children <br />
2017/05/16 完成合并单元格 <br />
2017/08/11 兼容  2.0.0-rc.20版本<br />
1.修复合并单元格时候render只支持字符串的问题，目前可以支持render以及在select单元格里开始合并<br />
2.修复部分已知BUG

2018/01/25 兼容 2.9.0 Agent A版本<br />
1.修复dTable 点击row的时候报错的BUG <br />
2.增加了组件Buttons <br />
3.增加在线Demo <br />
4.增加npm 安装方法 <br />

### Install
npm install iviewxx



[在线DEMO](http://www.deancheng.com:82/#/dTable)






### table children
![demo](http://7xjfvt.com1.z0.glb.clouddn.com/123.png?123)
<br /><br />

### 合并单元格

![cells](http://7xjfvt.com1.z0.glb.clouddn.com/cells.png)




## Usage
es6
import Vue from 'vue'
import iview from 'iviewxx'
Vue.use(iview)


table children参数：<br />
stretch:是否显示子菜单<br />
indentSize:自定义间距<br />

** 为了避免IVIEW更新又要匹配代码，所以把原有的table单独抽离出一个新模块 dTable

合并单元格参数：<br />
请参考json<br />
注意：  不要用(index < num)去设置rowspan

单元格合并使用render时，column需要添加combine:true的属性<br />
children使用数组传render参数<br />
ex.<br />
```html
    {
    title: '订单号',
    key: 'orderId',
    width:200,
    combine:true,
    render: (h,params)=>{

        if(params.index === 0){
            if(params.row.printTime != null ){
            var t = ['span',{class:"icon iconfont icon-dayin printTime"},'']
            }else{
                t = ['span',{},'']
            }
            var obj = {
                childrens:[["div",{class:"combiePackageCode"},params.row.packageCode],['div',{class:"combineShipping"},'123 > 321'], t,['Button',{props:{size:'small'}, class:'fr',on:{click:() => {this.cancelOrder(params.row.packageCode)}}},'作废']],
                props:{}
            }
            obj.props.colSpan = 3;
            return obj
        
            

             
        }else{
            return params.row.orderId;
        }
        
    }
   
},
```
<br /><br />

完整demo
```html
<template>
    <div>
        <!-- <dTable border :context="self" :columns="columns7" :data="data6"></dTable> -->
        <div style="margin-top:10px"> <dTable border :context="self" :columns="columns8" :data="data7"></dTable></div>
    </div>
</template>
<script>
    import abc from '../components/test.vue';
    export default {
        components: { abc },
        data () {
            return {
                self: this,
                data6: [
                    {
                        orderNum:"54465456456",
                        buyer:"大王0",
                        country:"中国1",
                        pay:"支付宝",
                        status:"未处理",
                        stretch:true,//是否显示子菜单
                        children:[
                            {
                                orderNum:"324234",
                                buyer:"大王00",
                                country:"中国2",
                                pay:"支付宝",
                                status:"未处理",
                                indentSize:15,//自定义的间距
                                stretch:false,
                                children:[
                                    {
                                        orderNum:"123123",
                                        buyer:"大王000",
                                        country:"中国3",
                                        pay:"支付宝",
                                        status:"未处理",
                                        indentSize:30,
                                        stretch:false,
                                        
                                    }
                                ]
                            },
                            {
                                orderNum:"gggg666",
                                buyer:"大王01",
                                country:"中国4",
                                pay:"支付宝",
                                status:"未处理",
                                indentSize:15,
                                stretch:false
                            },
                            {
                                orderNum:"43",
                                buyer:"大王02",
                                country:"中国1",
                                pay:"支付宝1",
                                status:"未处理",
                                indentSize:15,
                                stretch:false
                            },
                            {
                                orderNum:"43",
                                buyer:"大王03",
                                country:"中国",
                                pay:"支付宝",
                                status:"未处理",
                                indentSize:15,
                                stretch:false
                            },
                            {
                                orderNum:"956599555",
                                buyer:"大王04",
                                country:"中国1",
                                pay:"支付宝1",
                                status:"未处理",
                                indentSize:15,
                                stretch:false
                            },
                            {
                                orderNum:"5656",
                                buyer:"大王05",
                                country:"中国",
                                pay:"支付宝",
                                status:"未处理",
                                indentSize:15,
                                stretch:false
                            },
                            {
                                orderNum:"656556",
                                buyer:"大王06",
                                country:"中国1",
                                pay:"支付宝1",
                                status:"未处理",
                                indentSize:15,
                                stretch:false
                            }
                        ]
                    },
                    {
                        orderNum:"1156456",
                        buyer:"大王1",
                        country:"中国",
                        pay:"支付宝",
                        status:"未处理",
                        stretch:false
                    },
                    {
                        orderNum:"456456456",
                        buyer:"大王2",
                        country:"中国",
                        pay:"支付宝",
                        status:"未处理",
                        stretch:false,
                        children:[
                            {
                                orderNum:"222",
                                buyer:"大王20",
                                country:"中国",
                                pay:"支付宝",
                                status:"未处理",
                                indentSize:15,
                                stretch:false,
                                
                            }
                        ]
                    }
                ],
                data7: [],
                columns7:[
                    {
                        type: 'selection',
                        width: 70,
                        align: 'center',
                        combine:true,
                        render:(h,params)=>{
                       
                            const obj = {
                              childrens:[["div",{class:"combiePackageCode"},321],['div',{class:"combineShipping"},'123 > 321'],['span',{class:"icon iconfont icon-dayin prinTime"},'']],

                              props: {
                              },
                            };
                            if (params.index === 3) {
                              obj.props.colSpan = 4;
                              
                            }
                            return obj;
                        }
                    },
                    {
                        type: 'switch',
                        title: '订单号',
                        key: 'orderNum',
                        width:250
                        
                    },
                    {
                        title: '买家',
                        key: 'buyer',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.buyer)
                            ]);
                        }
                    },
                    {
                        title: '国家',
                        key: 'country',
                        combine:true,
                        width: 200,
                        render : (h,params) =>{
                            const obj = {
                              childrens:  params.row.country,
                              props: {},
                            };
                            /*if (params.index === 3) {
                              obj.props.rowSpan = 2;
                            }
                            // These two are merged into above cell
                            if (params.index === 8) {
                              obj.props.rowSpan = 4;
                            }*/
                            if (params.index === 7) {
                              obj.props.colSpan = 4;
                            }
                            return obj;
                         
                        }
                    },
                    {
                        title: '付款',
                        key: 'pay'
                    },
                    {
                        title: '状态',
                        key: 'status'
                    },
                    {
                        title: '标记',
                        key: 'action',
                        width: 180,
                        align: 'center',
                        render (h,params) {

                           return h('Button',{

                           },"编辑")
                        }
                    }
                ],
                columns8:[
                    {
                
                        width: 70,
                        align: 'center'
                       
                    },
                    {
                        type: 'switch',
                        title: '订单号',
                        key: 'orderNum',
                        width:250
                        
                        
                    },
                    {
                        title: '买家',
                        key: 'buyer',
                        combine:true,
                        render:(h,params)=>{
                       
                            const obj = {
                              childrens:[["div",{class:"combiePackageCode"},321],['div',{class:"combineShipping"},'123 > 321'],['span',{class:"icon iconfont icon-dayin prinTime"},'']],

                              props: {

                              },
                            };
                            if (params.index === 1) {
                                 obj.props.colSpan = 3;
                              
                            }
                           // console.log(obj)
                            return obj;
                        }
                    },
                    {
                        title: '国家',
                        key: 'country',
                        combine:true,
                        width: 200,
                        render : (h,params) =>{
                            const obj = {
                              childrens:  params.row.country,
                              props: {},
                            };
                            /*if (params.index === 3) {
                              obj.props.rowSpan = 2;
                            }
                            // These two are merged into above cell
                            if (params.index === 8) {
                              obj.props.rowSpan = 4;
                            }*/
                            if (params.index === 7) {
                              obj.props.colSpan = 4;
                            }
                            return obj;
                         
                        }
                    },
                    {
                        title: '付款',
                        key: 'pay'
                    },
                    {
                        title: '状态',
                        key: 'status'
                    },
                    {
                        title: '标记',
                        key: 'action',
                        width: 180,
                        align: 'center',
                        render (h,params) {

                           return h('Button',{

                           },"编辑")
                        }
                    }
                ]
            }
        },
        methods: {
            remove (index) {
                this.data6.splice(index, 1);
            },
            show:function (){
                this.modal9 = true;
            }
        },
        mounted (){
            var self = this;
            setTimeout(function(){
                self.$nextTick(function(){
                    this.data7 =  [
                        {
                            orderNum:"54465456456",
                            buyer:"大王0",
                            country:"中国1",
                            pay:"支付宝",
                            status:"未处理",
                            stretch:true,//是否显示子菜单
                            children:[
                                {
                                    orderNum:"324234",
                                    buyer:"大王00",
                                    country:"中国2",
                                    pay:"支付宝",
                                    status:"未处理",
                                    indentSize:15,//自定义的间距
                                    stretch:false,
                                    children:[
                                        {
                                            orderNum:"123123",
                                            buyer:"大王000",
                                            country:"中国3",
                                            pay:"支付宝",
                                            status:"未处理",
                                            indentSize:30,
                                            stretch:false,
                                            
                                        }
                                    ]
                                },
                                {
                                    orderNum:"gggg666",
                                    buyer:"大王01",
                                    country:"中国4",
                                    pay:"支付宝",
                                    status:"未处理",
                                    indentSize:15,
                                    stretch:false
                                },
                                {
                                    orderNum:"43",
                                    buyer:"大王02",
                                    country:"中国1",
                                    pay:"支付宝1",
                                    status:"未处理",
                                    indentSize:15,
                                    stretch:false
                                },
                                {
                                    orderNum:"43",
                                    buyer:"大王03",
                                    country:"中国",
                                    pay:"支付宝",
                                    status:"未处理",
                                    indentSize:15,
                                    stretch:false
                                },
                                {
                                    orderNum:"956599555",
                                    buyer:"大王04",
                                    country:"中国1",
                                    pay:"支付宝1",
                                    status:"未处理",
                                    indentSize:15,
                                    stretch:false
                                },
                                {
                                    orderNum:"5656",
                                    buyer:"大王05",
                                    country:"中国",
                                    pay:"支付宝",
                                    status:"未处理",
                                    indentSize:15,
                                    stretch:false
                                },
                                {
                                    orderNum:"656556",
                                    buyer:"大王06",
                                    country:"中国1",
                                    pay:"支付宝1",
                                    status:"未处理",
                                    indentSize:15,
                                    stretch:false
                                }
                            ]
                        },
                        {
                            orderNum:"1156456",
                            buyer:"大王1",
                            country:"中国",
                            pay:"支付宝",
                            status:"未处理",
                            stretch:false
                        },
                        {
                            orderNum:"456456456",
                            buyer:"大王2",
                            country:"中国",
                            pay:"支付宝",
                            status:"未处理",
                            stretch:false,
                            children:[
                                {
                                    orderNum:"222",
                                    buyer:"大王20",
                                    country:"中国",
                                    pay:"支付宝",
                                    status:"未处理",
                                    indentSize:15,
                                    stretch:false,
                                    
                                }
                            ]
                        }
                    ];
                     console.log(self.data7)
                })
                 
            },1000)
        }
    }
</script>




```



