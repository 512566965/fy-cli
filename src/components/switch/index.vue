<!--
 * @Description  : switch开关
 * @Author       : SC.beisu
 * @Date         : 2021-03-23 08:19:05
 * @LastEditors  : SC.beisu
 * @LastEditTime : 2021-03-26 13:39:45
 * @FilePath     : /fy-deploy-cli/src/components/switch/index.vue
-->
<template>
  <div
    class="switch"
    :class="{ 'is-disable': switchDisabled, 'is-checked': checked }"
    @click="switchValue"
  >
    <input
      class="switch__input"
      type="checkbox"
      :checked="checked"
      ref="input"
    />
    <span
      class="switch__core"
      ref="core"
    ></span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [Boolean, String, Number],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 40
    },
    activeIconClass: {
      type: String,
      default: ''
    },
    inactiveIconClass: {
      type: String,
      default: ''
    },
    activeText: String,
    inactiveText: String,
    activeColor: {
      type: String,
      default: ''
    },
    inactiveColor: {
      type: String,
      default: ''
    },
    activeValue: {
      type: [Boolean, String, Number],
      default: true
    },
    inactiveValue: {
      type: [Boolean, String, Number],
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    id: String
  },
  computed: {
    checked() {
      return this.value === this.activeValue;
    },
    switchDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    }
  },
  watch: {
    checked() {
      this.$refs.input.checked = this.checked;
      if (this.activeColor || this.inactiveColor) {
        this.setBackgroundColor();
      }
      // if (this.validateEvent) {
      //   this.dispatch('ElFormItem', 'el.form.change', [this.value]);
      // }
    }
  },
  methods: {
    hangleChange(event) {
      const val = this.checked ? this.inactiveValue : this.activeValue
      this.$emit('input', val)
      this.$emit('change', val)
      this.$nextTick(() => {
        // set input's checked property
        // in case parent refuses to change component's value
        this.$refs.input.checked = this.checked;
      });
    },
    switchValue() {
      !this.switchDisabled && this.hangleChange()
    },
    setBackgroundColor () {
      let newColor = this.checked ? activeColor :  inactiveColor
      this.$refs.core.style.borderColor = newColor
      this.$refs.core.style.backgroundColor = newColor
    }
  },
  mounted () {
    if (this.activeColor || this.inactiveColor) {
      this.setBackgroundColor();
    }
  }
}
</script>

<style lang="scss" scoped>
.switch {
  display: inline-flex;
  align-items: center;
  position: relative;
  height: 20px;
  line-height: 20px;
  vertical-align: center;
  &__input {
    position: absolute;
    width: 0px;
    height: 0px;
    opacity: 0;
    margin: 0px;
  }
  &__core {
    position: relative;
    width: 40px;
    height: 20px;
    // margin: 20px 20px 20px 0;
    border-color: #FF3C43;
    border-radius: 10px;
    background-color: #FF3C43;
    transition: border-color .3s,background-color .3s;
    transition-property: border-color, background-color;
    transition-duration: 0.3s, 0.3s;
    transition-timing-function: ease, ease;
    transition-delay: 0s, 0s;
    vertical-align: center;
    &:after {
      position: absolute;
      top: 2px;
      left: 2px;
      content: '';
      width: 16px;
      height: 16px;
      border-radius: 100%;
      background-color: #fff;
      transition: all .3s;
      transition-property: all;
      transition-duration: 0.3s;
      transition-timing-function: ease;
      transition-delay: 0s;
    }
  }
}
.is-checked {
  .switch__core {
    border-color: #00C764;
    background-color: #00C764;
    &:after {
      left: 100%;
      margin-left: -18px
    }
  }
}
.is-disabled {
  .switch__core {
    border-color: #dcdfe6;
    background-color: #dcdfe6;
  }
}

</style>