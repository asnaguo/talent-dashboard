<template lang="pug">
.mr-2.mb-md-2.d-flex.align-self-center
    .input-group.input-group-sm
        b-button-group(size='sm')
            b-button(
                size='sm',
                :variant='res.asc ? "light" : "outline"',
                @click='res.ChASC'
            ) ASC
            b-button(
                size='sm',
                :variant='res.desc ? "light" : "outline"',
                @click='res.ChDESC'
            ) DESC
</template>

<script>
import {
    computed,
    defineComponent,
    reactive,
    useContext,
    onMounted,
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
            asc: false,
            desc: false,
            sort: computed(() => store.state[props.store].sort),
            ChASC: () => {
                store.commit(props.store + '/SET', {
                    k: 'sort',
                    v: 'asc',
                })
                res.asc = true
                res.desc = false
                store.dispatch(props.store + '/FetchAll').then(() => {})
            },
            ChDESC: () => {
                store.commit(props.store + '/SET', {
                    k: 'sort',
                    v: 'desc',
                })
                res.asc = false
                res.desc = true
                store.dispatch(props.store + '/FetchAll').then(() => {})
            },
        })
        onMounted(() => {
            if (res.sort === 'ASC') {
                res.ChASC()
            } else {
                res.ChDESC()
            }
        })
        return { res }
    },
})
</script>
