<template lang="pug">
nuxt-link(to='/')
    .d-flex.flex.justify-content-center.align-self-center(
        v-if='$store.state.core.theme.sidebarmini'
    )
        img.d-flex.justify-content-center(
            src='/img/logo-mini.png',
            height='35px'
        )
    div(v-else)
        img(
            v-if='$cookiz.get("isdark")',
            src='/img/logo-dark.png',
            height='35px',
            width='auto'
        )
        img(v-else, src='/img/logo-light.png', height='35px', width='auto')
</template>
