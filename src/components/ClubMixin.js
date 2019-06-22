export default {
    
    computed: {      
        
        club: function() {
        
            return this.$store.state.club;
        },
        
        clubLogoSrc: function() {
            
            if (this.club.logo) {
                return (process.env.VUE_APP_BACKEND_PROTOCOL + this.club.server + process.env.VUE_APP_BACKEND_DOMAIN + '/images/clubs/' + this.club.logo);
            }
        }
    },
    
    methods: {
        getClubServer : function() {
    
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
    }
}