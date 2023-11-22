<template>
  <VContainer>
    <VRow class="align-strech">
      <VCol class="assessment-total">
        <VCard>
          <VCardText>
            <VRow>
              <VCol class="assessment-total__all-summary">
                <span class="text-h4">Total Assessment</span>
                <span>Total Assessment in 2022</span>
                <span>45</span>
              </VCol>
              <VCol class="assessment-total__detail">
                <div class="assessment-total__detail__card">
                  <VRow>
                    <VCol v-for="(item, idx) in listAssessmentDetail" :key="idx" cols="4">
                      <div class="detail__info-card d-flex align-center">
                        <div class="detail__info-card__left">
                          <VAvatar rounded size="34" :color="item.color" variant="tonal">
                            <VIcon :icon="item.icon" />
                          </VAvatar>
                        </div>
                        <div class="d-flex flex-column detail__info-card__right">
                          <span class="detail__info-card__right__title">{{ item.title }}</span>
                          <span><span class="detail__info-card__right__count">{{ item.count }}</span> assessment</span>
                          <span class="detail__info-card__right__progress">
                            <VProgressLinear model-value="100" :bg-color="item.color" :color="item.color" />

                          </span>
                        </div>
                      </div>
                    </VCol>
                  </VRow>
                </div>
              </VCol>
            </VRow>
          </VCardText>

        </VCard>
      </VCol>
      <VCol class="assessment-creation">
        <VCard>
          <VCardText class="card d-flex flex-column align-center">
            <div class="text-h5">Add New Assessement</div>
            <VBtn color="primary" variant="tonal">
              <VIcon start icon="tabler-upload" /> Document Upload
            </VBtn>
            <VBtn color="primary" variant="tonal">
              <VIcon start icon="tabler-clipboard" /> Create Document
            </VBtn>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <VRow class="list-category-card align-stretch">
      <VCol cols="3" v-for="item in listCategoryCard" :key="item.title">
        <CardFraCategory :title="item.title" :description="item.description" :color-theme="item.color"
          style="height: 100%;" />
      </VCol>
    </VRow>

    <VRow class="list-top-card align-stretch">
      <VCol cols="4" v-for="item in computedListTop" :key="item.title">
        <CardFraTopList :title="item.title" :subtitle="item.subtitle" :list="item.list" style="height: 100%;" />
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup>
import CardFraCategory from '@/components/CardFraCategory.vue';
import CardFraTopList from '@/components/CardFraToplist.vue';
import config from '@/config/category';
import { computed } from 'vue';



const listAssessmentDetail = [
  {
    color: 'success',
    title: 'Release',
    icon: 'tabler-check',
    count: 23,
  },
  {
    color: 'error',
    title: 'Reject',
    icon: 'tabler-x',
    count: 5,
  },
  {
    color: 'info',
    title: 'Assessment',
    icon: 'tabler-file-invoice',
    count: 28,
  },
]

const listCategoryCard = [
  {
    color: config.colors.communication,
    title: 'Communication',
    description: 'Dokumen FRA terkait Layanan jasa teleponi.',
  },
  {
    color: config.colors.datacomm,
    title: 'Datacomm',
    description: 'Dokumen FRA terkait produk untuk memenuhi komunikasi data antara nodes jaringan.',
  },
  {
    color: config.colors.wireless,
    title: 'Wireless',
    description: 'Dokumen FRA terkait produk untuk memenuhi komunikasi data antara nodes jaringan.',
  },
  {
    color: config.colors.internet,
    title: 'Internet',
    description: 'Dokumen FRA terkait Layanan internet.',
  },
]

