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
            value: computed(() => store.state.apps.jne.kelurahan),
            datas: computed(() => store.state.apps.jne.kels),
            ch: (c) => {
                store.commit('apps/jne/SET', { k: 'kelurahan', v: c })

                store.dispatch('apps/jne/getTarif', {
                    provinsi: store.state.apps.jne.provinsi,
                    kabupaten: store.state.apps.jne.kabupaten,
                    kecamatan: store.state.apps.jne.kecamatan,
                    kelurahan: c,
                })
            },
        })
        return { res }
    },
}
</script>
