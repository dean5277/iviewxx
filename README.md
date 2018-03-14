# iviewxx
**已经兼容了 iview 2.10.0 Reigns， dTable支持拖动表头**  <br />


基于完成功能为目的，如果有天iview更新相关功能，请以iview为准。 <br />
如果有Bug，请提交一下issues <br />

### 已完成功能
2017/05/11 完成table children，请使用组件dTable <br />
2017/05/16 完成合并单元格，请使用组件dTable <br />
2017/08/11 兼容  2.0.0-rc.20版本<br />

1.修复合并单元格时候render只支持字符串的问题，目前可以支持render以及在select单元格里开始合并<br />
2.修复部分已知BUG

2018/01/25 兼容 2.9.0 Agent A版本<br />
1.修复dTable 点击row的时候报错的BUG <br />
2.增加了组件Buttons <br />
3.增加在线Demo <br />
4.增加npm 安装方法 <br />

2018/02/14  兼容 2.9.2 版本<br />
1.增加了组件Buttons的demo<br />
2.修改了组件Buttons的一些props，详细请看demo<br />
3.增加了组件treeSelect 目前最多支持5000个节点，多了就炸了T.T<br />
4.tree组件增加了个prop _hide:true  隐藏该页<br />

2018/03/05<br />
1.解决treeSelect不能异步渲染的BUG

2018/03/07<br />
1.Input 新增类型 tags<br />

2018/03/09<br />
1.兼容iview 2.10.0 Reigns <br />
2.修复组件Input tags 输入空时的BUG

2018/03/13<br />
1.dTable 支持拖动表头大小 <br />
2.vue 版本限制到2.5.13, vue 2.5.15 会让render返回空

2018/03/14<br />
1.修复 treeSelect 在Modal下触发宽度不正确的问题 <br />


###  Feature Request
1.dTable表格列拖动切换 <br />
2.dTable多级表头 <br />
都是抽空做，没有具体完成时间

### Install
npm install iviewxx<br />

目前版本1.6.6

## Usage
es6<br />
import Vue from 'vue'<br />
import iview from 'iviewxx'<br />
Vue.use(iview)<br /><br />


[在线DEMO](http://www.deancheng.com:82/#/dTable)


### table children
![demo](http://7xjfvt.com1.z0.glb.clouddn.com/123.png?123)
<br /><br />

### 合并单元格

![cells](http://7xjfvt.com1.z0.glb.clouddn.com/cells.png)












