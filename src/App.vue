<script setup>
import {useUserStore} from '@/stores/user'
import {ref} from 'vue' 
import {storeToRefs} from 'pinia'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const {user} = storeToRefs(userStore)

</script>

<template>

  <nav v-if="user">
      <p> Hello {{ user.email }}!! </p>
      <button @click="userStore.logout" type="button">Log out 👋</button>
  </nav>
  <nav v-else>
      <p> Hello!! how are you?  </p>
      <button><router-link class="botones" to="/">Log In</router-link> <br></button>
      <button><router-link class="botones" to="/register">Register</router-link></button>
   </nav>

   <RouterView>
  </RouterView>

</template>

<style scoped>


nav{
  display: flex;
  justify-content:space-between;
  align-content:center;
  background-color: #7433ff;
  color: aliceblue;
  button{
    background-color: #401b91;
    color: aliceblue;
    border: none;
    border-radius: 10px;
    height: 50px;
    .botones{
      text-decoration: none;
      color: aliceblue;
    }

  }
}

</style>
