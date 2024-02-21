<template>
    <div>
        <WeatherForm @searchCity="searchCity"></WeatherForm>
        <WeatherWidgetList apiKey="f3d93f391eda36bd9ebba4f2e1d89576" :city="selectedCity" />
    </div>
</template>
  
<script setup>
import WeatherWidgetList from "../components/WeatherWidgetList.vue";
const selectedCity = ref("")


const searchCity = (cityName) => {
    selectedCity.value = cityName
}

</script>
  