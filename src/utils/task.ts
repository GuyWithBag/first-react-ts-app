import { DocumentData, DocumentSnapshot, QueryDocumentSnapshot, Timestamp } from "firebase/firestore"

export class Task {
    title: string = ""
    id: string = ""
    checked: boolean = false
    dateCreated: Date = new Date()
    dateDeleted: Date = new Date()

    public static create(title: string): Task {
        const task = new Task()
        task.title = title
        // Firebase automatically assigns an ID now whenever data is created in firebase. 
        // task.id = Math.random() * 100
        return task
    }
    
    public static loadQuery(doc: QueryDocumentSnapshot<DocumentData, DocumentData>): Task {
        const task = new Task()
        const data = doc.data()
        task.title = data.title
        task.checked = data.checked
        task.dateCreated = data.dateCreated.toDate()
        task.dateDeleted = data.dateDeleted.toDate()
        task.id = doc.id
        return task
    }

    public static load(doc: DocumentSnapshot<DocumentData, DocumentData>): Task {
        const task = new Task()
        const data = doc.data()
        task.title = data?.title
        task.checked = data?.checked
        task.dateCreated = data?.dateCreated.toDate()
        task.dateDeleted = data?.dateDeleted.toDate()
        task.id = doc.id
        return task
    }

    public toJson() {
        return {
            title: this.title, 
            checked: this.checked, 
            id: this.id, 
            dateCreated: Timestamp.fromDate(this.dateCreated), 
            dateDeleted: Timestamp.fromDate(this.dateDeleted)
        }
    }
}

