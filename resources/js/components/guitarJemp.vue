<template>
  <div>
    <fretboard></fretboard>
    <player :jempSong="getActiveSong"></player>
    <songlist></songlist>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import fretboard from "./Fretboard/TheFretboard.vue";
import songlist from "./SongList.vue";
import player from "./Player.vue";

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