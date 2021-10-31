<template lang="pug">
.mr-2.mb-md-2.d-flex.align-self-center
    .input-group.input-group-sm
        b-dropdown#dropdown-form(
            :text='`SortBy ${res.s}`',
            size='sm',
            ref='dropdown',
            variant='outline'
        )
            .flex.px-3
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
            s: '',
            select: 'email',
            sortby: computed(() => store.state[props.store].sortby),
            fields: computed(() => store.state[props.store].fields),
            Ch: () => {
                store.dispatch(props.store + '/FetchAll').then(() => {})
            },
        })

        watchEffect(() => {
            res.s = res.fields.find((x) => x.key === res.select).label
            store.commit(props.store + '/SET', { k: 'sortby', v: res.select })
        })
        return { res }
    },
})
</script>
