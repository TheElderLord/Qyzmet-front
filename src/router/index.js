import { createRouter,createWebHistory } from 'vue-router'
import Main from '../views/Main.vue';
import Subcategory from '../views/Subcategory.vue';
import CreatePost from '../views/CreatePost.vue';
import Subindicators from '../views/Subindicators.vue';


const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/Login.vue'),
          },
          {
            path: '/register',
            name: 'register',
            component: () => import('../views/Register.vue'),
          },
        {
            path:'/',
            component:Main,
            // meta: {
            //     requiresAuth: true,
            //   },
           
        },
        {
            path:'/indicators',
            component:()=>import('../views/Indicators.vue'),
            // meta: {
            //     requiresAuth: true,
            //   },
            
        },
        {
            path: '/indicators/:id',
            name: 'subindicators',
            component:Subindicators ,
            props: true,
            // meta: {
            //     requiresAuth: true,
            //   },
        },
    
        {
            path:'/monitoring',
            component:()=>import('../views/Monitoring.vue'),
            // meta: {
            //     requiresAuth: true,
            //   },
        },
        {
            path:'/download',
            component:()=>import('../views/Download.vue'),
            // meta: {
            //     requiresAuth: true,
            //   },
        },
        {
            path: '/categories/:categoryId',
            name: 'subcategories',
            component: Subcategory,
            props: true,
            // meta: {
            //     requiresAuth: true,
            //   },
        },
        {
            path: '/categories/:categoryId/:subcategoryId',
            name: 'createpost',
            component: CreatePost,
            props: true,
            // meta: {
            //     requiresAuth: true,
            //   },
        },
       

    ]

})
// router.beforeEach(async (to, from, next) => {
//     if (to.matched.some((record) => record.meta.requiresAuth)) {
//       const token = localStorage.getItem('token');
//       if (token) {
//         next();
//       } else {
//         next('/');
//       }
//     } else {
//       next();
//     }
//   });

export default router;