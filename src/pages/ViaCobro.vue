<template lang="pug">
  div.div-portada
    div.space
    b-card(bg-variant="dark" text-variant="white" sub-title="Búsqueda de póliza").is-card
        b-row
            b-col(lg = "2" md = "2" sm = "2" xs = "12")
                b-form-input#npoliza(type='text'  required='' placeholder='Número de póliza' size = "sm")
            b-col(sm = "5")
                b-form-input#npoliza(type='text'  required='' placeholder='Nombre de cliente' size = "sm")
            b-col(sm = "3")
                b-button.is-btn-2(@click = "loadData" size = "sm")
                    i(class="fa fa-search") 
                    span.is-btn-2 &nbsp;&nbsp;Buscar
    div#historial(v-show = "historial")
        span.is-label Número Póliza:
        div.space
            span.is-label.is-caption 
                center HISTÓRICO VÍA COBRO
            div.space
            div.space
            b-table(striped hover :fields = "fields" :items = "items" caption-top)
                template(slot = "descripcionEstado" slot-scope = "row")
                    b-button(variant = "success" size = "sm" class = "mr-1" v-show = "row.value == 'En Revision'" @click = "changeOption") {{row.value}}
                    span(v-show = "row.value != 'En Revision'") {{row.value}}
    div#revision(v-show = "revisar")
        span.is-label.is-caption 
            center REVISIÓN VÍA COBRO
        div.space            
        div.space
        div.space
            b-row
                b-col(lg = "2" md = "2" sm = "2" xs = "12")
                    label Vía de Cobro
                b-col(lg = "4" md = "4" sm = "4" xs = "12")
                    b-form-select(v-model = "selectedViaCobro" :options = "lstViaCobros" class="mb-3" size="sm")
            b-row
                b-col(lg = "2" md = "2" sm = "2" xs = "12")
                    label Número Tarjeta
                b-col(lg = "4" md = "4" sm = "4" xs = "12")
                    b-input-group
                        b-input-group-prepend
                            b-input-group-text
                                i(class="fa fa-credit-card")
                        b-form-input#npoliza(type='text'  required='' size = "sm")
                b-col(lg = "2" md = "2" sm = "2" xs = "12")
                    label Operador
                b-col(lg = "4" md = "4" sm = "4" xs = "12")
                    b-form-select(v-model = "selectedOperador" :options = "lstOperadores" class="mb-3" size="sm")
            b-row
                b-col(lg = "2" md = "2" sm = "2" xs = "12")
                    label Vencimiento
                b-col(lg = "4" md = "4" sm = "4" xs = "12")
                    b-input-group
                        b-input-group-prepend
                            b-input-group-text
                                i(class="fa fa-calendar")
                        b-form-input#npoliza(type='text'  required='' size = "sm")
                b-col(lg = "2" md = "2" sm = "2" xs = "12")
                    label Moneda
                b-col(lg = "4" md = "4" sm = "4" xs = "12")
                    b-form-select(v-model = "selectedMoneda" :options = "lstMonedas" class="mb-3" size="sm")
            b-row.space
                b-col
                    b-button(variant = "danger" size = "sm" class = "mr-1"  @click = "changeOption") Rechazar
                    b-button(variant = "success" size = "sm" class = "mr-1"  @click = "changeOption") Guardar
                    b-button(variant = "secondary" size = "sm" class = "mr-1"  @click = "showHistory") Regresar
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
      return {
        lstViaCobros: [],
        lstOperadores: [],
        lstMonedas: [],
        selectedViaCobro: '',
        selectedOperador: '',
        selectedMoneda: '',
        items: [],
        revisar: false,
        historial: true,
        fields: [
            {
                key: 'fechaCreacion',
                label: 'F.Creación',
                sortable: true,
                tdClass: (value, key, item) => {
                    return 'is-text-table-center'
                }
            },
            {
                key: 'viaCobro',
                label: 'Vía Cobro',
                tdClass: (value, key, item) => {
                    return 'is-text-important is-text-table-center'
                }
            },
            {
                key: 'bancoOperador',
                label: 'Banco/Operador',
                tdClass: (value, key, item) => {
                    return 'is-text-table-center'
                }
            },
            {
                key: 'tarjetaCuenta',
                label: 'Tarjeta/Cuenta',
                tdClass: (value, key, item) => {
                    return 'is-text-table-center'
                }
            },
            {
                key: 'moneda',
                label: 'Moneda',
                sortable: true,
                tdClass: (value, key, item) => {
                    return 'is-text-table-center'
                }
            },
            {
                key: 'descripcionEstado',
                label: 'Estado',
                sortable: true,
                tdClass: (value, key, item) => {
                    return 'is-text-table-center'
                }
            },
            {
                key: 'rechazo',
                label: 'Por rechazo',
                sortable: true,
                tdClass: (value, key, item) => {
                    return 'is-text-table-center'
                }
            }
        ]
      }
  },
  methods: { 
      ...mapActions('viaCobroModifica', ['callApiGetHistory', 'callApiGetInitialize']),
      loadData() {
          let req = {}
          req.token = this.jwt
          req.poliza = '45454545'
          req.usuario = 'ext.acerna'
          this.callApiGetHistory(req).then((res) => {
            if(res.data.codigoRespuesta == '01'){
                this.items = res.data.viasCobro
                this.callApiGetInitialize(req).then((res1) => {
                    if(res1.data.codigoRespuesta == '01'){
                        let viaCobrosResponse = res1.data.viasCobro;
                        let operadoresResponse = res1.data.operadores;
                        let monedasResponse = res1.data.monedas;
                        //Vias de cobro
                        let viaCobros = []
                        for(let i = 0; i < viaCobrosResponse.length; i++){
                            viaCobros.push({
                                "value" : viaCobrosResponse[i].codigo,
                                "text" : viaCobrosResponse[i].descripcion
                            })
                        }
                        //Operadores
                        let operadores = []
                        for(let i = 0; i < operadoresResponse.length; i++){
                            operadores.push({
                                "value" : operadoresResponse[i].codigo,
                                "text" : operadoresResponse[i].descripcion
                            })
                        }
                        //Monedas
                        let monedas = []
                        for(let i = 0; i < monedasResponse.length; i++){
                            monedas.push({
                                "value" : monedasResponse[i].codigo,
                                "text" : monedasResponse[i].descripcion
                            })
                        }
                        //Llenando combos
                        this.lstViaCobros = viaCobros
                        this.lstOperadores = operadores
                        this.lstMonedas = monedas
                    }
                })
            }
          })
          .catch(err => { console.log(err) })
      },
      changeOption(evt){
          evt.preventDefault()
          this.revisar = true
          this.historial = false
          let viasCobroHistorial = this.items
          for(let i = 0; i < viasCobroHistorial.length; i++){
            if(viasCobroHistorial[i].descripcionEstado == 'En Revision'){
                let strViaCobro = viasCobroHistorial[i].viaCobro
                this.selectedMoneda = viasCobroHistorial[i].moneda
                //this.selectedOperador = this.lstOperadores.filter(obj => obj.text == viasCobroHistorial[i].bancoOperador )[0].value
                //console.log(viasCobroHistorial[i].viaCobro)
                console.log(this.lstViaCobros)
                //console.log(strViaCobro)
                let tmp = this.lstViaCobros.filter(obj => console.log(obj.text + strViaCobro))
                console.log('Temp' + tmp)
            }
          }
      },
      showHistory(evt){
          evt.preventDefault()
          this.revisar = false
          this.historial = true
      }
  },
  computed: {
      ...mapGetters('user', ['jwt'])
  },
  mounted() {
      
  }
}
</script>

<style>
</style>