import firebase from 'firebase'
import firebaseui from 'firebaseui'

const  config = {
    apiKey: "AIzaSyCptqy01yiVIp3gRSmpTf4toiX6HR0XDCo",
    authDomain: "xmax-sgd.firebaseapp.com",
    databaseURL: "https://xmax-sgd.firebaseio.com",
    storageBucket: "xmax-sgd.appspot.com",
};

const auth = {
    context: null,
    uiConfig: null,
    ui: null,
    init(context) {
        this.context = context

        firebase.initializeApp(config);
        this.uiConfig = {
            signInSuccessUrl: 'dashboard',
            signInOptions: [
                firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID
            ]
        }

        this.ui = new firebaseui.auth.AuthUI(firebase.auth());

        firebase.auth().onAuthStateChanged((user) => {
            this.context.$store.dispatch('user/setCurrentUser')

            let requireAuth = this.context.$route.matched.some(record => record.meta.requireAuth)
            let guestOnly = this.context.$route.matched.some(record => record.meta.guestOnly)

            if(requireAuth && !user) this.context.$router.push('auth')
            else if (guestOnly && user) this.context.$router.push('dashboard')
        })
    },
    authForm(container) {
        this.ui.start(container, this.uiConfig);
    },
    user() {
        return this.context ? firebase.auth().currentUser : null;
    },
    logout() {
        firebase.auth().signOut();
    }
}