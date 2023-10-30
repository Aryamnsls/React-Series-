<template>
  <transition enter-active-class="animate__animated animate__backInDown" appear>
    <div id="game-play">
      <canvas id="game"></canvas>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      game: null,
      status: false,
      gameOver: false,
      timer: null,
      timerLoopStatus: false,
      canvas: {
        context: null,
        height: window.innerHeight,
        width: window.innerWidth,
        gridSize: 40,
        fillStyle: "#2c3e50",
      },
      snake: {
        positionX: 0,
        positionY: 0,
        size: 3,
        speed: 8,
        queue: [],
        fillStyle: "#2ecc71",
      },
      forage: {
        positionX: 0,
        positionY: 0,
        fillStyle: "yellow",
      },
      velocity: {
        positionX: 0,
        positionY: 0,
      },
      sounds: {
        food: new Audio(require("../assets/audio/food.wav")),
        gameOver: new Audio(require("../assets/audio/game-over.wav")),
        humm: new Audio(require("../assets/audio/humm.wav")),
        laugh: new Audio(require("../assets/audio/laugh.wav")),
        backgroundSound: {
          source: new Audio(require("../assets/audio/sound.mp3")),
          status: false,
        },
      },
    };
  },
  methods: {
    initialize() {
      this.game.width = this.canvas.width;
      this.game.height = this.canvas.height;
      this.canvas.context = this.game.getContext("2d");
      this.snake.positionX =
        Math.round(this.canvas.width / this.canvas.gridSize / 2) - 1;
      this.snake.positionY = Math.round(
        this.canvas.height / this.canvas.gridSize / 2
      );

      this.forage.positionX =
        Math.round(this.canvas.width / this.canvas.gridSize / 2) - 1;

      document.addEventListener("keydown", this.buttonsEvent.bind(this));
      this.timerMethod();
    },
    timerMethod() {
      this.timer = setInterval(this.loop, 1000 / this.snake.speed);
    },
    loop() {
      this.timerLoopStatus = true;
      this.calculations();
      this.draw();
    },
    calculations() {
      this.snake.positionX += this.velocity.positionX;
      this.snake.positionY += this.velocity.positionY;

      if (this.snake.positionX < 0) {
        this.snake.positionX =
          Math.round(this.canvas.width / this.canvas.gridSize) - 1;
      } else if (this.snake.positionY < 0) {
        this.snake.positionY = Math.round(
          this.canvas.height / this.canvas.gridSize
        );
      } else if (
        this.snake.positionX >
        Math.round(this.canvas.width / this.canvas.gridSize)
      ) {
        this.snake.positionX = 0;
      } else if (
        this.snake.positionY >
        Math.round(this.canvas.height / this.canvas.gridSize) - 1
      ) {
        this.snake.positionY = 0;
      }

      this.snake.queue.forEach((element) => {
        if (
          this.snake.positionX === element.positionX &&
          this.snake.positionY === element.positionY
        ) {
          if (this.status) {
            clearInterval(this.timer);
            this.sounds.gameOver.play();
            this.sounds.backgroundSound.source.pause();
            this.gameOver = true;
          }
        }
      });

      this.snake.queue.push({
        positionX: this.snake.positionX,
        positionY: this.snake.positionY,
      });

      while (this.snake.queue.length > this.snake.size) {
        this.snake.queue.shift();
      }

      if (
        this.forage.positionX === this.snake.positionX &&
        this.forage.positionY === this.snake.positionY
      ) {
        this.sounds.humm.pause();
        this.sounds.humm.currentTime = 0;
        this.sounds.food.pause();
        this.sounds.food.currentTime = 0;
        if (this.snake.size % 6 == 0) {
          this.sounds.humm.play();
        } else if (this.snake.size % 10 == 0) {
          this.sounds.laugh.play();
        } else {
          this.sounds.food.play();
        }

        this.snake.size++;
        this.snake.speed++;

        let forageLocationContol = true;

        while (forageLocationContol) {
          
          this.forage.positionX = Math.abs(
            Math.round(
              (Math.random() * this.canvas.width) / this.canvas.gridSize
            ) - 1
          );
          this.forage.positionY = Math.abs(
            Math.round(
              (Math.random() * this.canvas.height) / this.canvas.gridSize
            ) - 1
          );

          

          forageLocationContol = false;
          this.snake.queue.forEach((element) => {
            if (element.positionX == this.forage.positionX && element.positionY == this.forage.positionY) {
              forageLocationContol = true;
            } 
          });
          
        }
      }
    },
    draw() {
      this.canvas.context.fillStyle = this.canvas.fillStyle;
      this.canvas.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

      if (this.gameOver) {
        this.canvas.context.fillStyle = "rgba(255, 255, 255, 0.2)";
        this.canvas.context.font = this.canvas.width / 10 + "px Arial";
        this.canvas.context.fillText(
          "GAME OVER",
          this.canvas.width / 5,
          this.canvas.height / 2.7
        );
      }

      let lineWidth = 1;
      this.snake.queue.forEach((element, index) => {
        if (index == this.snake.queue.length - 1) {
          this.canvas.context.fillStyle = "#c0392b";
          this.canvas.context.strokeStyle = "#ecf0f1";
          this.canvas.context.lineWidth = lineWidth + 5;
          this.canvas.context.strokeRect(
            element.positionX * this.canvas.gridSize,
            element.positionY * this.canvas.gridSize,
            this.canvas.gridSize - 2,
            this.canvas.gridSize - 2
          );

          this.canvas.context.fillRect(
            element.positionX * this.canvas.gridSize,
            element.positionY * this.canvas.gridSize,
            this.canvas.gridSize - 2,
            this.canvas.gridSize - 2
          );
        } else {
          this.canvas.context.fillStyle = this.snake.fillStyle;

          this.canvas.context.strokeStyle = "#ecf0f1";
          this.canvas.context.lineWidth = lineWidth;
          lineWidth += 0.3;
          this.canvas.context.strokeRect(
            element.positionX * this.canvas.gridSize,
            element.positionY * this.canvas.gridSize,
            this.canvas.gridSize - 2,
            this.canvas.gridSize - 2
          );

          this.canvas.context.fillRect(
            element.positionX * this.canvas.gridSize,
            element.positionY * this.canvas.gridSize,
            this.canvas.gridSize - 2,
            this.canvas.gridSize - 2
          );
        }
      });

      this.canvas.context.fillStyle = this.forage.fillStyle;
      this.canvas.context.fillRect(
        this.forage.positionX * this.canvas.gridSize,
        this.forage.positionY * this.canvas.gridSize,
        this.canvas.gridSize,
        this.canvas.gridSize
      );

      this.canvas.context.fillStyle = "rgba(255, 255, 255, 0.2)";
      this.canvas.context.font = this.canvas.width / 10 + "px Arial";
      this.canvas.context.fillText(
        "SCORE : " + parseInt(this.snake.size - 3),
        this.canvas.width / 4.3,
        this.canvas.height / 1.9
      );
    },
    buttonsEvent(e) {
      if (!this.status) {
        this.status = true;
        this.sounds.backgroundSound.status = true;
        this.sounds.backgroundSound.source.loop = true;
        this.sounds.backgroundSound.source.play();
      }

      if (
        e.keyCode === 37 &&
        this.velocity.positionX !== 1 &&
        this.timerLoopStatus
      ) {
        this.timerLoopStatus = false;
        this.velocity.positionX = -1;
        this.velocity.positionY = 0;
      } else if (
        e.keyCode === 38 &&
        this.velocity.positionY !== 1 &&
        this.timerLoopStatus
      ) {
        this.timerLoopStatus = false;
        this.velocity.positionX = 0;
        this.velocity.positionY = -1;
      } else if (
        e.keyCode === 39 &&
        this.velocity.positionX !== -1 &&
        this.timerLoopStatus
      ) {
        this.timerLoopStatus = false;
        this.velocity.positionX = 1;
        this.velocity.positionY = 0;
      } else if (
        e.keyCode === 40 &&
        this.velocity.positionY !== -1 &&
        this.timerLoopStatus
      ) {
        this.timerLoopStatus = false;
        this.velocity.positionX = 0;
        this.velocity.positionY = 1;
      }
    },
  },
  mounted() {
    this.game = document.getElementById("game");
    this.initialize();
  },
  watch: {
    "snake.speed": {
      deep: true,
      handler() {
        clearInterval(this.timer);
        this.timerMethod();
      },
    },
  },
};
</script>

<style>
#game-play {
  width: 100%;
  height: 100%;
  /* background-color: black; */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  animation-duration: 1.5s;
}
</style>