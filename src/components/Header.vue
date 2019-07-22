<template>
    <b-navbar toggleable="lg" type="light" variant="light">

        <b-navbar-brand to="/">
            <img v-bind:src="clubLogoSrc" v-if="club.logo">
            <span v-text="club.name" v-else></span>
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item to="/entrainements">Entrainements</b-nav-item>
                <b-nav-item to="/convocations">Convocations</b-nav-item>
                <b-nav-item to="/inscriptions">Inscriptions</b-nav-item>
            </b-navbar-nav>
        </b-collapse>

    </b-navbar>
</template>

<script>
    
import clubMixin from './ClubMixin'    
    
export default {
    
    name: 'Header',
    
    mixins: [clubMixin]
}
    
</script>

<style scoped>
    
.navbar {
    padding-bottom: 0;
    padding-top: 0;
}    
    
.navbar-brand img {
    height: 6vh;
}

/*    
.nav-link.router-link-active {
    color: #ffffff;
    background-color: #eeeeee;
}
    
.nav-item a {
    height: calc(6vh + 2*0.3125rem);
    line-height: calc(6vh + 2*0.3125rem - 2*0.5rem);
}
*/
    
</style>