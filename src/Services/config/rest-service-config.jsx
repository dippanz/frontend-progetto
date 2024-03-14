export const URLs = {
  registerUrl: 'http://localhost:8080/api/utente/registrazione',
  loginUrl: 'http://localhost:8080/api/utente/login',
  getAllUsersUrl: 'http://localhost:8080/api/utente/get/all',
  deleteUserUrl: 'http://localhost:8080/api/utente/deleteUser/',
  getAllCourses: 'http://localhost:8080/api/corso/getAll',
  updateCourse: 'http://localhost:8080/api/corso/update',
  updateUser: 'http://localhost:8080/api/utente/aggiorna',
  getUserbyEmail: 'http://localhost:8080/api/utente?email=',
  createCourse: 'http://localhost:8080/api/corso',
  deleteCourse: 'http://localhost:8080/api/corso/delete/',
  getCorsiByEmailUtente: 'http://localhost:8080/api/utente/getCorsi/',
}

//aggiungere url per create corso

export const jwtExpirations = {
  oneYear: new Date().getFullYear(),
  oneMonth: 31,
  oneWeek: 7,
  oneDay: 1
}

export const courseCategories = {
  FrontEnd: 1,
  BackEnd: 2,
  FullStack: 3,
  CyberSecurity: 4
}

export const userRoles = {
  Admin: 1,
  Teacher: 2
}

export const cookieTypes = {
  jwt: "JWT"
}