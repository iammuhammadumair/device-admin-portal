<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'

import { useViaPlaceholderError } from '/@src/composable/useViaPlaceholderError'
import { useApi } from '../../../composable/useApi'

const filters = ref('')

const isLoading = ref(false)
const devices = ref([])
const api: any = useApi()

// const filteredData = computed(() => {
//   console.log('filters=>', filters)

//   if (!filters.value) {
//     return offers
//   } else {
//     console.log('offers =>', offers)

//     return offers.filter((item) => {
//       return (
//         item.logo.match(new RegExp(filters.value, 'i')) ||
//         item.title.match(new RegExp(filters.value, 'i')) ||
//         item.location.match(new RegExp(filters.value, 'i')) ||
//         item.duration.match(new RegExp(filters.value, 'i')) ||
//         item.requirements.match(new RegExp(filters.value, 'i'))
//       )
//     })
//   }
// })

onMounted(async () => {
  if (!isLoading.value) {
    isLoading.value = true
    try {
      const response = await api.get('/api/active-devices')

      const { response_code, data, message } = (await response.data) || {}
      if (response_code == 200) {
        devices.value = data
        console.log('devices =>', devices.value)
      }
    } catch (error) {
      console.log('error')
    }
    isLoading.value = false
  }
})
</script>

<template>
  <div>
    <div class="list-view-toolbar">
      <!-- <VControl icon="feather:search">
        <input
          v-model="filters"
          class="input custom-text-filter"
          placeholder="Search..."
          data-filter-target=".list-view-item"
        />
        <div class="form-icon">
          <i aria-hidden="true" class="iconify" data-icon="feather:search"></i>
        </div>
      </VControl> -->
      <div class="ml-auto">
        <VButton
          color="primary"
          outlined
          raised
          :to="{ name: 'activated-devices-create' }"
        >
          Activate Device
        </VButton>
      </div>
    </div>

    <div class="page-content-inner">
      <!--List-->
      <div class="list-view list-view-v3">
        <!--List Empty Search Placeholder -->
        <VPlaceholderPage
          :class="[devices.length !== 0 && 'is-hidden']"
          title="We couldn't find any matching results."
          subtitle="Too bad. Looks like we couldn't find any matching results for the
          search terms you've entered. Please try different search terms or
          criteria."
          larger
        >
          <template #image>
            <img
              class="light-image"
              src="/@src/assets/illustrations/placeholders/search-3.svg"
              alt=""
            />
            <img
              class="dark-image"
              src="/@src/assets/illustrations/placeholders/search-3-dark.svg"
              alt=""
            />
          </template>
        </VPlaceholderPage>

        <div class="list-view-inner">
          <transition-group name="list-complete" tag="div">
            <!--Item-->
            <div v-for="item in devices" :key="item.id" class="list-view-item">
              <div class="list-view-item-inner">
                <img
                  class="avatar"
                  :src="item.device.deviceImg"
                  alt=""
                  @error.once="
                    (event) => useViaPlaceholderError(event, '150x150')
                  "
                />
                <div class="meta-left">
                  <h3>
                    {{ item.device.name }}
                  </h3>
                  <span>
                    <!-- <i
                        aria-hidden="true"
                        class="iconify"
                        data-icon="feather:map-pin"
                      ></i>
                      <span>{{ item.location }}</span>
                      <i
                        aria-hidden="true"
                        class="fas fa-circle icon-separator"
                      ></i> -->
                    <i
                      aria-hidden="true"
                      class="iconify"
                      data-icon="feather:clock"
                    ></i>
                    <span>{{ item.activeDate }}</span>
                    <i
                      aria-hidden="true"
                      class="fas fa-circle icon-separator"
                    ></i>
                    <i
                      aria-hidden="true"
                      class="iconify"
                      data-icon="feather:check-circle"
                    ></i>
                    <span>{{ item.code.codename }}</span>
                  </span>
                </div>
                <div class="meta-right">
                  <div class="buttons">
                    <VIconButton
                      :to="{
                        name: 'activated-devices-edit-id',
                        params: { id: item.id },
                      }"
                      icon="feather:edit"
                      class="button is-link"
                    />
                    <!-- <VIconButton
                        icon="feather:x-square"
                        class="button is-danger"
                      /> -->
                  </div>
                </div>
              </div>
            </div>
          </transition-group>
        </div>

        <!-- <VFlexPagination
            v-if="devices.length > 10"
            :item-per-page="10"
            :total-items="devices.length"
            :current-page="1"
            :max-links-displayed="7"
          /> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../../scss/abstracts/_mixins.scss';

.list-view-v3 {
  .list-view-item {
    @include vuero-r-card();

    margin-bottom: 16px;
    padding: 16px;

    .list-view-item-inner {
      display: flex;
      align-items: center;

      > img {
        width: 100%;
        max-width: 60px;
        min-width: 60px;
        max-height: 60px;
        min-height: 60px;
        border-radius: var(--radius-rounded);
        border: 1px solid var(--fade-grey);
      }

      .meta-left {
        margin-left: 16px;

        h3 {
          font-family: var(--font-alt);
          color: var(--dark-text);
          font-weight: 500;
          font-size: 1.1rem;
          line-height: 1;
        }

        > span:not(.tag) {
          font-size: 0.9rem;
          color: var(--light-text);

          svg {
            position: relative;
            top: 1px;
            height: 12px;
            width: 12px;
          }

          .icon-separator {
            position: relative;
            top: -3px;
            font-size: 5px;
            color: var(--light-text);
            padding: 0 8px;
          }

          .iconify {
            margin-right: 0.25rem;
          }
        }
      }

      .meta-right {
        margin-left: auto;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .buttons {
          margin-bottom: 0;
          margin-right: 10px;
        }
      }
    }
  }
}

.is-dark {
  .list-view-v3 {
    .list-view-item {
      @include vuero-card--dark();

      .list-view-item-inner {
        > img {
          border-color: var(--dark-sidebar-light-12);
        }

        .meta-left {
          h3 {
            color: var(--dark-dark-text) !important;
          }
        }

        .meta-right {
          .buttons {
            .button {
              &:nth-child(2) {
                background: var(--dark-sidebar-light-2);
                border-color: var(--dark-sidebar-light-8);
                color: var(--dark-dark-text);
                transition: all 0.3s;

                &:hover {
                  border-color: var(--primary);
                  color: var(--primary);
                }
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 767px) {
  .list-view-v3 {
    .list-view-item {
      position: relative;
      padding: 20px;

      .list-view-item-inner {
        flex-direction: column;

        > img {
          margin-bottom: 1rem;
        }

        .meta-left {
          margin-left: 0;

          h3 {
            text-align: center;
            margin-bottom: 6px;
          }

          > span {
            margin-bottom: 16px;
          }

          .icon-list {
            flex-wrap: wrap;

            > span {
              flex-direction: column;
              text-align: center;
              margin: 10px;
              width: calc(33.3% - 20px);

              i {
                margin: 0;
              }
            }
          }
        }

        .meta-right {
          margin: 16px 0 0 0;
          width: 100%;

          .buttons {
            margin: 0;
            width: 100%;
            display: flex;
            justify-content: space-between;

            .button {
              width: 100%;
              margin: 10px 0;

              &:first-child {
                width: 100%;
                max-width: 240px;
                margin: 10px auto;
              }

              &:nth-child(2) {
                position: absolute;
                top: 10px;
                right: 10px;
                max-width: 35px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
