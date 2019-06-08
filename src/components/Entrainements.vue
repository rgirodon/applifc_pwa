<template>
    
    <main>
        <h1>
            {{ club.name }} - Entrainements
            
            <span class="dropdown">
                <b-dropdown id="dropdown-left" :text="categoryFilterButtonLabel" variant="primary">
                    <b-dropdown-item to="/entrainements">Toutes les catégories</b-dropdown-item>
                    <b-dropdown-item :to="'/entrainements/category/' + categorie.id" 
                                     v-for="categorie in categories"
                                     v-bind:key="categorie.id">
                        {{ categorie.label }}
                    </b-dropdown-item>
                </b-dropdown>
            </span>
            
            <span class="dropdown">
                <b-dropdown id="dropdown-left" :text="coachFilterButtonLabel" variant="primary">
                    <b-dropdown-item to="/entrainements">Tous les coachs</b-dropdown-item>
                    <b-dropdown-item :to="'/entrainements/coach/' + coach.id" 
                                     v-for="coach in coachs"
                                     v-bind:key="coach.id">{{ coach.firstname + ' ' + coach.lastname }}</b-dropdown-item>
                </b-dropdown>
            </span>
        </h1>
        <h2>Voici la liste des entrainements programmés pour les semaines à venir</h2>
        <div>
            <b-table striped hover :items="entrainements" :fields="fields"></b-table>
        </div>
    </main>

</template>

<script>
    
import clubMixin from './ClubMixin' 

export default {
    
    name: 'Entrainements',
    
    mixins: [clubMixin],
    
    data: function() {
      
        return {
            fields: ['date',
                    'categories',
                    'coach']
        };
    },
    
    computed: {      

        entrainements: function() {
        
            return this.$store.state.entrainements;
        },
        
        coachs: function() {
        
            return this.$store.state.coachs;
        },
        
        categories: function() {
        
            return this.$store.state.categories;
        },
        
        categoryFilterButtonLabel: function() {
            
            let result = 'Filtrer par catégorie';
            
            if (this.$route.params.category_id) {
                
                let categoryFound = this.$store.getters.getCategoryById(this.$route.params.category_id);
                
                result = categoryFound.label ;
            }
            
            return result;
        },
        
        coachFilterButtonLabel: function() {
            
            let result = 'Filtrer par coach';
            
            if (this.$route.params.coach_id) {
                
                let coachFound = this.$store.getters.getCoachById(this.$route.params.coach_id);
                
                result = coachFound.firstname + ' ' + coachFound.lastname;
            }
            
            return result;
        }
    },
    
    mounted: function() {
        
        this.$store.dispatch('initEntrainementsAction');
        
        this.$store.dispatch('initCoachsAction');
        
        this.$store.dispatch('initCategoriesAction');
    },
    
    watch: {
        '$route' (to, from) {
            
            if (to.params.category_id) {
                
                console.log('Category change : ' + to.params.category_id);
                
                this.$store.dispatch('initEntrainementsAction', { type: 'category', id: to.params.category_id });
            }
            else if (to.params.coach_id) {
                
                console.log('Coach change : ' + to.params.coach_id);
                
                this.$store.dispatch('initEntrainementsAction', { type: 'coach', id: to.params.coach_id });
            }
            else {
                console.log('Select all entrainements');
                
                this.$store.dispatch('initEntrainementsAction');
            }
        }
    }
}

</script>

<style scoped>
    
    span.dropdown {
    
        margin-left: 10px
    }
    
</style>