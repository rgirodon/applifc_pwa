import Vue from 'vue';

import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
	
  state: {  
      
    club: {},
      
    entrainements: [],
      
    convocations: [],
      
    inscriptions: [],
      
    coachs: [],
      
    categories: []
  },
    
  getters: {

      getCategoryById: (state) => (id) => {
        return state.categories.find(category => category.id == id)
      },
      
      getCoachById: (state) => (id) => {
        return state.coachs.find(coach => coach.id == id)
      },
  },
    
  mutations: {
      
	  initClubMutation: function(state, payload) {
		
          state.club = payload.club;
          
          console.log('club id retrieved from server : ' + state.club.id);
	  },
      
      initEntrainementsMutation: function(state, payload) {
		
          state.entrainements = payload.entrainements;
          
          console.log('Nb of entrainements retrieved from server : ' + state.entrainements.length);
	  },
      
      initConvocationsMutation: function(state, payload) {
		
          state.convocations = payload.convocations;
          
          console.log('Nb of convocations retrieved from server : ' + state.convocations.length);
	  },
      
      initInscriptionsMutation: function(state, payload) {
		
          state.inscriptions = payload.inscriptions;
          
          console.log('Nb of inscriptions retrieved from server : ' + state.inscriptions.length);
	  },
      
      initCoachsMutation: function(state, payload) {
		
          state.coachs = payload.coachs;
          
          console.log('Nb of coachs retrieved from server : ' + state.coachs.length);
	  },
      
      initCategoriesMutation: function(state, payload) {
		
          state.categories = payload.categories;
          
          console.log('Nb of categories retrieved from server : ' + state.categories.length);
	  },
  },
    
  actions: {
	  
      initAxiosAction: function(context) {

          return new Promise((resolve) => {

              axios.post(process.env.VUE_APP_BACKEND_PROTOCOL + getClubServer() + process.env.VUE_APP_BACKEND_DOMAIN + '/oauth/token', {
                
                  client_id: process.env.VUE_APP_CLIENT_ID,
                
                  grant_type: process.env.VUE_APP_CLIENT_GRANT_TYPE,
                
                  client_secret: process.env.VUE_APP_CLIENT_SECRET
              })
              .then(response => {
                
                  let token = response.data.access_token;

                  axios.defaults.headers.common = {'Authorization': `Bearer ${token}`};
                  
                  // axios.defaults.headers.common = {};
                  
                  resolve();
              })
              .catch(error => {
                  
                  console.log(error);
                  
                  axios.defaults.headers.common = {};
                  
                  resolve();
              });
          });
          
          
      },
      
	  initClubAction: function(context) {
	      
          let clubServer = getClubServer();
          
          let payload = {};
          
          return new Promise((resolve) => {              
              axios
                  .get(process.env.VUE_APP_BACKEND_PROTOCOL + clubServer + process.env.VUE_APP_BACKEND_DOMAIN + '/api/clubs/default')
                  .then(response => {

                        payload.club = response.data;

                        context.commit('initClubMutation', payload);
                  
                        resolve();
                    });
          });		  
	  },
      
      initEntrainementsAction: function(context, actionPayload) {
      
          let clubServer = getClubServer();
          
          let mutationPayload = {};
          
          let apiUrl = process.env.VUE_APP_BACKEND_PROTOCOL + clubServer + process.env.VUE_APP_BACKEND_DOMAIN + '/api/entrainements';
          
          if (actionPayload) {
              
              apiUrl += '/' + actionPayload.type + '/' + actionPayload.id;
          }
          
          return new Promise((resolve) => {              
              axios
                  .get(apiUrl)
                  .then(response => {

                        mutationPayload.entrainements = response.data;

                        context.commit('initEntrainementsMutation', mutationPayload);
                  
                        resolve();
                    });
          });
      },
      
      initConvocationsAction: function(context, actionPayload) {
      
          let clubServer = getClubServer();
          
          let mutationPayload = {};
          
          let apiUrl = process.env.VUE_APP_BACKEND_PROTOCOL + clubServer + process.env.VUE_APP_BACKEND_DOMAIN + '/api/convocations';
          
          if (actionPayload) {
              
              apiUrl += '/' + actionPayload.type + '/' + actionPayload.id;
          }
          
          return new Promise((resolve) => {              
              axios
                  .get(apiUrl)
                  .then(response => {

                        mutationPayload.convocations = response.data;

                        context.commit('initConvocationsMutation', mutationPayload);
                  
                        resolve();
                    });
          });
      },
      
      initInscriptionsAction: function(context, actionPayload) {
      
          let clubServer = getClubServer();
          
          let mutationPayload = {};
          
          let apiUrl = process.env.VUE_APP_BACKEND_PROTOCOL + clubServer + process.env.VUE_APP_BACKEND_DOMAIN + '/api/inscriptions';
          
          if (actionPayload) {
              
              apiUrl += '/' + actionPayload.type + '/' + actionPayload.id;
          }
          
          return new Promise((resolve) => {              
              axios
                  .get(apiUrl)
                  .then(response => {

                        mutationPayload.inscriptions = response.data;

                        context.commit('initInscriptionsMutation', mutationPayload);
                  
                        resolve();
                    });
          });
      },
      
      initCategoriesAction: function(context) {
	      
          let clubServer = getClubServer();
          
          let payload = {};
          
          return new Promise((resolve) => {              
              axios
                  .get(process.env.VUE_APP_BACKEND_PROTOCOL + clubServer + process.env.VUE_APP_BACKEND_DOMAIN + '/api/categories')
                  .then(response => {

                        payload.categories = response.data;

                        context.commit('initCategoriesMutation', payload);
                  
                        resolve();
                    });
          });		  
	  },
      
      initCoachsAction: function(context) {
	      
          let clubServer = getClubServer();
          
          let payload = {};
          
          return new Promise((resolve) => {              
              axios
                  .get(process.env.VUE_APP_BACKEND_PROTOCOL + clubServer + process.env.VUE_APP_BACKEND_DOMAIN + '/api/coachs')
                  .then(response => {

                        payload.coachs = response.data;

                        context.commit('initCoachsMutation', payload);
                  
                        resolve();
                    });
          });		  
	  },
  }
});

function getClubServer() {
    
    let clubServer = document.location.host;
          
    if (clubServer.indexOf('.') != -1) {

      clubServer = clubServer.substr(0, clubServer.indexOf('.'));

      console.log('clubServer extracted from host : ' + clubServer);        
    }        
    else {          
      console.log('Impossible to extract clubServer from host, setting default value : ' + process.env.VUE_APP_DEFAULT_CLUB_SERVER);

      clubServer = process.env.VUE_APP_DEFAULT_CLUB_SERVER;        
    }
    
    return clubServer;
}

