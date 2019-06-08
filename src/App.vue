<template>
    <div id="app">
        <Header />
        <router-view></router-view>
        <Footer />
  </div>
</template>

<script>
import axios from 'axios';
    
import Header from './components/Header.vue'

import Footer from './components/Footer.vue'

export default {
    
    name: 'app',
    
    components: {
        Header,
        Footer
    },
    
    mounted: function() {
        
        this.$store.dispatch('initAxiosAction')
                    .then(response => {
            this.$store.dispatch('initClubAction')               
        });
    }    
}  
</script>

<style>
</style>
