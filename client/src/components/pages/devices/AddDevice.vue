<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { computed, ref } from 'vue'
import useNotyf from '/@src/composable/useNotyf'
import { useRouter, useRoute } from 'vue-router'
import { useApi } from '../../../composable/useApi'

const route = useRoute()
const router = useRouter()
const notif = useNotyf()

const name = ref('')
const deviceImg = ref('')
const platformFile = ref(null)

const isLoading = ref(false)
const api: any = useApi()

const { y } = useWindowScroll()

const isStuck = computed(() => {
  return y.value > 30
})

const handleAddDevice = async (data: any) => {
  if (!isLoading.value) {
    isLoading.value = true
    try {
      const response = await api.post('/api/devices', {
        name: name.value,
        deviceImg: deviceImg.value,
      })

      const { response_code, data, message } = (await response.data) || {}

      if (response_code == 422) {
        notif.dismissAll()
        notif.warning(message)
      } else if (response_code == 200) {
        notif.success('Device Added')

        router.push({ name: 'devices' })
      }
    } catch (error) {
      console.log('error')
    }
    isLoading.value = false
  }
}

const handleFileUpload = async () => {
  // debugger;
  console.log('selected file')

  //   platformFile.value.files

  if (!isLoading.value) {
    isLoading.value = true
    try {
      const formData = new FormData()
      formData.append('filePath', platformFile.value.files[0])
      const response = await api.post('/api/file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      const { response_code, data, message } = (await response.data) || {}

      if (response_code == 422) {
        notif.dismissAll()
        notif.warning(message)
      } else if (response_code == 200) {
        deviceImg.value = data.path
      }
    } catch (error) {
      console.log('error=>', error)
    }
    isLoading.value = false
  }

  //Upload to server
}
</script>

<template>
  <form class="form-layout" @submit.prevent="handleAddDevice">
    <div class="form-outer">
      <div :class="[isStuck && 'is-stuck']" class="form-header stuck-header">
        <div class="form-header-inner">
          <div class="left">
            <h3>Add New Device</h3>
          </div>
          <div class="right">
            <div class="buttons">
              <VButton
                icon="lnir lnir-arrow-left rem-100"
                :to="{ name: 'devices' }"
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
                Add Device
              </VButton>
            </div>
          </div>
        </div>
      </div>
      <div class="form-body">
        <!--Fieldset-->
        <div class="form-fieldset">
          <div class="fieldset-heading">
            <h4>Device Info</h4>
            <!-- <p>This helps us to know you</p> -->
          </div>

          <div class="columns is-multiline">
            <div class="column is-12">
              <VField>
                <label>Name</label>
                <VControl icon="feather:user">
                  <input
                    v-model="name"
                    type="text"
                    class="input"
                    placeholder=""
                    autocomplete="given-name"
                  />
                </VControl>
              </VField>
            </div>
          </div>
          <div class="columns is-multiline">
            <div class="column is-12">
              <!-- <VField>
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
              </VField> -->
              <VField grouped>
                <VControl>
                  <div class="file is-boxed">
                    <label class="file-label">
                      <input
                        ref="platformFile"
                        class="file-input"
                        type="file"
                        name="platformFile"
                        @change="handleFileUpload()"
                      />
                      <span class="file-cta">
                        <span class="file-icon">
                          <i class="fas fa-cloud-upload-alt"></i>
                        </span>
                        <span class="file-label"> Choose a file… </span>
                      </span>
                    </label>
                  </div>
                </VControl>
              </VField>

              <img v-if="deviceImg" :src="deviceImg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<style lang="scss">
@import '../../../scss/abstracts/_mixins.scss';
@import '../../../scss/pages/generic/_forms.scss';
</style>
