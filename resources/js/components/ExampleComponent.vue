<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Songs</div>
          <div class="card" v-for="song in songs" :key="song.id+'song'">
            <router-link :to="`/song/${song.id}`">
              <h5 class="card-title m-2">{{ song.name }}</h5>
              <h6 class="card-subtitle m-2 text-muted">{{ song.description }}</h6>
              <button :click="deleteSong(song.id)" class="btn btn-danger float-right m-2">delete</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      songs: [],
    };
  },
  mounted() {
    console.log("Component mounted.");
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get("/api/songs")
        .then((response) => (this.songs = response.data))
        .catch((error) => console.log(error));
    },
    async deleteSong(deleteId) {
      //axios.delete("api/song/", { params: { deleteId } });
      //await window.axios.delete(`/api/song/${deleteId}`);
      console.log("deletepress");
    },
  },
};
</script>
