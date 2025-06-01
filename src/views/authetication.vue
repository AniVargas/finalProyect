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

    <section>
      <div>
        <div v-if="error" class="pink">
          <p>{{ error }}</p>
        </div>
        <div class="pink" v-if="user">
          <p>Hi! you are loged as {{ user.email }}!</p>
          <router-link to="todo">Let's get started</router-link>
        </div>
      <form @submit.prevent="handleLogin">
        <label for="email">Email:</label><br>
        <input type="text" id="email" v-model="email" required><br><br>
       
        <label for="password">Contraseña:</label><br>
        <input type="password" id="password" v-model="password" required><br><br>
  
        <button type="submit">Log in</button>
      </form>
      </div>
    </section>
  </template>



<style scoped>

button{
    background-color: #491d88;
    padding-bottom: 10px;
    color: black;
    border: none;
    border-radius: 10px;
    width: 130px;
    font-family: monospace;
    font-weight: bold;
    font-size: 18px;
    padding: 10wv;
    border: 3px solid black;
}
button:hover{
    width: 135px;
    font-size: 20px;
    background-color:#6b499b;
    border: 3px solid black;
}

section{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  div{
  width: 300px;
  align-self: center;
  
  form{
    margin-top: 20px;
    font-family:monospace;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    input{
      border-radius: 0%;
      border: 3px solid black;
      font-family: monospace;
      height: 30px;
    }
    button{
      height: 50px;
      align-self: center;
    }
  }
}
}
.pink{
  border:3px solid black;
  background-color: #fa448c;
  font-family: monospace;
  text-align: center;
}


</style>
  