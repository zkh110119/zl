import VueRouter from 'vue-router'
import table from '@/components/table-comp'
import helloWorld from '@/components/hello-world'
import dynamicBlock from '@/components/dynamic-block'

const routes = [{
  path: '/',
  name: 'helloWorld',
  component: helloWorld
}, {
  path: '/table',
  name: 'table',
  component: table
}, {
  path: '/block',
  name: 'dynamicBlock',
  component: dynamicBlock
}]

const router = new VueRouter({
  routes
});

export default router;