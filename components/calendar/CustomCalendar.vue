<template>
    <div class="calendar">
        <div class="header">
            <button @click="prevMonth" class="prevMonth">
                <svg stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" width="24" height="24"
                    class="vc-base-icon">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>
            <span>{{ currentMonth }}</span>
            <button @click="nextMonth" class="nextMonth">
                <svg stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" width="24" height="24"
                    class="vc-base-icon">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>
        </div>
        <table>
            <thead>
                <tr>
                    <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="week in calendar" :key="week">
                    <td v-for="day in week" :key="day" @click="selectDate(day)">{{ day }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
const props = defineProps({
    initialDate: {
        type: Date,
        default: () => new Date()
    },
})

const emits = defineEmits(["showModal"])

const currentDate = ref(new Date(props.initialDate));
const currentMonth = computed(() => currentDate.value.toLocaleString('default', { month: 'long', year: 'numeric' }));
const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const calendar = computed(() => {
    const firstDayOfMonth = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 0);
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay());
    const endDate = new Date(lastDayOfMonth);
    endDate.setDate(lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()));

    const calendar = [];
    let currentDay = new Date(startDate);

    while (currentDay <= endDate) {
        const week = [];
        for (let i = 0; i < 7; i++) {
            week.push(currentDay.getDate());
            currentDay.setDate(currentDay.getDate() + 1);
        }
        calendar.push(week);
    }

    return calendar;
});

const prevMonth = () => {
    currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1);
};

const nextMonth = () => {
    currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1);
};

const selectDate = () => {
    emits("showModal", currentDate.value)
};



</script>

<style scoped lang="scss">
.calendar {
    font-family: Arial, sans-serif;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    span {
        color: #0f172a;
        font-weight: 600;
        white-space: nowrap;
        padding: 0 8px;
        margin: 0;
        line-height: 30px;
        background: #efefef;
        font-size: 13.3px;
    }
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ddd;
    padding: 5px;
    text-align: center;
    cursor: pointer;
}

th {
    background-color: #f2f2f2;

}

.prevMonth,
.nextMonth {
    padding: 0;
    cursor: pointer;
}

.vs-base-icon {
    display: inline-block;
    stroke: currentColor;
    stroke-width: 2;
    fill: #64748b;
}
</style>
