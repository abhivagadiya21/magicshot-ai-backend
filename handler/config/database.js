const database = {
    // local: {
    //     host: "dpg-d2nv5ajipnbc73d08m50-a",
    //     user: "magicshot_user",
    //     password: "NiRJmLqMHSTb4PsPbMGIxaJ1GXupyva9",
    //     database: "magicshot",
    //     port: 5432,
    //     idleTimeoutMillis: 3000
    // }
    local: {
        host: "192.168.1.8",
        user: "postgres",
        password: "Abhi1234@",
        database: "magicshot",
        port: 5432,
        // idleTimeoutMillis: 3000
    }

    // local: {
    //     host: "192.168.1.8",
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