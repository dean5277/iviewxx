<template>
  <div>
    <Buttons @on-click="getValue" disabled>
      <Button   @click="helloworld">hello world</Button>
      <Buttons-menu slot="list">
        <Buttons-item name="1">alert 1</Buttons-item>
      </Buttons-menu>
    </Buttons>
    <Buttons style="margin-left:50px" type="primary" @on-click="getValue">
      <Button  type="primary" @click="helloworld">hello world</Button>
      <Buttons-menu slot="list">
        <Buttons-item name="1">alert 1</Buttons-item>
      </Buttons-menu>
    </Buttons>
    <div style="margin-top:10px">
      参数:
      <div>trigger:click</div>
      <div>type目前只支持两种样式 default 和 primary，以后得空再加其他的</div>



    </div>
  </div>
</template>
<script>
  export default {
    data (){
      return {

      }
    },
    methods:{
      getValue (value){
        console.log(value);
        if(value == "1"){
          this.$Message.success('1')
        }
      },
      helloworld (){
        this.$Message.success('hello world')
      }
    }
  }
</script>