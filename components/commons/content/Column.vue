<template lang="pug">
.flex.d-flex(
    ref='insb',
    :style='res.stl',
    style='overflow: hidden; height: 100%'
)
    .insidebar.insdx(
        ref='insc',
        style='overflow: hidden; scrollbar-width: thin',
        v-if='$slots.left',
        :style='res.stl1'
    )
        slot(name='left')

    .flex(
        v-if='$slots.right',
        style='overflow: hidden; scrollbar-width: thin',
        :style='res.stl2'
    )
        slot(name='right')
</template>
<script>
import { defineComponent, onMounted, reactive, ref } from '@vue/composition-api'
export default defineComponent({
    props: {
        width: {
            type: String,
            default: '260px',
        },
    },
    setup(props) {
        const insb = ref()
        const insc = ref()
        const res = reactive({
            stl: {},
            stl1: {
                'min-width': props.width,
            },
            stl2: {},
        })
        onMounted(() => {
            setTimeout(() => {
                // get window height
                const bh = document.documentElement.clientHeight
                const h = insb.value.getBoundingClientRect().top
                res.stl = {
                    height: `calc(${bh}px - ${h}px)`,
                    'overflow-y': 'hidden',
                    'scrollbar-width': 'thin',
                }

                const h2 = insc.value.getBoundingClientRect().top
                res.stl1 = {
                    height: `calc(${bh}px - ${h2}px)`,
                    'overflow-y': 'auto',
                    'scrollbar-width': 'thin',
                    width: props.width,
                }

                res.stl2 = {
                    height: `calc(${bh}px - ${h2}px)`,
                    'overflow-y': 'auto',
                    'scrollbar-width': 'thin',
                }
            }, 800)
        })
        return { res, insb, insc }
    },
})
</script>

