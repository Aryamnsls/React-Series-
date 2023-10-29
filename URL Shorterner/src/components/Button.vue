<template>
  <div :class="'wrapper' + (inline ? ' inline' : '')">
    <button @click="$emit('click')" :disabled="disabled" :class="classes">
      <fa-icon v-if="icon" class="icon" :icon="icon"></fa-icon>
      <slot></slot>
    </button>
    <div class="button-loading-circle"></div>
    <div class="button-loading-dot"></div>
  </div>
</template>

<script>
export default {
  name: 'u-button',
  props: {
    color: { type: String },
    icon: { type: undefined },
    iconOnly: { type: Boolean },
    inline: { type: Boolean },
    loading: { type: Boolean },
    disabled: { type: Boolean }
  },
  computed: {
    classes () {
      return [
        this.color ? 'button-' + this.color : '',
        this.loading ? 'button-loading' : '',
        this.iconOnly ? 'button-icon-only' : ''
      ].filter(c => c).join(' ')
    }
  }
}
</script>

<style lang="scss" scoped>
$color-default: #eee;
$color-blue: #1455FF;

$button-loading-circle-width: 30px;

@mixin button-color($base, $text: inherit) {
  background-color: $base;
  color: $text;

  &:hover, &:focus {
    background-color: lighten($base, 5%);
  }

  &:disabled {
    background-color: lighten($base, 30%);
    color: $text;

    &:hover, &:focus {
      background-color: lighten($base, 30%);
    }
  }

  & ~ .button-loading-circle {
    background-color: #fff;
    border-color: $base;
  }
  & ~ .button-loading-dot {
    background-color: $base;
  }
}

@keyframes button-loading-circle {
  0% {
    width: 0;
    height: 0;
    border-width: $button-loading-circle-width / 2;
  }
  50% {
    width: $button-loading-circle-width - ($button-loading-circle-width / 10);
    height: $button-loading-circle-width - ($button-loading-circle-width / 10);
    border-width: $button-loading-circle-width / 10;
  }
  100% {
    width: $button-loading-circle-width - ($button-loading-circle-width / 10);
    height: $button-loading-circle-width - ($button-loading-circle-width / 10);
    border-width: $button-loading-circle-width / 10;
  }
}
@keyframes button-loading-dot {
  0% {
    width: 0;
    height: 0;
  }
  50% {
    width: 0;
    height: 0;
  }
  100% {
    width: $button-loading-circle-width;
    height: $button-loading-circle-width;
  }
}

div.wrapper {
  position: relative;
  margin-top: -4px;

  &.inline {
    display: inline-block;
    float: right;
    margin-left: 10px;
  }

  button {
    cursor: pointer;

    min-width: 100px;
    padding: 4px 12px;

    border: none;
    border-radius: 6px;

    font-family: inherit;
    font-size: inherit;

    .icon {
      margin-right: 10px;
    }

    &.button-icon-only {
      min-width: auto;
      border-radius: 24px;

      .icon {
        margin: 0;
      }
    }

    @include button-color($color-default);

    &:hover, &:focus {
      outline: none;
    }

    &:active {
      outline: none;
      transform: scale(0.95);
    }

    transition: transform .2s cubic-bezier(.3,.8,.8,.85);
    &.button-loading {
      transform: scale(0);

      & ~ .button-loading-circle, & ~ .button-loading-dot {
        transform: translate(-50%, -50%) scale(1);
      }
      & ~ .button-loading-circle {
        animation: button-loading-circle 2s .2s infinite;
      }
      & ~ .button-loading-dot {
        animation: button-loading-dot 2s .2s infinite;
      }
    }

    &.button-blue {
      @include button-color($color-blue, #fff);
    }
  }

  .button-loading-circle, .button-loading-dot {
    transition: transform .2s cubic-bezier(.3, .8, .8, .85);

    position: absolute;
    top: 50%;
    left: 50%;
    // transform: translate(-50%, -50%);
    transform: translate(-50%, -50%) scale(0);

    border-radius: 50%;

    width: 0;
    height: 0;
  }
  .button-loading-dot {
    z-index: -1;
  }
  .button-loading-circle {
    z-index: -2;
    border-style: solid;

    width: 0;
    height: 0;
    border-width: $button-loading-circle-width / 2;
  }
}
</style>
