<template>
    <button> Add new task </button>
    <section>
            <h3>New Task</h3>
            <form action="">
                <label for="title">Titulo de la tarea</label>
                <input type="text" id="titulo" v-model="titulo" required><br><br>

                <label for="description">descripción</label>
                <input type="textarea" id="descripcion" v-model="descripcion"><br><br>
                
                <label for="duedate">fecha limite</label>
                <input type="date" id="duedate" v-model="duedate"><br><br>


                <label for="status">Status</label>
                <select name="status" id="staus">
                    <option value="todo">To do</option>
                    <option value="doing">Doing</option>
                    <option value="done">Done</option>
                </select>
                    <input type="submit" value="Enviar" />
                <button>Add</button>
            </form> 
    </section>        

    <article>
        <section>
            <h3>To do</h3>
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