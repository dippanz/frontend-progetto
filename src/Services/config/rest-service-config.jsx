export const URLs = {
  registerUrl: 'http://localhost:8080/api/utente/registrazione',
  loginUrl: 'http://localhost:8080/api/utente/login',
  getAllUsersUrl: 'http://localhost:8080/api/utente/utenti',
  deleteUserUrl: 'http://localhost:8080/api/utente/delete/',
  getAllCourses: 'http://localhost:8080/api/corsi/corsi',
  updateCourse: 'http://localhost:8080/api/corsi/update',
  updateUser: 'http://localhost:8080/api/utente/update',
  getUserbyEmail: 'http://localhost:8080/api/utente/utente',
  createCourse: 'http://localhost:8080/api/corsi/create',
  deleteCourse: 'http://localhost:8080/api/corsi/delete/'
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