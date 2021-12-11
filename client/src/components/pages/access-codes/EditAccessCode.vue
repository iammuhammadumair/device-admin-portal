<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { computed, ref, onMounted } from 'vue'
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

onMounted(async () => {
  if (!isLoading.value) {
    isLoading.value = true
    try {
      const response = await api.get(`/api/active-codes/${route.params.id}`)

      const { response_code, data, message } = (await response.data) || {}
      if (response_code == 200) {
        console.log('data =>', data)
        codename.value = data.codename
      }
    } catch (error) {
      console.log('error =>', error)
    }
    isLoading.value = false
  }
})

const handleAddDevice = async (data: any) => {
  if (!isLoading.value) {
    isLoading.value = true
    try {
      const response = await api.put(`/api/active-codes/${route.params.id}`, {
        codename: codename.value,
        // deviceImg: deviceImg.value,
      })

      const { response_code, data, message } = (await response.data) || {}
      if (response_code == 200) {
        notif.success('Code Updated')

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
            <h3>Update Code</h3>
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
                Update Code
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
