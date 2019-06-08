<template>
    <footer>
        <img v-bind:src="clubLogoSrc" v-if="club.logo">
    </footer>
</template>

<script>
    
import clubMixin from './ClubMixin'        
    
export default {
    
    name: 'Footer',
    
    mixins: [clubMixin]
}
    
</script>

<style scoped>
    
footer img {
    display: block;
    margin: auto;
    max-height: 20vh;
}
    
</style>