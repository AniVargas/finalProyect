import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'
import { getAllTasks , addTask } from '@/api/supabase/tasksApi'

export const usetoDoList = defineStore('tasks', ()=>{
  
  const tasks = ref([])

  async function fetchTasks (){
    try {
      const data = await getAllTasks();
      tasks.value.push(...data)
    }
    catch (err){
      console.log (err)
    }
  }

  async function createTask (){
    try {
      const data = await addTask(titulo.value, descripcion.value)
      tasks.value.push(data)
    }
    catch (err){
      console.log (err)
    }
  }

  return { 
    tasks, 
    createTask,
    fetchTasks, 
   }

})

