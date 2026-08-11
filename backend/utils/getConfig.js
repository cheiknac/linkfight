function getConfig() {
    return {
        port: process.env.PORT || 3000,
        app_url: process.env.HOST_URL || 'localhost',
        pg_url: process.env.PG_URL,
    }
}

const config = getConfig();

export { config }