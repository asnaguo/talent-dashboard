
export default function (ctx, inject) {

    const isdark = ctx.$cookiz.get('isdark')
    // ctx.store.commit('auth/SETDARK', isdark)
    ctx.app.head.bodyAttrs = ctx.app.head.bodyAttrs || {}
    ctx.app.head.bodyAttrs = {
        class: isdark ? 'bg-dark' : 'bg-light2'
    }
}