<script setup>
import {useUserStore} from '@/stores/user'
import {ref} from 'vue' 
import {storeToRefs} from 'pinia'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const {user} = storeToRefs(userStore)
const router= useRouter()

const email = ref("")
const password = ref("")
const password1 = ref("")
const password2 = ref("")
const noShowDifPasswords = ref ('noShowDifPasswords')
const error = ref("")

//const toggleShowDifPasswords =()=>{
//    if (noShowDifPasswords.value === 'noShowDifPasswords'){
//        noShowDifPasswords.value = ''
//    } else {
//        noShowDifPasswords.value ='noShowDifPasswords'
//    }
//}


async function verifyAndRegister () {
    noShowDifPasswords.value ='noShowDifPasswords'
    error.value= ""
    if (password1.value === password2.value){
        password.value = password1.value
        
        try{
        await userStore.signUp (email.value, password.value)
        } catch (err){
            error.value = "You alreday have a user, try login"
            console.log (err)
        }
    } else{
    noShowDifPasswords.value = ''
    console.log ("Ups, you use different passwords")
    }
}

</script>
<template>
    <div :class="noShowDifPasswords">
        <p>Ups... the 2 passwords are different. Try again 😉 </p>
    </div>
    <div v-if="error">
        <p>{{error}}</p>
    </div>
    <div>
      <form @submit.prevent="verifyAndRegister">
        <label for="email">Email:</label>
        <input type="text" id="email" v-model="email" required><br><br>
       
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password1" required><br><br>
         
        <label for="password">Confirm your password:</label>
        <input type="password" id="password" v-model="password2" required><br><br>
  

        <button type="submit">Registrarse</button>

      </form>
  
      <div v-if="user">
        <h3>Hi {{ user.email }}!</h3>
        <router-link to="todo">Let's get started</router-link>
        <button @click="userStore.logout" type="button">Cerrar Sesión</button>
      </div>
    </div>
  </template>


<style>
.noShowDifPasswords {
    display: none;
}
</style>