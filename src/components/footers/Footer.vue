<template lang="pug">
    footer
      b-container
        b-row.row-example
            b-col.text-center(sm="12")
                span xMax Solutions
                span
                | &nbsp;&nbsp;|&nbsp;&nbsp;Copyright
                span
                | &nbsp;{{ dateTime }}
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
      dateTime: moment().format('YYYY')
    }
  }
}
</script>
