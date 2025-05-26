import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'
import { getAllTasks , addTask, deleteTask, editTask, editTaskStatus } from '@/api/supabase/tasksApi'

export const usetoDoList = defineStore('tasks', ()=>{
  
  const tasks = ref([])

  async function fetchTasks (){
    try {
      const data = await getAllTasks();
      tasks.value = data
    } catch (err){
      console.log (err)
    }
  }

  async function createTask(titulo, descripcion, status = 'todo', dueDate) {
    try {
      const nuevaTarea = await addTask(titulo, descripcion, status, dueDate)
      if(nuevaTarea){
        tasks.value.push(nuevaTarea)
      }
    } catch (err) {
      console.error('Error al crear tarea:', err)
    }
  }

  async function changeStatus(id, newStatus) {
    try {
      await editTaskStatus(id, newStatus)
      const task = tasks.value.find(t => t.id === id)
      if (task) task.status = newStatus
    } catch (err) {
      console.error('Error al cambiar el estado:', err)
    }
  }

  async function modifyTask(id, newTitulo, newDescripcion, newDueDate) {
    try {
      await editTask(id, newTitulo, newDescripcion, newDueDate)
      const task = tasks.value.find(t => t.id === id)
      if (task) { 
        task.titulo = newTitulo
        task.descripcion = newDescripcion
        task.dueDate = newDueDate
      }

    } catch (err) {
      console.error('Error al editar:', err)
    }
  }

  async function delTask(id) {
    try {
      const result = await deleteTask(id)
      if (result) {
        tasks.value = tasks.value.filter(t => t.id !== id)
        }
    } catch (err) {
      console.error('Error al eliminar tarea', err)
    }
  }
  
  return { 
    tasks, 
    createTask,
    fetchTasks, 
    changeStatus, 
    delTask,
    modifyTask, 
   }

})

