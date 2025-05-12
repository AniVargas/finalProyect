<script setup>
import {ref} from 'vue';
import {supabase} from '@/api/supabase/index.js'

const email = ref("")
const name = ref("")
const password = ref("")

async function signIn() {  
    const { data, error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
        options: {
            data: {name: name.value}
        }
    }) 
    if (error){
        console.error (error);
    }
    else{
        console.log (data); 
    }
}
async function logIn() { const { data, error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
    }) 
    if (error){
        console.error (error);
    }
    else{
        console.log (data); 
    }    
}
async function getUser() {
    const localUser= await supabase.auth.getSession();
    console.log (localUser);
    
}
async function logout() {    
    const { error } = await supabase.auth.signOut(); 
    if (error) {
        console.log (error)
    }  
    else {
        console.log ("you have log out")
    }
}


</script>
<template>
    <div>
        <form action="" method="post">
            <label for="Email">Email:</label>
            <input type="text" id="Email" name="Email" v-model="email" required><br><br>

            <label for="name">Nombre:</label>
            <input type="text" id="name" name="name" v-model="name" required><br><br>


            <label for="password">Contraseña:</label>
            <input type="password" id="password" name="password" v-model="password" required><br><br>

            <button @click="signIn" type="button">Registrate</button>
            <button @click="logIn"  type="button">Iniciar Sesión</button>
            <button @click="logout"  type="button">Cerrar Sesión</button>
            <button @click="getUser"  type="button">ver sesion</button>
            </form>
    </div>
</template>