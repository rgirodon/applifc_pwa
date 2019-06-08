import Vue from 'vue';

import Router from 'vue-router';

import Home from './components/Home.vue';

import Entrainements from './components/Entrainements.vue';

import Convocations from './components/Convocations.vue';

import Inscriptions from './components/Inscriptions.vue';

Vue.use(Router);

const routes = [
    { path: '/', component: Home },
    { path: '/entrainements', component: Entrainements },
    { path: '/entrainements/category/:category_id', component: Entrainements },
    { path: '/entrainements/coach/:coach_id', component: Entrainements },
    { path: '/convocations', component: Convocations },
    { path: '/convocations/category/:category_id', component: Convocations },
    { path: '/convocations/coach/:coach_id', component: Convocations },
    { path: '/inscriptions', component: Inscriptions },
    { path: '/inscriptions/category/:category_id', component: Inscriptions },
];

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
});