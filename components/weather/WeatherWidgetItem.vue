<template>
    <div v-if="currentCityData" class="item">
        <div class="item__date">{{ updateDay(currentCityData.dt) }}</div>
        <div class="item__icon">
            <WeatherIcon :name="currentCityData.weather[0].main" :temperature="currentCityData.main.temp"></WeatherIcon>
        </div>
        <div class="item__time">{{ updateTime(currentCityData.dt) }}</div>

        <div class="item__info">
            <div>
                <span>Feels like:</span>
                <span> {{ Math.round(currentCityData.main.feels_like) }}°C</span>
            </div>
            <div>
                <span>Temperature:</span>
                <span> {{ Math.round(currentCityData.main.temp) }}°C</span>
            </div>
            <div>
                <span> Wind speed:</span>
                <span> {{ Math.round(currentCityData.wind.speed) }} m/s</span>
            </div>
            <div>
                <span> Description:</span>
                <span>{{ currentCityData.weather[0].description }}</span>
            </div>
        </div>




    </div>
</template>

<script setup>
import WeatherIcon from './WeatherIcon.vue';
const props = defineProps({
    data: {
        type: Object,
        require: true
    }
})



const currentCityData = ref(props.data)
const monthNames = ref([
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]);
const updateDay = (ms) => {
    const date = new Date(ms * 1000)
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${day} ${monthNames.value[monthIndex]} ${year}`
}
const updateTime = (ms) => {
    const date = new Date(ms * 1000)
    return `${date.getHours()}: 00`
}
onMounted(() => {
    if (props?.data) {
        currentCityData.value = props.data
    }
})
</script>
<style lang="scss" scoped>
.item {

    &__date,
    &__time {
        display: flex;
        flex-direction: center;
        justify-content: center;
        align-items: center;
    }

    &__icon {
        width: 70%;
        margin: 0 auto;
    }

    &__info {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 15px;

        div {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
    }
}
</style>