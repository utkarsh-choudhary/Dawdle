
import React, { useState } from "react";
import UserContext from "./UserContext";


const UserContextProvider=({children})=>{

    const [user, setUser] = useState(
        {
            companyName: 'Amazon',
            productName: 'services',
            description: 'This is a brief product description',
            useCases: [
                'Use Case 1',
                'Use Case 2',
                'Use Case 3'
                ]
        },
        
    );

    return (
        <UserContext.Provider value={{user, setUser}}>
        {children}
        </UserContext.Provider>
    )
}


export default UserContextProvider;