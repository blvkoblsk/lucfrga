// LUCFR.GA - NUXT.CONFIG.JS

const nodeExternals = require('webpack-node-externals');

const routes = [{
        name: 'index',
        path: 'index',
        component: 'pages/index.vue'
    },
    {
        name: 'about',
        path: 'about',
        component: 'pages/about.vue'
    },
];

module.exports = {
    router: {
        mode: 'history',
        // only add `router.base = '/<repository-name>/'` if `DEPLOY_ENV` is `GH_PAGES`
        base: process.env.DEPLOY_ENV === 'GH_PAGES' ? '/lucfrga/' : '/',
        routes: routes,
    },
    /*
     ** Headers of the page
     */
    head: {
        title: 'LUCFR.GA',
        meta: [{
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: 'Vuetify + Nuxt + Netlify'
            }
        ],
        link: [{
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico'
            },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
            }
        ]
    },
    plugins: ['~/plugins/vuetify.js'],
    css: [
        '~/assets/style/app.styl'
    ],
    // CUSTOM LOADING STATUS
    loading: {
        color: '#CCCCCC'
    },
    // BUILD PROCESS
    build: {
        // only add `router.base = '/<repository-name>/'` if `DEPLOY_ENV` is `GH_PAGES`
        publicPath: process.env.DEPLOY_ENV === 'GH_PAGES' ? 'https://github.com/blvkoblsk/lucfrga/' : '/_nuxt/',
        babel: {
            plugins: [
                ["transform-imports", {
                    "vuetify": {
                        "transform": "vuetify/es5/components/${member}",
                        "preventFullImport": true
                    }
                }]
            ]
        },
        vendor: [
            '~/plugins/vuetify.js'
        ],
        extractCSS: true,
        /*
         ** Run ESLint on save
         */
        extend(config, ctx) {
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
            if (ctx.isServer) {
                config.externals = [
                    nodeExternals({
                        whitelist: [/^vuetify/]
                    })
                ]
            }
        }
    }
};