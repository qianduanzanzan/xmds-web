export function setToken(token:string){
    try{
        localStorage.setItem("token",token)
        return true
    }catch{(e:string) => {
        console.log(e)
        return false
    }}
}

export function getToken(){
    return localStorage.getItem("token")
}

export function removeToken(token:string){
    try{
        localStorage.removeItem("token")
        return true
    }catch{(e:string) => {
        console.log(e)
        return false
    }}
}
