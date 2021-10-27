<template lang="pug">
.footer(v-if='res.commit.commit')
    .ftrbuild #build-{{ res.commit.commit }}
</template>
<script>
import { defineComponent, onBeforeMount, reactive } from '@vue/composition-api'

export default defineComponent({
    setup() {
        const res = reactive({
            commit: {},
        })
        onBeforeMount(() => {
            res.commit = process.env.commit
        })
        return { res }
    },
})
</script>
<style lang="scss" scoped>
.ftrbuild {
    font-size: 11px;
    position: fixed;
    bottom: 5px;
    right: 20px;
    color: #999;
}
</style>