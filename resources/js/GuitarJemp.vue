<template>
  <div>
    <fretboard></fretboard>
    <sequencer></sequencer>
    <player></player>
    <songlist></songlist>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import fretboard from "./components/Fretboard/TheFretboard.vue";
import songlist from "./components/SongList.vue";
import player from "./components/Player.vue";
import sequencer from "./components/Guitarroll/Sequencer.vue"

export default {
  components: { fretboard, songlist, player, sequencer },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getActiveSong", "getAllSongs"]),
  },
};
</script>

<style>
</style>