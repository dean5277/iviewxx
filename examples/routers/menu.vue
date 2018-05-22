<template>
    <div>
        <Menu mode="horizontal" :theme="theme1" active-name="3">
            <Submenu name="3">
                <template slot="title">
                    <Icon type="stats-bars"></Icon>
                    统计分析
                </template>
                <MenuGroup title="使用">
                    <MenuItem name="3-1">新增和启动</MenuItem>
                    <MenuItem name="3-2">活跃分析</MenuItem>
                    <MenuItem name="3-3">时段分析</MenuItem>
                </MenuGroup>
                <MenuGroup title="留存">
                    <MenuItem name="3-4">用户留存</MenuItem>
                    <MenuItem name="3-5">流失用户</MenuItem>
                </MenuGroup>
                <MenuItem name="3-6">流失用33户</MenuItem>
                <MenuItem name="3-7">流失用33户</MenuItem>
                <MenuItem name="3-8">流失用33户</MenuItem>
                <MenuItem name="3-9">流失用33户</MenuItem>
                <MenuItem name="3-10">流失用33户</MenuItem>

            </Submenu>

        </Menu>
        <br>
        <p>Change theme</p>
        <RadioGroup v-model="theme1">
            <Radio label="light"></Radio>
            <Radio label="dark"></Radio>
            <Radio label="primary"></Radio>
        </RadioGroup>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                theme1: 'light'
            }
        }
    };
</script>
