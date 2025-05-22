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


const handleSubmit = async () => {
  try {
    await toDoListStore.createTask(titulo.value, descripcion.value, status.value)
    titulo.value = ''
    descripcion.value = ''
    status.value = 'todo'
  } catch (error) {
    console.error(error)
  }
}

const handleDelete = async ()=> {
    try
}

const changeStatus = async (id, newStatus) => {
    await toDoListStore.changeStatus (id, newStatus)
}


onMounted(()=>{
    toDoListStore.fetchTasks(),
    userStore.fetchUser()

}
)


</script>

<template>
      <div v-if="user">
        <h3>Estas conectado como:</h3>
        <p>{{ user.email }}</p>
        <button @click="userStore.logout" type="button">Cerrar Sesión</button>
      </div>
    <button> Add new task </button>
    <section>
            <h3>New Task</h3>
            <form @submit.prevent="handleSubmit">
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
                        <select :value="task.status" @change="e => changeStatus(task.id, e.target.value)">
                            <option value="todo">To do</option>
                            <option value="doing">Doing</option>
                            <option value="done">Done</option>
                        </select>
                    </form>
                    <button class="editar">edit</button>
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
                        <select :value="task.status" @change="e => changeStatus(task.id, e.target.value)">
                            <option value="todo">To do</option>
                            <option value="doing">Doing</option>
                            <option value="done">Done</option>
                        </select>
                    </form>
                    <button class="editar">edit</button>
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
                        <select :value="task.status" @change="e => changeStatus(task.id, e.target.value)">
                            <option value="todo">To do</option>
                            <option value="doing">Doing</option>
                            <option value="done">Done</option>
                        </select>
                    </form>
                    <button class="editar">✍️</button>
                    <button @click.prevent="handleDelete" class="delete">🗑️</button>
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

</style>