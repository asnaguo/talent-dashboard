<template lang="pug">
.flex(
    style='overflow: hidden; height: calc(100vh); scrollbar-width: thin',
    :style='res.stl',
    ref='cmain'
)
    slot
</template>
<script>
import { defineComponent, onMounted, reactive, ref } from '@vue/composition-api'
export default defineComponent({
    setup() {
        const res = reactive({
            stl: {},
        })
        const cmain = ref(null)

        onMounted(() => {
            setTimeout(() => {
                const bh = document.documentElement.clientHeight
                const h = cmain.value.getBoundingClientRect().top
                res.stl = {
                    height: `calc(${bh}px - ${h}px)`,
                }
            }, 1000)
        })
        return { res, cmain }
    },
})
</script>

