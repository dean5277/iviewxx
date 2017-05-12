<template>
    <table cellspacing="0" cellpadding="0" border="0" :style="styleObject">
        <colgroup>
            <col v-for="(column, index) in columns" :width="setCellWidth(column, index, false)">
        </colgroup>
        <tbody :class="[prefixCls + '-tbody']">
            <template  v-for="(row, index) in data">
                <template v-if="!row.pid && row.pid != 0">
                     <tr 
                        :key="row"
                        v-show="displayValue[row._index]"
                        :class="['ivu-table-row-' + row.nodeIndex , rowClasses(row._index)]"
                        @mouseenter.stop="handleMouseIn(row._index)"
                        @mouseleave.stop="handleMouseOut(row._index)"
                        @click.stop="clickCurrentRow(row._index)"
                        @dblclick.stop="dblclickCurrentRow(row._index)">
                        <td v-for="column in columns" :t="index"  :class="alignCls(column, row)"  >
                            <Cell
                                :fixed="fixed"
                                :prefix-cls="prefixCls"
                                :row="row"
                                :column="column"
                                :natural-index="index"
                                :index="row._index"
                                :checked="rowChecked(row._index)"
                                :disabled="rowDisabled(row._index)"
                                :iconStatus="iconPos[row._index]"
                                ></Cell>
                        </td>
                    </tr>
     
               
                </template>
                <template v-else>
                 <tr 
                     :key="row"
                     :class="['ivu-table-row-' + row.nodeIndex , rowClasses(row._index)]"
                     v-show="displayValue[row._index]"
                     @mouseenter.stop="handleMouseIn(row._index)"
                     @mouseleave.stop="handleMouseOut(row._index)"
                     @click.stop="clickCurrentRow(row._index)"
                     @dblclick.stop="dblclickCurrentRow(row._index)">
                  
                      <template v-for="(column,n) in columns"  >
                          
                           <td v-if="[0,3,6].indexOf(n) != -1"   :class="alignCls(column, row)"    >
                              
                              <Cell
                                 :fixed="fixed"
                                 :prefix-cls="prefixCls"
                                 :row="row"
                                 :column="column"
                                 :natural-index="index"
                                 :index="row._index"
                                 :checked="rowChecked(row._index)"
                                 :disabled="rowDisabled(row._index)"
                                 :iconStatus="iconPos[row._index]"
                                 >
                               </Cell>
                            </td>
                            <td v-if="[1,4].indexOf(n) != -1" colspan="2" >44</td>

                      </template>

                 </tr>
              
                </template>


                
                <!-- -->
            </template>
         
        </tbody>
    </table>
</template>
<script>
    // todo :key="row"
    import Cell from './cell.vue';
    import Mixin from './mixin';
    import store from './store';
    export default {
        name: 'TableBody',
        mixins: [ Mixin ],
        components: { Cell },
        data (){
            return {
               status:store.state.status,
               displayValue:this.makeDisplayValue()[0],
               iconPos:this.makeDisplayValue()[1]
            }
        },
        props: {
            prefixCls: String,
            styleObject: Object,
            columns: Array,
            data: Array,    // rebuildData
            objData: Object,
            columnsWidth: Object,
            fixed: {
                type: [Boolean, String],
                default: false
            },
            iconStatus:Boolean
        },
        methods: {
            compile (){
                this.columns.forEach((column,i) =>{
                    if (column.render) {
                        this.data.forEach((item,n) =>{
                            const template = column.render(item, this.columns, n);
                            if(typeof template == "object" && template.props.colSpan){
                                this.makeColSpan(n,i,template.props.colSpan);
                            }else if(typeof template == "object" && template.props.rowSpan){
                                this.makeColSpan(n,i,template.props.rowSpan);
                            }
                        });
                    
                    }
                });
                
            },
            makeColSpan(dataIndex,colIndex,colspan){//需要合并的tr,第几个td,输入的合并格数
                console.log(dataIndex);
                let colSpanNum = 0;//实际合并多少格
                if((colIndex + colspan) <= this.columns.length){
                    colSpanNum = colspan
                }else{
                    colSpanNum = this.columns.length - colIndex;
                }
             /*   this.columns[colIndex].dataIndex = dataIndex;
                this.columns[colIndex].colSpanNum = colSpanNum;*/
               // this.data[dataIndex].colspan = colSpanNum;

                
                //this.columns[colIndex].colspan = colSpanNum;
                console.log(this.columns)
             },
            makeRowSpan(dataIndex,colIndex,rowspan){

            },

            makeDisplayValue (){
                let pos = [],
                    stretchPos = [];//树原始状态集
                 store.state.status.forEach((n,i) =>{
                      let parnode = true;
                    n.forEach((m,t)=>{
                        if(m[0] == -1){
                            stretchPos.push(m[1]);
                            pos.push(true);
                            if(!m[1]) parnode = false;
                        }else{
                            stretchPos.push(m[1]);
                            if(parnode && stretchPos[m[0]]){
                                pos.push(true);
                            }else{
                                pos.push(false);
                            }
                            if(t == n.length - 1){
                                if(!m[1]) parnode = false;
                            }

                             
                        }
                       
                    })
                })
              
                return [pos,stretchPos];
            },
            rowClasses (_index) {
                return [
                    `${this.prefixCls}-row`,
                    this.rowClsName(_index),
                    {
                        [`${this.prefixCls}-row-highlight`]: this.objData[_index] && this.objData[_index]._isHighlight,
                        [`${this.prefixCls}-row-hover`]: this.objData[_index] && this.objData[_index]._isHover
                    }
                ];
            },
            rowChecked (_index) {
                return this.objData[_index] && this.objData[_index]._isChecked;
            },
            rowDisabled(_index){
                return this.objData[_index] && this.objData[_index]._isDisabled;
            },
            rowClsName (_index) {
                return this.$parent.rowClassName(this.objData[_index], _index);
            },
            handleMouseIn (_index) {
                this.$parent.handleMouseIn(_index);
            },
            handleMouseOut (_index) {
                this.$parent.handleMouseOut(_index);
            },
            clickCurrentRow (_index) {
                this.$parent.clickCurrentRow(_index);
            },
            dblclickCurrentRow (_index) {
                this.$parent.dblclickCurrentRow(_index);
            },showRelated (grid,sIndex){//实际上是改变status..[grid,sIndex]组ID，节点索引
                let status = store.state.status;
               // console.log(status[grid][sIndex]);
                if(status[grid][sIndex][1]){
                    status[grid][sIndex][1] = false;
                }else{
                    status[grid][sIndex][1] = true;
                }
                

                store.commit('status',status);
                this.displayValue = this.makeDisplayValue()[0];
                this.iconPos = this.makeDisplayValue()[1]
              /*  this.status = store.state.status;
                console.log( this.status)*/
            },
        },
        mounted (){
            this.$nextTick(() => {
                this.compile();
            });
        }
    };
</script>
