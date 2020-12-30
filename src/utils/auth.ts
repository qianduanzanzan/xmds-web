export function setToken(token:string){
    try{
        localStorage.setItem("token",token)
        return true
    }catch{(e:any) => {
        console.log(e)
        return false
    }}
}

export function setUserInfo(userInfo:any){
    try{
        localStorage.setItem("userInfo",JSON.stringify(userInfo))
        return true
    }catch{(e:any) => {
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
    }catch{(e:any) => {
        console.log(e)
        return false
    }}
}