const listTop = [
  {
    title: 'Recently Viewed',
    subtitle: '5 Top Assassment Document Viewed',
    type: 'category',
    list: [
      {
        title: 'Dokumen FRA_SD Wan Fortinet_2023',
        category: 'Communication',
      },
      {
        title: 'Dokumen FRA_SD Wan Fortinet_2023',
        category: 'Datacomm',
      },
      {
        title: 'Dokumen FRA_SD Wan Fortinet_2023',
        category: 'Wireless',
      },
      {
        title: 'Dokumen FRA_SD Wan Fortinet_2023',
        category: 'Internet',
      },
      {
        title: 'Dokumen FRA_SD Wan Fortinet_2023',
        category: 'Datacomm',
      },
    ]
  },
  {
    title: 'Top Search',
    subtitle: '5 Top Assassment Document Searched',
    type: 'category',
    list: [
      {
        title: 'Dokumen FRA_SD Wan Fortinet_2023',
        category: 'Datacomm',
      },
      {
        title: 'Dokumen FRA_SD Wan Fortinet_2023',
        category: 'Wireless',
      },
      {
        title: 'Dokumen FRA_SD Wan Fortinet_2023',
        category: 'Internet',
      },
      {
        title: 'Dokumen FRA_SD Wan Fortinet_2023',
        category: 'Datacomm',
      },
      {
        title: 'Dokumen FRA_SD Wan Fortinet_2023',
        category: 'Communication',
      },
      {
        title: 'Dokumen FRA_SD Wan Fortinet_2023',
        category: 'Datacomm',
      },
      {
        title: 'Dokumen FRA_SD Wan Fortinet_2023',
        category: 'Wireless',
      },
      {
        title: 'Dokumen FRA_SD Wan Fortinet_2023',
        category: 'Internet',
      },
      {
        title: 'Dokumen FRA_SD Wan Fortinet_2023',
        category: 'Datacomm',
      },
    ]
  },
  {
    title: 'User Active in a Month',
    subtitle: '10 Top Active User',
    type: 'user',
    list: [
      {
        username: '999999',
        name: 'John Doe'
      },
      {
        username: '999999',
        name: 'John Doe'
      },
      {
        username: '999999',
        name: 'John Doe'
      },
      {
        username: '999999',
        name: 'John Doe'
      },
      {
        username: '999999',
        name: 'John Doe'
      },
      {
        username: '999999',
        name: 'John Doe'
      },
      {
        username: '999999',
        name: 'John Doe'
      },
    ]
  },
]

const computedListTop = computed(() => {
  return listTop.map(item => {
    let list
    if (item.type === 'category') {
      list = item.list.map(listItem => {
        return {
          title: `<div class="truncate">${listItem.title}</div>`,
          subtitle: `<span class="text-${config.colors[listItem.category.toLowerCase()]}">${listItem.category}</span>`
        }
      })
    } else if (item.type === 'user') {
      list = item.list.map(listItem => {
        return {
          title: `<span class="text-primary"> ${listItem.username} </span> ${listItem.name}`
        }
      })
    } else {
      list = item.list
    }
    return { ...item, list }
  })
})
</script>

<style lang="scss" scoped>
.assessment-total {
  &__all-summary {
    max-width: 25%;
    display: flex;
    flex-direction: column;
    gap: 2px;
    align-items: center;

    &>* {
      text-align: center;
    }

    &>span:nth-child(2) {
      color: rgb(var(--v-theme-secondary));
      font-size: 0.7rem;
    }

    &>span:nth-child(3) {
      font-weight: 700;
      font-size: 2rem;
    }
  }

  &__detail__card {
    border-radius: 6px;
    border: 1px solid #EAEAEA;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 20px;
  }

  .detail__info-card {
    gap: 10px;

    &__right {
      gap: 6px;

      &__title {
        font-weight: 500;
      }

      &__count {
        font-weight: 500;
      }

      &__progress>* {
        height: 6px !important;
      }
    }
  }
}

.assessment-creation {
  max-width: 300px;

  .card {
    gap: 8px;

    &>*:first-child {
      align-self: flex-start;

    }
  }
}

.list-category-card {
  height: 250px;
}

.list-top-card {
  height: 400px;
}
</style>
