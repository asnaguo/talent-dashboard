<template lang="pug">
//- versi 1
button.btn.bg-white.btn-sm.px-1(
  v-if='versi === 1',
  type='submit',
  @click='res.SMini'
)
  IconFluentChevronLeft(height='16px', color='#ccc')

//- versi else
button.btn.btn-outline.btn-sm.px-1(v-else, type='submit', @click='res.SMini')
  IconSidebar(height='18px', color='#ccc')
</template>
<script>
import {
  computed,
  defineComponent,
  reactive,
  useContext,
} from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SetInsidebarMini',
  props: {
    versi: {
      type: Number,
      default: 1,
    },
  },
  setup() {
    const { store } = useContext()
    const res = reactive({
      insidebar: computed(() => store.state.core.theme.insidebar),
      SMini: async () => {
        await store.dispatch('core/SetTheme', {
          k: 'insidebar',
          v: !res.insidebar,
        })
      },
    })
    return { res }
  },
})
</script>