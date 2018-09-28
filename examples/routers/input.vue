<template>
    <div>
      <Input v-model="value4" type="tags" placeholder="tags" @on-change="getValue"></Input>
      <div style="margin-top:10px">
        <h3>新增类型tags props</h3>
        <Table :columns="columns" :data="data"></Table>
      </div>
      <div style="margin-top:10px">
        event 跟Input原来的一样
      </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                value1: '',
                value2: '',
                value3: '',
                value4: [3, 2, 323, 3232],
                columns: [
                  {
                    title: '属性',
                    key: 'parameter'
                  },
                  {
                    title: '说明',
                    key:'details'
                  },
                  {
                    title: '类型',
                    key:'dataType'
                  },
                  {
                    title: '默认',
                    key:"defaults"
                  }
                ],
                data :[
                  {
                    parameter: 'type',
                    details: 'tags',
                    dataType: 'Array',
                    defaults: ''
                  },
                  {
                    parameter: 'disabled',
                    details: '禁止使用',
                    dataType: 'Boolean',
                    defaults: 'false'
                  },
                  {
                    parameter: 'placeholder',
                    details: '占位文本',
                    dataType: 'String',
                    defaults: 'null'
                  },
                ]
            }
        },
        methods: {
          getValue (){
            console.log(this.value4)
          }
        }
    }
</script>