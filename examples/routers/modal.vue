<template>
    <div>
        <Button @click="instance()">confirm1</Button>
   
    </div>
</template>
<script>
    export default {
        methods: {
            instance () {
                this.$Modal.confirm({
                    title: '批量放行',
                    okText: '整包裹放行',
                    content: '<p>订单所在包裹为合并包裹，请选择整包裹放行或取消操作</p>'
                   
                });
            }
        }
    }
</script>
