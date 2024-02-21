<template>
    <div>
        <select v-model="selected">
            <option v-for="city in cities" :key="city.id" :name="city.id">{{ city.name }}</option>
        </select>
    </div>
</template>
<script setup>
import { watch } from "vue";

const props = defineProps({
    selectedCity: {
        type: String,
        required: true
    },
    cities: {
        type: Object,
        required: true
    }
})
const emits = defineEmits(["update:selectedCity"]);
const selected = ref(props.selectedCity)
watch(selected, (newValue) => {
    emits("update:selectedCity", newValue)
})

</script>

<style lang="scss" scoped></style>