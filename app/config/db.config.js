import { createPool } from "mysql2/promise";
import { config } from "dotenv";

config();

const conexion = createPool({
    host: process.env.MYSQLHOST || "db4free.net",
    user: process.env.MYSQLUSER || "basedatos_inclusion",
    password: process.env.MYSQLPASSWORD || "basedatos_inclusion",
    port: process.env.MYSQLPORT || 3306,
    database: process.env.MYSQLDATABASE || "basedatos_inclusion",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export default conexion;