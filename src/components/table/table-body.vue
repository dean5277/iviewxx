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
                        <td v-for="column in columns" :class="alignCls(column, row)"  >
                            <Cell
                                :fixed="fixed"
                                :prefix-cls="prefixCls"
                                :row="row"
                                :column="column"
                                :natural-index="index"
                                :index="row._index"
                                :checked="rowChecked(row._index)"
                                :disabled="rowDisabled(row._index)"
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
                    
                      <td v-for="column in columns" :class="alignCls(column, row)"   >
                          <Cell
                              :fixed="fixed"
                              :prefix-cls="prefixCls"
                              :row="row"
                              :column="column"
                              :natural-index="index"
                              :index="row._index"
                              :checked="rowChecked(row._index)"
                              :disabled="rowDisabled(row._index)"
                              ></Cell>
                      </td>
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
               displayValue:this.makeDisplayValue()
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
            }
        },
        created (){
           
           
        },
       /* computed:{
            displayValue (){
               
               return this.makeDisplayValue();
            }
        },*/
/*        watch:{
            status (n,o){
                console.log('......11')
                console.log(n)
            }
        },*/
        methods: {
            makeDisplayValue (){
                let pos = [],
                    stretchPos = [];
                 
                 store.state.status.forEach((n,i) =>{
                    n.forEach((m,t)=>{
                        if(m[0] == -1){
                            stretchPos.push(m[1]);
                            pos.push(true);
                         //  pos.push(true);  
                        }else{
                            stretchPos.push(m[1]);
                            pos.push(stretchPos[m[0]]);
                        }
                       
                    })
                })
               
                return pos;
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
            },showRelated (grid,sIndex){//实际上是改变status
                let status = store.state.status;
               // console.log(status[grid][sIndex]);
                if(status[grid][sIndex][1]){
                    status[grid][sIndex][1] = false;
                }else{
                    status[grid][sIndex][1] = true;
                }
                

                store.commit('status',status);
                this.displayValue = this.makeDisplayValue();
              /*  this.status = store.state.status;
                console.log( this.status)*/
            },
        }
    };
</script>
