const database = {
    local: {
        host: "db.pljbpdpaineysedbmhir.supabase.co",
        user: "postgres",
        password: "Abhi1234@",
        database: "postgres",
        port: 5432,
        idleTimeoutMillis: 3000,
        family: 4
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