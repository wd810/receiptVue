import { createRouter, createWebHistory } from "vue-router"
import Home from "./components/Home"
import Upload from "./components/Upload"

const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/upload-receipt",
        name: "upload",
        component: Upload
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;