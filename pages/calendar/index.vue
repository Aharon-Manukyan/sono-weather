<template>
    <div>
        <client-only>
            <div class="main">
                <div class="main__events">
                    <h2 class="main__event--title">Events {{ store.events.length ? store.events.length : '' }}</h2>
                    <template v-if="store.events.length > 0">
                        <div v-for="(event, index) in store.events" :key="event.id" class="main__events--content row"
                            :class="{ 'checked': event.done }">
                            <CalendarEventItem :index="index" :eventItem="event" @deleteEvent="deleteEvent"
                                @showModal="showDescriptionModal" @checkedEvent="checkedEvent"></CalendarEventItem>
                        </div>
                    </template>
                    <template v-else>
                        <div>No events</div>
                    </template>
                </div>
                <div class="main__calendar">
                    <h2>Calendar</h2>
                    <VDatePicker v-model="date" :attributes="attrs" />
                </div>
            </div>
        </client-only>
    </div>
    <client-only>
        <CalendarModalCalendar :visible="isVisible" @closeModal="closeModal">
            <template #form>
                <h2>Add event</h2>
                <div>{{ selectedDateFormat }}</div>
                <div>
                    <input type="text" placeholder="Title" v-model="formData.title">
                </div>
                <div>
                    <textarea placeholder="Description" v-model="formData.description"></textarea>
                </div>
                <div class="action">
                    <button type="submit" @click="addEvent">Add</button>
                </div>
                <button @click="closeModal" class="close">
                    <img :src="closeSvg" alt="Close">
                </button>
            </template>
        </CalendarModalCalendar>
        <CalendarModalCalendar :visible="showDescription" @closeModal="closeModal">
            <template #form>
                <h2>Event info</h2>
                <div>{{ changeDateFormat(showDescriptionData.date) }}</div>
                <h3>{{ showDescriptionData.title }}</h3>
                <p>{{ showDescriptionData.description }}</p>
                <button @click="closeModal" class="close">
                    <img :src="closeSvg" alt="Close">
                </button>
            </template>
        </CalendarModalCalendar>
    </client-only>
    <div class="switchBlock">
        <nuxt-link to="/">Switch to weather task</nuxt-link>
    </div>
</template>
<script setup >
import { ref } from 'vue'
import { useEventsStore } from '~/stores/calendar'
import closeSvg from "~/assets/close.svg"
const store = useEventsStore()
const setDates = computed(() => {
    let s = new Set();
    store.events.forEach(event => {
        s.add(event.date)
    })
    return [...s]
})
const attrs = ref([
    {
        key: 'today',
        highlight: {
            color: 'green',
            fillMode: 'solid'
        },
        dates: setDates
    }
])
const date = ref()
const selectedDateFormat = computed(() => {
    return changeDateFormat(date.value)
})


const changeDateFormat = (date) => {
    if (date) {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        let newDate = new Date(date)
        const day = newDate.getDate();
        const monthIndex = newDate.getMonth();
        const year = newDate.getFullYear();
        return `${day}/${monthNames[monthIndex]}/${year}`
    }
}
const formData = ref({
    title: "",
    description: ""
})


const showDescription = ref(false)
const isVisible = ref(false)
const showDescriptionData = ref(null)

const showDescriptionModal = (id) => {
    let index = store.events.findIndex((event) => event.id == id)
    showDescriptionData.value = store.events[index]
    showDescription.value = true
}

const closeModal = () => {
    isVisible.value = false;
    showDescription.value = false
    showDescriptionData.value = null
    formData.value = {
        title: "",
        description: ""
    }
}



const addEvent = () => {
    store.addEvent({ ...formData.value, date: date.value })
    closeModal()
}
const deleteEvent = (id) => {
    store.deleteEvent(id)
}
const checkedEvent = (id) => {
    store.checkedEvent(id)
}


watch(date, (newValue) => {
    if (newValue) {
        console.log(newValue, "newValue")
        isVisible.value = true
    } else {
        isVisible.value = false;
    }
})

onMounted(() => {
})
</script>
<style lang="scss" scoped>
form {
    display: flex;
    flex-direction: column;
    gap: 15px;


}

.main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: calc(100% - 50px);
    padding: 0 25px;
    gap: 15px;

    &__events {
        width: 70%;
        padding: 25px 40px;



    }

    &__calendar {
        width: 30%;
        padding: 25px 40px;
        margin: 0 auto;
    }

}

.checked {
    text-decoration: line-through;
}

.close {
    position: absolute;
    right: 10px;
    top: 15px;
    border: none;
    background: unset;
    cursor: pointer;
    transition: 0.5s ease-in;

    &:hover {
        transform: rotate(270deg);
    }

    img {
        width: 20px;
    }
}

.switchBlock {
    position: fixed;
    left: 55px;
    bottom: 85px;
}
</style>