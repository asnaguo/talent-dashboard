<template lang="pug">
.mr-2.mb-md-2.d-flex.align-self-center(v-if='res.count > 0')
    .input-group.input-group-sm
        b-button(size='sm', variant='info', style='width: auto')
            .flex.d-flex.flex-nowrap.text-white
                i.mdi.mdi-cloud-download-outline.mdi-18px
                .px-1 Export:&nbsp;{{ res.count }}
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
