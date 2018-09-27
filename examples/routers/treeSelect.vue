<template>
  <div>
      <Row>
          <Col span="12" style="padding-right:10px">
            <treeSelect :treeData="treeData" ref="treeDataRef" v-model="data" filterable @on-change="getTreeData" show-checkbox></treeSelect>
          </Col>
          <Col span="12" style="padding-right:10px">
            <Select v-model="model11" filterable multiple>
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
      </Row>
      <Button @click="getCheckedNodes">clear</Button>
      <Button @click="edit">edit</Button>
  </div>
</template>
<script>
  export default {
    data (){
      return {
        data:[],
        treeData: [
          {
            title:"parent 0",
            expand:true,
            children:[]
          }
        ],
        cityList: [
            {
                value: '122',
                label: '1'
            },
            {
                value: '12',
                label: '1'
            },
            {
                value: '13',
                label: '1'
            },
            {
                value: '144',
                label: '1'
            },
            {
                value: 'Paris',
                label: '1'
            },
            {
                value: 'Canberra',
                label: '1'
            }
        ],
        model11: []
      }
    },
    methods:{
      getTreeData (value){
        console.log('-----------------')
        console.log("getTreeValue:",value)
      },
      reset () {
        this.data = [];
      },
      edit () {
        let v = this;
        let arr = v.treeData[0].children;
        let a = arr[1];
        a.title = 666;
        arr.splice(1, 1 , a);
        v.$set(v.treeData[0],'children',arr);
      },
      getCheckedNodes () {
        console.log(this.$refs['treeDataRef'])
        console.log(this.$refs['treeDataRef'].getCheckedNodes());
      }
    },
    created (){
      let v = this,
        Arr = [];
      function makeTree (){
        for (let i = 1; i < 20; i++){
          Arr.push({
            title: 'parent 0-' + i,
            expand : true,
            checked: i === 1 ? true : false,
            children:[
              {
                 title: 'leaf 0-' + i + "-1"
              },
              {
                title: 'leaf 0-' + i + "-2",
                expand:true,
                children:[
                  {
                    title:"66"
                  }
                ]
              }
            ]
          })
        }
        return true;
      }
      async function addTree (){
        const a = await makeTree();
        if(a){
          v.$set(v.treeData[0],'children',Arr);

        }


      }
      addTree();


    }

  }
</script>
