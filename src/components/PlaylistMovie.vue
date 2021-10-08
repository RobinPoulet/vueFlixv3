<template>
  <div class="playlistmovie">

    <v-card
        class="mx-auto"
        max-width="1600"
        tile
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <h3> {{ movieInfo.original_title }} </h3>
          </v-list-item-title>
          <v-list-item-subtitle>
            <h5>Note moyenne sur The DB Movie</h5>
            <v-rating
                :value="movieInfo.vote_average"
                readonly
                color="yellow"
                dense
                length="10"
                size="60"
            ></v-rating>

          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <p>{{ movieInfo.overview | capitalize }}</p>
          </v-list-item-subtitle>
          <v-list-item-subtitle v-show="editPlaylist">

            <v-btn
              color="warning"
              @click="displayDelete = true"
              v-show="!displayDelete"
              >
              Delete this movie
            </v-btn>

              <div class="text-center" v-show="displayDelete">

                <v-sheet
                    class="px-7 pt-7 pb-4 mx-auto text-center d-inline-block"
                    color="black-grey darken-3"
                    dark
                >
                  <div class="grey--text text--lighten-1 text-body-2 mb-4">
                    Are you sure you want to delete this movie?
                  </div>

                  <v-btn
                      :disabled="loading"
                      class="ma-1"
                      color="grey"
                      plain
                  >
                    Cancel
                  </v-btn>

                  <v-btn
                      :loading="loading"
                      class="ma-1"
                      color="error"
                      plain
                      @click="deleteMovieFromPlaylist"
                  >
                    Delete
                  </v-btn>
                </v-sheet>
              </div>

          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

    </v-card>


  </div>
</template>

<script>
import axios from "axios";
import EventBus from "@/plugins/event-bus";

export default {
  name: "PlaylistMovie",
  props: {
    movie: Object,
    playlistId: Number,
    editPlaylist: Boolean
  },
  data() {
    return {
      movieInfo: {},
      loading: false,
      displayDelete: false
    }
  },
  methods: {
    getMovieInformations: function () {
      axios
          .get("https://api.themoviedb.org/3/movie/"
              + this.movie.id +
              "?api_key=80d0dd074cbffeb2db4b0123882c7f44&language=en-US")
          .then(
              response => {
                console.log(response.data);
                this.movieInfo = response.data;
              }
          )
          .catch(e => {
            alert(e)
          });
    },
    async deleteMovieFromPlaylist() {
      this.loading = true;

      await new Promise(resolve => setTimeout(resolve, 3000));

      axios
          .delete("https://apimovietest.herokuapp.com/api/moviesLists/" + this.playlistId + "/" + this.movie.id)
          .then(() => EventBus.$emit('FilmSup'))
          .catch(e => {
            this.displayMessageWarning(e)
          });

      this.loading = false;

    },
    displayMessageWarning(message) {
      // Send message to browser screen
      this.$toastr.w(
          message
      );
    },
    displayMessageError(message) {
      // Send message to browser screen
      this.$toastr.e(
          message
      );
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.toUpperCase()
    }
  },
  mounted() {
    this.getMovieInformations();
  }
}
</script>

<style scoped>

</style>