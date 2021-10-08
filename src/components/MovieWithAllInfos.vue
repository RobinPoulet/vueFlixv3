<template>
  <div class="moviewithallinfos">

    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          <h3> {{ movie.title }} </h3>
          <v-rating
              v-if="movie.grade > 0"
              :value="movie.grade"
              readonly
              color="yellow"
              dense
              length="10"
              size="60"
          ></v-rating>
        </v-list-item-title>
        <v-list-item-subtitle>
          <v-btn
              color="success"
              small
              @click="addMovieToPlaylist()"
          >
            Ajouter le film à la playlist
          </v-btn>

        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>


  </div>
</template>

<script>
import axios from "axios";
import EventBus from "@/plugins/event-bus";

export default {
  name: "MovieWithAllInfos",
  props: {
    movie: {},
    playlistId: Number
  },
  methods: {
    addMovieToPlaylist: function () {
      axios
          .post("https://apimovietest.herokuapp.com/api/moviesLists/" + this.playlistId + "/film", {
            id: this.movie.id
          })
          .then(() => {
            EventBus.$emit('FilmAdd');
          })
          .catch(e => {
           this.displayMessageError(e);
          })
    },
    displayMessageError(message) {
      // Send message to browser screen
      this.$toastr.e(
          message
      );
    }
  }
}
</script>

<style scoped>

</style>