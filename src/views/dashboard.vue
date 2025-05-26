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
const dueDate = ref (null)
const status = ref('todo')
const editingTaskId = ref(null)
const noShow = ref ('noShow')
const noShowEdit = ref ('noShow')
const newTitulo = ref ('')
const newDescripcion = ref ('')
const newDueDate = ref ('')

// handle newtask, delete, status, update, fecth
const handleSubmit = async () => {
  try {
    await toDoListStore.createTask(titulo.value, descripcion.value, status.value, dueDate.value)
    titulo.value = ''
    descripcion.value = ''
    dueDate.value = null
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

const updateTask = async (id, newTitulo, newDescripcion, newDueDate) =>{
    await toDoListStore.modifyTask (id, newTitulo, newDescripcion, newDueDate)
    noShowEdit.value ='noShowEdit'
    editingTaskId.value = null
    titulo.value = ''
    descripcion.value = ''
    dueDate.value = null
    status.value = 'todo'
 
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
const toggleEdit = async (task) =>{
    if (noShowEdit.value === 'noShowEdit'){
        noShowEdit.value = ''
        editingTaskId.value = task.id
        newTitulo.value = task.titulo
        newDescripcion.value = task.descripcion  
        newDueDate.value = task.dueDate   
     } else {
        noShowEdit.value ='noShowEdit'
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
                <input type="date" id="dueDate" v-model="dueDate"><br><br>
                <button type="submit">Add</button>
            </form> 
    </section>        

    <section :class="noShowEdit">
            <h3>Edit Task</h3>
            <form @submit.prevent="updateTask(editingTaskId, newTitulo, newDescripcion, newDueDate) ">
                <input type="text" id="titulo" v-model="newTitulo" required><br><br>
                <input type="textarea" id="descripcion" v-model="newDescripcion"><br><br>
                <input type="date" id="dueDate" v-model="newDueDate"><br><br>

                <button type="submit">Save</button>
            </form> 
    </section>        


    <article>
        <section>
            <h3>To do</h3>
            <li v-for="task in tasks.filter(t=>t.status==='todo')" :key="task.id">
                <div v-if="user" class="tareas">
                    <h4>{{ task.titulo }}</h4>
                    <p>{{ task.descripcion }}</p>
                    <p>{{task.dueDate}}</p>
                    <form>
                        <select v-model="task.status" @change="e => changeStatus(task.id, e.target.value)">
                            <option value="todo">To do</option>
                            <option value="doing">Doing</option>
                            <option value="done">Done</option>
                        </select>
                    </form>
                    <button @click.prevent="toggleEdit(task)">✍️</button>
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
                    <p>{{task.dueDate}}</p>
                    <form>
                        <select v-model="task.status" @change="e => changeStatus(task.id, e.target.value)">
                            <option value="todo">To do</option>
                            <option value="doing">Doing</option>
                            <option value="done">Done</option>
                        </select>
                    </form>
                    <button @click.prevent="toggleEdit(task)">✍️</button>
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
                    <p>{{task.dueDate}}</p>
                    <form>
                        <select v-model="task.status" @change="e => changeStatus(task.id, e.target.value)">
                            <option value="todo">To do</option>
                            <option value="doing">Doing</option>
                            <option value="done">Done</option>
                        </select>
                    </form>
                    <button @click.prevent="toggleEdit(task)">✍️</button>
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