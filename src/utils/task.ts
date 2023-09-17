import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore"

export class Task {
    title: string = ""
    id: string = ""
    checked: boolean = false
    dateCreated: Date = new Date()
    dateDeleted: Date | undefined

    public static create(title: string): Task {
        const task = new Task()
        task.title = title
        // task.id = Math.random() * 100
        return task
    }
    
    public static load(doc: QueryDocumentSnapshot<DocumentData, DocumentData>): Task {
        const task = new Task()
        const data = doc.data()
        task.title = data.title
        task.checked = data.checked
        task.dateCreated = data.dateCreated
        task.dateDeleted = data.dateDeleted
        task.id = doc.id
        return task
    }

}
