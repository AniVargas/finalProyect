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
      <div>
      <button @click="userStore.logout" type="button">Log out 👋</button>
      </div>
  </nav>
  <nav v-else>
      <p> Hello!! how are you?  </p>
      <div>
      <button><router-link class="botones" to="/">Log In</router-link> <br></button>
      <button><router-link class="botones" to="/register">Register</router-link></button>
      </div>
   </nav>

   <RouterView>
  </RouterView>

</template>

<style scoped>

nav{
  margin-bottom: 30px;
  display: flex;
  justify-content:space-between;
  align-content:center;
  border-bottom:5px solid black;
  color: black;
  font-family: monospace;
  font-weight: bolder;
  font-size: 20px;
  div{
    display: flex;
    
    
  }
  button{
    background-color: #43b5a0;
    padding-bottom: 10px;
    color: black;
    border: none;
    border-radius: 10px;
    width: 130px;
    font-family: monospace;
    font-weight: bold;
    font-size: 18px;
    margin: 10px;
    .botones{
      text-decoration: none;
      color: black;
      width: 110px;
    }

  }
  button:hover{
    width: 135px;
    font-size: 20px;
    background-color: #84d1c2;
  }
}



</style>
