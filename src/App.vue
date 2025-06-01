<script setup>
import {useUserStore} from '@/stores/user'
import {ref} from 'vue' 
import {storeToRefs} from 'pinia'
import { useRouter } from 'vue-router'
import navbar from '@/components/navbar.vue'

const userStore = useUserStore()
const {user} = storeToRefs(userStore)

</script>

<template>
<navbar/>
   
<RouterView class="content"></RouterView>

</template>

<style scoped>
.content{
  margin-top: 100px;
}
</style>
