import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'
import { getAllTask , addTask, editTask, deletTask } from '@/api/supabase/tasksApi'

export const usetoDoList = defineStore('tasks', ()=>{
  
  const tasks = reactive ([])

  async function fetchTasks (){
    try {
      const data = await getAllTask()
      tasks.push(...data)
    }
    catch (err){
      console.log (err)
    }
  }

  async function createTask (titulo, descripcion, estado){
    try {
      const data = await addTask(titulo, descripcion)
      tasks.push(data)
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

