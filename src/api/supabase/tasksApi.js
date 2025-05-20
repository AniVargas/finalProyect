import { supabase } from "@/api/supabase/index"


export const getAllTasks = async ()=> {
    try{
        const { data, error } = await supabase
        .from('task')
        .select()
        if (error) {
            throw new Error(error.message)
        }
        return data
    }
    catch (err){
        console.log(err)
        return [];
    }
}

export const addTask = async ()=> {
    try{
        const user = await supabase.auth.getUser();
        const user_id = user.data.user.id
        const { data, error } = await supabase
        .from('task')
        .insert({ titulo, descripcion, user_id })
        .select()
        if (error) {
            throw new Error(error.message)
        }
        return data
    }
    catch (err){
        console.log(err)
        return [];
    }
}
export const editTask = async (id, titulo, descripcion)=> {
    try{
        const { data, error } = await supabase
        .from('task')
        .update({ id, titulo, descripcion })
        .eq('id', id)
        .select()
        if (error) {
            throw new Error(error.message)
        }
        return data
    }
    catch (err){
        console.log(err);
        return null;
    }
}

export const deleteTask = async (id)=> {
    try{
        const response = await supabase
        .from('task')
        .delete()
        .eq('id')
        if (error) {
            throw new Error(error.message)
        }
        return data
    }
    catch (err){
        console.log(err)
    }
}


