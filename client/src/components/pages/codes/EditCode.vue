<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { computed, ref, onMounted } from 'vue'
import useNotyf from '/@src/composable/useNotyf'
import { useRouter, useRoute } from 'vue-router'
import { useApi } from '../../../composable/useApi'

const router = useRouter()
const route = useRoute()

const notif = useNotyf()

const isLoading = ref(false)




const device = ref(0)
const deviceOptions = ref([])

const code = ref('')
// const codeOptions = ref([])
const startDatetime = ref(new Date())
const endDatetime = ref(new Date())
const ownerName =  ref('');

const api: any = useApi()
onMounted(async () => {
  try {
    const response = await api.get('/api/devices/availables', {
      params: {
        id: route.params.id,
      },
    })
    const { response_code, data, message } = (await response.data) || {}
    if (response_code == 200) {
      deviceOptions.value = data.devices
      device.value = data.code.device_id
      code.value=  data.code.codename;
      startDatetime.value =  data.code.start_date_time;
      endDatetime.value =  data.code.end_date_time;
      ownerName.value = data.code.owner_name


    //   code.value = data.activeDevice.codeId
    //   activeDate.value = data.activeDevice.activeDate
    }
  } catch (error) {
    console.log('error =>', error)
  }
})

const { y } = useWindowScroll()

const isStuck = computed(() => {
  return y.value > 30
})

const handleEditDevice = async (data: any) => {
  if (!isLoading.value) {
    try {
      const response = await api.put(`/api/codes/${route.params.id}`, {
        codename: code.value,
        device_id : device.value,
        start_date_time: startDatetime.value,
        end_date_time: endDatetime.value,
        owner_name: ownerName.value
      })

      const { response_code, data, message } = (await response.data) || {}

      if (response_code == 422) {
        notif.dismissAll()
        notif.warning(message)
      } else if (response_code == 200) {
        notif.success('Activated Successfully')

        router.push({ name: 'dashboard' })
      }
    } catch (error) {
      console.log('error =>', error)
    }
    isLoading.value = false
  }
}
</script>

<template>
  <form class="form-layout" @submit.prevent="handleEditDevice">
    <div class="form-outer">
      <div :class="[isStuck && 'is-stuck']" class="form-header stuck-header">
        <div class="form-header-inner">
          <div class="left">
            <h3>Code</h3>
          </div>
          <div class="right">
            <div class="buttons">
              <VButton
                icon="lnir lnir-arrow-left rem-100"
                :to="{ name: 'dashboard' }"
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
            <h4>Info</h4>
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
                  <input
                    v-model="code"
                    type="text"
                    class="input"
                    placeholder=""
                    autocomplete="given-name"
                  />
                </VControl>
              </VField>

              <VField class="is-autocomplete-select">
                <label>Owner Name</label>


                <VControl icon="feather:search">
                  <input
                    v-model="ownerName"
                    type="text"
                    class="input"
                    placeholder=""
                    autocomplete="given-name"
                  />
                </VControl>
              </VField>

              <v-date-picker v-model="startDatetime" color="green" trim-weeks>
                <template #default="{ inputValue, inputEvents }">
                  <VField>
                    <label>Start Date</label>

                    <VControl>
                      <input
                        class="input"
                        :value="inputValue"
                        placeholder="Select Start Date"
                        v-on="inputEvents"
                      />
                    </VControl>
                  </VField>
                </template>
              </v-date-picker>

              <v-date-picker v-model="endDatetime" color="green" trim-weeks>
                <template #default="{ inputValue, inputEvents }">
                  <VField>
                    <label>End Date</label>

                    <VControl>
                      <input
                        class="input"
                        :value="inputValue"
                        placeholder="Select Start Date"
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
