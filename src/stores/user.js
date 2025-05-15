import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/api/supabase/index.js'

export const useUserStore = defineStore('user', ()=>{
  
  const user = ref (null)

  async function fetchUser () {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error)
      } else {
        user.value = data.user
      }
    }

  async function signUp (email, password) {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) {
        console.error('Error de registro', error)
      }
      else {
        user.value = data.user;
        console.log (user.value)}
    }

  async function logIn (email, password) { 
      const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    }) 
    if (error) {
      console.error('Error al iniciar sesión', error)
    }
    else {
      user.value = data.user;
      console.log (user.value)} 
    }

    async function logout() {    
      const { error } = await supabase.auth.signOut(); 
      if (error) {
          console.log (error)
      }  
      else {
        user.value = null
        console.log ("you have log out")
      }
  }
  return {
    user,
    fetchUser,
    signUp,
    logIn,
    logout
  }
})