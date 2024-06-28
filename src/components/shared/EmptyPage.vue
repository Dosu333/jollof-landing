<script lang="ts" setup>
const props = defineProps({
    messgae: String
})
</script>

<template>
    <div class="w-full flex flex-col items-center space-y-4">
        <img src="@/assets/images/Frame.svg" alt="empty" class="w-[300px]">
        <p v-if="props.messgae" class="md:text-[13px] text-[9px] text-[#ffffff]">{{ props.messgae }}</p>
        <p v-else class="md:text-[13px] text-[9px] text-[#ffffff]">oops...soon enough you’ll have enough data to display</p>
    </div>
</template>