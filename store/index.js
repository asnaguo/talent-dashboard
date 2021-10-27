export const state = () => ({
    islogin: false,
    apikey: {
        alamat: '201b687484997a43f8530b5fe2672a7304122ba13b01c179b2d2bcb0538ff66a'
    }
})

export const mutations = {
    SET(state, { k, v }) {
        state[k] = v
    },

}
export const actions = {
    nuxtServerInit({ dispatch }) {
    },
    nuxtClientInit({ state, dispatch }) {
        // code
        dispatch('core/LoadTheme')

        if (state.islogin) {
            dispatch('auth/me/GetMe')
        }

    }
}

export default {
    state,
    mutations,
    actions
}
