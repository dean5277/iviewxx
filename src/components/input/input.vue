<template>
    <div :class="wrapClasses">
        <template v-if="type !== 'textarea' && type !== 'tags'">
            <div :class="[prefixCls + '-group-prepend']" v-if="prepend" v-show="slotReady"><slot name="prepend"></slot></div>
            <i class="ivu-icon" :class="['ivu-icon-ios-close-circle', prefixCls + '-icon', prefixCls + '-icon-clear' , prefixCls + '-icon-normal']" v-if="clearable && currentValue" @click="handleClear"></i>
            <i class="ivu-icon" :class="['ivu-icon-' + icon, prefixCls + '-icon', prefixCls + '-icon-normal']" v-else-if="icon" @click="handleIconClick"></i>
            <i class="ivu-icon ivu-icon-ios-search" :class="[prefixCls + '-icon', prefixCls + '-icon-normal', prefixCls + '-search-icon']" v-else-if="search && enterButton === false" @click="handleSearch"></i>
            <span class="ivu-input-suffix" v-else-if="showSuffix"><slot name="suffix"><i class="ivu-icon" :class="['ivu-icon-' + suffix]" v-if="suffix"></i></slot></span>
            <transition name="fade">
                <i class="ivu-icon ivu-icon-ios-loading ivu-load-loop" :class="[prefixCls + '-icon', prefixCls + '-icon-validate']" v-if="!icon"></i>
            </transition>
            <input
                :id="elementId"
                :autocomplete="autocomplete"
                :spellcheck="spellcheck"
                ref="input"
                :type="type"
                :class="inputClasses"
                :placeholder="placeholder"
                :disabled="disabled"
                :maxlength="maxlength"
                :readonly="readonly"
                :name="name"
                :value="currentValue"
                :number="number"
                :autofocus="autofocus"
                @keyup.enter="handleEnter"
                @keyup="handleKeyup"
                @keypress="handleKeypress"
                @keydown="handleKeydown"
                @focus="handleFocus"
                @blur="handleBlur"
                @input="handleInput"
                @change="handleChange">
            <div :class="[prefixCls + '-group-append']" v-if="append" v-show="slotReady"><slot name="append"></slot></div>
            <div :class="[prefixCls + '-group-append', prefixCls + '-search']" v-else-if="search && enterButton" @click="handleSearch">
                <i class="ivu-icon ivu-icon-ios-search" v-if="enterButton === true"></i>
                <template v-else>{{ enterButton }}</template>
            </div>
            <span class="ivu-input-prefix" v-else-if="showPrefix"><slot name="prefix"><i class="ivu-icon" :class="['ivu-icon-' + prefix]" v-if="prefix"></i></slot></span>
        </template>
        <textarea
            v-else-if="type !== 'tags' && type == 'textarea'"
            :id="elementId"
            :wrap="wrap"
            :autocomplete="autocomplete"
            :spellcheck="spellcheck"
            ref="textarea"
            :class="textareaClasses"
            :style="textareaStyles"
            :placeholder="placeholder"
            :disabled="disabled"
            :rows="rows"
            :maxlength="maxlength"
            :readonly="readonly"
            :name="name"
            :value="currentValue"
            :autofocus="autofocus"
            @keyup.enter="handleEnter"
            @keyup="handleKeyup"
            @keypress="handleKeypress"
            @keydown="handleKeydown"
            @focus="handleFocus"
            @blur="handleBlur"
            @input="handleInput">
        </textarea>
        <template v-else>
            <div class="ivu-input-tagsContainer" >
                <div
                    :class="tagsCls"
                    ref="reference"
                    id="tagsCls"
                    @click="focusInput"
                >
                    <input type="hidden" :name="name" :value="model">
                    <div class="ivu-tag ivu-tag-checked" v-for="(item, index) in tagsMultiple">
                        <span class="ivu-tag-text">{{ item }}</span>
                        <Icon type="ios-close" @click.native.stop="removeTag(index)"></Icon>
                    </div>
                    <input
                       :id="elementId"
                       ref="input"
                       :class="tagsTextareaClasses"
                       :disabled="disabled"
                       :rows="rows"
                       :placeholder="showPlaceholder ? localePlaceholder : ''"
                       :maxlength="maxlength"
                       :readonly="readonly"
                       :name="name"
                       :value="currentValue"
                       :autofocus="autofocus"
                       autocomplete="off"
                       :style="inputStyle"
                       @keyup.enter="handleEnter"
                       @keyup="handleKeyup"
                       @keypress="handleKeypress"
                       @keydown="resetInputState"
                       @focus="handleFocus"
                       @blur="handleBlur"
                       @input="handleInput"
                    >
                   </input>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
    import { oneOf, findComponentUpward } from '../../utils/assist';
    import calcTextareaHeight from '../../utils/calcTextareaHeight';
    import Emitter from '../../mixins/emitter';

    const prefixCls = 'ivu-input';

    export default {
        name: 'Input',
        mixins: [ Emitter ],
        props: {
            type: {
                validator (value) {
                    return oneOf(value, ['text', 'textarea', 'password', 'url', 'email', 'date', 'tags']);
                },
                default: 'text'
            },
            value: {
                type: [String, Number, Array],
                default: ''
            },
            size: {
                validator (value) {
                    return oneOf(value, ['small', 'large', 'default']);
                },
                default () {
                    return !this.$IVIEW || this.$IVIEW.size === '' ? 'default' : this.$IVIEW.size;
                }
            },
            placeholder: {
                type: String,
                default: ''
            },
            maxlength: {
                type: Number
            },
            disabled: {
                type: Boolean,
                default: false
            },
            icon: String,
            autosize: {
                type: [Boolean, Object],
                default: false
            },
            rows: {
                type: Number,
                default: 2
            },
            readonly: {
                type: Boolean,
                default: false
            },
            name: {
                type: String
            },
            number: {
                type: Boolean,
                default: false
            },
            autofocus: {
                type: Boolean,
                default: false
            },
            spellcheck: {
                type: Boolean,
                default: false
            },
            autocomplete: {
                validator (value) {
                    return oneOf(value, ['on', 'off']);
                },
                default: 'off'
            },
            clearable: {
                type: Boolean,
                default: false
            },
            elementId: {
                type: String
            },
            wrap: {
                validator (value) {
                    return oneOf(value, ['hard', 'soft']);
                },
                default: 'soft'
            },
            prefix: {
                type: String,
                default: ''
            },
            suffix: {
                type: String,
                default: ''
            },
            search: {
                type: Boolean,
                default: false
            },
            enterButton: {
                type: [Boolean, String],
                default: false
            }
        },
        data () {
            return {
                currentValue: this.type === 'tags' ? '' : this.value,
                prefixCls: prefixCls,
                prepend: true,
                append: true,
                slotReady: false,
                textareaStyles: {},
                tagsMultiple: [],
                model: this.value,
                tagsSingle: '',    // label
                visible: false,
        showPrefix: false,
                showSuffix: false
            };
        },
        computed: {
            wrapClasses () {
                return [
                    `${prefixCls}-wrapper`,
                    {
                        [`${prefixCls}-wrapper-${this.size}`]: !!this.size,
                        [`${prefixCls}-type`]: this.type,
                        [`${prefixCls}-group`]: this.prepend || this.append || (this.search && this.enterButton),
                        [`${prefixCls}-group-${this.size}`]: (this.prepend || this.append || (this.search && this.enterButton)) && !!this.size,
                        [`${prefixCls}-group-with-prepend`]: this.prepend,
                        [`${prefixCls}-group-with-append`]: this.append || (this.search && this.enterButton),
                        [`${prefixCls}-hide-icon`]: this.append,  // #554
                        [`${prefixCls}-with-search`]: (this.search && this.enterButton)
                    }
                ];
            },
            inputClasses () {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-${this.size}`]: !!this.size,
                        [`${prefixCls}-disabled`]: this.disabled,
                        [`${prefixCls}-with-prefix`]: this.showPrefix,
                        [`${prefixCls}-with-suffix`]: this.showSuffix || (this.search && this.enterButton === false)
                    }
                ];
            },
            textareaClasses () {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-disabled`]: this.disabled
                    }
                ];
            },
            tagsTextareaClasses (){
                return `${prefixCls}-input`
            },
            tagsCls (){
                return `${prefixCls}-tagsCls`
            },
            showPlaceholder () {
                let status = false;
                if (this.tagsMultiple.length > 0) {
                    status = false;
                }else {
                    status = true;
                }
                return status;
            },
            localePlaceholder () {
                if (this.placeholder === undefined) {
                    return this.t('i.tags.placeholder');
                } else {
                    return this.placeholder;
                }
            },
            inputStyle () {
                let style = {};
                if (this.showPlaceholder && this.value.length < 1) {
                    style.width = '100%';
                } else {
                    style.width = `${this.inputLength}px`;
                }
                return style;
            }
        },
        methods: {
            handleEnter (event) {
                const trim = function(string) {
                    return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
                };
                if(this.type === 'tags' && trim(this.currentValue) !== ''){
                    this.tagsMultiple.push(this.currentValue);
                    this.currentValue = '';
                }
                this.$emit('on-enter', event);
                if (this.search) this.$emit('on-search', this.currentValue);
            },
            handleKeydown (event) {
                this.$emit('on-keydown', event);
            },
            handleKeypress (event) {
                this.$emit('on-keypress', event);
            },
            handleKeyup (event) {
                this.$emit('on-keyup', event);
            },
            handleIconClick (event) {
                this.$emit('on-click', event);
            },
            handleFocus (event) {
                this.$emit('on-focus', event);
            },
            handleBlur (event) {
                this.$emit('on-blur', event);
                if (!findComponentUpward(this, ['DatePicker', 'TimePicker', 'Cascader', 'Search'])) {
                    this.dispatch('FormItem', 'on-form-blur', this.currentValue);
                }
            },
            handleInput (event) {
                let value = event.target.value;
                if (this.number && value !== '') value = Number.isNaN(Number(value)) ? value : Number(value);
                this.$emit('input', value);
                this.setCurrentValue(value);
                this.$emit('on-change', event);
            },
            handleChange (event) {
                this.$emit('on-input-change', event);
            },
            setCurrentValue (value) {
                if (value === this.currentValue) return;
                this.$nextTick(() => {
                    this.resizeTextarea();
                });
                this.currentValue = value;
                if (!findComponentUpward(this, ['DatePicker', 'TimePicker', 'Cascader', 'Search'])) {
                    this.dispatch('FormItem', 'on-form-change', value);
                }
            },
            resizeTextarea () {
                const autosize = this.autosize;
                if (!autosize || this.type !== 'textarea') {
                    return false;
                }

                const minRows = autosize.minRows;
                const maxRows = autosize.maxRows;

                this.textareaStyles = calcTextareaHeight(this.$refs.textarea, minRows, maxRows);
            },
            focus () {
                if (this.type === 'textarea') {
                    this.$refs.textarea.focus();
                } else {
                    this.$refs.input.focus();
                }
            },
            blur () {
                if (this.type === 'textarea') {
                    this.$refs.textarea.blur();
                } else {
                    this.$refs.input.blur();
                }
            },
            handleClear () {
                const e = { target: { value: '' } };
                this.$emit('input', '');
                this.setCurrentValue('');
                this.$emit('on-change', e);
            },
            removeTag (index) {
                if (this.disabled) {
                    return false;
                }
                this.tagsMultiple.splice(index, 1);
            },
            clearTags (){
                if(this.disabled) {
                    return false;
                }
                this.model = '';
            },
            resetInputState () {
                let inputWidth = this.$refs.reference.offsetWidth;
                if (inputWidth > 60){
                    this.inputLength = 100;
                }else{
                    this.inputLength = inputWidth;
                }
            },
            focusInput () {
                this.$refs.input.focus();
            },
            handleSearch () {
                if (this.disabled) return false;
                this.$refs.input.focus();
                this.$emit('on-search', this.currentValue);
            }

        },
        watch: {
            value (val) {
                this.setCurrentValue(val);
            },
            visible (val) {
                if (!val) {
                    this.$refs.input.focus();
                }
            }
        },
        mounted () {
            if (this.type !== 'textarea') {
                this.prepend = this.$slots.prepend !== undefined;
                this.append = this.$slots.append !== undefined;
                this.showPrefix = this.prefix !== '' || this.$slots.prefix !== undefined;
                this.showSuffix = this.suffix !== '' || this.$slots.suffix !== undefined;
            } else {
                this.prepend = false;
                this.append = false;
            }
            if (this.type === 'tags' && typeof this.value === 'object' && this.value.length >  0){
                this.tagsMultiple = this.value;
            }
            this.slotReady = true;
            this.resizeTextarea();
        }
    };
</script>
