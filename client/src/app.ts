import {
  createApp as createClientApp,
  h,
  VNode,
  resolveDynamicComponent,
  Transition,
  App,
  onMounted,
} from 'vue'
import { RouterView  } from 'vue-router'
import { useRoute } from 'vue-router'

import { createHead } from '@vueuse/head'
import { createPinia } from 'pinia'
import { createI18n } from './i18n'
import { createRouter  } from './router'

import { useUserSession } from '/@src/stores/userSession'
import { provideApi, useApi } from '/@src/composable/useApi'
import useNotyf from '/@src/composable/useNotyf'
// import Vuelidate from "@vuelidate/core";

import VReloadPrompt from './components/base/modal/VReloadPrompt.vue'
// import Vuelidate from 'vuelidate'


type VueroAppOptions = {
  enhanceApp?: (app: App) => Promise<void>
}

export async function createApp({ enhanceApp }: VueroAppOptions) {
  const head = createHead()
  const i18n = createI18n()
  const router = createRouter()
  const pinia = createPinia()

  const app = createClientApp({
    // inject: ['api'],

    // This is the global app setup function
    setup() {
      /**
       * We provide user state and api to our entire app
       * We can then inject them later in any component
       *
       * @see /@src/composable/useApi
       */
    //   provideApi()
        const api = provideApi()

      /**
       * Here you can check if your user has a token stored
       * and check with your api if it still valid before your app start
       */

      onMounted(async () => {
        const userSession = useUserSession()
     
        //   const api = useApi()
        if (userSession.isLoggedIn) {
            //do something
          try {

            // do api request call to retreive its profile
            const {data } = await api.get('/api/settings/profile')
            if(data.response_code == 200){
                userSession.setUser(data.data)
            }
            
          } catch (err) {
              console.log('error =>' , err);
          }
        } else {
          // delete stored token if it fails
          userSession.logoutUser()
          // redirect the user somewhere
        //   route.
        const route = useRoute();
        
         const isGuestRoute =  ['/login' , '/signup' , '/forgot-password' , '/reset-password'].includes(route.path);
         console.log('isGuestRoute' , isGuestRoute);
         
         if(!isGuestRoute){
             router.replace('/login')
         }
        }
      })

      /**
       * Here we are creating a render function for our router view with
       * a Transition for the inner component
       * Template equivalent would be:
       *
       * <template>
       *   <RouterView v-slot="{ Component }">
       *     <transition name="fade-slow" mode="out-in">
       *       <component :is="Component" />
       *     </transition>
       *   </RouterView>
       *   <VReloadPrompt app-name="Vuero" />
       * </template>
       */
      return () => {
        const defaultSlot = ({ Component: _Component }: any) => {
          const Component = resolveDynamicComponent(_Component) as VNode

          return [
            h(
              Transition,
              { name: 'fade-slow', mode: 'out-in' },
              {
                default: () => [h(Component)],
              }
            ),
          ]
        }

        return [
          h(RouterView, null, {
            default: defaultSlot,
          }),
          h(VReloadPrompt, { appName: 'Vuero' }),
        ]
      }
    },
  })

  /**
   * Here we are setting up router navigation guards
   *
   * We can add meta to pages either by declaring them manualy in the
   * routes declaration (see /@src/router.ts)
   * or by adding a <route> tag into .vue files (see /@src/pages/sidebar/dashboards.ts)
   *
   * <route lang="yaml">
   * meta:
   *   requiresAuth: true
   * </route>
   *
   * <script setup lang="ts">
   *  // TS script
   * </script>
   *
   * <template>
   *  // HTML content
   * </template>
   */
  router.beforeEach((to, from) => {
    const userSession = useUserSession()

    if (to.meta.requiresAuth && !userSession.isLoggedIn) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      const notif = useNotyf()
      notif.error({
        message:
          'Sorry, you should loggin to access this section (anything will work)',
        duration: 7000,
      })

      return {
        // Will follow the redirection set in /@src/pages/auth/index.vue
        name: 'auth',
        // save the location we were at to come back later
        query: { redirect: to.fullPath },
      }
    }
  })

  app.use(head)
  app.use(router)
  app.use(i18n)
  app.use(pinia)
  //   app.use(Vuex)

  if (enhanceApp) {
    await enhanceApp(app)
  }

  return {
    app,
    router,
    head,
    i18n,
  }
}
