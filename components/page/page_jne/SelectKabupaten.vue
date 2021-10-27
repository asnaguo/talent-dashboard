<template lang="pug">
.flex
    b-form-select(:value='res.value', :options='res.datas', @change='res.ch')
</template>
<script>
import { computed, reactive, useContext } from '@nuxtjs/composition-api'

export default {
    setup() {
        const { store } = useContext()
        const res = reactive({
            value: computed(() => store.state.apps.jne.kabupaten),
            datas: computed(() => store.state.apps.jne.kabs),
            ch: (c) => {
                store.commit('apps/jne/SET', { k: 'kabupaten', v: c })
                store.dispatch('apps/jne/getKecamatan', {
                    provinsi: store.state.apps.jne.provinsi,
                    kabupaten: store.state.apps.jne.kabupaten,
                })
            },
        })
        return { res }
    },
}
</script>
