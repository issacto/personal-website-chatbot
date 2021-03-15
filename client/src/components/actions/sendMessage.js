import axios from "axios";


export function sendText(input){
    var url = '/getMessage?message='+input;
    const dataPromise = axios.get(url).then((response) => {
          console.log("yoyo",response.data.message);
          return response.data}).catch(err => {console.log("Error:");return null})
    return dataPromise;
}



export function newSelfile(input){
    const dataPromise = axios.post("/getSelfie",  {
        data:input, abc:"abc"
      } ).then((response) => {
          console.log("hihi",response.data.message);
          return response.data.message}).catch(err => {console.log("Error:");return null})
      
    return dataPromise;
}