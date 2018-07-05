# iviewxx
### 已经兼容了 2.14.3

基于完成功能为目的，如果有天iview更新相关功能，请以iview为准。 <br />
如果有Bug，请提交一下issues <br />

#### 最近（iviewxx 1.9.8）:
1. 兼容iview2.14.3（抱歉，最近身体抱恙，没有及时更新）
2. Select 搜索模式时，增加on-enter事件，回调一个event
3. Select 组件 multiple 和 filterable 的时候使用on-enter事件，过滤重复value
4. treeSelect 单选时，默认值没有加载的BUG
5. dTable 同时调用时，一组件数据为空可能引起其他dTable组件数据为空的BUG
6. step 增加 props tips, 移动到图标时显示文字， 相当于A标签的title


### Install
npm install iviewxx --save<br />

### Usage
es6<br />
import Vue from 'vue'<br />
import iview from 'iviewxx'<br />
Vue.use(iview)<br /><br />


### 新加组件在线DEMO

###### 下拉树
[treeSelect](http://iviewxx.deancheng.com/#/treeSelect)

###### 按钮组
[Buttons](http://iviewxx.deancheng.com/#/buttons)

###### 表格（拖动表头大小，合并单元格，多级展开
[dTable](http://iviewxx.deancheng.com/#/dTable)

###### Input 增加tags类型
[Input Tag](http://iviewxx.deancheng.com/#/input)



### table children
![demo](http://7xjfvt.com1.z0.glb.clouddn.com/123.png?123)
<br /><br />














