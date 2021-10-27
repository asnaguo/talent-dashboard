<template lang="pug">
.flex
    b-form-select(:value='res.value', :options='res.datas', @change='res.ch')
</template>
<script>
import {
    computed,
    onMounted,
    reactive,
    useContext,
} from '@nuxtjs/composition-api'

export default {
    setup() {
        const { store } = useContext()
        const res = reactive({
            value: computed(() => store.state.apps.jne.provinsi),
            datas: computed(() => store.state.apps.jne.provs),
            ch: (c) => {
                store.commit('apps/jne/SET', { k: 'provinsi', v: c })
                store.dispatch('apps/jne/getKabupaten', c).then(() => {})
            },
        })
        onMounted(() => {
            store.dispatch('apps/jne/getProvinsi')
        })
        return { res }
    },
}
</script>
