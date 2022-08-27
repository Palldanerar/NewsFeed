import MyMain from "@/page/Main";
import {createRouter, createWebHistory} from "vue-router"
import PostPage from "@/page/PostPage";
import About from "@/page/About";

const routes = [
    {
        path: '/',
        component: MyMain
    },
    {
        path: '/post',
        component: PostPage
    },
    {
        path: '/about',
        component: About
    },

]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;