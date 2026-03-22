import { createContext } from "react";

export const AppContext=createContext()


export const AppContextProvider=(prop)=>{

    const value={

    }

return(
    <AppContext.Provider value={value}>
        {prop.children}
    </AppContext.Provider>
)
}
