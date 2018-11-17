<template lang="pug">
    div.div-portada
        div.space
            b-row
                b-col(md="6" class="my-1")
                    b-form-group( horizontal label="Filter" class="mb-0" size = "sm")
                        b-input-group
                            b-form-input(v-model="filter" placeholder="Ingresa término de búsqueda" size = "sm")
                            b-input-group-append
                                b-btn(:disabled="!filter" @click="filter = ''" size = "sm") Clear
            b-table(striped hover :fields = "fields" :items = "items" caption-top )
            b-row
                b-col(md="6" class="my-1")
                    b-pagination(:total-rows = "totalRows" :per-page = "perPage" v-model = "currentPage" class = "my-0" )
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    data () {
        return {
            filter: '',
            perPage: 10,
            currentPage: 1,
            totalRows: 10,
            fields: [
                {
                    key: 'tipoDocumento',
                    label: 'Tipo Documento',
                    sortable: true,
                    tdClass: (value, key, item) => {
                        return 'is-text-table-center'
                    }
                },
                {
                    key: 'nroDocumento',
                    label: 'Nro Documento',
                    sortable: true,
                    tdClass: (value, key, item) => {
                        return 'is-text-table-center'
                    }
                },
                {
                    key: 'nombreCompleto',
                    label: 'Nombre completo',
                    sortable: true,
                    tdClass: (value, key, item) => {
                        return 'is-text-table-left'
                    }
                },
                {
                    key: 'direccion',
                    label: 'Direccion',
                    sortable: true,
                    tdClass: (value, key, item) => {
                        return 'is-text-table-left'
                    }
                },
                {
                    key: 'ubigeo',
                    label: 'Ubigeo',
                    sortable: true,
                    tdClass: (value, key, item) => {
                        return 'is-text-table-left'
                    }
                },
                {
                    key: 'activo',
                    label: 'Activo',
                    sortable: true,
                    tdClass: (value, key, item) => {
                        return 'is-text-table-left'
                    }
                },
                {
                    key: 'actions',
                    label: ''
                },
            ],
            items: []
        }
    },
    methods: {
        ...mapActions('cliente', ['callApiGetListado']),
        cargarListaClientes(){
            let req = {}
            req.token = this.jwt
            console.log(req)
            this.callApiGetListado(req).then((res) => {
                console.log(res)
                if(res.data.codigoRespuesta == '01'){
                    this.items = res.data.clientes
                }
            })
        }
    },
    computed: {
      ...mapGetters('user', ['jwt'])
    },
    mounted() {
        this.cargarListaClientes()
    }
}
</script>