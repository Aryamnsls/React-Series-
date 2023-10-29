<template>
  <div :class="'notification ' + type">
    <h4 v-if="title">{{ title }}</h4>
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: 'u-notification',
  props: {
    type: {
      type: String,
      default: 'success',
      validator: (val) => ['success', 'warning', 'error'].includes(val)
    },
    title: String,
    text: String
  }
}
</script>

<style lang="scss" scoped>
@mixin notification-color($color: #eee) {
  -webkit-box-shadow: 0 0 20px -10px lighten($color, 20%);
  box-shadow: 0 0 20px -10px lighten($color, 20%);

  border: solid 3px $color;
}

.notification {
  display: inline-block;
  max-width: 250px;
  border-radius: 2px;

  margin: 0;
  margin-top: 10px;
  margin-right: 10px;
  padding: 5px 10px;

  @include notification-color();

  h4 {
    margin: 0;
    margin-bottom: 5px;

    font-weight: 700;
  }

  p {
    margin: 0;
  }

  &.success {
    @include notification-color(#076907);
  }
  &.warning {
    @include notification-color(#ecdc00);
  }
  &.error {
    @include notification-color(#c20010);
  }
}
</style>
