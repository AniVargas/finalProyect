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


async function verifyAndRegister () {
    noShowDifPasswords.value ='noShowDifPasswords'
    error.value= ""
    if (password1.value === password2.value){
        password.value = password1.value
        try{
        await userStore.signUp (email.value, password.value)
        router.push('/todo')

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
  <section>
    <div>
      <div :class="noShowDifPasswords" class="pink">
          <p>Ups... the 2 passwords are different. <br>Try again 😉 </p>
      </div>
      <div class="pink" v-if="error">
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
    </div>
    </section>
  </template>


<style scoped>
.noShowDifPasswords {
    display: none;
}
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
}
button:hover{
    width: 135px;
    font-size: 20px;
    background-color:#6b499b;
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
  border:5px solid black;
  background-color: #fa448c;
  font-family: monospace;
  text-align: center;
}

</style>