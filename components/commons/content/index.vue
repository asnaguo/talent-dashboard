<template lang="pug">
.content(style='overflow: hidden', :style='res.stl', ref='cntnt')
    mq-layout.bg-white(:mq='["md", "sm"]')
        //- breadcrumb
        .flex.b-b(v-if='$slots.breadcrumb')
            .flex.d-flex.justify-content-between
                slot(name='breadcrumb')
                Menu
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

export default defineComponent({
    components: {
        Insidebar,
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
            stl: {},
        })
        const cntnt = ref(null)
        const cntnt2 = ref(null)

        onMounted(() => {
            setTimeout(() => {
                const bh = document.documentElement.clientHeight
                const h = cntnt.value.getBoundingClientRect().top
                res.stl = {
                    height: `calc(${bh}px - ${h}px)`,
                }

                const h2 = cntnt2.value.getBoundingClientRect().top
                res.stl2 = {
                    'overflow-x': 'scroll',
                    height: `calc(${bh}px - ${h2}px)`,
                }
            }, 2000)
        })
        return { res, cntnt, cntnt2 }
    },
})
</script>
