<template>
    <div v-if="name === 'Clouds'">
        <template v-if="temperature > 0">
            <img :src="CloudyDay2" alt="Cloudy...">
        </template>
        <template v-else>
            <img :src="CloudyDay3" alt="Cloudy...">
        </template>
    </div>
    <div v-else-if="name === 'Rain'">
        <template v-if="temperature > 0">
            <img :src="Rainy1" alt="Rainy...">
        </template>
        <template v-else>
            <img :src="Rainy5" alt="Rainy...">
        </template>
    </div>
    <div v-else-if="name === 'Snow'">
        <template v-if="temperature > 0">
            <img :src="Snowy1" alt="Snow...">
        </template>
        <template v-else>
            <img :src="Snowy5" alt="Snow...">
        </template>
    </div>
    <div v-else-if="name === 'Sun'">
        <img :src="WeatherSunset" alt="Sun...">
    </div>
    <div v-else-if="name === 'Clear'">
        <template v-if="temperature > 0">
            <img :src="CloudyDay1" alt="Clear...">
        </template>
        <template v-else>
            <img :src="Clear" alt="Clear...">
        </template>
    </div>
</template>

<script setup>

import CloudyDay1 from "~/assets/cloudy-day-1.svg"
import CloudyDay2 from "~/assets/cloudy-day-2.svg"
import CloudyDay3 from "~/assets/cloudy-day-2.svg"

import Clear from "~/assets/cloudy.svg"
import Rainy1 from "~/assets/rainy-1.svg"

import Rainy5 from "~/assets/rainy-5.svg"

import Snowy1 from "~/assets/snowy-1.svg"

import Snowy5 from "~/assets/snowy-5.svg"


const props = defineProps({
    name: {
        type: String,
        required: true
    },
    temperature: {
        type: Number,
        required: true
    }
})
</script>

<style lang="scss" scoped>
div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    img {
        width: 125px;
        height: 125px;
    }
}
</style>