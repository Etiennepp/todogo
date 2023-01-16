export interface Task {
     _id: string;
     name: string;
     completed: boolean;
}

export interface List {
     _id: string;
     name: string;
     tasks: [Task] | [];
     color: string;
     emoji: string;
     createdAt: Date;
     updatedAt: Date;
}
export interface Collection {
     _id: string;
     name: string;
     color: string;
     lists: [List] | [];
}
