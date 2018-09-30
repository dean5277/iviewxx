<template>
    <div
        :class="[prefixCls]"
        style="padding-right: 12px"
        v-clickoutside="handleClose"
       >
        <div :class="[prefixCls + '-rel']" ref="reference">
            <slot></slot>
            <div @click="handleClick" :class="buttonsArrows" class="ivu-btns"><Icon type="md-arrow-dropdown" class="arrowDown"></Icon></div>
        </div>
        <transition name="transition-drop">
            <but
                v-show="currentVisible"
                :data-transfer="transfer"
                :placement="placement"
                ref="but"
                v-transfer-dom
            ><slot name="list"></slot></but>
        </transition>
    </div>
</template>
<script>
    import but from './dropdown.vue';
    import clickoutside from '../../directives/clickoutside';
    import { oneOf, findComponentUpward } from '../../utils/assist';
    import TransferDom from '../../directives/transfer-dom';
    const prefixCls = 'ivu-dropdown',
          buttonsCls = 'ivu-btns';

    export default {
        name: 'Buttons',
        directives: { clickoutside, TransferDom },
        components: { but },
        props: {
            trigger: {
                validator (value) {
                    return oneOf(value, ['click', 'hover', 'custom']);
                },
                default: 'click'
            },
            placement: {
                validator (value) {
                    return oneOf(value, ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']);
                },
                default: 'bottom'
            },
            visible: {
                type: Boolean,
                default: false
            },
            type: {
                validator (value) {
                    return oneOf(value, ['primary', 'ghost', 'dashed', 'text', 'info', 'success', 'warning', 'error', 'default']);
                },
                default:"default"
            },
            transfer: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            transition () {
                return ['bottom-start', 'bottom', 'bottom-end'].indexOf(this.placement) > -1 ? 'slide-up' : 'fade';
            },
            buttonsArrows (){
                console.log(!!this.type && !this.disabled)
                return `${buttonsCls}`,
                    {
                     [`${buttonsCls}-${this.type}`]: (!!this.type && !this.disabled),
                     [`${buttonsCls}-disabled`]: this.disabled
                    }
            }
        },
        data () {
            return {
                prefixCls: prefixCls,
                currentVisible: this.visible
            };
        },
        watch: {
            visible (val) {
                this.currentVisible = val;
            },
            currentVisible (val) {
                if (val) {
                    this.$refs.but.update();
                } else {
                    this.$refs.but.destroy();
                }
                this.$emit('on-visible-change', val);
            }
        },
        methods: {
            handleClick () {
                if (this.trigger === 'custom') return false;
                if (this.trigger !== 'click') {
                    return false;
                }
                this.currentVisible = !this.currentVisible;
            },
            handleMouseenter () {
                if (this.trigger === 'custom') return false;
                if (this.trigger !== 'hover') {
                    return false;
                }
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.currentVisible = true;
                }, 250);
            },
            handleMouseleave () {
                if (this.trigger === 'custom') return false;
                if (this.trigger !== 'hover') {
                    return false;
                }
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.currentVisible = false;
                }, 150);
            },
            handleClose () {
                if (this.trigger === 'custom') return false;
                if (this.trigger !== 'click') {
                    return false;
                }
                this.currentVisible = false;
            },
            hasParent () {
//                const $parent = this.$parent.$parent.$parent;
                const $parent = findComponentUpward(this, 'Buttons');
                if ($parent) {
                    return $parent;
                } else {
                    return false;
                }
            }
        },
        mounted () {
            this.$on('on-click', (key) => {
                const $parent = this.hasParent();
                if ($parent) $parent.$emit('on-click', key);
            });
            this.$on('on-hover-click', () => {
                const $parent = this.hasParent();
                if ($parent) {
                    this.$nextTick(() => {
                        if (this.trigger === 'custom') return false;
                        this.currentVisible = false;
                    });
                    $parent.$emit('on-hover-click');
                } else {
                    this.$nextTick(() => {
                        if (this.trigger === 'custom') return false;
                        this.currentVisible = false;
                    });
                }
            });
            this.$on('on-haschild-click', () => {
                this.$nextTick(() => {
                    if (this.trigger === 'custom') return false;
                    this.currentVisible = true;
                });
                const $parent = this.hasParent();
                if ($parent) $parent.$emit('on-haschild-click');
            });
        }
    };
</script>
