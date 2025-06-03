<script setup>
import {useUserStore} from '@/stores/user'
import {ref, onMounted, watch} from 'vue' 
import {storeToRefs} from 'pinia'
import {usetoDoList} from '@/stores/toDoList'

const userStore = useUserStore()
const toDoListStore= usetoDoList()

const {user} = storeToRefs(userStore)
const {tasks} = storeToRefs(toDoListStore)


//variables
const titulo = ref ('')
const descripcion = ref ('')
const dueDate = ref (null)
const status = ref('todo')
const editingTaskId = ref(null)
const noShow = ref ('noShow')
const noShowEdit = ref ('noShow')
const showDoing = ref ('noShowDoing')
const showToDo = ref ('noShowToDo')
const showDone = ref ('noShowDone')
const newTitulo = ref ('')
const newDescripcion = ref ('')
const newDueDate = ref ('')
const today = ref (new Date())
const anio = ref(today.value.getFullYear());
const mes = ref(today.value.getMonth() + 1); 
const dia = ref(today.value.getDate());
const hoy = ref(`${anio.value}-${String(mes.value).padStart(2, '0')}-${String(dia.value).padStart(2, '0')}`);


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
const toogleShowDoing =()=>{
    if (showDoing.value === 'noShowDoing'){
        showDoing.value = ''
    } else {
        showDoing.value ='noShowDoing'
    }
}
const toogleShowDone =()=>{
    if (showDone.value === 'noShowDone'){
        showDone.value = ''
    } else {
        showDone.value ='noShowDone'
    }
}
const toogleShowToDo =()=>{
    if (showToDo.value === 'noShowToDo'){
        showToDo.value = ''
    } else {
        showToDo.value ='noShowToDo'
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
     <button @click="toggleShow" class="add"> + </button>
<main>
    <section :class="noShow">
        <div class="transparente">
          <div class="insert">
            <button class="close" @click="toggleShow">X</button>  
            <h3>New Task</h3>
            <form @submit.prevent="handleSubmit">
                <input type="text" id="titulo" placeholder="New task title" v-model="titulo" required><br><br>
                <input type="textarea" id="descripcion" placeholder="More info about your task..." v-model="descripcion"><br><br>
                <input type="date" id="dueDate" v-model="dueDate"><br><br>
                <button type="submit">Add</button>
            </form> 
           </div>
        </div>
    </section>            
    <section :class="noShowEdit">
        <div class="transparente">
            <div class="insert">
                <button class="close" @click="toggleEdit">X</button>  
                <h3>Edit Task</h3>
                <form @submit.prevent="updateTask(editingTaskId, newTitulo, newDescripcion, newDueDate) ">
                    <input type="text" id="titulo" v-model="newTitulo" required><br><br>
                    <input type="textarea" id="descripcion" v-model="newDescripcion"><br><br>
                    <input type="date" id="dueDate" v-model="newDueDate"><br><br>

                    <button type="submit">Save</button>
                </form> 
            </div>
        </div>
    </section>          
    <article>  
        <section class="lista">
            <h3>To do <button @click.prevent="toogleShowToDo">+</button> </h3>
            <li v-for="task in tasks.filter(t=>t.status==='todo')" :key="task.id":class="showToDo">
                <div v-if="user" class="tareas">
                    <h4>{{ task.titulo }}</h4>
                    <p>{{ task.descripcion }}</p>
                    <p :class="{ deadline: task.dueDate <= hoy }">{{task.dueDate}}</p>
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
        <section class="lista">
            <h3>Doing <button class="botonMostrarTasks" @click.prevent="toogleShowDoing">+</button> </h3>
            <li v-for="task in tasks.filter(t=>t.status==='doing')" :key="task.id" :class="showDoing">
                <div  v-if="user" class="tareas">
                    <h4>{{ task.titulo }}</h4>
                    <p>{{ task.descripcion }}</p>
                    <p :class="{ deadline: task.dueDate <= hoy }">{{task.dueDate}}</p>
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
        <section class="lista">
            <h3>Done <button @click.prevent="toogleShowDone">+</button></h3>
            <li class="done" v-for="task in tasks.filter(t=>t.status==='done')" :key="task.id" :class="showDone">
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
        
    </article>
</main>
</template>

<style>
@media (max-width: 1450px){
main{
    margin-top: 45px;
}
article{
    width: 90vw;
    display: flex;
    justify-content: space-around;
    margin: auto;
    font-family: monospace;
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
.lista{
    width: 25vw;
    border-radius: 10px;
    h3{
        margin-top: 0;
        border: 3px solid black;
        font-size: 30px;
        font-family: monospace;
        text-align: center;
        background-color:#fa448c;
        color: white ;
        button{
            display: none;
        }
    }
    .tareas{
        justify-self: center;
        background-color:#331a380f;
        width: 90%;
        border-radius: 5px;
        button{
            color: white;
            border: none;
            height: 30px;
            border-radius: 5px;
            width: 30px;
            margin: 2px;
        }
        button:hover{
            background-color:#491d88;
        }
        select{
            border: 2px solid black;
            font-family: monospace; 
        }
    }
}
.done{
    text-decoration: line-through;
    color: rgb(80, 77, 77);
        select{
            color: rgb(80, 77, 77);
        }
}
.add{
    margin-top: 50px;
    width: 70px;
    height: 70px;
    border-radius: 100px;
    border: none;
    background-color: #fec859;
    border: 5px solid black;
    font-size: 50px;
    color: black;
    position: fixed;
    top: 70vh;
    right: 10px;
}
.add:hover{
    background-color: #ffac06;
}

.transparente{
    width: 100%;
    height: 100vh;
    background-color: #ffffff4f;
    position: fixed;
    display: flex;
    justify-content: center;
    align-content: center;
    .insert{
        margin-top: 100px;
        width: 300px;
        height: 250px;
        background-color: white;
        border: 5px solid black;
        display: flex;
        flex-direction: column;
        text-align: center;
        font-family: monospace;
        button{
            font-family: monospace;
            color: white;
            background-color: #491d88;
            border: none;
            height: 30px;
            border-radius: 10px;
            width: 80px;
        }  
        .close{
            border: none;
            background-color: #00000000;
            color: black;
            align-self: flex-end;
            width: 30px;
        }
   
    }


}
.deadline{
    color: rgb(255, 0, 0)  ;
}
}
@media (max-width: 770px){
    .add{
    position: fixed;
    right: 10px;
    top: 80vh;
    }
}

@media (max-width: 450px){
 main{
    margin-top: 20px;
 }

 .add{
    width: 10vh;
    height: 10vh;    
    top: 80vh;
    left: 80vw;
 }

 article{
    width: 90vw;
    display: flex;
    flex-direction: column;
}
.lista{
    width: 90vw;
    border-radius: 10px;
    h3{
        margin-top: 0;
        border: 3px solid black;
        font-size: 25px;
        font-family: monospace;
        text-align: center;
        background-color:#fa448c;
        color: white ;
        button{
            display:block;
            border: none;
            background-color: #fd66a3;
            color: white;
            font-size: 20px;
            justify-self: end;
        }
    }
}

section{
    margin-bottom: 20px;
}
.noShowToDo{
    display: none;
}
.noShowDoing{
    display: none;
}
.noShowDone{
    display: none;
}
}

</style>