import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Admin from "@/views/Admin";
import Movie from "@/views/Movie";
import CreatePlaylist from "../views/CreatePlaylist";
import PlaylistEdit from "../views/PlaylistEdit";
import PlaylistBackoffice from "../views/PlaylistBackoffice";
import Playlist from "../views/Playlist";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/admin/',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/movie/:id',
    name: 'Movie',
    component: Movie,
    props: true
  },
  {
    path: '/admin/playlistBackoffice',
    name: 'PlaylistBackoffice',
    component: PlaylistBackoffice
  },
  {
    path: '/admin/createPlaylist',
    name: 'CreatePlaylist',
    component: CreatePlaylist,
    props: true
  },
  {
    path: '/admin/playlist/edit/:id',
    name: 'PlaylistEdit',
    component: PlaylistEdit,
    props: true
  },
  {
    path: '/admin/playlist/:id',
    name: 'Playlist',
    component: Playlist,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
