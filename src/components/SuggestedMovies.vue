<template>

  <div class="suggestedMovies">

    <h2>Liste des films suggérés avec la barre search</h2>

    <ul>

      <li v-for="(movie, index) in movies" :key="index">

        <h4>{{ movie.title }}</h4>

        <p>Id : {{ movie.id }}</p>

      </li>

    </ul>

  </div>

</template>

<script>
export default {
  name: "SuggestedMovies",
  props: {
    movies: Array
  }
}
</script>

<style scoped>

</style>