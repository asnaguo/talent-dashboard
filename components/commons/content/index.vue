<template lang="pug">
.content(style='overflow: hidden', :style='res.stl', ref='cntnt')
    mq-layout.bg-white(:mq='["md", "sm"]', v-if='res.load')
        //- breadcrumb
        .flex.b-b(v-if='$slots.breadcrumb')
            .flex.d-flex.justify-content-between
                slot(name='breadcrumb')
                Menu(v-if='$slots.insidebar')
        .flex.b-b.d-flex.justify-content-between(v-else)
            .flex
                b-breadcrumb.py-2.bg-white.no-radius.text-uppercase
                    b-breadcrumb-item(to='/') Dashboard
                    b-breadcrumb-item(
                        v-if='$route.name !== "index"',
                        :to='`/${$route.path}`'
                    ) {{ $route.name }}
            Menu

        //- toolbar
        .flex.b-b.bg-body(v-if='$slots.toolbar')
            .px-3.py-2
                slot(name='toolbar')
        //-.flex.b-b.px-3.py-2.bg-white(v-if='$slots.filter')
            IFilter
                slot(name='filter')

    Insidebar(v-if='$slots.insidebar', :title='title')
        //- filter on sm mode
        template(v-slot:filter, v-if='$slots.filter')
            .flex
                slot(name='filter')

        template(v-slot:menu, v-else)
            div

        slot(name='insidebar')

    .flex
        mq-layout(:mq='["lg"]')
            //- breadcrumb
            .flex.b-b(v-if='$slots.breadcrumb')
                slot(name='breadcrumb')

            //- toolbar
            .flex.b-b(v-if='$slots.toolbar')
                .px-3.py-2
                    slot(name='toolbar')

        //- filter
        mq-layout(:mq='["lg"]')
            .flex.b-b.px-3.py-2.bg-white(v-if='$slots.filter')
                slot(name='filter')

        //-content
        .flex(
            v-if='$slots',
            style='overflow: hidden',
            ref='cntnt2',
            :style='res.stl2'
        )
            slot
</template>
<script>
import { defineComponent, onMounted, reactive, ref } from '@vue/composition-api'
import Menu from '../insidebar/menu'
import Insidebar from '~/components/commons/insidebar'
import IFilter from '~/components/commons/insidebar/filter'

export default defineComponent({
    components: {
        Insidebar,
        IFilter,
        Menu,
    },
    props: {
        title: {
            type: String,
            default: '',
        },
    },
    setup() {
        const res = reactive({
            load: false,
            stl: {},
        })
        const cntnt = ref(null)
        const cntnt2 = ref(null)

        onMounted(() => {
            res.load = true
            setTimeout(() => {
                const bh = document.documentElement.clientHeight
                const h = cntnt.value.getBoundingClientRect().top
                res.stl = {
                    height: `calc(${bh}px - ${h}px)`,
                }

                const h2 = cntnt2.value.getBoundingClientRect().top
                res.stl2 = {
                    'overflow-x': 'hidden',
                    height: `calc(${bh}px - ${h2}px)`,
                }
            }, 2000)
        })
        return { res, cntnt, cntnt2 }
    },
})
</script>
