export interface Database {
    host: string,
    database: string,
    port: number,
    username: string,
    password: string,
    dialect: string,
    logging: boolean
}
