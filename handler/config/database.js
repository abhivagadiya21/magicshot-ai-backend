const database = {
    local: {
        host: "dpg-d2nv5ajipnbc73d08m50-a.singapore-postgres.render.com",
        user: "magicshot_user",
        password: "NiRJmLqMHSTb4PsPbMGIxaJ1GXupyva9",
        database: "magicshot",
        port: 5432,
        idleTimeoutMillis: 3000,
        ssl: {
            rejectUnauthorized: true, // needed if you're using self-signed certs (like on Heroku, Render, Neon, etc.)
        },
    }
// this is comment normal
    // local: {
    //     host: "192.168.1.21",
    //     user: "postgres",
    //     password: "Abhi1234@",
    //     database: "magicshot",
    //     port: 5432,
    //     // idleTimeoutMillis: 3000
    // }
}

module.exports = {
    database
}