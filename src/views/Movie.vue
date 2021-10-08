<template>

  <div class="movie">

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
        <router-link to="/admin" style="color: white">Back</router-link>
      </v-btn>
    </div>

    <h1 class="movie-title">{{ movie.title }}</h1>

    <div class="text-center">

      <v-chip
          v-for="(genre, index) in movie.genres" :key="index"
          class="ma-2"
          color="blue"
          label
          text-color="white"
      >
        <v-icon left>
          mdi-label
        </v-icon>
        {{ genresNames[genre] }}
      </v-chip>

    </div>

    <v-card
        class="mx-auto my-12"
        max-width="800"
    >
      <v-card-title>Note du film</v-card-title>

      <v-card-text>
        <v-row
            align="center"
            class="mx-0"
        >
          <v-rating
              :value="movie.grade"
              readonly
              color="yellow"
              dense
              length="10"
              size="60"
          ></v-rating>

        </v-row>

      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title>Review</v-card-title>

      <v-card-text>
        <p> {{ movie.comment }}</p>
      </v-card-text>

    </v-card>

    <v-card v-if="movie.grade === 0"
            class="elevation-16 mx-auto"
            width="800"
    >
      <v-card-title class="text-h3">
        Rate the movie
      </v-card-title>
      <v-card-text>
        <div class="text-center mt-12">
          <v-rating
              v-model="rating"
              color="yellow"
              dense
              length="10"
              size="60"
          ></v-rating>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="justify-space-between">
        <v-btn text>
          No Thanks
        </v-btn>
        <v-btn
            @click="rateMovie"
            color="primary"
            text
        >
          Rate Now
        </v-btn>
      </v-card-actions>
    </v-card>

    <div class="container" v-if="movie.comment === ''">
      <v-container fluid>
        <v-textarea
            label="Laisser un commentaire sur le film"
            auto-grow
            outlined
            row="1"
            row-height="5"
            v-model="comment"
        >
        </v-textarea>

        <v-btn
            class="success"
            @click="addComment"
        >
          Poster son commentaire
        </v-btn>
      </v-container>
    </div>

  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "Movie",
  props: {
    id: Number
  },
  data: () => {
    return {
      rating: 0,
      adddRating: false,
      commentJustAdd: false,
      movie: [],
      moviesGenres: [],
      genresNames: [],
      comment: ""
    }
  },
  methods: {
    rateMovie() {
      axios
          .put("https://apimovietest.herokuapp.com/api/movies/" + this.id,{
                grade: this.rating
              }
          ).then(() => {
        this.adddRating = true;
        // this.movie.rating = this.rating;
        this.displayMovie();
      })
          .catch(e => {
            alert(e.message)
          })
    },
    addComment() {
      axios
          .put("https://apimovietest.herokuapp.com/api/movies/" + this.id,{
                comment: this.comment
              }
          ).then(() => {
        this.commentJustAdd = true;
        // this.movie.rating = this.rating;
        this.displayMovie();
      })
          .catch(e => {
            alert(e.message)
          })
    },
    displayMovie() {
      axios
          .get("https://apimovietest.herokuapp.com/api/movies/" + this.id)
          .then(
              response => {
                console.log(response.data);
                this.movie = response.data;
              }
          )
    },
    genreNames() {
      this.moviesGenres.forEach(movie => {
        this.genresNames[movie.id] = movie.name;
      })
    }
  },
  mounted() {
    this.displayMovie();
    axios
        .get("https://api.themoviedb.org/3/genre/movie/list?api_key=80d0dd074cbffeb2db4b0123882c7f44&language=en-US")
        .then(
            response => {
              console.log(response.data.genres);
              this.moviesGenres = response.data.genres;

            }
        )
        .then(() => {
          this.genreNames();
        })
        .catch(e => {
          alert(e)
        });

  }
}
</script>

<style lang="scss">

$primary-color: #4169E1;
$secondary-color: darken($primary-color, 30%);

.movie-title {
  transition: 1s;
  color: $secondary-color;
  font-size: 100px;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  color: deepskyblue;
}

.movie-title:hover {
  color: $primary-color;
}

</style>