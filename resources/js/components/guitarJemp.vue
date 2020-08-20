<template>
  <div>
    <fretboard-component></fretboard-component>
    <player-component :jempSong="getActiveSong"></player-component>
    <songlist-component></songlist-component>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
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