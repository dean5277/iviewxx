# iviewxx 3.1.3
### 兼容Iview 3.1.2

基于完成功能为目的，如果有天iview更新相关功能，请以iview为准。 <br />
如果有Bug，请提交一下issues <br />

#### 最近（iviewxx 3.1.3）:
1. 优化menu触发方式[Menu](https://iviewxx.deancheng.com/#/menu)
2. 水平菜单下拉文字不换行，如果要换行用样式覆盖。
3. 修正MenuAround subTitle的slot代码

[完成日志请查看URL](https://github.com/dean5277/iviewxx/blob/master/changeLog.md)

### Install
npm install iviewxx --save<br />

### Usage
es6<br />
import Vue from 'vue'<br />
import iview from 'iviewxx'<br />
Vue.use(iview)<br /><br />


### 新加组件在线DEMO

###### 下拉树
[treeSelect](https://iviewxx.deancheng.com/#/treeSelect)

```
<treeSelect :treeData="treeData" ref="treeDataRef" v-model="data" filterable @on-change="getTreeData" show-checkbox></treeSelect>
具体用法请看examples/routers/treeSelect.vue
```

###### 按钮组
[Buttons](https://iviewxx.deancheng.com/#/buttons)

```
具体用法请看examples/routers/buttons.vue
```

###### 表格（拖动表头大小，合并单元格，多级展开
[dTable](https://iviewxx.deancheng.com/#/dTable)

```
具体用法请看examples/routers/dTable.vue
```

###### Input 增加tags类型
[Input Tag](https://iviewxx.deancheng.com/#/input)

```
<Input v-model="value4" type="tags" placeholder="tags" @on-change="getValue"></Input>
```

###### Menu 子菜单横向菜单
[Menu](https://iviewxx.deancheng.com/#/menu)

```
<MenuAround placement="right-end">
    <template slot="subTitle">
         <!-- 此处以组件嵌入，更方便控制 -->
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
```

### table children
![demo](http://jpg.deancheng.com/123.png)
<br /><br />














