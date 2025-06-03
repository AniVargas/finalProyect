<script setup>
import {useUserStore} from '@/stores/user'
import {storeToRefs} from 'pinia'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const {user} = storeToRefs(userStore)
const router = useRouter()

const handleLogout = async ()=> {
  try{ 
    await userStore.logout()
    router.push('/')
  }
  catch(err) {
    console.log (err)
  }
}

</script>

<template>

  <nav v-if="user">
      <p class="pc"> Hello {{ user.email }}! </p>
      <p class="movil"> Hi {{ user.email }}! </p>
      <div>
      <button class="pc" @click="handleLogout" type="button">Log out 👋</button>
      <button class="movil" @click="handleLogout" type="button">Log out</button>
      </div>
  </nav>
  <nav v-else>
      <p class="movil">Hello!! </p>
      <p class="pc">Hello!! how are you?  </p>
      <div>
      <router-link class="botones" to="/">Log In</router-link>
      <router-link class="botones" to="/register">Register</router-link>
      </div>
   </nav>

</template>

<style scoped>

@media (max-width: 1400px){
  nav{
    display: flex;
    justify-content:space-between;
    align-content: center;
    border-bottom:5px solid black;
    color: black;
    font-family: monospace;
    font-weight: bolder;
    font-size: 18px;
  }
  p{
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
  }
  .movil{
    display: none;
  }
  div{
    display: flex;
  }
  .botones{
    display: flex;
    justify-content: center;
    background-color: #43b5a0;
    margin: 3px;
    width: 120px;
    border: 3px solid black;
    border-radius: 10px;
    text-decoration: none;
    color: black;
  }
  .botones:hover{
    width: 130px;
    font-size: 20px;
    background-color: #84d1c2;
    }
   button{
    display: flex;
    background-color: #43b5a0;
    padding: 3px;
    width: 130px;
    border: 3px solid black;
    border-radius: 10px;
    font-family: monospace;
    font-weight: bold;
    font-size: 18px;
    text-align: center;
    color: black;
  }
  button:hover{
    width: 135px;
    font-size: 20px;
    background-color: #84d1c2;
  }
}
@media (max-width: 600px){
  nav{
    font-size: 16px;
  }
  .pc{
    display: none;
  }
  .movil{
    display: block;
  }
  .botones{
    width: 80px;
    height: 30px;
  }
  .botones:hover{
    width: 85px;
    font-size: 18px;
  }
   button{
    width: 100px;
    font-size: 16px;
    margin-block-start: 0;
    margin-block-end: 0;
  }
  button:hover{
    width: 100px;
    font-size: 18px;
  }
}

</style>
