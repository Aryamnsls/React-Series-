<template>
  <div :class="{ 'input-field': true, 'active': localValue }">
    <fa-icon v-if="icon" class="icon" :icon="icon" fixed-width></fa-icon>
    <label :for="name">{{ label }}</label>
    <input v-model="localValue" v-validate="rules" :type="type" :name="name" :ref="name" :placeholder="label" />
  </div>
</template>

<script>
export default {
  name: 'u-input',
  props: {
    name: { type: String, default: 'input' },
    type: { type: String, default: 'text' },
    label: { type: String, default: 'Label' },
    value: { type: String },
    icon: { type: undefined },
    rules: { type: String }
  },
  data () {
    return {
      localValue: this.value
    }
  },
  watch: {
    localValue (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.input-field {
  position: relative;
  width: 100%;

  input {
    transition: margin-top .1s ease-in-out;

    width: calc(100% - 47px - 6px);
    padding: 4px 12px 4px 35px;
    margin-top: 4px;
    margin-bottom: 4px;

    outline: none;
    border: 3px solid #eee;
    border-radius: 24px;
    background-color: #eee;

    font-family: inherit;
    font-size: inherit;
    color: black;

    &.touched.invalid {
      border-color: lighten($color: #ff0000, $amount: 30);
    }

    &:hover {
      border-color: #f6f6f6;
      background-color: #f6f6f6;

      &.touched.invalid {
        border-color: lighten($color: #ff0000, $amount: 35);
      }
    }

    &:active, &:focus {
      outline: none;
      border-color: #eee;
      background-color: #fff;

      &.touched.invalid {
        border-color: lighten($color: #ff0000, $amount: 30);
      }
    }
  }

  .icon {
    color: black;
  }

  .icon, label {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translate(0, -50%);
    transition: transform .1s ease-in-out, left .1s ease-in-out;
  }

  label {
    z-index: -1;
  }

  &.active {
    box-shadow: none;

    label {
      left: 0px;
      transform: translate(calc(-100% - 10px), -50%);
    }

    @media screen and (max-width: 900px) {
      input {
        margin-top: 28px;
      }

      .icon {
        transform: translate(0, calc(-50% + 12px));
      }

      label {
        left: 10px;
        transform: translate(0, -140%);
      }
    }
  }
}
</style>
