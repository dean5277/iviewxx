# iview-table-change
iview 的table功能目前太简单了，满足不了业务需要，所以在iview的基础上进行开发。 <br />

基于完成功能为目的，如果有天iview更新相关功能，请以iview为准。 <br />
如果有Bug，请提交一下issues <br />

### 已完成功能： <br />
2017/05/11 完成table children <br />

### 未完成的功能： <br />
合并单元格，嵌套table <br />

### table children
![demo](https://7xjfvt.com1.z0.glb.clouddn.com/123.png)



## Usage
/dist直接替换iview 的/dist


```html
<template>
    <div>
        <Table border :context="self" :columns="columns7" :data="data6"></Table>
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
                        country:"中国",
                        pay:"支付宝",
                        status:"未处理",
                        stretch:true,//是否显示子菜单
                        children:[
                            {
                                orderNum:"324234",
                                buyer:"大王00",
                                country:"中国",
                                pay:"支付宝",
                                status:"未处理",
                                indentSize:15,
                                stretch:false,
                                children:[
                                    {
                                        orderNum:"123123",
                                        buyer:"大王000",
                                        country:"中国",
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
                                country:"中国",
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
                                buyer:"大王01",
                                country:"中国",
                                pay:"支付宝",
                                status:"未处理",
                                indentSize:15,
                                stretch:false
                            },
                            {
                                orderNum:"956599555",
                                buyer:"大王02",
                                country:"中国1",
                                pay:"支付宝1",
                                status:"未处理",
                                indentSize:15,
                                stretch:false
                            },
                            {
                                orderNum:"5656",
                                buyer:"大王01",
                                country:"中国",
                                pay:"支付宝",
                                status:"未处理",
                                indentSize:15,
                                stretch:false
                            },
                            {
                                orderNum:"656556",
                                buyer:"大王02",
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
                        key: 'buyer'
                    },
                    {
                        title: '国家',
                        key: 'country'
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
                        render (row, column, index) {
                            return `<i-button  size="small" @click="show(${index})">查看</i-button> <i-button  size="small" @click="editUser(${row.id})">编辑</i-button> <i-button type="error"  size="small" @click="remove(${index},${row.id})">删除</i-button>`;
                        }
                    }
                ]
            }
        },
        created (){

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


```



