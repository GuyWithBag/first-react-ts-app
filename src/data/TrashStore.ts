import { create } from "zustand";
import { Task } from "../utils/task";
import { useTasksStore } from "./TasksStore";
import { DocumentReference, addDoc, collection, deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const store = (set: any) => ({
    trash: <Array<Task>>[], 
    addToTrash: async (taskDocRef: DocumentReference) => {
        const docSnap = await getDoc(taskDocRef); 
        const task: Task = Task.load(docSnap)
        await addDoc(collection(db, 'trash'), task.toJson())
    }, 
    deleteTrash: (id: string) => {
        deleteDoc(doc(db, 'trash', id))
    }, 
    restoreTrash: (task: Task) => {
        let deleteTrash = useTrashStore.getState().deleteTrash
        let addExistingTask = useTasksStore.getState().addExistingTask
        addExistingTask(task)
        deleteTrash(task.id) 
    }, 
    setTrash: (trash: Array<Task>) => {
        set((store: any) => ({
            trash: trash
        })) 
    }, 
})

export const useTrashStore = create(store)

