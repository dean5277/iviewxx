# iview-dtable
**已经兼容了 2.0.0-rc.2.0版本** <br />
终于闲下来兼容下新render写法了。 <br />

基于完成功能为目的，如果有天iview更新相关功能，请以iview为准。 <br />
如果有Bug，请提交一下issues <br />

### 已完成功能
2017/05/11 完成table children <br />
2017/05/16 完成合并单元格 <br />
2017/08/11 兼容  2.0.0-rc.20版本<br />
### 未完成的功能 
嵌套table <br />

### table children
![demo](http://7xjfvt.com1.z0.glb.clouddn.com/123.png?123)
<br /><br />

### 合并单元格

![cells](http://7xjfvt.com1.z0.glb.clouddn.com/cells.png)




## Usage
/dist直接替换iview 的/dist

table children参数：<br />
stretch:是否显示子菜单<br />
indentSize:自定义间距<br />

** 为了避免IVIEW更新又要匹配代码，所以把原有的table单独抽离出一个新模块 dTable

合并单元格参数：<br />
请参考json<br />
注意：  不要用(index < num)去设置rowspan


```html
<template>
    <div>
        <dTable border :context="self" :columns="columns7" :data="data6"></dTable>
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
                columns7:[
                    {
                        type: 'selection',
                        width: 54,
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
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: '国家',
                        key: 'country',
                        type: 'span',
                        width: 200,
                        render : (h,params) =>{
                            const obj = {
                              children:  params.row.country,
                              props: {},
                            };
                            if (params.index === 3) {
                              obj.props.rowSpan = 2;
                            }
                            // These two are merged into above cell
                            if (params.index === 8) {
                              obj.props.rowSpan = 4;
                            }
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
        }
    }
</script>

</script>



```



