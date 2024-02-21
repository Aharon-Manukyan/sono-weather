<template>
  <div v-if="errorMessage" class="errorMessage">
    {{ city }} {{ errorMessage }}
  </div>
  <div v-else-if="isLoading">
    <Loading></Loading>
  </div>
  <div v-else-if="currentCityData?.list.length">
    <h2>Weather in {{ `${currentCityData.city.name}, ${currentCityData.city.country}` }}</h2>
    <div class="widgetList">


      <WeatherWidgetItem class="widgetList__item" v-for="data in currentCityData.list" :key="data.dt" :data="data">
      </WeatherWidgetItem>
    </div>
  </div>
  <div v-else class="noResult">
    No results
  </div>
</template>
  
<script setup>
import Loading from "./Loading.vue"

const props = defineProps({
  apiKey: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true,
  }
})
const currentCityData = ref()
const isLoading = ref(false)
const errorMessage = ref(null)
const getWeatherData = async () => {
  if (props?.city) {
    isLoading.value = true
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${props.city}&appid=${props.apiKey}&units=metric&cnt=15`).then((data) => {
      return data.json()
    }).then((response) => {
      if (response.cod == 200) {
        currentCityData.value = response
        errorMessage.value = null
      } else {
        currentCityData.value = null
        errorMessage.value = response.message
      }
    }).catch((err) => {
      errorMessage.value = "Error message"
    }).finally(() => {
      isLoading.value = false
    })
  }

}
watch(() => props.city, () => {
  getWeatherData()
})
onMounted(() => {
  getWeatherData()
})


</script>

<style lang="scss" scoped>
.widgetList {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 15px;
  overflow-x: auto;

  &__item {
    display: flex;
    flex-direction: column;
    gap: 15px;
    border: 1px solid orange;
    border-radius: 15px;
    padding: 15px;
    max-width: 200px;
    min-width: 200px;
  }
}

.noResult,
.errorMessage {
  padding: 15px;
}

.errorMessage {
  color: red
}
</style>
  