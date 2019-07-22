<template>
    <main>
        <h3>{{ club.name }}</h3>
        <h4>Accueil</h4>
        <h4>Bienvenue dans l'application de gestion de la vie de votre club au quotidien</h4>            
    </main>        
</template>

<script>

import clubMixin from './ClubMixin'    
    
export default {
    
    name: 'Home',
    
    mixins: [clubMixin]
}
</script>

<style scoped>
    h3, h4 {        
        text-align: center;
        padding: 0.25rem;
    }
</style>
