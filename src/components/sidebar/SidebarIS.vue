<template lang="pug">
      div
        AppSidebar(fixed).is-sidebar
          SidebarHeader
          SidebarForm
          SidebarNav(:navItems="this.opciones")
          SidebarFooter
          SidebarMinimizer
        main.main
          //Breadcrumb(:list="list")
          div.container-fluid
            router-view
        AppAside(fixed)
          DefaultAside
        div 
          input(type = "hidden" :value = "this.correo") 
</template>

<script>
import '@/assets/css/coreui.css'
import '@/assets/css/main.css'
//import nav from '@/_nav'
import {Sidebar, SidebarHeader, SidebarForm, SidebarNav, SidebarFooter, SidebarMinimizer, Breadcrumb, Aside as AppAside} from '@coreui/vue'
import DefaultAside from './DefaultAside'
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      nav: this.opciones //nav.items
    }
  },
  components: {
    'AppSidebar' : Sidebar,
    'SidebarHeader' : SidebarHeader,
    'SidebarForm' : SidebarForm,
    'SidebarNav' : SidebarNav,
    'SidebarFooter' : SidebarFooter,
    'SidebarMinimizer' : SidebarMinimizer,
    'Breadcrumb' : Breadcrumb,
    'AppAside' : AppAside,
    'DefaultAside' : DefaultAside
  },
  methods : {
    signalChange : function(evt) {
        alert('Cambio')
    }
  },
  computed: {
    ...mapState('session', ['opciones', 'correo'])
  },
  befaforeMount() {
    //console.log(this.opciones)
  },
  mounted() {
    console.log(this.opciones)
    this.nav = this.opciones
  }/*,
  create() {
    console.log(this.opciones)
    this.nav = this.opciones
  }*/
}
</script>

<style>
</style>
