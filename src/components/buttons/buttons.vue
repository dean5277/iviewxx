<template>
    <div
        :class="[prefixCls]"
        v-clickoutside="handleClose"
       >
        <div :class="[prefixCls + '-rel']" ref="reference">
            <slot></slot>
            <div class="buttonsArrows" @click="handleClick" :class="{'buttonsArrowHover':currentVisible}"><Icon type="arrow-down-b" class="arrowDown"></Icon></div>
        </div>
        <transition :name="transition">
            <but v-show="currentVisible" :placement="placement" ref="but"><slot name="list"></slot></but>
        </transition>
    </div>
</template>
<script>
    import but from '../select/buttons.vue';
    import clickoutside from '../../directives/clickoutside';
    import { oneOf, findComponentUpward } from '../../utils/assist';

    const prefixCls = 'ivu-dropdown';

    export default {
        name: 'Buttons',
        directives: { clickoutside },
        components: { but },
        props: {
            trigger: {
                validator (value) {
                    return oneOf(value, ['click', 'hover', 'custom']);
                },
                default: 'hover'
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
            }
        },
        computed: {
            transition () {
                return ['bottom-start', 'bottom', 'bottom-end'].indexOf(this.placement) > -1 ? 'slide-up' : 'fade';
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
