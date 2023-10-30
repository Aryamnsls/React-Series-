<template>
  <div
    class="search"
    :class="{ focused: focused }"
  >
  <SvgCooking />
    <font-awesome-icon
      icon="search"
      :class="{ focusedIcon: focused || filled }"
    />
    <input
      type="search"
      @focus="focused = true"
      @blur="focused = false"
      @keypress="$emit('getSearchValue', searchValue)"
      @input="searchValue = $event.target.value"
      :value="searchValue"
      :placeholder="placeHolder"
    />
  </div>
</template>

<script>
import Svg from './SvgAnimatedCooking.vue';
export default {
  name: 'InputSearch',
  components:{
    SvgCooking: Svg
  },
  data () {
    return {
      focused: false,
      searchValue: '',
    };
  },
  computed: {
    filled: function () {
      return !!this.searchValue.length;
    }
  },
  props: {
    placeHolder: String,
  },
};
</script>

<style scoped>
.search {
  position: relative;
  background: #ffffff;
  border-radius: 15px;
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px auto;
  box-shadow: 2px 5px 3px -5px black;
  border: 2px solid #d0c4c2;
}

input {
  z-index: 999;
  width: 80%;
  margin: 0 auto;
  height: 50px;
  border: none;
  background: none;
  outline: none;
  color: #e36153;
}

.focused {
  border: 2px solid #e36153;
}
.search svg {
  margin-right: auto;
  margin-left: 15px;
}
.focusedIcon {
  color: #e36153;
}

@media (max-width: 800px) {
  .logo {
    width: 150px;
    top: -140px;
  }
  .search {
    width: 90%;
  }
}
</style>
