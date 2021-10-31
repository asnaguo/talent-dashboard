<template lang="pug">
.mr-2.mb-md-2.d-flex.align-self-center
    .input-group.input-group-sm
        b-button(size='sm', variant='outline', style='width: auto')
            .flex.d-flex.flex-nowrap
                //- i.mdi.mdi-sort.mdi-18px
                .px-1 Total:&nbsp;{{ res.total }}
</template>
<script>
import {
    computed,
    defineComponent,
    reactive,
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
            total: computed(() => store.state[props.store].count.total),
        })
        return { res }
    },
})
</script>
