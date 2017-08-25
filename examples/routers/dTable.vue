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
