<script setup>
import {useUserStore} from '@/stores/user'
import {ref, onMounted} from 'vue' 
import {storeToRefs} from 'pinia'
import {usetoDoList} from '@/stores/toDoList'

const userStore = useUserStore()
const toDoListStore= usetoDoList()

const {user} = storeToRefs(userStore)
const {tasks} = storeToRefs(toDoListStore)


const titulo = ref ('')
const descripcion = ref ('')

const handleSubmit = async () => {
    try {
        await toDoListStore.createTask(titulo.value, descripcion.value)
        
    } catch (error) {
        console.error
    }
}

onMounted(()=>{
    toDoListStore.fetchTasks()
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
                

                <label for="status">Status</label>
                <select name="status" id="staus">
                    <option value="todo">To do</option>
                    <option value="doing">Doing</option>
                    <option value="done">Done</option>
                </select>
                    <input type="submit" value="Enviar" />
                <button @submit.prevent="handleSubmit" type="submit">Add</button>
            </form> 
    </section>        

    <article>
        <section>
            <h3>To do</h3>
            <ul v-for="task in tasks" :key="task.id">
                <div class="tareas">
                    <h4>{{ task.titulo }}</h4>
                    <p>{{ task.descripcion }}</p>
                    <caption>Due date</caption>
                    <form action="#">
                        <label for="status">Status</label>
                        <select name="status" id="staus">
                            <option value="todo">To do</option>
                            <option value="doing">Doing</option>
                            <option value="done">Done</option>
                        </select>
                        <input type="submit" value="Enviar" />
                    </form>
                    <button class="editar">edit</button>
                </div>
            </ul>
        </section>
        <section>
            <h3>Doing</h3>
            <div class="tareas">
                <h4>titulo de tarea</h4>
                <p>Descripción</p>
                <caption>Due date</caption>
                <form action="#">
                    <label for="status">Status</label>
                    <select name="status" id="staus">
                        <option value="todo">To do</option>
                        <option value="doing">Doing</option>
                        <option value="done">Done</option>
                    </select>
                    <input type="submit" value="Enviar" />
                </form>
                <button class="editar">edit</button>
            </div>
        </section>
        <section>
            <h3>Done</h3>
            <div class="tareas">
                <h4>titulo de tarea</h4>
                <p>Descripción</p>
                <caption>Due date</caption>
                <form action="#">
                    <label for="status">Status</label>
                    <select name="status" id="staus">
                        <option value="todo">To do</option>
                        <option value="doing">Doing</option>
                        <option value="done">Done</option>
                    </select>
                    <input type="submit" value="Enviar" />
                </form>
                <button class="editar">edit</button>
            </div>
        </section>
    </article>
</template>

<style>
article{
    display: flex;
    justify-content: space-between; 
}

</style>