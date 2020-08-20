<template>
  <div class="container">
    <div id="playerCard" class="card" style="width: 100%; height: 80px">
      <button @click="playToggle" class="btn btn-primary m-2">{{ playButton }}</button>
      <button @click="reset" class="btn btn-primary m-2">reset</button>
      <input
        class="transportFader"
        type="range"
        :min="0"
        :max="endSongTime * this.transMulti"
        value="transPos"
        @input="change(transPos)"
        @mousedown="onMouseDown()"
        @mouseup="onMouseUp(transPos)"
        v-model="transPos"
      />
      <div>
        <form>
          <input
            id="speedFader"
            class="transportFader"
            type="range"
            min="20"
            max="250"
            v-model="speed"
          />
          <span class="label">speed: {{ speed }}</span>
        </form>
        <form>
          <input
            id="volumeFader"
            class="transportFader"
            type="range"
            min="-50"
            max="0"
            v-model="volume"
          />
          <span class="label">volume:{{ volume}}</span>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import * as Tone from "tone";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      transport: Tone.Transport,
      animationRequest: "",

      playButton: "play",
      endSongTime: "",
      speed: 60,
      volume: -100,
      transPos: "0",
      transMulti: 100,

      activeSong: "",

      dottsInSong: [],

      sampler: new Tone.Sampler({
        urls: {
          A1: "A1.mp3",
          A2: "A2.mp3",
        },
        baseUrl: "./sounds/",
        volume: -5,
        onload: () => {},
      }).toDestination(),
    };
  },

  watch: {
    speed: {
      immediate: true,
      handler() {
        Tone.Transport.bpm.value = this.speed;
        this.reset();
      },
    },
    volume: function () {
      this.sampler.volume.value = this.volume;
    },
    jempSong: function () {
      this.scheduleSong(this.jempSong);
    },
  },

  computed: {
    ...mapGetters({ allJemps: "getAllJemps", jempSong: "getActiveSong" }),
  },

  methods: {
    /************* Transport System ***************/
    performAnimation() {
      this.animationRequest = requestAnimationFrame(this.performAnimation);
      if (this.transPos > this.endSongTime * this.transMulti) {
        Tone.Transport.position = 0;
        this.pause();
      }
      this.transPos =
        Tone.Transport.seconds * this.transMulti * (this.speed / 60);
    },

    change(transPos) {
      //iterate over jempSong.songdata to find dots that should be removed regarding higher timeschedule
      Tone.Transport.seconds = (transPos / this.transMulti) * (60 / this.speed);
      for (let dot of this.activeSong) {
        if (dot.time > Tone.Transport.seconds) {
          let higherDot = (this.dottsInSong.find(
            (d) => d.jt_ID === dot.dotID
          ).isActive = false);
        }
      }
    },

    onMouseDown() {
      this.pause();
    },

    onMouseUp(transPos) {
      this.play();
    },

    /******************Scheduling******************/

    scheduleSong(jempSong) {
      Tone.Transport.cancel();

      let jempTones = JSON.parse(jempSong.songdata);
      this.activeSong = jempTones;
      this.endSongTime = this.getLastTone(jempTones).time + 2;

      for (let jempTone of jempTones) {
        if (jempTone.time === undefined || !jempTone.tone === undefined) {
          throw 'jempTone-format error: tone-, time- and color-values are needed { tone: "D3", time: 1 }';
        }
        Tone.Transport.schedule(() => {
          //activate dot
          let jemp = this.allJemps.find(
            (jemp) => jemp.jt_ID === jempTone.dotID
          );
          jemp.isActive = true;
          this.dottsInSong.push(jemp);
          //play sound
          this.sampler.triggerAttack(jempTone.tone);
        }, jempTone.time);
      }
    },

    getLastTone(jempTones) {
      let lastTone = jempTones[0];
      //TODO make sure matching values get compared
      for (let jempTone of jempTones) {
        if (lastTone.time < jempTone.time) {
          lastTone = jempTone;
        }
        //lastTone = jempTone ? lastTone.time < jempTone.time : lastTone;
      }
      return lastTone;
    },

    /****************Player ****************/

    playToggle(time) {
      if (
        Tone.Transport.state === "paused" ||
        Tone.Transport.state === "stopped"
      ) {
        this.playButton = "pause";
        this.play(time);
      } else {
        this.playButton = "play";
        this.pause();
      }
    },

    play() {
      Tone.start();
      Tone.Transport.start();
      requestAnimationFrame(this.performAnimation);
    },

    pause() {
      Tone.Transport.pause();
      cancelAnimationFrame(this.animationRequest);
    },

    reset() {
      this.playButton = "play";
      Tone.Transport.stop();
      cancelAnimationFrame(this.animationRequest);
      this.transPos = 0;
      this.change(this.transPos);
    },
  },
};
</script>

<style>
.transportFader {
  margin: 2% 2%;
  width: 50%;
}

#speedFader {
  width: 50%;
}

#volumeFader {
  width: 50%;
}

.label {
  width: 10%;
}

#playerCard {
  flex-direction: row;
}

button {
  width: 100px;
}
</style>