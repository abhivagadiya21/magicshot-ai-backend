const database = {
    local: {
        host: "db.pljbpdpaineysedbmhir.supabase.co",
        user: "postgres",
        password: "Abhi1234@",
        database: "magicshot_supa",
        port: 5432,
        idleTimeoutMillis: 3000,
        ssl: {
            rejectUnauthorized: false, // needed if you're using self-signed certs (like on Heroku, Render, Neon, etc.)
        },
        keepAlive: true,
    }

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