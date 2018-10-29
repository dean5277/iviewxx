### 更新日志

#### 最近（iviewxx 3.1.3）:
1. 优化menu触发方式[Menu](https://iviewxx.deancheng.com/#/menu)
2. 水平菜单下拉文字不换行，如果要换行用样式覆盖。
3. 修正MenuAround subTitle的slot代码

#### 最近（iviewxx 3.1.0）:
1. Menu 支持横向子菜单，最多支持3级[Menu](https://iviewxx.deancheng.com/#/menu)

#### 最近（iviewxx 3.0.8）:
1. 修复steps 控件 props tips 上次大版本修改后漏掉的BUG

#### 最近（iviewxx 3.0.7）:
1. InputNumber控件，设置最小值，实时取值

#### 最近（iviewxx 3.0.6）:
1. dropdown控件，如果下拉选项disabled掉的话，on-click不能获取其name值

#### 最近（iviewxx 3.0.5）:
1. InputNumber控件，如果设置了最小值,失去焦点且内容为空时，则取最小值

#### 最近（iviewxx 3.0.3）:
1. 合并iview3.1.2代码
2. 修改input-number组件，如果设置浮点精度，只有失去焦点的时候，才会进行补位。
3. 因为iview3.x 不完全兼容iview2.x，所以他们不兼容的我们也不兼容，如果要用Iview2.x的功能，请安装iviewxx 2.14.4

#### 最近（iviewxx 3.0.0）:
1. 合并iview3.1.2代码
2. 修改input-number组件，如果设置浮点精度，只有失去焦点的时候，才会进行补位。
3. 因为iview3.x 不完全兼容iview2.x，所以他们不兼容的我们也不兼容，如果要用Iview2.x的功能，请安装iviewxx 2.14.4。

#### 最近（iviewxx 2.0.4）:
1. 删除dTable的vuex, 减轻框架重量
2. 修复dTable 子节点展开不正确的BUG
3. 修改treeSelect on-change触发逻辑
4. 优化inputNumber 精度值回调方式

#### 最近（iviewxx 2.0.1）:
1. 删除dTable的vuex, 减轻框架重量
2. 修复dTable 子节点展开不正确的BUG

#### 最近（iviewxx 1.9.8）:
1. 兼容iview2.14.3（抱歉，最近身体抱恙，没有及时更新）
2. Select 搜索模式时，增加on-enter事件，回调一个event
3. Select 组件 multiple 和 filterable 的时候使用on-enter事件，过滤重复value
4. treeSelect 单选时，默认值没有加载的BUG
5. dTable 同时调用时，一组件数据为空可能引起其他dTable组件数据为空的BUG
6. step 增加 props tips, 移动到图标时显示文字， 相当于A标签的title

#### iviewxx 1.7.22 更新
1. dTable 仿照ant table, fixed left 靠左时，不显示左分割线，靠右时不显示右分割线


#### iviewxx 1.7.21 更新
1. dTable render时兼容无标签回调（vue 2.5.13 后, render 默认需要一层标签）

#### iviewxx 1.7.19 更新
1. Buttons 支持transfer
2. 修复dTable dbClick无效的BUG
3. 兼容iview 2.13.1
4. 修复dTable 增加列时渲染错误的BUG
5. 修复popper.js 无法加载的BUG
6. 修复按需加载dTable 无法加载的BUG

#### iviewxx 1.7.1 更新
1.dTable 也拥有Table的功能啦，支持多级表头和最小宽度最大宽度
2. 修改一些BUG +2. 修复dTable dbClick无效的BUG
3. dTable 也拥有Table的功能啦，支持多级表头和最小宽度最大宽度 +3. 兼容iviw 2.13.1
4. 20180420修改了dTable 合并代码后的一些BUG。  +
5. 修改了下拉树，修改单个节点不生效的BUG
6. 修改了上次合并代码导致下拉树搜索无效的BUG
7. 修复dTable选中问题

#### iviewxx 1.6.12 更新:
1. 增加dTable 非 template/render 模式下，需使用 d-Table
2. 修改一些BUG

#### iviewxx 1.6.9 更新
1. 兼容 iview 2.12.0
2. dTable 暂时不支持多级表头，稍后再合并iview2.12更新的多级表头，如果要使用多级表头的请使用<Table></Table> Table组件是iview的原生组件，并没有任何修改。






