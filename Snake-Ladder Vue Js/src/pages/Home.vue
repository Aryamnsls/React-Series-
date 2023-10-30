<template>
  <transition 
    enter-active-class="animate__animated animate__backInLeft"
    leave-active-class="animate__animated animate__backOutRight" 
    appear>
    <div id="game-home" v-show="!show">
      <div id="layer" :style="{ opacity: opacity }">
      <div class="container">
        <div class="row">
          <div id="login">
            <div class="col-md-12">
              <h1 class="text-center">SnaKe GaMe</h1>
            </div>
            <div class="col-md-12 text-center">
              <button
                @click="play"
                id="play"
                type="button"
                class="btn btn-lg btn-dark"
                :disabled="playStatus"
              >
                PLAY
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </transition>
  
</template>

<script>
export default {
  data() {
    return {
      show : false,
      opacity: 0.6,
      opacityStatus: true,
      createdInterval: null,
      playStatus: false,
    };
  },
  methods: {
    play() {
      this.playStatus = true;
      this.opacity = 0.6;
      clearInterval(this.createdInterval);
      let overHere = new Audio(require("../assets/audio/over-here.mp3"));
      overHere.play();
      overHere.onended = () => {
        let gamePlay = new Audio(require("../assets/audio/play.mp3"));
        gamePlay.play();
        this.show = !this.show
        gamePlay.onended = () => {
          this.$router.push('game');
        };
      };
    },
  },
  created() {
    this.createdInterval = setInterval(() => {
      this.opacityStatus =
        this.opacity >= 1.0
          ? false
          : this.opacity <= 0.6
          ? true
          : this.opacityStatus;
          
      if (this.opacityStatus) {
        this.opacity += 0.1;
      } else {
        this.opacity -= 0.1;
      }
    }, 120);
  },
};
</script>

<style scoped>
#game-home {
  background-image: url("../assets/img/background.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
}

#layer {
  background-color: black;
  position: absolute;
  width: 100%;
  height: 100%;
}

h1 {
  font-size: 100px;
  font-weight: bold;
}

button {
  font-size: 40px;
  padding: 20px 65px;
}

#login {
  padding: 25px;
  margin: 0 auto;
  margin-top: 25%;
}

#play {
  position: relative;
}
</style>