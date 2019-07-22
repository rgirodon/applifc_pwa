<template>
    
    <main>
        <h3>{{ club.name }}</h3>
        <h4>Inscriptions</h4>
        <div class="buttonBar">
            <span class="dropdown">
                <b-dropdown id="dropdown-left" :text="categoryFilterButtonLabel" variant="primary">
                    <b-dropdown-item to="/inscriptions">Toutes les catégories</b-dropdown-item>
                    <b-dropdown-item :to="'/inscriptions/category/' + categorie.id" 
                                     v-for="categorie in categories"
                                     v-bind:key="categorie.id">
                        {{ categorie.label }}
                    </b-dropdown-item>
                </b-dropdown>
            </span>
        </div>
        <h4>Voici la liste des compétitions programmées pour les semaines à venir</h4>
        <div>
            <b-table striped hover :items="inscriptions" :fields="fields">
                <template slot="duration" slot-scope="data">                    
                    {{ data.item.duration }}                    
                </template>
            </b-table>
        </div>
    </main>

</template>

<script>
    
import clubMixin from './ClubMixin' 

export default {
    
    name: 'Inscriptions',
    
    mixins: [clubMixin],
    
    data: function() {
      
        return {
            fields: ['categories',
                    'date_competition',
                    { key: 'duration', label: 'Durée' },
                    'libelle']
        };
    },
    
    computed: {      
        
        inscriptions: function() {
        
            return this.$store.state.inscriptions;
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
        }
    },
    
    mounted: function() {
        
        this.$store.dispatch('initInscriptionsAction');
        
        this.$store.dispatch('initCategoriesAction');
    },
    
    watch: {
        '$route' (to, from) {
            
            if (to.params.category_id) {
                
                console.log('Category change : ' + to.params.category_id);
                
                this.$store.dispatch('initInscriptionsAction', { type: 'category', id: to.params.category_id });
            }
            else {
                console.log('Select all inscriptions');
                
                this.$store.dispatch('initInscriptionsAction');
            }
        }
    }
}

</script>

<style scoped>
    
    h3, h4, .buttonBar {        
        text-align: center;
        padding: 0.25rem;
    }
    
    span.dropdown + span.dropdown {    
        margin-left: 10px
    }
    
</style>