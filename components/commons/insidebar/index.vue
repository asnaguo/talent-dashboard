<template lang="pug">
section
    //-mq-layout.bg-white(:mq='["sm", "md"]', v-if='$slots.menu')
        .flex.d-flex.justify-content-end.b-b.py-2.px-3
            Menu


    mq-layout.bg-white(:mq='["sm", "md"]', v-if='$slots.filter')
        .flex.py-2.px-3.b-b
            .flex
                //- slot filter only
                FilterBox
                    .pt-2.b-t
                        slot(name='filter')

    mq-layout(:mq='["lg"]')
        .insidebar.insdx.d-none.d-md-block(v-if='res.show')
            .flex.d-flex.py-1.px-2.b-b(style='min-height: 37px')
                div
                    ThemeSetInsidebarMini
                .d-flex.flex.pl-2(v-if='title !== ""')
                    .align-self-center(style='font-weight: 500') {{ title }}
            .flex.pb-4
                slot

    mq-layout.bg-white(:mq='["sm", "md"]')
        //- MAIN SIDEBAR FLOAT
        BSidebar#MainInSidebar(
            title='Menu',
            backdrop,
            bg-variant='white',
            shadow,
            left,
            width='240px'
        )
            .flex.pt-2
                //- load sidebar menu only
                slot
</template>
<script>
import { reactive, useContext, computed } from '@nuxtjs/composition-api'
import { BSidebar, BCollapse } from 'bootstrap-vue'
import FilterBox from './filter.vue'
import Menu from './menu'

export default {
    name: 'Insidebar',
    components: {
        FilterBox,
        BSidebar,
        BCollapse,
        Menu,
    },
    props: {
        title: {
            type: String,
            default: '',
        },
    },
    setup() {
        const { store } = useContext()
        const res = reactive({
            show: computed(() => store.state.core.theme.insidebar),
        })
        return { res }
    },
}
</script>
