import { supabase } from "@/api/supabase/index"

export const getAllTasks = async () => {
  try {
    const { data, error } = await supabase
      .from('task')
      .select()

    if (error) throw error
    return data
  } catch (err) {
    console.error('Error al obtener tareas:', err.message)
    return []
  }
}

export const addTask = async (titulo, descripcion, status = 'todo') => {
  try {
    const {
      data: { user }
    } = await supabase.auth.getUser()

    const { data, error } = await supabase
      .from('task')
      .insert([{ titulo, descripcion, status, user_id: user.id }])
      .select()
    
    if (error) throw error
    return data[0] 
  } catch (err) {
    console.error('Error al crear tarea:', err.message)
    return null
  }
}

export const editTaskStatus = async (id, newStatus) => {
  try {
    const { data, error } = await supabase
      .from('task')
      .update({ status: newStatus })
      .eq('id', id)
      .select()

    if (error) throw error

    return data
  } catch (err) {
    console.error('Error al editar tarea:', err.message)
    return null
  }
}

export const editTask = async (id, newTitulo, newDescripcion) => {
  try {
    const { data, error } = await supabase
      .from('task')
      .update({ 
        titulo: newTitulo,
        descripcion: newDescripcion })
      .eq('id', id)
      .select()

    if (error) throw error

    return data
  } catch (err) {
    console.error('Error al editar tarea:', err.message)
    return null
  }
}
export const deleteTask = async (id) => {
  try {
    const { data, error } = await supabase
      .from('task')
      .delete()
      .eq('id', id)
      .select ()

    if (error) throw error
    return data
  } catch (err) {
    console.error('Error al eliminar tarea:', err.message)
    return null
  }
}

