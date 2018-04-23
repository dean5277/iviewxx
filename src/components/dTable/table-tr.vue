<template>
    <tr
    :class="['ivu-table-row-' + row.nodeIndex , rowClasses(row._index), row._display ? 'tableGrayBg' : '', row._isHighlight ? 'ivu-table-row-highlight' : '']"
    @mouseenter.stop="handleMouseIn(row._index)"
    @mouseleave.stop="handleMouseOut(row._index)"
    >
        <slot></slot>
    </tr>
</template>
<script>
    export default {
        props: {
            row: Object,
            prefixCls: String
        },
        computed: {
            objData () {
                return this.$parent.objData;
            }
        },
        methods: {
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
            rowClsName (_index) {
                return this.$parent.$parent.rowClassName(this.objData[_index], _index);
            },
            handleMouseIn (_index) {
                this.$parent.$parent.handleMouseIn(_index);
            },
            handleMouseOut (_index) {
                this.$parent.$parent.handleMouseOut(_index);
            },
        }
    };
</script>