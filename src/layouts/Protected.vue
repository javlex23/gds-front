<template lang="pug">
    div
      // Component HEADER
      header-app
      // BODY
      div
        sidebar-is
        //div#sign-in-status
        //div#sign-in
        //div#account-details
      // Component FOOTER
      footer-is
</template>

<script>
import '@/assets/css/coreui.css'
import '@/assets/css/main.css'
import '@/assets/css/icons.css'
import HeaderApp from '@/components/headers/HeaderApp'
import FooterApp from '@/components/footers/FooterApp'
import SidebarIS from '@/components/sidebar/SidebarIS'
import { mapGetters, mapActions } from 'vuex'
import firebase from 'firebase'

export default {
  data () {
    return {
    }
  },
  components: {
    'header-app': HeaderApp,
    'footer-is': FooterApp,
    'sidebar-is' : SidebarIS
  },
  methods: { 
      ...mapActions('session', ['init', 'menu']),
      initialize () {
        this.loading = true

        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var uid = user.uid;
            var phoneNumber = user.phoneNumber;
            var providerData = user.providerData;
            user.getIdToken().then(function(accessToken) {
              /*document.getElementById('sign-in-status').textContent = 'Signed in';
              document.getElementById('sign-in').textContent = 'Sign out';
              document.getElementById('account-details').textContent = JSON.stringify({
                displayName: displayName,
                email: email,
                emailVerified: emailVerified,
                phoneNumber: phoneNumber,
                photoURL: photoURL,
                uid: uid,
                accessToken: accessToken,
                providerData: providerData
              }, null, '  ');*/
            });
          } else {
            // User is signed out.
            /*document.getElementById('sign-in-status').textContent = 'Signed out';
            document.getElementById('sign-in').textContent = 'Sign in';
            document.getElementById('account-details').textContent = 'null';*/
          }
        }, function(error) {
          console.log(error);
        });

        let object = []
        this.init(this.jwt).then((res) => {
            console.log(res)
        })
        .catch(err => { console.log(err) })
      }
  },
  computed: {
      ...mapGetters('user', ['jwt'])
  },
  beforeMount(){
    this.initialize()
  },
  mounted () {   
  }
}
</script>

<style>
</style>
