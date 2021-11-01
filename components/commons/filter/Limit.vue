<template lang="pug">
.mr-2
    .input-group.input-group-sm.d-flex
        .input-group-prepend
            label.input-group-text Limit
        b-form-select(
            :value='res.limit',
            style='height: 31px',
            :options='[5, 10, 15, 20, 30, 40, 50, 100]',
            @change='res.Ch'
        )
</template>
<script>
import {
    computed,
    defineComponent,
    reactive,
    useContext,
    watchEffect,
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
            limit: computed(() => store.state[props.store].limit),
            Ch: (v) => {
                store.commit(props.store + '/SET', {
                    k: 'limit',
                    v,
                })
                store.dispatch(props.store + '/FetchAll').then(() => {})
            },
        })

        watchEffect(() => {})
        return { res }
    },
})
</script>
