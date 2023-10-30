<template>
  <footer>
    <small> Made with 💚 {{ displayYear }} </small>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    displayYear: {
      type: String || Number,
      required: true,
    },
  },
};
</script>

<style>
footer {
  display: flex;
  position: relative;
  text-align: center;
  height: 100px;
  width: 100%;
  background: #00cba9;
  color: #fff;
}
footer small {
  height: 20px;
  margin: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  font-weight: bold;
}
</style>
