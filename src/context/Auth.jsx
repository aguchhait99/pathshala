const { createContext, useState, useEffect, useContext } = require("react");


const AuthContext = createContext()

const AUthProvider = ({children}) =>{
    const [auth, setAuth] = useState({
        user: null,
        token: ""
    })

    useEffect(()=>{
        const data = localStorage.getItem('auth')

        if (data){
            const parseData = JSON.parse(data)
            setAuth({
                ...auth,
                user: parseData.user, 
                token: parseData.token
            })
        }
    },[])

    return (
        <>
            <AuthContext.Provider value={[auth, setAuth]}>
                {children}
            </AuthContext.Provider>
        </>
    )

}

// Custom Hook

const useAuth = ()=> useContext(AuthContext)

export {useAuth, AUthProvider}