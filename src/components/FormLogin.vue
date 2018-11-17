<template lang="pug">
  div
    b-container
      b-row.justify-content-center
        b-col(md="5")
          b-card-group
            b-card(class="p-4" no-body)#formLogin
              b-card-body
                div
                  div.is-title 
                    h2.text-center Gestión Documentaria
                  b-form(@submit='onSubmit' v-if='show')
                    p.text-muted.text-center Acceso al Sistema
                    b-form-group#exampleInputGroup2(label='Usuario' label-for='exampleInput2')
                      b-input-group.mb-3
                        b-input-group-prepend
                          b-input-group-text
                            i(class="fa fa-user")
                        b-form-input#exampleInput2(type='text' v-model='form.usuario' required='' placeholder='usuario@gmail.com')
                    b-form-group#exampleInputGroup1(label='Contraseña:' label-for='exampleInput1')
                      b-input-group.mb-3
                        b-input-group-prepend
                          b-input-group-text
                            i(class="fa fa-lock")
                        b-form-input#exampleInput1(type='password' v-model='form.clave' required='' placeholder='********')
                    b-row
                      b-col(cols="6")
                        b-button(type='submit' variant='secondary' class='px-4') Iniciar sesión
                      b-col(cols="6").content-right
                        img.is-img-header(src="@/assets/media/images/google-account.png", width="32px", height="32px", alt='Account Google')
                  pulse-loader(:loading="loading")

    div#firebaseui-auth-container
    div#loader Loading...
</template>

<script>
import { mapActions } from 'vuex'
import firebase from 'firebase'
import firebaseui from 'firebaseui'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

var config = {
  apiKey: "AIzaSyCptqy01yiVIp3gRSmpTf4toiX6HR0XDCo",
  authDomain: "xmax-sgd.firebaseapp.com",
  databaseURL: "https://xmax-sgd.firebaseio.com",
  storageBucket: "xmax-sgd.appspot.com",
};
firebase.initializeApp(config);

var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: 'http://localhost:8080/#/admin/actions',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    //firebase.auth.GithubAuthProvider.PROVIDER_ID,
    //firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>',
  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>'
}

//if (ui.isPendingRedirect()) {
  ui.start('#firebaseui-auth-container', uiConfig);
//}

export default {
  data () {
    return {
      loading: false,
      form: {
        usuario: '',
        clave: ''
      },
      show: true
    }
  },
  methods: {
    ...mapActions('user', ['signIn']),
    onSubmit (evt) {
      evt.preventDefault()
      this.loading = true
      this.signIn(this.form)
        .then((res) => {
            console.log(res)
            this.loading = false
            this.$router.push('/admin/actions')
        })
        .catch(err => { console.log(err) })
    },
    functionChange () {
      alert('Cambia')
    }
  },
  components: {
    PulseLoader
  }
}
</script>
