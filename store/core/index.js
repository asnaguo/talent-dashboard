export const strict = process.env.NODE_ENV !== 'production'

export const state = () => ({
    loaded: false,
    theme: {
        sidebarmini: false,
        insidebar: true,
        sidebarfloat: false,
    }
})

export const mutations = {
    SET(state, { k, v }) {
        state[k] = v
    },
    SET_THEME(state, { k, v }) {
        state.theme[k] = v
    },
}

export const actions = {
    /**
     * Load konfigurasi template dari indexed db
     */
    async LoadTheme({ state, commit }) {
        for (const [k] of Object.entries(state.theme)) {
            try {
                const vv = await this.$localForage.theme.getItem(k)
                commit("SET_THEME", { k, v: vv })
            } catch {

            }
        }
        await commit('SET', { k: 'loaded', v: true })
    },
    /**
     * save config ke indexed db
     */
    async SetTheme({ commit }, { k, v }) {
        await commit('SET_THEME', { k, v })
        await this.$localForage.theme.setItem(k, v)
        return null
    },


}

// export const getters = {
//     loaded: (state) => state.loaded,
// }

export default {
    namespaced: true,
    strict,
    state,
    actions,
    // getters,
    mutations,
}
