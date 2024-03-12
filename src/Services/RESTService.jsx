import { URLs } from './config/rest-service-config'
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { jwtExpirations } from './config/rest-service-config';
import { cookieTypes } from './config/rest-service-config';

//registrazione
export async function registerUser(formData){
  const jsonData = JSON.stringify(formData)
  const response = await fetch(URLs.registerUrl, {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: jsonData
  })
  return response.status
}

//login
export async function loginUser(formData){
  const jsonData = JSON.stringify(formData)
  const response = await fetch(URLs.loginUrl, {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: jsonData
  })
  return response
}

//recupero utente tramite email
export async function getUserByEmail(email) {
  const jsonData = JSON.stringify(email)
  const response = await fetch(URLs.getUserbyEmail + `/?email=${email}`, {
    mode: "cors",
    method: "GET",
  })
  return response
}

//recupero tutti gli utenti
export async function getAllUsers(){
  try{
    const response = await fetch(URLs.getAllUsersUrl, {
      mode: "cors"
    })
    const allUsersData = await response.json()
    return allUsersData

  }catch(error){
    return null
  }
}

//recupero tutti i corsi
export async function getAllCourses(){
  const response = await fetch(URLs.getAllCourses, {
    mode: "cors",
    headers: {
      "Authorization": getBearerToken(cookieTypes.jwt)
    }
  })
  const allCoursesData = await response.json()
  console.log(allCoursesData)
  return allCoursesData
}

//creo un corso
export async function createCourse(data){
  const jsonData = JSON.stringify(data)
  const response = await fetch(URLs.createCourse, {
    mode: "cors",
    method: "POST",
    body: jsonData,
    headers: {
      "Content-Type": "application/json",
      "Authorization": getBearerToken(cookieTypes.jwt)
    },
  })
  return response.status
}

//elimino corso
export async function deleteCourse(nome){
  const response = await fetch(`${URLs.deleteCourse}${nome}`, {
    mode: "cors",
    method : "DELETE",
    headers: {
      "Authorization": getBearerToken(cookieTypes.jwt)
    }
  })
  return response.status
}

//pagina di dettaglio corso
export async function getCourseById(id){
  const response = fetch(`http://localhost:8080/api/corsi/${id}`,{
    headers: {
      "Authorization": getBearerToken(cookieTypes.jwt)
    }
  })
  const jsonResponse = (await response).json()
  return jsonResponse
}

//aggiornamento dati corso
export async function updateCourse(formData){
  const jsonData = JSON.stringify(formData)
  const response = await fetch(URLs.updateCourse, {
  
    mode: 'cors',
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Authorization": getBearerToken(cookieTypes.jwt)
    },
    body: jsonData
  })
  return response.status
}

//aggiornamento dati utente
export async function updateUser(formData){
  const jsonData = JSON.stringify(formData)
  const response = await fetch(URLs.updateUser, {
    mode: 'cors',
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    body: jsonData
  })
  return response.status
}

export async function deleteUser(email){
 const response = await fetch(URLs.deleteUserUrl + email, {
  method: "DELETE",
  mode: "cors"
 })
 return response.status
}

//cancello il cookie
export function deleteCookie(type){
  Cookies.remove(type)
}

//salvo il jwt nei cookies
export function setLoginCookie(jwtToken) {
  const jwtString = JSON.stringify(jwtToken.token)
  Cookies.set(cookieTypes.jwt, jwtString, {expires: jwtExpirations.oneMonth})
  return jwtDecode(jwtString)
}

//controllo che esista il jwt e, se esiste, lo decodifico per leggere i dati dell'utente
export function checkLoginCookie(type){
  const loginCookie = Cookies.get(type)
  if(loginCookie != undefined){
    return jwtDecode(loginCookie)
  } else {
    return null
  }
}

//controllo che esista il jwt e, se esiste, lo estraggo concatenato con Bearer
export function getBearerToken(type){
  const loginCookie = Cookies.get(type)
  const shortToken = loginCookie.substring(1, loginCookie.length - 1)
  if(shortToken != undefined){
    return "Bearer " + shortToken
  } else {
    return null
  }
}
