<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { computed, ref, onMounted } from 'vue'
import useNotyf from '/@src/composable/useNotyf'
import { useRouter, useRoute } from 'vue-router'
import { useApi } from '../../../composable/useApi'

// const route = useRoute()
const router = useRouter()
const notif = useNotyf()

const name = ref('')
const mac_code = ref('')
const serial_code = ref(null)
const home = ref(0)
const homes = ref([])


const isLoading = ref(false)
const api: any = useApi()

const { y } = useWindowScroll()

const isStuck = computed(() => {
	return y.value > 30
})


onMounted(async () => {
	try {
		isLoading.value = true
		const response = await api.get('/api/devices/homes')
		const { response_code, data, message } = (await response.data) || {}

		isLoading.value = false;
		if (response_code == 200) {
			homes.value = data


			//   code.value = data.activeDevice.codeId
			//   activeDate.value = data.activeDevice.activeDate
		}
	} catch (error) {
		console.log('error =>', error)
	}
})

const handleAddDevice = async (data: any) => {
	if (!isLoading.value) {
		isLoading.value = true
		try {
			const response = await api.post('/api/devices', {
				name: name.value,
				mac_code: mac_code.value,
				serial_code: serial_code.value,
				home: home.value
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

// const handleFileUpload = async () => {
//   // debugger;
//   console.log('selected file')

//   //   platformFile.value.files

//   if (!isLoading.value) {
//     isLoading.value = true
//     try {
//       const formData = new FormData()
//       formData.append('filePath', platformFile.value.files[0])
//       const response = await api.post('/api/file', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       })

//       const { response_code, data, message } = (await response.data) || {}

//       if (response_code == 422) {
//         notif.dismissAll()
//         notif.warning(message)
//       } else if (response_code == 200) {
//         deviceImg.value = data.path
//       }
//     } catch (error) {
//       console.log('error=>', error)
//     }
//     isLoading.value = false
//   }

//   //Upload to server
// }
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
							>Cancel</VButton>
							<VButton :loading="isLoading" type="submit" color="primary" raised>Add Device</VButton>
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
							<VField class="is-autocomplete-select">
								<label>Home</label>
								<VControl icon="feather:search">
									<Multiselect v-model="home" :options="homes" placeholder="Select Home" />
								</VControl>
							</VField>
						</div>
					</div>
					<div class="columns is-multiline">
						<div class="column is-12">
							<VField>
								<label>Name</label>
								<VControl icon="heroicons-solid:device-tablet">
									<input v-model="name" type="text" class="input" placeholder autocomplete="given-name" />
								</VControl>
							</VField>
						</div>
					</div>
					<div class="columns is-multiline">
						<div class="column is-12">
							<VField>
								<label>Mac Code</label>
								<VControl icon="iconoir:mac-os-window">
									<input v-model="mac_code" type="text" class="input" placeholder autocomplete="given-name" />
								</VControl>
							</VField>
						</div>
					</div>
					<div class="columns is-multiline">
						<div class="column is-12">
							<VField>
								<label>Serial Code</label>
								<VControl icon="fluent:number-symbol-24-filled">
									<input
										v-model="serial_code"
										type="text"
										class="input"
										placeholder
										autocomplete="given-name"
									/>
								</VControl>
							</VField>
						</div>
					</div>
					<!-- <div class="columns is-multiline">
            <div class="column is-12">
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
					</div>-->
				</div>
			</div>
		</div>
	</form>
</template>

<style lang="scss">
@import "../../../scss/abstracts/_mixins.scss";
@import "../../../scss/pages/generic/_forms.scss";
</style>
