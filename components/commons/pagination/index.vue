<template lang="pug">
b-pagination-nav(
    v-model='res.p',
    :base-url='`/${base}/`',
    :total-rows='res.total',
    :number-of-pages='res.pages || 1',
    use-router
)
</template>
<script>
import {
    computed,
    defineComponent,
    onBeforeMount,
    onMounted,
    reactive,
    useContext,
} from '@nuxtjs/composition-api'

export default defineComponent({
    props: {
        base: {
            type: String,
            default: '/',
        },
        store: {
            type: String,
            default: '',
        },
    },
    setup(props) {
        const { store, route } = useContext()
        const res = reactive({
            total: computed(() => store.state[props.store].count.total),
            pages: computed(() => store.state[props.store].count.pages),
            p: route.value.params.page || 1,
        })

        onBeforeMount(() => {
            store.commit(props.store + '/SET', {
                k: 'page',
                v: route.value.params.page || 1,
            })
            // store.dispatch(props.store + '/LoadData')
        })

        onMounted(() => {})
        return { res }
    },
})
</script>
