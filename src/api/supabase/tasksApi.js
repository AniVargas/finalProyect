import { supabase } from "@/api/supabase/index"


export const getAllTask = async ()=> {
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
        const { data, error } = await supabase
        .from('tasks')
        .insert({ titulo, descripcion })
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
export const editTask = async ()=> {
    try{
        const { data, error } = await supabase
        .from('tasks')
        .update({ titulo, descripcion })
        .eq('id')
        .select()
        if (error) {
            throw new Error(error.message)
        }
        return data
    }
    catch (err){
        console.log(err)
    }
}

export const deletTask = async ()=> {
    try{
        const response = await supabase
        .from('tasks')
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


