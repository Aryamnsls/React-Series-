<template>
  <header class="main_header" id="main-header">
    <div data-id="menuList">
      <button
        data-id="menuList"
        class="menuMobile"
        ref="MainMenuMobile"
        @click="isVisible = !isVisible"
      >
        <font-awesome-icon icon="bars" data-id="menuList" />
      </button>
    </div>
    <nav :class="!isVisible ? 'headerMain' : 'hidden'" id="mobile-nav">
      <ul data-id="menuList">
        <li
          data-id="menuList"
          class="menuLink"
          v-for="(link, index) in links"
          :key="`${index}-${link}`"
        >
          <a
            :href="link.url"
            :target="link.blank ? '_blank' : '_self'"
            rel="noopener noreferrer"
            :class="isCurrentPage(link.url)"
          >
            <font-awesome-icon :icon="link.icon" />
            {{ link.title }}</a
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isVisible: true,
    };
  },
  props: {
    links: Array,
  },
  methods: {
    isCurrentPage(path) {
      return this.$route.fullPath === path.substring(2) ? 'activeLink' : '';
    },
  },
  mounted() {
    let app = this.$root.$el;
    app.addEventListener('click', (event) => {
      const elementDataId = event.target.parentNode.dataset.id;

      if (!this.isVisible) {
        elementDataId ? (this.isVisible = false) : (this.isVisible = true);
      }
    });
  },
};
</script>

<style scoped>
@keyframes antrance {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.main_header {
  background: #e9e9e95b;
  border-radius: 50px;
  cursor: pointer;
  padding: 2px;
  margin: 4px 50px 50px 50px;
  animation: antrance 1s ease-in;
}
.menuMobile {
  display: none;
}
ul {
  display: flex;
  flex-wrap: wrap;
  padding: 0 5%;
}

ul li {
  margin-left: 8px;
  padding: 20px;
  color: #fffefa;
}

ul li a {
  text-decoration: none;
  color: #fffefa;
  margin-left: 8px;
}

ul li a:hover {
  transition: 0.5s;
  color: #32523f;
}

.activeLink {
  color: #32523f;
}

@media (max-width: 800px) {
  ul {
    background: linear-gradient(45deg, #2caa52d8, #3598a5);
  }
  ul li:hover {
    background: #d5ffe63f;
  }

  .menuMobile {
    display: block;
    margin: 0 8px;
    border: none;
    border: 1px solid #fffefa;
    background: #fdfdfd3f;
    padding: 8px;
    font: bold;
    font-weight: bold;
    color: #fffefa;
  }

  .main_header {
    background: transparent;
  }

  @keyframes scale {
    from {
      transform: scale(0.9);
    }

    to {
      transform: scale(1);
    }
  }

  .headerMain {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0;
    background: transparent;
    z-index: 9999;
    border-radius: 8px;
    animation: scale 0.3s ease-in-out;
  }
  .hidden {
    display: none;
  }
  ul {
    max-width: 250px;
    display: flex;
    flex-direction: column;
    margin-left: 8px;
    padding: 10px;
    color: #fffefa;
  }
}
</style>
