/* ============
 * Actions for the user module
 * ============
 *
 * The actions that are available on the
 * user module.
 */
import axios from 'axios'

export default {
    callApiGetHistory ({ commit, dispatch }, request) {
    return new Promise((resolve, reject) => {
      let url = 'http://sir-afiliaciones-2.getsandbox.com/sir-admin/api/v1/afiliaciones/modificaciones/historicos/{numeroPoliza}'
      url = url.replace('{numeroPoliza}', request.poliza)
      axios.get(url, 
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + request.token //the token is a variable which holds the token
        }
      }).then(res => {
          if (res) {
            commit('setViasCobro', res.data.viasCobro)
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    callApiGetInitialize ({ commit, dispatch }, request) {
      return new Promise((resolve, reject) => {
        let url = 'http://sir-afiliaciones-2.getsandbox.com/sir-admin/api/v1/afiliaciones/modificaciones/inicializaciones/{numeroPoliza}/usuario/{usuarioLogin}/aplicacion/{codigoAplicacion}'
        url = url.replace('{numeroPoliza}', request.poliza)
        url = url.replace('{usuarioLogin}', request.usuario)
        url = url.replace('{codigoAplicacion}', 'SIR')
        axios.get(url, 
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + request.token
          }
        }).then(res => {
          if (res) {
            commit('setLstViaCobros', res.data.lstViaCobros)
            commit('setLstOperadores', res.data.lstOperadores)
            commit('setLstMonedas', res.data.lstMonedas)
            commit('setLstBancos', res.data.lstBancos)
            commit('setLstTiposCuenta', res.data.lstTiposCuenta)
            commit('setTarjetaBin', res.data.lstTarjetaBin)
            commit('setTarjetaPatron', res.data.lstTarjetaPatron)
            commit('setCuentaPatron', res.data.lstCuentaPatron)
            commit('setDatosPoliza', res.data.lstDatosPoliza)
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch(err => {
          reject(err)
        })
      })
    }
}
