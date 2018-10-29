<template>
  <div :class="classes">
    <li @mouseenter="handleMouseenter" @mouseleave="handleMouseleave">
      <div :class="[prefixCls + '-around-submenu-title']" ref="reference" @click.stop="handleClick" :style="titleStyle">
          <slot name="subTitle"></slot>
          <Icon type="ios-arrow-forward" :class="[prefixCls + '-around-submenu-title-icon']"></Icon>
      </div>
      <transition name="fade">
        <div :class="[prefixCls + '-around-menu-group']" ref="popper" :style="styles">
          <div :class="[prefixCls + '-around-menu-group-wrap']">
            <slot name="around-menu"></slot>
          </div>
        </div>
      </transition>
    </li>
  </div>
</template>

<script>
  import Popper from '../base/popper';
  import { oneOf } from '../../utils/assist';
  import mixin from './mixin';
  const prefixCls = 'ivu-menu';
  export default {
    mixins: [ Popper, mixin ],
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
                [`${prefixCls}-around-right-start`]: this.placement === 'right-start',
                [`${prefixCls}-around-right`]: this.placement === 'right',
                [`${prefixCls}-around-right-end`]: this.placement === 'right-end'
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
      },
      handleClick () {
        if (this.disabled) return;
        if (this.mode === 'horizontal') return;
        const opened = this.opened;
        if (this.accordion) {
          this.$parent.$children.forEach(item => {
              if (item.$options.name === 'Submenu') item.opened = false;
          });
        }
        this.opened = !opened;
        this.menu.updateOpenKeys(this.name);
      }
    },
    mounted () {
      this.$on('on-menu-item-select', (name) => {
        if (this.mode === 'horizontal') this.opened = false;
        this.dispatch('Menu', 'on-menu-item-select', name);
        return true;
      });
      this.$on('on-update-active-name', (status) => {
        if (findComponentUpward(this, 'Submenu')) this.dispatch('Submenu', 'on-update-active-name', status);
        if (findComponentsDownward(this, 'Submenu')) findComponentsDownward(this, 'Submenu').forEach(item => {
            item.active = false;
        });
        this.active = status;
      });
    }
  };
</script>