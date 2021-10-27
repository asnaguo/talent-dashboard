export default ({ app, redirect, store }) => {
    // Cek login session
    const islg = app.$cookiz.get('auth.islogin')
    if (islg) {

        app.$cookiz.get('auth.islogin', true)
        app.store.commit('SET', { k: 'islogin', v: true })

    } else {
        app.store.commit('SET', { k: 'islogin', v: false })
        redirect('/register')
    }
}
