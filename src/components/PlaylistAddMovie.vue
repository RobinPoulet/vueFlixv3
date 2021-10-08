<template>
  <div class="playlistAddMovie">

    <v-btn
        class="ma-2"
        blue
        @click="showAddMovie = !showAddMovie"
    >
      <v-icon
          blue
          left
      >
        mdi-minus-circle
      </v-icon>
      Ajouter un film à la playlist
    </v-btn>

    <v-container fluid v-show="showAddMovie">

      <h2>Ajout d'un film à la liste à la Playlist</h2>

      <h4>Suggestion de film</h4>

      <p>Utiliser la barre de recherche pour avoir une suggestion de films</p>

      <v-container fluid>
        <v-textarea
            label="Search Movie"
            auto-grow
            outlined
            row="1"
            row-height="5"
            v-model="search"
            @keydown="newSearch">
        </v-textarea>
      </v-container>

      <div v-show="viewSuggestMovie">

        <v-card
            class="mx-auto"
            max-width="1600"
            tile
        >
          <v-list-item two-line v-for="movie in sugestionMovies" :key="movie.id">
            <v-list-item-content>
              <v-list-item-title>
                <h3> {{ movie.title }} </h3>
                <p>Id : {{ movie.id }}</p>
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-btn
                    rounded
                    color="primary"
                    @click="addMovieToList(movie)"
                >
                  Ajouter le film à la Playlist
                </v-btn>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

        </v-card>

        <v-icon
            large
            @click="getResultPreviouspage"
            v-show="currentPageSuggestMovie - 1 > 0"
        >
          mdi-chevron-left
        </v-icon>
        <v-icon
            large
            @click="getResultNextPage"
            v-show="currentPageSuggestMovie + 1 <= suggestMovieTotalPage"
        >
          mdi-chevron-right
        </v-icon>

      </div>


    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PlaylistAddMovie",
  props: {
    id: Number
  },
  data() {
    return {
      showAddMovie: false,
      search: "",
      viewSuggestMovie: false,
      sugestionMovies: [],
      currentPageSuggestMovie: 1,
      suggestMovieTotalPage: 1,
      moviesGenres: [],
      movieAdded: false,
      movieAddFailed: false
    }
  },
  methods: {
    newSearch: function () {
      this.currentPageSuggestMovie = 1;
      this.getResult();
    },
    getResult: function () {
      if (this.search !== "") {

        axios
            .get(
                "https://api.themoviedb.org/3/search/movie?api_key=80d0dd074cbffeb2db4b0123882c7f44&query="
                + this.search + "&page=" + this.currentPageSuggestMovie
            )
            .then(
                response => {
                  console.log(response.data);
                  this.sugestionMovies = response.data.results;
                  this.suggestMovieTotalPage = response.data.total_pages;
                  this.viewSuggestMovie = true;
                }
            )
            .catch(e => {
              alert(e)
            });
      }
    },
    getResultNextPage: function () {
      this.currentPageSuggestMovie += 1;
      this.getResult();
    },
    getResultPreviouspage: function () {
      this.currentPageSuggestMovie -= 1;
      this.getResult();
    },
    addMovieToList: function (movie) {
      axios
          .post("https://apimovietest.herokuapp.com/api/moviesLists/" + this.id + "/film", {
            id:  movie.id
          })
          .then(() => this.movieAdded = true)
          .catch(e => {
            console.log(e);
            this.movieAddFailed = true;
            alert(e)
          })
    }
  },
  mounted() {
    axios
        .get("https://api.themoviedb.org/3/genre/movie/list?api_key=80d0dd074cbffeb2db4b0123882c7f44&language=en-US")
        .then(
            response => {
              console.log(response.data.genres);
              this.moviesGenres = response.data.genres;
            }
        )
        .catch(e => {
          alert(e)
        })
  }
}
</script>

<style scoped>

</style>