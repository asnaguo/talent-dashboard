<template lang="pug">
.flex(ref='inscx', :style='res.stl2', style='overflow: hidden')
    slot
</template>
<script>
import {
    defineComponent,
    reactive,
    ref,
    onMounted,
} from '@nuxtjs/composition-api'

export default defineComponent({
    components: {},
    setup() {
        const inscx = ref(null)
        const res = reactive({
            stl2: {},
        })
        onMounted(() => {
            setTimeout(() => {
                // get window height
                const bh = document.documentElement.clientHeight
                const h2 = inscx.value.getBoundingClientRect().top
                res.stl2 = {
                    height: `calc(${bh}px - ${h2}px)`,
                    overflowY: 'scroll',
                    'scrollbar-width': 'thin',
                }
            }, 800)
        })
        return { res, inscx }
    },
})
</script>
