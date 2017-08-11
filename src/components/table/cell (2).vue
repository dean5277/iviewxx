<template>
    <div :class="classes" ref="cell">
        <template v-if="renderType === 'childSection'">
           <!--  <template v-if=" row.itemId && row.itemId != -1 ">
               <i class="icon iconfont  tableStretch" :class="[!row.stretch ? 'icon-iconfontunie047' : 'icon-iconfontunie048']" :v="index" @click="showRelated(index)"></i>
           </template>    -->
        </template>
        <template v-if="renderType === 'index'">{{naturalIndex + 1}}</template>
        <template v-if="renderType === 'selection'">
            <Checkbox :value="checked" @on-change="toggleSelect" :disabled="disabled"></Checkbox>
        </template>
        <template v-if="renderType === 'switch'">
             <template v-if=" row.hasChild">
               <i class="icon iconfont  tableStretch" :class="[!iconStatus ? 'icon-iconfontunie047' : 'icon-iconfontunie048']" :v="row.sIndex" @click="showRelated(row.grid,row.sIndex)" :style="{paddingLeft:row.indentSize + 'px'}"></i> {{row[column.key]}}
             </template> 
             <template v-else-if="(!!row.pid  && !row.hasChild) || (row.pid == 0 && !row.hasChild)">
                 <span :style="{paddingLeft:row.indentSize + 'px'}"></span>{{row[column.key]}}
             </template>
             <template v-else>
                 {{row[column.key]}}
             </template>
        </template>
        <template v-if="renderType === 'normal'"><span v-html="row[column.key]" ></span></template>
    </div>
</template>
<script>
    import Vue from 'vue';
    import Checkbox from '../checkbox/checkbox.vue';
    import { findComponentUpward } from '../../utils/assist';

    export default {
        name: 'TableCell',
        components: { Checkbox },
        props: {
            prefixCls: String,
            row: Object,
            column: Object,
            naturalIndex: Number,    // index of rebuildData
            index: Number,           // _index of data
            checked: Boolean,
            disabled: Boolean,
            fixed: {
                type: [Boolean, String],
                default: false
            },
            iconStatus:Boolean
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
                        [`${this.prefixCls}-cell-ellipsis`]: this.column.ellipsis || false
                    }
                ];
            },
            childStyle (){
                if(this.row.pid && this.row.indentSize){
                     return 'padding-left:' + (this.row.indentSize + 18 ) + 'px';
                }else{
                    return '';
                }
               
            }
        },
        methods: {
            compile () {
                if (this.column.render) {
                    // 兼容真 Render，后期废弃旧用法
                    let isRealRender = true;
                    const Table = findComponentUpward(this, 'Table');
                    console.log(Table.context)
                    if (Table.context) isRealRender = false;
                     
                    if (isRealRender) {
                       
                        const component = new Vue({
                            functional: true,
                            render: (h) => {
                                return this.column.render(h, {
                                    row: this.row,
                                    column: this.column,
                                    index: this.index
                                });
                            }
                        });

                        const Cell = component.$mount();
                        console.log(Cell.$el)
                        this.$refs.cell.appendChild(Cell.$el);
                    } else {
	                    const $parent = this.context;
	                    const template = this.column.render(this.row, this.column, this.index);

	                    const cell = document.createElement('div');
	                    if(template.children){
	                         cell.innerHTML = template.children;
	                    }else{
	                         cell.innerHTML = template;
	                    }
                   

	                    this.$el.innerHTML = '';
	                    let methods = {};
	                    Object.keys($parent).forEach(key => {
	                        const func = $parent[key];
	                        if (typeof(func) === 'function' && (func.name  === 'boundFn' || func.name === 'n')) {
	                            methods[key] = func;
	                        }
	                    });
	                    const res = Vue.compile(cell.outerHTML);
	                    // todo 临时解决方案

	                    // 获取父组件使用的局部 component
	                    const components = {};
	                    Object.getOwnPropertyNames($parent.$options.components).forEach(item => {
	                        components[item] = $parent.$options.components[item];
	                    });

	                    const component = new Vue({
	                        render: res.render,
	                        staticRenderFns: res.staticRenderFns,
	                        methods: methods,
	                        data () {
	                            return $parent._data;
	                        },
	                        components: components
	                    });
		                if ($parent.$store != undefined) {
                            component.$store = $parent.$store;
                        }
                        component.row = this.row;
                        component.column = this.column;

                        const Cell = component.$mount();
                        this.$refs.cell.appendChild(Cell.$el);
                    }
                }
            },
            destroy () {

            },
            toggleSelect () {
                this.$parent.$parent.toggleSelect(this.index);
            },
            showRelated (grid,sIndex){
                this.$parent.showRelated(grid,sIndex);
            }
        },
        created () {
            if (this.column.type === 'index') {
                this.renderType = 'index';
            } else if (this.column.type === 'selection') {
                this.renderType = 'selection';
            }else if(this.column.type === 'switch'){
                this.renderType = 'switch';
            } else if(this.column.type === 'childSection'){
                this.renderType = 'childSection';
            }  else if (this.column.render) {
                this.renderType = 'render';
            }else{
                this.renderType = 'normal';
            }
        },
        mounted () {
            this.$nextTick(() => {
                this.compile();
            });
        },
        beforeDestroy () {
            this.destroy();
        },
        watch: {
            naturalIndex () {
                this.destroy();
                this.compile();
            }
        }
    };
</script>
