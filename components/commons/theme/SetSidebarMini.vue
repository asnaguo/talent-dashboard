<template lang="pug">
button.btn.btn-light.btn-sm.px-1(type='submit', @click='res.SMini')
  IconMenuOpenFilled(height='18px', color='#999')
</template>
<script>
import {
  computed,
  defineComponent,
  reactive,
  useContext,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SetSidebarMini',
  setup() {
    const { store } = useContext()
    const res = reactive({
      sidebarmini: computed(() => store.state.core.theme.sidebarmini),
      SMini: async () => {
        await store.dispatch('core/SetTheme', {
          k: 'sidebarmini',
          v: !res.sidebarmini,
        })
      },
    })
    return { res }
  },
})
</script>