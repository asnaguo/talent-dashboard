<template lang="pug">
b-nav-item
    button.btn.btn-sm.btn-icon
        i.mdi.mdi-bell-outline.text-muted.mdi-22px(style='margin-top: -3.5px')
        span.badge.badge-pill.badge-up.bg-danger 7
            // .bcount 12
</template>
<script>
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
    name: 'HeaderNotification',
    setup() {},
})
</script>
<style lang="scss" scoped>
.badge-up {
    margin: 14px 0 0 0;
    padding: 0 0.25rem;
    position: absolute;
    right: 0;
    transform: translate(0, -50%);
    background-clip: padding-box;
    min-width: 1rem;
    min-height: 1rem;
    line-height: 1rem;
}
.badge-pill {
    padding-right: 0.6em;
    padding-left: 0.6em;
    border-radius: 50%;
}
.badge {
    display: inline-block;
    border-radius: 50%;
    padding: 0.25em 0.4em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 50%;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>
