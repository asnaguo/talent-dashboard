<template lang="pug">
.flex(
    ref='insx',
    :style='res.stl',
    style='overflow: hidden; height: 100%; width: 100%'
)
    slot
</template>
<script>
import { defineComponent, onMounted, reactive, ref } from '@vue/composition-api'
export default defineComponent({
    setup() {
        const insx = ref()
        const insc = ref()
        const res = reactive({
            stl: {},
            stl2: {},
        })
        onMounted(() => {
            setTimeout(() => {
                // get window height
                const bh = document.documentElement.clientHeight - 60
                const h = insx.value.getBoundingClientRect().top
                res.stl = {
                    height: `calc(${bh}px - ${h}px)`,
                    'overflow-y': 'scroll',
                    'overflow-x': 'hidden',
                    'scrollbar-width': 'thin',
                }
            }, 100)
        })
        return { res, insx, insc }
    },
})
</script>

