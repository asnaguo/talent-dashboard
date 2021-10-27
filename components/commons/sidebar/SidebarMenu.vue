<template lang="pug">
.smenu
    BListGroup
        slot(v-for='m in res.menu')
            BListGroupItem.head(v-if='m.head', :key='m.id')
                .d-flex.flex {{ m.title }}
            BListGroupItem(
                v-else,
                :to='m.link',
                :title='m.title',
                :key='"e" + m.id'
            )
                .micon(v-if='m.icon && m.icon !== ""')
                    .text-muted(v-if='!m.iconVariant')
                        i.mdi.mdi-18px(:class='"mdi-" + m.icon')
                    div(v-else, :class='"text-" + m.iconVariant')
                        i.mdi.mdi-18px(:class='"mdi-" + m.icon')
                .mtitle
                    .sidemenu {{ m.title }}
                .mcount(v-if='m.count && m.count !== null')
                    span.badge.rounded-pill(
                        :class='"bg-" + m.countVariant',
                        circle
                    ) {{ m.count }}
</template>
<script>
import { defineComponent, onMounted, reactive } from '@nuxtjs/composition-api'
import { BListGroup, BListGroupItem } from 'bootstrap-vue'
import IconDashboard from '~/components/commons/icon/Dashboard'

export default defineComponent({
    name: 'SidebarMenu',
    components: {
        BListGroup,
        BListGroupItem,
        IconDashboard,
    },
    props: {
        menu: {
            type: Array,
            default: () => {},
        },
    },
    setup(props) {
        const res = reactive({
            menu: [],
        })
        onMounted(() => {
            if (props.menu) {
                res.menu = props.menu
            }
        })
        return { res }
    },
})
</script>
