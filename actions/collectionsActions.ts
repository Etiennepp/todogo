export const getCollections = (data: any) => {
     return {
          type: "collections/get",
          payload: data,
     };
};

export const updateCollection = (data: any) => {
     return {
          type: "collections/put",
          payload: data,
     };
};

export const addCollection = (data: any) => {
     return {
          type: "collections/post",
          payload: data,
     };
};

export const addList = (data: any) => {
     return {
          type: "collections/list/add",
          payload: data,
     };
};

export const updateList = (data: any) => {
     return {
          type: "collections/list/update",
          payload: data,
     };
};

export const removeList = (data: any) => {
     return {
          type: "collections/list/remove",
          payload: data,
     };
};

export const removeCollection = (data: any) => {
     return {
          type: "collections/delete",
          payload: data,
     };
};

export const addTask = (data: any) => {
     return {
          type: "collections/task/add",
          payload: data,
     };
};
export const removeTask = (data: any) => {
     return {
          type: "collections/task/remove",
          payload: data,
     };
};

export const updateTaskPosition = (data: any) => {
     return {
          type: "collections/task/move",
          payload: data,
     };
};

export const updateListPosition = (data: any) => {
     return {
          type: "collections/list/move",
          payload: data,
     };
};
export const swapTasksPosition = (data: any) => {
     return {
          type: "collections/task/swap",
          payload: data,
     };
};

export const updateTask = (data: any) => {
     return {
          type: "collections/task/update",
          payload: data,
     };
};
