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
    }
}