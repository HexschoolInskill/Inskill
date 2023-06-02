<template>
    <div class="m-4">
        <video class="w-full" controls>
            <source :src="props.source">
        </video>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps(['source'])

console.log(props)
</script>