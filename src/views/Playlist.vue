<template>
  <div class="playlist">

    <div class="text-center">
      <v-btn
          class="ma-2"
          color="red lighten-1"
          dark
      >
        <v-icon
            dark
            left
        >
          mdi-arrow-left
        </v-icon>
        <router-link to="/admin/playlistBackoffice" style="color: white">Back</router-link>
      </v-btn>
    </div>

    <h2>Playlist : {{ playlist.name }}</h2>

    <v-container fluid>

      <v-card
          class="mx-auto"
          max-width="1600"
          tile
      >
        <v-list-item two-line v-for="(movie, index) in playlist.film" :key="index">
          <PlaylistMovie
              :movie="movie"
              :editPlaylist="false"
          />
        </v-list-item>

      </v-card>

    </v-container>

  </div>
</template>

<script>
import axios from "axios";
import PlaylistMovie from "@/components/PlaylistMovie";

export default {
  name: "Playlist",
  components: {
    PlaylistMovie
  },
  props: {
    id: Number,
  },
  data() {
    return {
      playlist: {}
    }
  },
  methods: {
    getPlaylist: function () {
      axios
          .get("https://apimovietest.herokuapp.com/api/moviesLists/" + this.id)
          .then(result => {
            console.log(result.data);
            this.playlist = result.data;

          })
          .then(() => this.playlistIsReady = true)
          .catch(error => {
            this.displayMessageError(error);
          })
    }
  },
  mounted() {
    this.getPlaylist();
  }
}
</script>

<style scoped>

</style>