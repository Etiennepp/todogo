import { useUser } from "@auth0/nextjs-auth0/client";
import React, { useEffect } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import TopMenu from "../../components/TopMenu/TopMenu";
import { useAuth0 } from "@auth0/auth0-react";
import { RootState } from "../../reducers/index";
import { API_URL } from "../../config";
import { useSelector, useDispatch } from "react-redux";
import { getCollections } from "../../actions/collectionsActions";
import Editor from "../../components/Editor/Editor";
import CreateCollectionModal from "../../components/CreateCollectionModal/CreateCollectionModal";
import DeleteCollectionModal from "../../components/DeleteCollectionModal/DeleteCollectionModal";
import CreateListModal from "../../components/CreateListModal/CreateListModal";
import DeleteListModal from "../../components/DeleteListModal/DeleteListModal";
import EditListModal from "../../components/EditListModal/EditListModal";
import EditCollectionModal from "../../components/EditCollectionModal/EditCollectionModal";

export default function Todos() {
     const { user, error, isLoading } = useUser();
     const theme = useSelector((state: RootState) => state.theme);
     const dispatch = useDispatch();

     const fetchCollections = async () => {
          const { data } = await axios.get(API_URL + "collections");
          dispatch(getCollections(data.data));
     };

     useEffect(() => {
          fetchCollections();
     }, []);

     return (
          <>
               {isLoading && <p>Loading profile...</p>}

               {error && (
                    <>
                         <h4>Error</h4>
                         <pre>{error.message}</pre>
                    </>
               )}
               {user && (
                    <div className={theme === "DARK" ? "dark" : ""}>
                         <div className="h-screen dark:bg-slate-900 flex flex-col relative">
                              <CreateCollectionModal />
                              <EditCollectionModal />
                              <DeleteCollectionModal />
                              <CreateListModal />
                              <DeleteListModal />
                              <EditListModal />
                              <TopMenu />
                              <div className="container md mx-auto flex flex-row flex-1 overflow-hidden">
                                   <Sidebar />
                                   <div className="h-full flex-1 dark:bg-slate-900">
                                        <Editor />
                                   </div>
                              </div>
                         </div>
                    </div>
               )}
          </>
     );
}
export const getServerSideProps = withPageAuthRequired();
