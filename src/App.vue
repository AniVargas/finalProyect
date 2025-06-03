<script setup>
import {useUserStore} from '@/stores/user'
import {storeToRefs} from 'pinia'
import navbar from '@/components/navbar.vue'

const userStore = useUserStore()
const {user} = storeToRefs(userStore)

</script>

<template>
<navbar/>
   
<RouterView ></RouterView>

</template>

<style scoped>
</style>
