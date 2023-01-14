export interface Todo {
     _id: string;
     name: string;
     completed: boolean;
}

export interface List {
     _id: string;
     name: string;
     todos: [Todo];
}
export interface Collection {
     _id: string;
     name: string;
     color: string;
     lists: [List];
}
