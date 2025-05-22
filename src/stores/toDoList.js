import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'
import { getAllTasks , addTask, deleteTask, editTask } from '@/api/supabase/tasksApi'

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

  async function createTask(titulo, descripcion, status = 'todo', dueDate) {
    try {
      const nuevaTarea = await addTask(titulo, descripcion, status)
      tasks.value.push(nuevaTarea)
    } catch (err) {
      console.error('Error al crear tarea:', err)
    }
  }

  async function changeStatus(id, newStatus) {
    try {
      await editTask(id, newStatus)
      const task = tasks.value.find(t => t.id === id)
      if (task) task.status = newStatus
    } catch (err) {
      console.error('Error al cambiar el estado:', err)
    }
  }
  
  return { 
    tasks, 
    createTask,
    fetchTasks, 
    changeStatus
   }

})

