<template lang="pug">
.d-flex.align-self-center.mr-2(style='height: 100%')
    .d-flex.justify-content-center
        mq-layout.bg-white(:mq='["lg"]')
            .d-flex.flex-wrap
                .input-group.input-group-sm(
                    style='position: relative; flex-direction: row'
                )
                    .input-group-prepend(style='height: 31px')
                        label.input-group-text Query
                    b-form-select.border-outline(
                        :value='res.match',
                        style='border-right: none; height: 31px',
                        @change='res.ChMatch'
                    )
                        b-form-select-option(value='match') Match
                        b-form-select-option(value='regex') Regex

                    .input-group-prepend(style='height: 31px')
                        label.input-group-text FilterBy

                    b-form-select.border-outline(
                        :value='res.filterby',
                        style='height: 31px'
                    )
                        slot(v-for='r in res.fields')
                            b-form-select-option(
                                v-if='r.sort',
                                :value='r.key',
                                @click='res.ChFilter(r.key)'
                            ) {{ r.label }}

                    .input-group-prepend
                        b-form-input#tablesearch(
                            size='sm',
                            type='email',
                            placeholder='Search',
                            required,
                            :value='res.q',
                            v-debounce:600ms='res.Search',
                            style='min-width: 200px; height: 31px; border-top-left-radius: 0; border-bottom-left-radius: 0; border-left: 0'
                        )
                    //-div(style='position: absolute; left: 4px; top: -1px')
                        i.mdi.mdi-magnify.mdi-24px(style='color: #eee')
                    .ml-2
                        b-button(
                            size='sm',
                            variant='outline',
                            style='width: auto',
                            @click='res.Clear'
                        )
                            i.mdi.mdi-eraser.mdi-18px.text-muted

        mq-layout.bg-white(:mq='["md", "sm"]')
            .d-flex
                b-dropdown#dropdown-form.mr-2(
                    :text='`FilterBy ${res.s}`',
                    size='sm',
                    ref='dropdown',
                    variant='outline'
                )
                    .flex.px-3
                        b-form-radio-group(
                            name='data-filterby',
                            stacked,
                            v-model='res.s'
                        )
                            slot(v-for='r in res.fields')
                                b-form-radio(
                                    v-if='r.sort',
                                    :value='r.key',
                                    @change='res.ChFilter(r.key)'
                                ) {{ r.label }}

                b-form-input#tablesearch(
                    size='sm',
                    type='email',
                    placeholder='Search',
                    required,
                    v-debounce:600ms='res.Search',
                    :value='res.q',
                    style='min-width: 200px; height: 31px'
                )

                .ml-2
                    b-button(
                        size='sm',
                        variant='outline',
                        style='width: auto',
                        @click='res.Clear'
                    )
                        i.mdi.mdi-eraser.mdi-18px.text-muted
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
            q: computed(() => store.state[props.store].q),
            match: computed(() => store.state[props.store].match),
            filterby: computed(() => store.state[props.store].filterby),
            fields: computed(() => store.state[props.store].fields),
            ChMatch: (v) => {
                store.commit(props.store + '/SET', { k: 'match', v })
                store.dispatch(props.store + '/FetchAll')
            },
            ChFilter: (v) => {
                store.commit(props.store + '/SET', { k: 'filterby', v })
                store.dispatch(props.store + '/FetchAll')
            },
            Search: (v) => {
                store.commit(props.store + '/SET', { k: 'page', v: 1 })
                store.commit(props.store + '/SET', { k: 'q', v })
                store.dispatch(props.store + '/FetchAll')
            },
            Clear: () => {
                store.commit(props.store + '/SET', { k: 'page', v: 1 })
                store.commit(props.store + '/SET', { k: 'q', v: '' })
                store.dispatch(props.store + '/FetchAll')
            },
        })

        watchEffect(() => {
            res.s = res.fields.find((x) => x.key === res.filterby).label
            store.commit(props.store + '/SET', {
                k: 'filterby',
                v: res.filterby,
            })
        })
        return { res }
    },
})
</script>
