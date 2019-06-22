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
            <b-table striped hover :items="convocations" :fields="fields">
            
                <template slot="actions" slot-scope="data">
                    
                    <b-link class="iconLink" href="javascript:void(0);" 
                            @click="showConvocationPlayersModal(data.item.id)">
                        <i class="fas fa-users"></i>
                    </b-link>
                    
                </template>

            </b-table>
        </div>  
        <b-modal id="convocationPlayersModal" ref="convocationPlayersModal" title="Joueurs Convoqués">
            <ul>   
                <li v-for="player in convocationPlayers">
                    {{ player.firstname + ' ' + player.lastname }}
                </li>
            </ul>
            <div slot="modal-footer" class="w-100">            
                <b-button
                  class="float-right"
                  @click="hideConvocationPlayersModal">
                  Close
                </b-button>
            </div>
        </b-modal>
    </main>

</template>

<script>
    
import clubMixin from './ClubMixin';
    
import axios from 'axios';

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
                    'commentaires',
                    { key: 'actions', label: 'Actions' }],
            
            clickedConvocationId: '',
            
            clubServer: '',
            
            convocationPlayers : []
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
    
    methods: {
        showConvocationPlayersModal: function(convocationId) {

            this.clickedConvocationId = convocationId;

            axios.get(
                process.env.VUE_APP_BACKEND_PROTOCOL + 
                this.clubServer +           
                process.env.VUE_APP_BACKEND_DOMAIN + 
                '/api/convocations/' + this.clickedConvocationId)
                  
                .then(response => {
                    
                    this.convocationPlayers = [];
                
                    response.data.players.forEach(
                        player => {   
                            this.convocationPlayers.push(player);
                        }
                    );
                });
            
            this.$refs['convocationPlayersModal'].show();
        },
        hideConvocationPlayersModal: function() {

            this.$refs['convocationPlayersModal'].hide();
        }
    },
    
    mounted: function() {
        
        this.clubServer = this.getClubServer();
        
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
    
    a.iconLink {
        color: #636b6f;
    }
    
    a.iconLink:hover {
        color: #216a94;
    }
    
</style>