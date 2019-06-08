<template>
    <main>
        <h1>{{ club.name }} - Accueil</h1>
        <h2>Bienvenue dans l'application de gestion de la vie de votre club au quotidien</h2>            
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
</style>
