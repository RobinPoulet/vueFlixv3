import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        moviesList: [],
        moviesGenres: [],
        playlistsList: []
    },
    getters: {},
    mutations: {
        SET_MOVIES_LIST(state, moviesList) {
            state.moviesList = moviesList
        },
        SET_PLAYLISTS_LIST(state, playlistsApi) {
            state.playlistsList = playlistsApi
        },
        SET_MOVIES_GENRES(state, moviesGenres) {
            state.moviesGenres = moviesGenres
        }
    },
    actions: {
        getMoviesList({commit}) {
            axios.get("https://apimovietest.herokuapp.com/api/movies")
                .then(response => {
                    const moviesApi = [];
                    const allData = response.data;
                    allData.forEach(data => {
                        moviesApi.push(data.value)
                    })
                    commit('SET_MOVIES_LIST', moviesApi)
                })
        },
        getPlaylistsList({commit}) {
            axios
                .get("https://apimovietest.herokuapp.com/api/moviesLists")
                .then(response => {
                    const playlistsApi = [];
                    const allData = response.data;
                    allData.forEach(data => {
                        playlistsApi.push(data.value)
                    })
                    commit('SET_PLAYLISTS_LIST', playlistsApi)
                })
        },
        getAllMoviesGenres({commit}) {
            axios
                .get("https://api.themoviedb.org/3/genre/movie/list?api_key=80d0dd074cbffeb2db4b0123882c7f44&language=en-US")
                .then(
                    response => {
                        commit('SET_MOVIES_GENRES', response.data.genres)
                    }
                )
        }
    },
    modules: {}
})
