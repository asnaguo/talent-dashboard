<template lang="pug">
button.btn.btn-light.btn-sm.px-1(type='submit', @click='res.SetKolor')
  IconSun(v-if='res.isdark', height='18px', fill='#999')
  IconDark(v-else, height='18px', color='#999')
</template>
<script>
import { reactive, useContext } from '@nuxtjs/composition-api'

export default {
  name: 'SetColor',
  setup() {
    const ctx = useContext()
    const res = reactive({
      isdark: ctx.$cookiz.get('isdark') | false,
      SetKolor: () => {
        ctx.$cookiz.set('isdark', !res.isdark)
        window.location.reload()
      },
    })
    return { res }
  },
}
</script>