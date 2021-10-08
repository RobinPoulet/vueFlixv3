<template>

  <div class="movieCreation">

    <h2>Ajout d'un film à la liste de film</h2>

    <v-form
        class="addMovieForm"
        ref="form"
        v-model="valid"
        lazy-validation
    >
      <v-text-field
          v-model="form.title"
          :rules="titleRules"
          label="newTitle"
          size="40"
          required
      ></v-text-field>

      <v-text-field
          v-model="form.id"
          :rules="idMovieRules"
          label="newIdMovie"
          required
      ></v-text-field>

      <v-container fluid>

        <v-row>

          <v-col v-for="(genre, index) in moviesGenres" :key="index">

            <v-checkbox
                v-model="form.genres"
                :label="genre.name"
                :value="genre.id"
            ></v-checkbox>

          </v-col>

        </v-row>

      </v-container>

      <v-container fluid>

        <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="storeMovie"
        >
          Validate
        </v-btn>

        <v-btn
            color="error"
            class="mr-4"
            @click="reset"
        >
          Reset Form
        </v-btn>

        <v-btn
            color="warning"
            @click="resetValidation"
        >
          Reset Validation
        </v-btn>

      </v-container>

    </v-form>

    <v-container fluid v-show="userAddFailed">
      <v-alert
          dense
          border="left"
          type="warning"
      >
        L'ajout du film a échoué
      </v-alert>
    </v-container>


    <h2>Suggestion de film</h2>

    <p>Utiliser la barre de recherche pour avoir une suggestion de films</p>

    <v-container fluid>
      <v-textarea
          label="Search Movie"
          auto-grow
          outlined
          row="1"
          row-height="5"
          v-model="search"
          @keypress="newSearch">
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
                Ajouter le film à la liste
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

  </div>

</template>

<script>
// import {EventBus} from "@/event-bus";
import axios from "axios";
import _ from "lodash";

export default {
  name: "MovieCreation",
  components: {},
  data: function () {
    return {
      form: {
        id: "",
        title: "",
        genres: [],
        rating: 0,
        review: "",
        comment: ""
      },
      search: "",
      sugestionMovies: [],
      viewSuggestMovie: false,
      currentPageSuggestMovie: 1,
      suggestMovieTotalPage: 1,
      addMovieTitle: "",
      valid: true,
      titleRules: [
        v => !!v || 'Title is required',
      ],
      idMovieRules: [
        v => !!v || 'Id is required',
      ],
      moviesGenres: [],
      validateForm: false,
      userAddFailed: false
    }
  },
  methods: {
    storeMovie: function () {
      // axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
      axios
          .post("https://apimovietest.herokuapp.com/api/movies", {
            id: this.form.id,
            title: this.form.title,
            genres: this.form.genres
          })
          .then(() => {
            this.$store.dispatch("getMoviesList");
          })
          .catch(e => {
            console.log(e);
            this.userAddFailed = true;
            alert(e)
          })
    },
    newSearch: function () {
      this.currentPageSuggestMovie = 1;
      this.debouncedGetResult();
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
      this.userAdd = false;
      let movieGenres = [];
      this.form.title = movie.title;
      this.form.id = movie.id;
      movie.genre_ids.forEach(genre => movieGenres.push(genre));
      this.form.genres = movieGenres;
    },
    reset: function () {
      this.$refs.form.reset
    },
    resetValidation: function () {
      this.$refs.form.resetValidation()
    }
  },
  created() {
    this.debouncedGetResult = _.debounce(this.getResult, 2000);
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

.addMovieForm {
  margin-left: 25%;
  margin-right: 25%;
  margin-top: 5%;
}

</style>