<script setup>
import {useUserStore} from '@/stores/user'
import { useRouter } from 'vue-router'
import {ref} from 'vue' 
import {storeToRefs} from 'pinia'

const userStore = useUserStore()
const {user} = storeToRefs(userStore)
const router = useRouter()

const email = ref("")
const password = ref("")
const error = ref ("")

const handleLogin = async ()=> {
  error.value = ""
  try{ 
    await userStore.logIn(email.value, password.value)
    router.push('/todo')
  }
  catch(err) {
    error.value = "WRONG!!! Incorrect email or password"
    console.log (err)
  }
}

</script>
<template>
  <div>
    <p v-if="error">{{ error }}</p>
  </div>
    <div>
      <form @submit.prevent="handleLogin">
        <label for="email">Email:</label>
        <input type="text" id="email" v-model="email" required><br><br>
       
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="password" required><br><br>
  
        <button type="submit">Log in</button>
      </form>
  
      <div v-if="user">
         <h3>Hi {{ user.email }}!</h3>
         <router-link to="todo">Let's get started</router-link>
        <button @click="userStore.logout" type="button">Cerrar Sesión</button>
      </div>
    </div>
  </template>
  