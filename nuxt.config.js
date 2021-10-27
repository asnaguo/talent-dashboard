import importToml from 'import-toml'
import * as cmt from './.commit.json'

const data = importToml.sync(`.env.${process.env.STAGE}.toml`)
const dtt = data
dtt.commit = cmt

export default {
    server: {
        port: 3000, // default: 3000
        host: '0.0.0.0', // default: localhost
    },
    env: dtt,
    watchers: {
        webpack: {
            ignored: ['node_modules/**'], // 'files/**/*.js',
            aggregateTimeout: 300,
            poll: 1000,
        },
    },
    html: {
        lang: 'id', // default value
        translate: 'no', // default value
    },
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: data.site_name,
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: data.site_description },
            { name: 'format-detection', content: 'telephone=no' },
            { name: 'google', content: 'notranslate' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
            { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/6.1.95/css/materialdesignicons.min.css' }
        ]
    },

    loading: {
        color: '#3ecf93',
        height: '3px'
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '@/assets/scss/init.scss'
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '~/plugins/axios',
        '~/plugins/vuedebounce',
        '~/plugins/theme',
        {
            src: '~/plugins/bootstrap',
            mode: 'client'
        }
    ],
    router: {
        middleware: 'default'
    },
    // middleware: ['darkswitch'],
    serverMiddleware: [
        '~/server-middleware/logger',
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: {
        dirs: [
            '~/components/commons',
        ]
    },


    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
        '@nuxtjs/localforage',
        '@nuxtjs/device',
        '@nuxtjs/composition-api/module',
        '@nuxtjs/google-fonts',
        'nuxtjs-mdi-font'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        ['cookie-universal-nuxt', { alias: 'cookiz', parseJSON: true }],
        '@nuxtjs/universal-storage',
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        'nuxt-client-init-module',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        'nuxt-mq',
    ],
    storage: {
        cookie: {
            prefix: '',
            options: {
                path: '/',
            }
        } // boolean or {prefix, options}
    },
    localforage: {
        instances: [
            {
                name: 'pegasus_riza',
                storeName: 'theme'
            },
            {
                name: 'pegasus_riza',
                storeName: 'user'
            }
        ]
    },
    mq: {
        defaultBreakpoint: 'sm',
        breakpoints: {
            sm: 576,
            md: 768,
            lg: Infinity,
        }
    },

    googleFonts: {
        families: {
            Roboto: {
                wght: [400, 500, 700],
            }
        }
    },
    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {},

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        icon: false, // disables the icon module
        manifest: {
            lang: 'id',
            name: 'NuxtPegasus',
            shortName: 'NXP',
            useWebmanifestExtension: false
        },
        workbox: {},
    },

    generate: {
        // ignore: ['pegasus_init/'],
    },
    content: {},

    build: {
        extractCSS: true,
        babel: {
            plugins: [
                ['@babel/plugin-proposal-private-methods', { loose: true }]
            ]
        }
    }
}
