<script setup>
import {useUserStore} from '@/stores/user'
import {ref} from 'vue' 
import {storeToRefs} from 'pinia'

const userStore = useUserStore()
const {user} = storeToRefs(userStore)

const email = ref("")
const name = ref("")
const password = ref("")


</script>
<template>
    <div>
      <form @submit.prevent>
        <label for="email">Email:</label>
        <input type="text" id="email" v-model="email" required><br><br>
       
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="password" required><br><br>
  
        <button @click="userStore.signUp(email, password)" type="button">Registrarse</button>
        <button @click="userStore.logIn(email, password)" type="button">Iniciar Sesión</button>
      </form>
  
      <div v-if="user">
        <h3>Estas conectado como:</h3>
        <p>{{ user.email }}</p>
        <button @click="userStore.logout" type="button">Cerrar Sesión</button>
      </div>
    </div>
  </template>
  