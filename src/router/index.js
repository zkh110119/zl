import VueRouter from "vue-router"
import table from '@/components/table-comp'
import helloWorld from '@/components/hello-world'

const routes = [{
    path: '/',
    component: helloWorld
}, {
    path: '/table',
    component: table
}]

const router = new VueRouter({
    routes
});

export default router;