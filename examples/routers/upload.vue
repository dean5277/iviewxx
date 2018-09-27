<template>
    <div>
        <Upload action="//jsonplaceholder.typicode.com/posts/">
            <Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
        </Upload>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                file: null,
                loadingStatus: false
            }
        },
        methods: {
            handleUpload (file) {
                this.file = file;
                console.log('........')
                return false;
            },
            upload () {
                this.loadingStatus = true;
                setTimeout(() => {
                    this.file = null;
                    this.loadingStatus = false;
                    this.$Message.success('Success')
                }, 1500);
            },
            getValue (file){
                console.log(file)
            }
        }
    }
</script>