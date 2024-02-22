<template>
    <form>
        <input type="text" v-model="formInput" placeholder="Name of City">
        <button type="submit" @click.prevent="search">Search</button>
    </form>
</template>
<script setup>
const emits = defineEmits(["searchCity"])
const search = () => {
    emits("searchCity", formInput.value)
}
const formInput = ref()

</script>