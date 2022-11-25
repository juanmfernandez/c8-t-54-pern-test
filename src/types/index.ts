declare namespace Express { 
    export interface Request {
      user: {
        name: string,
        surname: string,
        age: number,
        password: String,
        id: String,
        dataValues: {}
      }
     }
  }