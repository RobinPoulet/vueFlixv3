<template>

  <div class="createplaylist">

    <h2>Création d'une Playlist</h2>

    <v-container fluid v-show="!playlistCreated">
      <v-textarea
          label="Nom de la playlist"
          auto-grow
          outlined
          row="1"
          row-height="5"
          v-model="playlistName"
          class="playlistName"
      >
      </v-textarea>

      <v-btn
          color="success"
          small
          @click="createPlaylist"
      >
        Valider le nom de la playlist
      </v-btn>

    </v-container>

    <v-container fluid v-show="movieAdded">
      <v-alert
          dense
          text
          type="success"
      >
        Le film a bien été ajouté à la liste de films
      </v-alert>
      <router-link to="/admin/playlistBackoffice">
        <v-btn
            color="success"
            small
        >
          Retour au Playlist Backoffice
        </v-btn>
      </router-link>
    </v-container>


    <v-container fluid v-show="playlistCreated && !movieAdded">

      <h3>Ajouter des films pour la playlist : {{ playlistName }}</h3>

      <v-card
          class="mx-auto"
          max-width="1600"
          tile
      >
        <v-list-item two-line v-for="(movie, index) in moviesList" :key="index">
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
                  @click="addMovieToPlaylist(movie)"
              >
                Ajouter le film à la playlist
              </v-btn>

            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

      </v-card>

    </v-container>

  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "CreatePlaylist",
  components: {},
  data: () => {
    return {
      playlistName: "",
      playlistMovies: [],
      moviesList: [],
      playlist: [],
      playlistCreated: false,
      playlistCreationFailed: false,
      movieAdded: false,
      lastId: 0
    }
  },
  computed: {
    playlistMoviesId() {
      let moviesId = [];
      this.playlistMovies.forEach(movie => {
        moviesId.push(movie.id);
      });
      return moviesId;
    }
  },
  methods: {
    addMovieToPlaylist: function (movie) {
      axios
          .post("https://apimovietest.herokuapp.com/api/moviesLists/" + this.lastId + "/film", {
            id: movie.id
          })
          .then(() => this.movieAdded = true)
          .catch(e => {
            console.log(e);
            this.movieAddFailed = true;
            alert(e)
          })
    },
    getAllMovies: function () {
      axios
          .get("https://apimovietest.herokuapp.com/api/movies")
          .then(
              response => {
                const allData = response.data;
                allData.forEach(data => {
                  this.moviesList.push(data.value)
                })
              }
          )
          .catch(e => {
            alert(e)
          })
    },
    getAllPlaylists: function () {
      axios
          .get("https://apimovietest.herokuapp.com/api/moviesLists")
          .then(
              response => {
                const allData = response.data;
                allData.forEach(data => {
                  this.playlist.push(data.value)
                })
              }
          )
          .then(() => this.getLastId())
          .catch(e => {
            alert(e)
          })
    },
    createPlaylist: function () {
      axios
          .post("https://apimovietest.herokuapp.com/api/moviesLists", {
            id: this.playlist.length + 1,
            name: this.playlistName,

          })
          .then(() => this.playlistCreated = true)
          .catch(e => {
            console.log(e);
            this.playlistCreationFailed = true;
            alert(e)
          })
    },
    getLastId: function () {
      let lastPlaylist = this.playlist.pop();
      if (!lastPlaylist) {
        this.lastId = 1;
      } else {
        this.lastId = lastPlaylist.id;
      }
    }
  },
  mounted() {
    this.getAllPlaylists();
    this.getAllMovies();
  }
}
</script>

<style scoped>

.playlistName {
  margin-left: 30%;
  margin-right: 30%;
}

</style>