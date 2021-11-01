<template lang="pug">
.mr-2.d-flex.align-self-center(v-if='res.fields.length > 0')
    .input-group.input-group-sm
        b-dropdown#dropdown-form(
            :text='`SortBy ${res.s}`',
            size='sm',
            ref='dropdown',
            variant='outline'
        )
            .flex.px-2
                b-form-radio-group(
                    name='data-sortby',
                    stacked,
                    v-model='res.select',
                    @change='res.Ch'
                )
                    slot(v-for='r in res.fields')
                        b-form-radio(v-if='r.sort', :value='r.key') {{ r.label }}

        //- b-dropdown-divider
        //- b-dropdown-item-button
            .flex.d-flex.px-1(style='min-width: 140px')
                i.mdi.mdi-plus.mdi-18px
                .px-1.pt-1 Add Custom
</template>
<script>
import {
    computed,
    defineComponent,
    onMounted,
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
            s: '',
            select: '_id',
            sortby: computed(() => store.state[props.store].sortby),
            fields: computed(() => store.state[props.store].fields),
            Ch: (sx) => {
                const k = res.fields.find((x) => x.key === sx)
                res.s = k.label
                res.select = k.key
                store.commit(props.store + '/SET', {
                    k: 'sortby',
                    v: k.key,
                })
                store.dispatch(props.store + '/FetchAll').then(() => {})
            },
        })

        onMounted(() => {
            if (res.fields.length > 0) {
                res.fields.forEach((x) => {
                    if (x.sortKey) {
                        store.commit(props.store + '/SET', {
                            k: 'sortby',
                            v: x.key,
                        })
                        res.s = x.label
                        res.select = x.key
                    }
                })
            }
        })
        return { res }
    },
})
</script>
