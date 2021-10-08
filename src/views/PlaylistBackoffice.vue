<template>
  <div class="playlistbackoffice">

    <h2 class="playlistBackofficeTitle">Bienvenue sur la page de gestion de vos playlists</h2>

    <router-link to="/admin/createPlaylist">
      <v-btn
          class="ma-2"
          blue
      >
        <v-icon
            blue
            left
        >
          mdi-minus-circle
        </v-icon>
        Créer une playlist
      </v-btn>
    </router-link>

    <h3>Vos Playlists</h3>

    <PlaylistsList/>

  </div>
</template>

<script>
import PlaylistsList from "../components/PlaylistsList";

export default {
  name: "PlaylistBackoffice",
  components: {
    PlaylistsList
  },
}
</script>

<style scoped>
.playlistBackofficeTitle {
  font-size:40px;
}
</style>