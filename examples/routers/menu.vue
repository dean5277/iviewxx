<template>
    <Menu mode="horizontal" :theme="theme1" active-name="3-4" @on-select="hs">
        <MenuItem name="1" to="/button" target="_blank">
            <Icon type="ios-paper" />
            内容管理
        </MenuItem>
        <MenuItem name="2">
            <Icon type="ios-people" />
            用户管理
        </MenuItem>
        <Submenu name="3">
            <template slot="title">
                <Icon type="ios-stats" />
                统计分析
            </template>
            <MenuGroup title="使用">
                <MenuItem name="3-1">新增和启动新增和启动新增和启动新增和启动新增和启动</MenuItem>
                <MenuItem name="3-2">活跃分析</MenuItem>
                <MenuItem name="3-3">时段分析</MenuItem>
            </MenuGroup>
            <MenuAround placement="right-end">
                <template slot="subTitle">
                    <MenuItem name="3-4-1">时段分析时段分析</MenuItem>
                </template>
                <template slot="around-menu">
                    <MenuGroup title="使用">
                        <MenuItem name="3-4-1">1</MenuItem>
                        <MenuItem name="3-4-2">2</MenuItem>
                        <MenuItem name="3-4-3">3</MenuItem>
                    </MenuGroup>
                </template>
            </MenuAround>
            <MenuAround placement="right">
                <template slot="subTitle">
                    <MenuItem name="3-4-1">ds3</MenuItem>
                </template>
                <template slot="around-menu">
                    <MenuGroup title="使22用">
                        <MenuItem name="4-4-1">331</MenuItem>
                        <MenuItem name="4-4-2">22</MenuItem>
                        <MenuItem name="4-4-3">23</MenuItem>
                    </MenuGroup>
                    <MenuItem name="4-4-4">23</MenuItem>
                    <MenuItem name="4-4-5">23</MenuItem>
                </template>
            </MenuAround>
        </Submenu>
        <MenuItem name="4">
            <Icon type="ios-construct" />
            综合设置
        </MenuItem>
    </Menu>
</template>
<script>
    export default {
        data () {
            return {
                theme1: 'light'
            }
        },
        methods: {
            hs (n) {
                console.log(n);
            }
        }
    }
</script>
