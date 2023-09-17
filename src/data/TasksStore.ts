import { create } from "zustand";
import { Task } from "../utils/task";
import { useTrashStore } from "./TrashStore";
import { DocumentReference, addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, query, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const store = (set: any) => ({
    tasks: <Array<Task>>[], 
    // queryTasks: async () => {
    //     const q = query(collection(db, 'todos'))
    //     let todosArr: Task[] = []
    //     const unsubscribe = await onSnapshot(q, (querySnapshot) => {
    //       querySnapshot.forEach((doc) => {
    //         let task = Task.load(doc)
    //         todosArr.push(task)
    //         alert("ARR" + todosArr)
    //         })
    //     })
    //     alert("ARR2" + todosArr)
    //     set((store: any) => ({
    //       tasks: todosArr
    //     }))
    //     return unsubscribe
    // }, 
    setTasks: (tasks: Array<Task>) => {
        set((store: any) => ({
            tasks: tasks
        })) 
    }, 
    createTask: async (title: string) => {
        const task = Task.create(title)
        await addDoc(collection(db, 'todos'), task.toJson())
    }, 
    addExistingTask: async (taskDocRef: DocumentReference) => {
        const docSnap = await getDoc(taskDocRef); 
        const task: Task = Task.load(docSnap)
        await addDoc(collection(db, 'todos'), task.toJson())
    },
    deleteTask: async (id: string) => {
        let trash = useTrashStore.getState() 
        const taskDocRef = doc(db, 'todos', id);
        const docSnap = await getDoc(taskDocRef); 
        let currentDate = new Date()
        let newData = Task.load(docSnap)
        newData["dateDeleted"] = currentDate
        updateDoc(taskDocRef, newData.toJson())
        await trash.addToTrash(taskDocRef)
        deleteDoc(taskDocRef)
    }, 
    checkTask: async (id: string, value: boolean) => {
        await updateDoc(doc(db, 'todos', id), {checked: value})
    }
})

export const useTasksStore = create(store)