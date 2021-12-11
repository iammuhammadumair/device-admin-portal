<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { computed, ref } from 'vue'
import useNotyf from '/@src/composable/useNotyf'
import { useRouter, useRoute } from 'vue-router'
import { useApi } from '../../../composable/useApi'

const route = useRoute()
const router = useRouter()

const notif = useNotyf()

const codename = ref('')
// const deviceImg = ref('')

const isLoading = ref(false)

const { y } = useWindowScroll()

const isStuck = computed(() => {
  return y.value > 30
})

const api: any = useApi()

const handleAddDevice = async (data: any) => {
  if (!isLoading.value) {
    isLoading.value = true
    try {
      const response = await api.post('/api/active-codes', {
        codename: codename.value,
        // deviceImg: deviceImg.value,
      })

      const { response_code, data, message } = (await response.data) || {}

      if (response_code == 422) {
        notif.dismissAll()
        notif.warning(message)
      } else if (response_code == 200) {
        notif.success('Code Added')

        router.push({ name: 'access-codes' })
      }
    } catch (error) {
      console.log('error')
    }
    isLoading.value = false
  }
}
</script>

<template>
  <form class="form-layout" @submit.prevent="handleAddDevice">
    <div class="form-outer">
      <div :class="[isStuck && 'is-stuck']" class="form-header stuck-header">
        <div class="form-header-inner">
          <div class="left">
            <h3>Add New Code</h3>
          </div>
          <div class="right">
            <div class="buttons">
              <VButton
                icon="lnir lnir-arrow-left rem-100"
                :to="{ name: 'access-codes' }"
                light
                dark-outlined
              >
                Cancel
              </VButton>
              <VButton
                :loading="isLoading"
                type="submit"
                color="primary"
                raised
              >
                Add Code
              </VButton>
            </div>
          </div>
        </div>
      </div>
      <div class="form-body">
        <!--Fieldset-->
        <div class="form-fieldset">
          <div class="fieldset-heading">
            <h4>Code Info</h4>
            <!-- <p>This helps us to know you</p> -->
          </div>

          <div class="columns is-multiline">
            <div class="column is-12">
              <VField>
                <label>Name</label>
                <VControl icon="feather:user">
                  <input
                    v-model="codename"
                    type="text"
                    class="input"
                    placeholder=""
                    autocomplete="given-name"
                  />
                </VControl>
              </VField>
            </div>
          </div>
          <!-- <div class="columns is-multiline">
            <div class="column is-12">
              <VField>
                <label>Name</label>
                <VControl icon="feather:user">
                  <input
                    v-model="deviceImg"
                    type="text"
                    class="input"
                    placeholder=""
                    autocomplete="given-name"
                  />
                </VControl>
              </VField>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </form>
</template>

<style lang="scss">
@import '../../../scss/abstracts/_mixins.scss';
@import '../../../scss/pages/generic/_forms.scss';
</style>
