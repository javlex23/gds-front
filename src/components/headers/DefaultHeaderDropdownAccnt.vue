<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <span class="is-white right-10"><i class="fa fa-user" />  <span class="d-md-down-none">{{ nombreCompleto }}</span></span>
    </template>\
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center"><strong>Mi cuenta</strong></b-dropdown-header>
      <b-dropdown-item><i class="fa fa-user" /> Profile</b-dropdown-item>
      <b-dropdown-item><i class="fa fa-wrench" /> Configuración</b-dropdown-item>
      <b-dropdown-item><i class="fa fa-comments" /> Comentarios
        <b-badge variant="warning">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-divider />
      <b-dropdown-item><i class="fa fa-lock" /> Salir</b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
//import { mapGetters } from 'vuex'
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
import firebase from 'firebase'
export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown
  },
  data() {
    return { 
      nombreCompleto: '',
      itemsCount: 2 
    }
  },
  methods: {
    init(){
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          //console.log(user)
          //var displayName = user.displayName
          var email = user.email
          var emailVerified = user.emailVerified
          var photoURL = user.photoURL
          var uid = user.uid
          var phoneNumber = user.phoneNumber
          var providerData = user.providerData
          user.getIdToken().then(function(accessToken) {
            let displayName = firebase.auth().currentUser
            this.nombreCompleto = firebase.auth().currentUser.displayName
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
          })
        } else {
          // User is signed out.
          /*document.getElementById('sign-in-status').textContent = 'Signed out';
          document.getElementById('sign-in').textContent = 'Sign in';
          document.getElementById('account-details').textContent = 'null';*/
        }
      }, function(error) {
        console.log(error)
      })
      //console.log('Nombre: ' + displayName)
            //this.nombreCompleto = displayName
    }
  },
  computed: {
      //...mapGetters('session', ['nombreCompleto'])
  },
  mounted(){
    this.init()
  },
}
</script>
