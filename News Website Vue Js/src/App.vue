<template>
  <div class="container" id="app">
    <SourceSelection v-on:sourceChanged="sourceChanged"/>
    <Newslist v-bind:source="source"/>
  </div>
</template>

<script>
import SourceSelection from "./components/SourceSelection";
import Newslist from "./components/Newslist";
import 'bootstrap/dist/css/bootstrap.css'

export default {
  name: "App",
  components: {
    SourceSelection,
    Newslist
  },
  data() {
    return {
      source: ""
    };
  },
  methods: {
    sourceChanged: function(source) {
      this.source = source;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
