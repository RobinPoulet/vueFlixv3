<template>
  <div class="playlistsList">

    <v-card
        class="mx-auto"
        max-width="1600"
        tile
    >
      <v-list-item two-line v-for="playlist in playlistsList" :key="playlist.id">
        <v-list-item-content>
          <v-list-item-title>
            <h3> {{ playlist.name }} </h3>
          </v-list-item-title>
          <v-list-item-subtitle>
            <router-link
                :to="{
              name: 'PlaylistEdit',
              params: { id: playlist.id, playlist: playlist}
            }"
            >
              <v-container
                  fluid
                  class="pa-0"
              >
                <div class="my-2">
                  <v-btn
                      color="success"
                      dark
                      large
                  >
                    Ajouter ou supprimer un film dans la Playlist
                  </v-btn>

                </div>
              </v-container>
            </router-link>
            <router-link
                :to="{
              name: 'Playlist',
              params: { id: playlist.id}
            }"
            >
              <v-container
                  fluid
                  class="pa-0"
              >
                <div class="my-2">
                  <v-btn
                      color="success"
                      dark
                      large
                  >
                    Voir le détail de la playlist
                  </v-btn>

                </div>
              </v-container>
            </router-link>
            <v-btn
                color="warning"
                small
                @click="deletePlaylist(playlist.id)"
            >
              Supprimer cette playlist
            </v-btn>

          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

    </v-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PlaylistsList",
  data() {
    return {}
  },
  computed: {
    playlistsList() {
      return this.$store.state.playlistsList
    }
  },
  methods: {
    deletePlaylist: function (id) {
      axios
          .delete("https://apimovietest.herokuapp.com/api/moviesLists/" + id)
          .then(() => this.$store.dispatch('getPlaylistsList'))
          .catch(e => {
            alert(e);
          })
    },
    displayMessageSuccess() {
      // Send message to browser screen
      this.$toastr.s(
          "La Playlist a bien été ajoutée"
      );
    },
    displayMessageError() {
      // Send message to browser screen
      this.$toastr.w(
          "La Playlist a bien été supprimée"
      );
    }
  },
  watch: {
    playlistsList: function (valeur, ancienneValeur) {
      console.log(valeur, ancienneValeur);
      if (ancienneValeur.length > 0) {
        if (valeur.length > ancienneValeur.length) {
          this.displayMessageSuccess();
        } else if (valeur.length < ancienneValeur.length) {
          this.displayMessageError();
        }
      }
    }
  },
  mounted() {
    this.$store.dispatch('getPlaylistsList')
  }
}
</script>

<style scoped>

</style>