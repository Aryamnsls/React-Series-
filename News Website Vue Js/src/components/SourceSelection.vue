<template>
  <div class="sourceselection">
    <div>
      <img src="https://reklambux.net/wp-content/img/jkhj.png" class="logo">
      <h1>&nbsp;Vue News</h1> <br>
      <div class="jumbotron">
        <h3>Select News Source</h3> <br>
        <select class="form-control" v-on:change="sourceChanged">
          <option value="">Please select news channel</option>
          <option v-for="source in sources" v-bind:value="source.id">{{source.name}}</option>
        </select> <br>
        <div v-if="source">
          <h6>{{source.description}}</h6> <br>
          <a v-bind:href="source.url" class="btn btn-primary" target="_blank">Go To {{source.name}}'s Website</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SourceSelection",
  data() {
    return {
      sources: [],
      source: ""
    };
  },
  methods: {
    sourceChanged: function(e) {
      for (var i = 0; i < this.sources.length; i++) {
        if (this.sources[i].id == e.target.value) {
          this.source = this.sources[i];
        }
      }
      this.$emit("sourceChanged", e.target.value);
    }
  },
  created: function() {
    this.$http
      .get("https://newsapi.org/v1/sources?language=en")
      .then(response => {
        this.sources = response.data.sources;
      });
  }
};
</script>

<style scoped>
.logo {
  height: 100px;
}
</style>
