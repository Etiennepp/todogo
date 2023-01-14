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
export const setSelectedCollectionId = (data: any) => {
     return {
          type: "collections/selectCollection",
          payload: data,
     };
};
export const unselectCollection = () => {
     return {
          type: "collections/unselectCollection",
     };
};

export const setSelectedListId = (data: any) => {
     return {
          type: "collections/selectList",
          payload: data,
     };
};

export const unselectList = () => {
     return {
          type: "collections/unselectList",
     };
};
