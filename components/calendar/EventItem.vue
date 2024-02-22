<template>
    <div class="row__start">
        <div>{{ index + 1 }}</div>
        <input type="checkbox" :checked="eventItem.done" @change="checkedEvent(eventItem.id)">
    </div>
    <div class="row__main">

        <div> {{ eventItem.title }}</div>
        <div>{{ changeDateFormat(eventItem.date) }}</div>
    </div>
    <div class="row__actions">
        <div @click="showDescriptionModal(eventItem.id)" class="viewMoreBlock">
            <img :src="viewMore" alt="View more">
            <span class="tooltiptextView">View More</span>
        </div>
        <div @click="deleteEvent(eventItem.id)" class="deleteBlock">
            <img :src="deleteSvg" alt="Delete">
            <span class="tooltiptextDelete">Delete</span>
        </div>
    </div>
</template>

<script setup>
import deleteSvg from "~/assets/delete.svg"
import viewMore from "~/assets/view-more.svg"
const props = defineProps({
    eventItem: {
        type: Object,
        required: true
    },
    index: {
        type: Number,
        required: true
    }
})

const emits = defineEmits(["deleteEvent", "showModal", "checkedEvent"])
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
const showDescriptionModal = (id) => {
    emits("showModal", id)
}

const deleteEvent = (id) => {
    emits("deleteEvent", id)
}
const checkedEvent = (id) => {
    emits("checkedEvent", id)
}
</script>
<style lang="scss">
.row {
    display: grid;
    grid-template-columns: 10% 60% 20%;
    grid-column-gap: 15px;
    align-items: center;
    justify-content: space-between;
    padding: 15px 0;
    border: 1px solid grey;
    border-radius: 5px;

    &__start {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: top;
        gap: 5px;
    }

    &__main {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    &__actions {
        display: flex;
        flex-direction: row;
        gap: 5px;
        position: relative;

        div {
            cursor: pointer;
        }

        img {
            width: 20px;
        }
    }
}

.tooltiptextView,
.tooltiptextDelete {
    visibility: hidden;
    width: 100px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;


    /* Position the tooltip */
    position: absolute;
    z-index: 1;
    top: 20px;
    left: 0px;
}

.viewMoreBlock:hover .tooltiptextView {
    visibility: visible;
}

.deleteBlock:hover .tooltiptextDelete {
    visibility: visible;
}
</style>