import { create } from "zustand";
import { Task } from "../utils/task";
import { useTrashStore } from "./TrashStore";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const store = (set: any) => ({
    tasks: <Array<Task>>[], 
    setTasks: (tasks: Array<Task>) => {
        set((store: any) => ({
            tasks: tasks
        }))
    }, 
    addTask: (title: string) => (
        set(async (store: any) => {
            const task = Task.create(title)
            await addDoc(collection(db, 'todos'), {
                title: task.title, 
                checked: task.checked, 
                id: task.id, 
                dateCreated: task.dateCreated.toUTCString(), 
                dateDeleted: task.dateDeleted?.toUTCString() ?? ""
            })
            return {
                tasks: [...store.tasks, task]
            }
        })
    ), 
    addExistingTask: (task: Task) => (
        set((store: any) => ({
            tasks: [...store.tasks, task]
        }))
    ), 
    deleteTask: (id: string) => (
        set((store: any) => ({
            tasks: store.tasks.filter(
                (task: Task) => {
                    if (task.id == id) {
                        let trash = useTrashStore.getState()
                        task.dateDeleted = new Date() 
                        trash.addToTrash(task)
                    }
                    return task.id !== id
                }
            )
        })) 
    ), 
    checkTask: (id: string, value: boolean) => (
        set((store: any) => ({
            tasks: store.tasks.map(async (task: Task) => {
                if (task.id === id) {
                    task.checked = value
                    await updateDoc(doc(db, 'todos', task.id), {checked: task.checked})
                }
                return task
            })
        }))
    )
})

export const useTasksStore = create(store)