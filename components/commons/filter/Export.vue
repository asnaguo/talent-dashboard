<template lang="pug">
.mr-2
    b-button(size='sm', variant='outline')
        .flex.d-flex.flex-nowrap
            i.mdi.mdi-cloud-download-outline.mdi-18px
            .px-1 Export
</template>
<script>
import {
    computed,
    defineComponent,
    reactive,
    watchEffect,
    useContext,
} from '@nuxtjs/composition-api'

export default defineComponent({
    props: {
        store: {
            type: String,
            default: '',
        },
    },
    setup(props) {
        const { store } = useContext()
        const res = reactive({
            count: 0,
            selected: computed(() => store.state[props.store].selected),
        })
        watchEffect(() => {
            res.count = res.selected.length
        })
        return { res }
    },
})
</script>
