<template>
  <div class="playlistEdit">

    <h1>Ajouter ou Supprimer un film de la Playlist</h1>

    <h2>Playlist : {{ playlist.name }}</h2>

    <h3>Liste des films</h3>

    <v-container  v-if="playlistIsReady" fluid>

      <draggable v-model="playlist.film" group="people" @start="drag=true" @end="drag=false">

      <PlaylistMovie
          v-for="movie in playlist.film" :key="movie.id"
          :movie="movie"
          :playlistId="playlist.id"
          :edit-playlist="true"
      />

      </draggable>

    </v-container>

    <h3>Choisir un film à ajouter</h3>

    <v-card
        class="mx-auto"
        max-width="1600"
        tile
    >

      <MovieWithAllInfos
          v-for="(movie, index) in moviesList"
          :key="index"
          :movie="movie"
          :playlistId="playlist.id"
          />

    </v-card>


  </div>
</template>

<script>
import axios from "axios";
import PlaylistMovie from "@/components/PlaylistMovie.vue";
import MovieWithAllInfos from "@/components/MovieWithAllInfos";
import EventBus from "@/plugins/event-bus";
import draggable from'vuedraggable';

export default {
  name: "PlaylistEdit",
  components: {
    PlaylistMovie,
    MovieWithAllInfos,
    draggable
  },
  props: {
    id: Number
  },
  data() {
    return {
      playlist: {},
      playlistIsReady: false
    }
  },
  computed: {
    moviesList() {
      return this.$store.state.moviesList
    }
  },
  methods: {
    getPlaylist: function () {
      this.playlistIsReady = false;
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
    },
    displayMessageSuccess(message) {
      // Send message to browser screen
      this.$toastr.s(
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
  watch: {
    playlist: function (valeur, ancienneValeur) {
      console.log(valeur, ancienneValeur);
      if (this.playlist.film.length > 0 && ancienneValeur.film !== undefined) {
        if (valeur.film.length > ancienneValeur.film.length) {
          this.displayMessageSuccess("le film a bien été ajouté");
        } else if (valeur.film.length < ancienneValeur.film.length) {
          this.displayMessageError("Le film a bien été supprimé");
        }
      }
    }
  },
  beforeMount() {
    this.getPlaylist();
  },
  mounted() {
    this.$store.dispatch("getMoviesList");
    EventBus.$on('FilmAdd', () => {
      this.getPlaylist();
    });
    EventBus.$on('FilmSup', () => {
      this.getPlaylist();
    });
  }
}
</script>

<style scoped>

</style>