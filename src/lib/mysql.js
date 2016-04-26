import knex from 'knex';

const defaultConfig = {
            debug: false,
            client: 'mysql2',
            connection: {
                host: '127.0.0.1',
                database: 'database',
                charset: 'utf8'
            },
            pool: {
                min: 2,
                max: 10,
                ping: (conn, cb) => {
                    conn.query('SELECT 1', cb);
                },
                pingTimeout: 10 * 1000
            }
        };

const config = {
    debug: false,
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        port: 3306,
        password: '123456',
        database: 'duobao',
        charset: 'utf8'
    }
};

var db = knex(Object.assign({}, defaultConfig, config));

export default {db, config}