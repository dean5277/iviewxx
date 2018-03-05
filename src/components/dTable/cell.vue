<style scoped>
    @font-face {font-family: "iconfont";
      src: url('//at.alicdn.com/t/font_wpboh046qx5hfr.eot?t=1493796069197'); /* IE9*/
      src: url('//at.alicdn.com/t/font_wpboh046qx5hfr.eot?t=1493796069197#iefix') format('embedded-opentype'), /* IE6-IE8 */
      url('//at.alicdn.com/t/font_wpboh046qx5hfr.woff?t=1493796069197') format('woff'), /* chrome, firefox */
      url('//at.alicdn.com/t/font_wpboh046qx5hfr.ttf?t=1493796069197') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
      url('//at.alicdn.com/t/font_wpboh046qx5hfr.svg?t=1493796069197#iconfont') format('svg'); /* iOS 4.1- */
    }

    .iconfont {
      font-family:"iconfont" !important;
      font-size:16px;
      font-style:normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }


    .icon-iconfontunie047:before { content: "\e60b"; }

    .icon-iconfontunie048:before { content: "\e60c"; }

    .iconfont{font-size: 12px; padding-right: 5px; position: relative; top:2px;-moz-user-select:none;/*火狐*/
        -webkit-user-select:none;/*webkit浏览器*/
        -ms-user-select:none;/*IE10*/
        -khtml-user-select:none;/*早期浏览器*/
          user-select:none;}
     .tableStretch{font-size: 14px; cursor: pointer;}
</style>
<template>
    <div :class="classes" ref="cell">
        <template v-if="renderType === 'childSection'"></template>
        <template v-if="renderType === 'index'">{{naturalIndex + 1}}</template>
        <template v-if="renderType === 'selection'">
            <template v-if="!row._display">
                <Checkbox :value="checked" @on-change="toggleSelect" :disabled="disabled"></Checkbox>
            </template>
        </template>
        <template v-if="renderType === 'switch'">
             <template v-if="row.hasChild">
               <i class="icon iconfont tableStretch" :class="[!iconStatus ? 'icon-iconfontunie047' : 'icon-iconfontunie048']" :v="row.sIndex" @click="showRelated(row.grid,row.sIndex)" :style="{paddingLeft:row.indentSize + 'px'}"></i> {{row[column.key]}}
             </template> 
             <template v-else-if="(!!row.pid && !row.hasChild) || (row.pid == 0 && !row.hasChild)">
                <span :style="{paddingLeft:row.indentSize + 'px'}"></span>{{row[column.key]}}
             </template>
             <template v-else>
                {{row[column.key]}}
             </template>
        </template>
        <template v-if="renderType === 'expand' && !row._disableExpand">
            <div :class="expandCls" @click="toggleExpand">
                <Icon type="ios-arrow-right"></Icon>
            </div>
        </template>
        <template v-if="renderType === 'normal'"><span v-html="row[column.key]" ></span></template>
        <Cell
            v-if="renderType === 'render'"
            :row="row"
            :column="column"
            :index="index"
            :render="column.render"></Cell>
        <template v-if="renderType === 'mixSelection'">
            <template v-if="cs == null && rs == null">
                 <Checkbox :value="checked" @on-change="toggleSelect" :disabled="disabled"></Checkbox>
            </template>
            <template v-else>
                  <Cell
                    :row="row"
                    :column="column"
                    :index="index"
                    :render="column.render"></Cell>

            </template>
        </template>
    </div>
</template>
<script>
    import Cell from './expand';
    import Icon from '../icon/icon.vue';
    import Checkbox from '../checkbox/checkbox.vue';
    import { findComponentUpward } from '../../utils/assist';

    export default {
        name: 'TableCell',
        components: {Icon, Checkbox ,Cell},
        props: {
            prefixCls: String,
            row: Object,
            column: Object,
            naturalIndex: Number,    // index of rebuildData
            index: Number,           // _index of data
            checked: Boolean,
            disabled: Boolean,
            expanded: Boolean,
            fixed: {
                type: [Boolean, String],
                default: false
            },
            iconStatus:Boolean,
            cs:{
                type:Number,
                default:null
            },
            rs:{
                type:Number,
                default:null
            }
        },
        
        data () {
            return {
                renderType: '',
                uid: -1,
                context: this.$parent.$parent.currentContext
            };
        },
        computed: {
            classes () {
                return [
                    `${this.prefixCls}-cell`,
                    {
                        [`${this.prefixCls}-hidden`]: !this.fixed && this.column.fixed && (this.column.fixed === 'left' || this.column.fixed === 'right'),
                        [`${this.prefixCls}-cell-ellipsis`]: this.column.ellipsis || false,
                        [`${this.prefixCls}-cell-with-expand`]: this.renderType === 'expand'
                    }
                ];
            },
            childStyle (){
                if(this.row.pid && this.row.indentSize){
                     return 'padding-left:' + (this.row.indentSize + 18 ) + 'px';
                }else{
                    return '';
                }
               
            },
            expandCls () {
                return [
                    `${this.prefixCls}-cell-expand`,
                    {
                        [`${this.prefixCls}-cell-expand-expanded`]: this.expanded
                    }
                ];
            }
        },
        methods: {
          
            toggleSelect () {
                this.$parent.$parent.toggleSelect(this.index);
            },
            toggleExpand () {
                this.$parent.$parent.$parent.toggleExpand(this.index);
            },
            showRelated (grid,sIndex){
                this.$parent.showRelated(grid,sIndex);
            }
        },
        created () {
            if (this.column.type === 'index') {
                this.renderType = 'index';
            }else if((this.column.type === 'selection' && this.column.combine)) {
                this.renderType = "mixSelection";
            } else if (this.column.type === 'selection' && !this.column.combine) {
                this.renderType = 'selection';
            }else if(this.column.type === 'switch'){
                this.renderType = 'switch';
            } else if (this.column.type === 'expand') {
                this.renderType = 'expand';
            } else if(this.column.type === 'childSection'){
                this.renderType = 'childSection';
            }  else if (this.column.render || this.column.combine) {
                this.renderType = 'render';
            } else{
                this.renderType = 'normal';
            }
        }
    };
</script>
