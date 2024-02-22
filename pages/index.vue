<template>
    <div class="weather">
        <h2>Weather widget</h2>
        <WeatherForm @searchCity="searchCity"></WeatherForm>
        <WeatherWidgetList apiKey="f3d93f391eda36bd9ebba4f2e1d89576" :city="selectedCity" />
        <div class="switchBlock">
            <nuxt-link to="/calendar">Switch to calendar task</nuxt-link>
        </div>
    </div>
</template>
  
<script setup>
import WeatherWidgetList from "~/components/weather/WeatherWidgetList.vue";
const selectedCity = ref("")


const searchCity = (cityName) => {
    selectedCity.value = cityName
}

</script>
<style lang="scss" scoped>
.switchBlock {
    position: fixed;
    left: 55px;
    bottom: 85px;
}

.weather {
    padding: 25px 40px;
}
</style>