<template>
  <VContainer>
    <VRow>
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
                          <VAvatar
                            rounded
                            size="34"
                            :color="item.color"
                            variant="tonal"
                          >
                            <VIcon :icon="item.icon" />
                          </VAvatar>
                        </div>
                        <div class="d-flex flex-column detail__info-card__right">
                          <span class="detail__info-card__right__title">{{ item.title }}</span>
                          <span><span class="detail__info-card__right__count">{{ item.count }}</span> assessment</span>
                          <span class="detail__info-card__right__progress">
                            <VProgressLinear
                              model-value="100"
                              :bg-color="item.color"
                              :color="item.color"
                            />

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
          <VCardText class="d-flex flex-column align-center">
            <div>Add New Assessement</div>
            <VBtn color="primary" variant="tonal">
              <VIcon
                start
                icon="tabler-upload"
              /> Document Upload
            </VBtn>
            <VBtn color="primary" variant="tonal">
              <VIcon
                start
                icon="tabler-clipboard"
              /> Create Document
            </VBtn>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup>
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
</script>

<style lang="scss" scoped>
.assessment-total {
  &__all-summary {
    max-width: 25%;
    display: flex;
    flex-direction: column;
    gap: 2px;
    align-items: center;
    & > * {
      text-align: center;
    }
    & > span:nth-child(2) {
      color: rgb(var(--v-theme-secondary));
      font-size: 0.7rem;
    }
    & > span:nth-child(3) {
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

      &__progress > * {
        height: 6px !important;
      }
    }
  }
}
.assessment-creation {
  max-width: 300px;
}
</style>
