<template>
    
    <main>
        <h1>
            {{ club.name }} - Convocations
            <span class="dropdown">
                <b-dropdown id="dropdown-left" :text="categoryFilterButtonLabel" variant="primary">
                    <b-dropdown-item to="/convocations">Toutes les catégories</b-dropdown-item>
                    <b-dropdown-item :to="'/convocations/category/' + categorie.id" 
                                     v-for="categorie in categories"
                                     v-bind:key="categorie.id">
                        {{ categorie.label }}
                    </b-dropdown-item>
                </b-dropdown>
            </span>
            
            <span class="dropdown">
                <b-dropdown id="dropdown-left" :text="coachFilterButtonLabel" variant="primary">
                    <b-dropdown-item to="/convocations">Tous les coachs</b-dropdown-item>
                    <b-dropdown-item :to="'/convocations/coach/' + coach.id" 
                                     v-for="coach in coachs"
                                     v-bind:key="coach.id">{{ coach.firstname + ' ' + coach.lastname }}</b-dropdown-item>
                </b-dropdown>
            </span>
        </h1>
        <h2>Voici la liste des convocations programmées pour les semaines à venir</h2>
        <div>
            <b-table striped hover :items="convocations" :fields="fields"></b-table>
        </div>
    </main>

</template>

<script>
    
import clubMixin from './ClubMixin' 

export default {
    
    name: 'Convocations',
    
    mixins: [clubMixin],
    
    data: function() {
      
        return {
            fields: ['date',
                    'categories',
                    'coach',
                    'heure_/_lieu',
                    'description',
                    'commentaires']
        };
    },
    
    computed: {      
        
        convocations: function() {
        
            return this.$store.state.convocations;
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
        
        this.$store.dispatch('initConvocationsAction');
        
        this.$store.dispatch('initCoachsAction');
        
        this.$store.dispatch('initCategoriesAction');
    },
    
    watch: {
        '$route' (to, from) {
            
            if (to.params.category_id) {
                
                console.log('Category change : ' + to.params.category_id);
                
                this.$store.dispatch('initConvocationsAction', { type: 'category', id: to.params.category_id });
            }
            else if (to.params.coach_id) {
                
                console.log('Coach change : ' + to.params.coach_id);
                
                this.$store.dispatch('initConvocationsAction', { type: 'coach', id: to.params.coach_id });
            }
            else {
                console.log('Select all convocations');
                
                this.$store.dispatch('initConvocationsAction');
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