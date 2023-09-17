import { create } from "zustand";
import { Task } from "../utils/task";
import { useTasksStore } from "./TasksStore";

const store = (set: any) => ({
    trash: <Array<Task>>[], 
    addToTrash: (task: Task) => (
        set((store: any) => ({
            trash: [...store.trash, task]
        }))
    ), 
    deleteTrash: (id: string) => (
        set((store: any) => ({
            trash: store.trash.filter(
                (task: Task) => task.id !== id, 
            )
        }))
    ), 
    restoreTrash: (task: Task) => {
        let deleteTrash = useTrashStore.getState().deleteTrash
        let addExistingTask = useTasksStore.getState().addExistingTask
        addExistingTask(task)
        deleteTrash(task.id) 
    }
})

export const useTrashStore = create(store)

