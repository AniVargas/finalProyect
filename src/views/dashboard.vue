<script setup>
import {useUserStore} from '@/stores/user'
import {ref, onMounted, watch} from 'vue' 
import {storeToRefs} from 'pinia'
import {usetoDoList} from '@/stores/toDoList'

const userStore = useUserStore()
const toDoListStore= usetoDoList()

const {user} = storeToRefs(userStore)
const {tasks} = storeToRefs(toDoListStore)

const titulo = ref ('')
const descripcion = ref ('')
const status = ref('todo')
const editingTaskId = ref(null)
const noShow = ref ('noShow')
const noShowEdit = ref ('noShow')

// handle newtask, delete, status, update, fecth
const handleSubmit = async () => {
  try {
    await toDoListStore.createTask(titulo.value, descripcion.value, status.value)
    titulo.value = ''
    descripcion.value = ''
    status.value = 'todo'
    toggleShow()
  } catch (error) {
    console.error(error)
  }
}

const handleDelete = async (id)=> {
    try{
        await toDoListStore.delTask(id)
    } catch (error) {
    console.error(error)
  }

}

const changeStatus = async (id, newStatus) => {
    await toDoListStore.changeStatus (id, newStatus)
}

const updateTask = async (id, newTitulo, newDescripcion) =>{
    await toDoListStore.modifyTask (id, newTitulo, newDescripcion)
}

onMounted(()=>{
    toDoListStore.fetchTasks(),
    userStore.fetchUser()
}
)


//toggles
const toggleShow =()=>{
    if (noShow.value === 'noShow'){
        noShow.value = ''
    } else {
        noShow.value ='noShow'

    }
}
const toggleEdit = async(id) => {
  await toDoListStore.modifyTask (id, newTitulo, newDescripcion)
  const task = tasks.value.find(t => t.id === task.id)
  if (task) {
    editingTaskId.value = id
    editForm.value = {
      titulo: task.newTitulo,
      descripcion: task.newDescripcion
    }
  }
}
</script>

<template>
      <div v-if="user">
        <h4> Hi {{ user.email }}!! </h4>
        <button @click="userStore.logout" type="button">Log out</button>
      </div>
    <button @click="toggleShow"> Add new task </button>
    <section :class="noShow">
            <h3>New Task</h3>
            <form @submit.prevent="handleSubmit">
                <input type="text" id="titulo" placeholder="New task title" v-model="titulo" required><br><br>

                <input type="textarea" id="descripcion" placeholder="More info about your task..." v-model="descripcion"><br><br>

                <button type="submit">Add</button>
            </form> 
    </section>        

    <section>
            <h3>Edit Task</h3>
            <form @submit.prevent="updateTask(id)">
                <label for="titulo">Titulo de la tarea</label>
                <input type="text" id="titulo" v-model="titulo" required><br><br>

                <label for="descripcion">descripción</label>
                <input type="textarea" id="descripcion" v-model="descripcion"><br><br>

                <button type="submit">Add</button>
            </form> 
    </section>        


    <article>
        <section>
            <h3>To do</h3>
            <li v-for="task in tasks.filter(t=>t.status==='todo')" :key="task.id">
                <div class="tareas">
                    <h4>{{ task.titulo }}</h4>
                    <p>{{ task.descripcion }}</p>
                    <caption>Due date</caption>
                    <form>
                        <label for="status">Status</label>
                        <select v-model="task.status" @change="e => changeStatus(task.id, e.target.value)">
                            <option value="todo">To do</option>
                            <option value="doing">Doing</option>
                            <option value="done">Done</option>
                        </select>
                    </form>
                    <button @click.precent="toggleEdit(task.id)">✍️</button>
                    <button @click.prevent="handleDelete(task.id)" class="delete">🗑️</button>
                </div>
            </li>
        </section>
        <section>
            <h3>Doing</h3>
            <li v-for="task in tasks.filter(t=>t.status==='doing')" :key="task.id">
                <div class="tareas">
                    <h4>{{ task.titulo }}</h4>
                    <p>{{ task.descripcion }}</p>
                    <caption>Due date</caption>
                    <form>
                        <label for="status">Status</label>
                        <select v-model="task.status" @change="e => changeStatus(task.id, e.target.value)">
                            <option value="todo">To do</option>
                            <option value="doing">Doing</option>
                            <option value="done">Done</option>
                        </select>
                    </form>
                    <button class="editar">✍️</button>
                    <button @click.prevent="handleDelete(task.id)" class="delete">🗑️</button>
                </div>
            </li>
        </section>
        <section>
            <h3>Done</h3>
            <li v-for="task in tasks.filter(t=>t.status==='done')" :key="task.id">
                <div class="tareas">
                    <h4>{{ task.titulo }}</h4>
                    <p>{{ task.descripcion }}</p>
                    <caption>Due date</caption>
                    <form>
                        <label for="status">Status</label>
                        <select v-model="task.status" @change="e => changeStatus(task.id, e.target.value)">
                            <option value="todo">To do</option>
                            <option value="doing">Doing</option>
                            <option value="done">Done</option>
                        </select>
                    </form>
                    <button class="editar">✍️</button>
                    <button @click.prevent="handleDelete(task.id)" class="delete">🗑️</button>
                </div>
            </li>
        </section>
        
    </article>
</template>

<style>
article{
    display: flex;
    justify-content: space-between; 
}
li{
    list-style: none;
}

.noShow {
    display: none;
}
.noShowEdit {
    display: none;
}
</style>