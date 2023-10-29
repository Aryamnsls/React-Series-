<template>
  <div id="app">
    <transition-group name="notifications" tag="div" class="notifications">
      <u-notification
        v-for="notification in notifications"
        :key="notification.id"
        :type="notification.type"
        :title="notification.title"
        :text="notification.text"
      ></u-notification>
    </transition-group>

    <div v-if="loading" class="loading-wrapper">
      <fa-icon :icon="['far', 'spinner-third']" size="3x" spin></fa-icon>
    </div>
    <div v-show="!loading">
      <transition name="scale-fade" mode="out-in" appear>
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NotificationVue from './components/Notification.vue'

export default {
  name: 'App',
  components: {
    'u-notification': NotificationVue
  },
  computed: {
    ...mapState(['notifications', 'loading'])
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Nunito:400,700&display=swap');

body {
  background: #4f0f40;
  background: -moz-linear-gradient(top,  #4f0f40 0%, #310c3f 100%);
  background: -webkit-linear-gradient(top,  #4f0f40 0%,#310c3f 100%);
  background: linear-gradient(to bottom,  #4f0f40 0%,#310c3f 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#4f0f40', endColorstr='#310c3f',GradientType=0 );
}

body, #app {
  padding: 0;
  margin: 0;

  font-family: 'Nunito', 'Trebuchet MS', 'Arial', sans-serif;
  font-size: 18px;
  color: white;
}

#app {
  min-height: 100vh;
  min-width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;

  .loading-wrapper {
    min-width: auto;

    .fa-spin {
      animation: fa-spin 1s infinite linear;
    }
  }

  .notifications {
    position: absolute;
    top: 0;
    right: 0;
    width: auto;

    display: flex;
    flex-direction: column;

    .notifications-enter-active, .notifications-leave-active {
      transition: all .5s;
    }

    .notifications-enter, .notifications-leave-to {
      opacity: 0;
      transform: translateX(30px);
    }
  }

  & > div {
    max-width: 95%;
    min-width: 500px;
  }

  .layout {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  a {
    position: relative;
    color: inherit;
    text-decoration: none;

    &::before, &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;

      height: 2px;
      width: 100%;

      background-color: #eee;
    }

    &::before {
      width: 0;
      left: 50%;
      transition: width .1s ease-in-out, left .1s ease-in-out;

      z-index: 1;
      margin: 0 auto;

      background-color: #ccc;
    }

    &:hover::before, &:focus::before {
      width: 100%;
      left: 0;
    }

    &:active, &:focus {
      outline: none;
    }
  }
}

.scale-fade-enter-active, .scale-fade-leave-active {
  transition: transform .3s ease-in-out, opacity .3s ease-in-out;
}
.scale-fade-enter, .scale-fade-leave-to {
  opacity: 0;
  transform: scale(.95);
}
</style>
