export const authLocal ={
    setToken : (token)=>{
        localStorage.setItem('token', token)
    },
    getToken : ()=>{
        return localStorage.getItem('token')
    }
}