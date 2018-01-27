<template>
    <div>
        <Table border ref="selection" buttons :columns="columns4" :data="data1"></Table>
        <Button @click="handleSetData">Set Data</Button>
        <Button @click="handleClearData">Clear Data</Button>
        <Button @click="handleSelectAll(true)">Set all selected</Button>
        <Button @click="handleSelectAll(false)">Cancel all selected</Button>
    </div>
</template>
<script>
    export default {
        data () {
            var self = this;
            return {
                columns4: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    },
                    {
                        title:"操作",
                        key:"operate",
                        fixed:"right",
                        render:(h,params)=>{
                            let placement = "bottom";
                            console.log(params.index)
                            if(self.data1 && self.data1.length > 0 && params.index == self.data1.length - 1 ){
                                console.log('6666666');
                                placement = "top";
                            }
                           return h('div', [
                                h('Buttons',{
                                    props:{
                                        trigger:"click",
                                        placement:placement
                                    },
                                    class:"defaultStyle",
                                    on:{
                                        "on-click":(value)=>{
                                            if(value == "1"){
                                                
                                            }
                                            //console.log(value)
                                            //self.show();
                                        }
                                    }
                                },[
                                    h('Button',{
                                        type:"default",
                                        class:"iconbuttons",
                                        on:{
                                            click:()=>{
                                              
                                            }
                                        }
                                    },[
                                        h('Icon',{
                                            props:{
                                                type:"printer"
                                            },
                                            style:{
                                                marginRight:"5px"
                                            }
                                            
                                        }),

                                        h('span',"dd")
                                    ]),

                                    h('Buttons-menu',{
                                        slot:"list"
                                        
                                    },[
                                        h('Buttons-item',{
                                            props:{
                                                name:"1"
                                            },
                                           
                                        },"ddfdsd")
                                        
                                    ])
                                ])
                                    
                            ]); 
                        }
                    }
                ],
                data1: [

                ]
            }
        },
        methods: {
            handleSelectAll (status) {
                this.$refs.selection.selectAll(status);
            },
            handleSetData () {
                this.data1 = [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ];
            },
            handleClearData () {
                this.data1 = [];
            }
        }
    }
</script>
