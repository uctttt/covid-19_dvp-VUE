"use strict";
exports.__esModule = true;
const vue_router_1 = require("vue-router");
const HomeView = require("../views/HomeView.vue");
const CityView = require("../views/CityView.vue");

const routes = [{
        path: '/',
        name: 'home',
        component: HomeView["default"]
    },
    {
        path: '/city/:city',
        name: 'city',
        component: CityView["default"],
        props: true
    },
];
var router = (0, vue_router_1.createRouter)({
    history: (0, vue_router_1.createWebHistory)(process.env.BASE_URL),
    routes: routes
});
exports["default"] = router;