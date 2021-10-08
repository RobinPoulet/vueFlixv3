<template>
  <div class="moviesfilter">

    <v-container fluid>

      <h4>Afficher la liste de films selon les catégories choisies</h4>

      <v-row>

        <v-col v-for="(genre, index) in moviesGenres" :key="index">

          <v-checkbox
              v-model="selectGenre"
              :label="genre.name"
              :value="genre.id"
              @change="emitSelectGenre"
          ></v-checkbox>

        </v-col>

      </v-row>

    </v-container>

  </div>
</template>

<script>
import EventBus from '../plugins/event-bus';

export default {
  name: "MoviesFilter",
  data() {
    return {
      selectGenre:""
    }
  },
  computed: {
    moviesGenres() {
      return this.$store.state.moviesGenres
    }
  },
  methods: {
    emitSelectGenre() {
      EventBus.$emit('changeSelect', this.selectGenre)
    }
  },
  mounted() {
    this.$store.dispatch("getAllMoviesGenres");
  }
}
</script>

<style scoped>

</style>