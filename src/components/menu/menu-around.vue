<template>
  <div :class="classes">
    <li @mouseenter="handleMouseenter" @mouseleave="handleMouseleave">
      <div :class="[prefixCls + '-around-submenu-title']" ref="reference" @click.stop="handleClick" :style="titleStyle">
          <slot name="subTitle"></slot>
          <Icon type="ios-arrow-forward" :class="[prefixCls + '-around-submenu-title-icon']"></Icon>
      </div>
      <transition name="fade">
        <div :class="[prefixCls + '-around-menu-group']" ref="popper" :style="styles">
          <slot name="around-menu">

          </slot>
        </div>
      </transition>
    </li>
  </div>
</template>

<script>
  import Popper from '../base/popper';
  import { oneOf } from '../../utils/assist';
  const prefixCls = 'ivu-menu';
  export default {
    mixins: [ Popper ],
    name: 'MenuAround',
    props: {
      trigger: {
          validator (value) {
              return oneOf(value, ['click', 'focus', 'hover']);
          },
          default: 'hover'
      },
      placement: {
          validator (value) {
              return oneOf(value, ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']);
          },
          default: 'right-start'
      }
    },
    data () {
      return {
        prefixCls: prefixCls,
        aroundOpened: false
      };
    },
    computed: {
      classes () {
          return [
              `${prefixCls}-around`,
              {
                [`${prefixCls}-around-opened`]: this.aroundOpened,
                [`${prefixCls}-around-right-start`]: this.placement === 'right-start'
              }
          ];
      },
      titleStyle () {
          return this.hasParentSubmenu && this.mode !== 'horizontal' ? {
              paddingLeft: 43 + (this.parentSubmenuNum - 1) * 24 + 'px'
          } : {};
      },
      styles () {
        let style = {};
        return style;
      }
    },
    methods: {
      handleMouseenter () {
        this.aroundOpened = true;
      },
      handleMouseleave () {
        this.aroundOpened = false;
      }
    }
  };
</script>