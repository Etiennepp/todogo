import { Collection, List, Task } from "../shared/interfaces/collection";

export interface CollectionsState {
     data: Collection[];
     loading: boolean;
}

const initialState: CollectionsState = {
     data: [],
     loading: true,
};

export default (state = initialState, action: any) => {
     switch (action.type) {
          case "collections/get":
               return {
                    ...state,
                    data: action.payload,
                    loading: false,
               };
          case "collections/post":
               return {
                    ...state,
                    data: [...state.data, action.payload],
               };
          case "collections/put":
               return {
                    ...state,
                    data: state.data.map((collection: any) => {
                         return collection._id === action.payload._id ? { ...action.payload } : collection;
                    }),
               };
          case "collections/list/add":
               return {
                    ...state,
                    data: state.data.map((collection: any) => {
                         return collection._id === action.payload.collection_id
                              ? { ...collection, lists: [...collection.lists, { ...action.payload.list }] }
                              : collection;
                    }),
               };
          case "collections/list/remove":
               return {
                    ...state,
                    data: state.data.map((collection: any) => {
                         return collection._id === action.payload.collection_id
                              ? {
                                     ...collection,
                                     lists: collection.lists.filter(
                                          (list: List) => list._id !== action.payload.list_id
                                     ),
                                }
                              : collection;
                    }),
               };
          case "collections/list/update":
               return {
                    ...state,
                    data: state.data.map((collection: any) => {
                         return collection._id === action.payload.collection_id
                              ? {
                                     ...collection,
                                     lists: collection.lists.map((list: List) => {
                                          return list._id === action.payload.list_id
                                               ? {
                                                      ...list,
                                                      ...action.payload.value,
                                                 }
                                               : list;
                                     }),
                                }
                              : collection;
                    }),
               };
          case "collections/delete":
               return {
                    ...state,
                    data: state.data.filter((collection: any) => {
                         return collection._id !== action.payload.id;
                    }),
               };
          case "collections/task/add":
               return {
                    ...state,
                    data: state.data.map((collection: Collection) => {
                         return collection._id === action.payload.collection_id
                              ? {
                                     ...collection,
                                     lists: collection.lists.map((list: List) => {
                                          return list._id === action.payload.list_id
                                               ? {
                                                      ...list,
                                                      tasks: [...list.tasks, action.payload.task],
                                                 }
                                               : list;
                                     }),
                                }
                              : collection;
                    }),
               };
          case "collections/task/remove":
               return {
                    ...state,
                    data: state.data.map((collection: Collection) => {
                         return collection._id === action.payload.collection_id
                              ? {
                                     ...collection,
                                     lists: collection.lists.map((list: List) => {
                                          return list._id === action.payload.list_id
                                               ? {
                                                      ...list,
                                                      tasks: list.tasks.filter(
                                                           (task) => task._id !== action.payload.task_id
                                                      ),
                                                 }
                                               : list;
                                     }),
                                }
                              : collection;
                    }),
               };
          case "collections/task/update":
               return {
                    ...state,
                    data: state.data.map((collection: Collection) => {
                         return collection._id === action.payload.collection_id
                              ? {
                                     ...collection,
                                     lists: collection.lists.map((list: List) => {
                                          return list._id === action.payload.list_id
                                               ? {
                                                      ...list,
                                                      tasks: list.tasks.map((task: Task) => {
                                                           return task._id === action.payload.task_id
                                                                ? { ...task, ...action.payload.value }
                                                                : task;
                                                      }),
                                                 }
                                               : list;
                                     }),
                                }
                              : collection;
                    }),
               };
          case "collections/task/swap":
               return {
                    ...state,
                    data: state.data.map((collection: Collection) => {
                         return collection._id === action.payload.collection_id
                              ? {
                                     ...collection,
                                     lists: collection.lists.map((list: List) => {
                                          return list._id === action.payload.list_id
                                               ? {
                                                      ...list,
                                                      tasks: list.tasks.map((element, index) =>
                                                           index === action.payload.firstIndex
                                                                ? list.tasks[action.payload.secondIndex]
                                                                : index === action.payload.secondIndex
                                                                ? list.tasks[action.payload.firstIndex]
                                                                : element
                                                      ),
                                                 }
                                               : list;
                                     }),
                                }
                              : collection;
                    }),
               };
          case "collections/task/move":
               let tasks_list = state.data
                    .find((collection) => collection._id === action.payload.collection_id)
                    ?.lists.find((list) => list._id === action.payload.list_id)?.tasks;
               if (!tasks_list) return { ...state };
               let new_tasks_list = [...tasks_list];
               new_tasks_list.splice(action.payload.old_index, 1);
               new_tasks_list.splice(action.payload.new_index, 0, { ...tasks_list[action.payload.old_index] });

               return {
                    ...state,
                    data: state.data.map((collection: Collection) => {
                         return collection._id === action.payload.collection_id
                              ? {
                                     ...collection,
                                     lists: collection.lists.map((list: List) => {
                                          return list._id === action.payload.list_id
                                               ? {
                                                      ...list,
                                                      tasks: [...new_tasks_list],
                                                 }
                                               : list;
                                     }),
                                }
                              : collection;
                    }),
               };
          case "collections/list/move":
               let lists = state.data.find((collection) => collection._id === action.payload.collection_id)?.lists;
               if (!lists) return { ...state };
               let new_lists = [...lists];
               new_lists.splice(action.payload.old_index, 1);
               new_lists.splice(action.payload.new_index, 0, { ...lists[action.payload.old_index] });

               return {
                    ...state,
                    data: state.data.map((collection: Collection) => {
                         return collection._id === action.payload.collection_id
                              ? {
                                     ...collection,
                                     lists: [...new_lists],
                                }
                              : collection;
                    }),
               };
          default:
               return state;
     }
};
