import { createContext, useEffect, useState } from "react";
import { supabase } from "../database/supabase";

export const UserContext = createContext()

export default function UserContextProvider({ children }) {


    const [user, setUser] = useState()
    const [profile, setProfile] = useState()
    const [pUrl, setPUrl] = useState(null)
  



    const getUser = async () => {

        const { data: { session }, error } =
            await supabase.auth.getSession();



        if (session) {
            const currentUser = session.user;
            setUser(currentUser);

            const { data: profile } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", currentUser.id).single();

            setProfile(profile);
        } else {
            setUser(null);
            setProfile(null);
        }


    };

 



    useEffect(() => {
        getUser();

    }, []);

    useEffect(() => {
      
        

          if (profile?.avatar_url) {
            setPUrl(profile.avatar_url);
            console.log("true");
            
            
        } else {
            setPUrl(null);
            console.log("fase");
        }
    }, [profile]);



    const signOut = async () => {

        await supabase.auth.signOut();
        setProfile(null)
        setUser(null)
    }
    const signUp = async (newUser) => {


        const { data, error } = await supabase.auth.signUp(newUser);


        if (error) {

            return error.message;
        }



    }
    const login = async (loggedUser) => {

        const { data, error } = await supabase.auth.signInWithPassword(loggedUser);
        if (error) {

            return error.message;
        }



        await getUser()
    }
    const updateProfile = async (newProfile) => {


        const { data, error } = await supabase
            .from("profiles")
            .update(newProfile)
            .eq("id", user.id)
            .select()
            .single();



        setProfile(data);

        console.log(profile);



        // await getUser()

        // return error.message

    }
    const updateAvatar = async (image, filePath) => {

        console.log(profile);




        const { data: uploadData, error } = await supabase.storage
            .from("avatars")
            .upload(filePath, image, { upsert: true });

        if (error) {
            console.error("Upload failed:", error.message)
            return
        }

        const { data: urlData } = supabase.storage
            .from("avatars")
            .getPublicUrl(filePath);


        await supabase
            .from("profiles")
            .update({ avatar_url: urlData.publicUrl })
            .eq("id", user.id);




        setPUrl(urlData.publicUrl)



        await getUser()

        // return error.message

    }




    return <UserContext.Provider value={{ user, profile, setProfile, signOut, signUp, login, getUser, updateProfile, updateAvatar, pUrl }}>
        {children}
    </UserContext.Provider>



}