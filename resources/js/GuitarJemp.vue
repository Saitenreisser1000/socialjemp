<template>
  <div>
    <fretboard></fretboard>
    <player :jempSong="getActiveSong"></player>
    <songlist></songlist>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import fretboard from "./components/Fretboard/TheFretboard.vue";
import songlist from "./components/SongList.vue";
import player from "./components/Player.vue";

export default {
  components: { fretboard, songlist, player },
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