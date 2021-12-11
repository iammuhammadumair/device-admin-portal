<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { computed, ref, onMounted } from 'vue'
import useNotyf from '/@src/composable/useNotyf'
import { useRouter, useRoute } from 'vue-router'
import { useApi } from '../../../composable/useApi'

const router = useRouter()

const notif = useNotyf()

const isLoading = ref(false)

const device = ref(0)
const deviceOptions = ref([])

const code = ref(0)
const codeOptions = ref([])
const activeDate = ref(new Date())

const api: any = useApi()
onMounted(async () => {
  try {
    const response = await api.get('/api/devices/availables')
    const { response_code, data, message } = (await response.data) || {}
    if (response_code == 200) {
      codeOptions.value = data.codes
      deviceOptions.value = data.devices
    }
  } catch (error) {
    console.log('error =>', error)
  }
})

const { y } = useWindowScroll()

const isStuck = computed(() => {
  return y.value > 30
})

const handleAddDevice = async (data: any) => {
  if (!isLoading.value) {
    try {
      const response = await api.post('/api/active-devices', {
        codeId: code.value,
        deviceId: device.value,
        activeDate: activeDate.value,
      })

      const { response_code, data, message } = (await response.data) || {}

      if (response_code == 422) {
        notif.dismissAll()
        notif.warning(message)
      } else if (response_code == 200) {
        notif.success('Activated Successfully')

        router.push({ name: 'activated-devices' })
      }
    } catch (error) {
      console.log('error =>', error)
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
            <h3>Device Activation</h3>
          </div>
          <div class="right">
            <div class="buttons">
              <VButton
                icon="lnir lnir-arrow-left rem-100"
                :to="{ name: 'activated-devices' }"
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
                Activate Device
              </VButton>
            </div>
          </div>
        </div>
      </div>
      <div class="form-body">
        <!--Fieldset-->
        <div class="form-fieldset">
          <div class="fieldset-heading">
            <h4>Activation Info</h4>
            <!-- <p>This helps us to know you</p> -->
          </div>

          <div class="columns is-multiline">
            <div class="column is-12">
              <VField class="is-autocomplete-select">
                <label>Device</label>

                <VControl icon="feather:search">
                  <Multiselect
                    v-model="device"
                    :options="deviceOptions"
                    placeholder="Select Device"
                    :searchable="true"
                  />
                </VControl>
              </VField>

              <VField class="is-autocomplete-select">
                <label>Code</label>

                <VControl icon="feather:search">
                  <Multiselect
                    v-model="code"
                    :options="codeOptions"
                    placeholder="Select Code"
                    :searchable="true"
                  />
                </VControl>
              </VField>

              <v-date-picker v-model="activeDate" color="green" trim-weeks>
                <template #default="{ inputValue, inputEvents }">
                  <VField>
                    <label>Activation Date</label>

                    <VControl>
                      <input
                        class="input"
                        :value="inputValue"
                        placeholder="Select Date"
                        v-on="inputEvents"
                      />
                    </VControl>
                  </VField>
                </template>
              </v-date-picker>
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
