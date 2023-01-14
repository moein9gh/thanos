import * as store from "@store";
import fs from "fs";
import path from "path";

export class Migrator {

    constructor(readonly store: store.Postgres) {
    }

    async execMigrations() {
        const fileNames = fs.readdirSync(path.resolve("src", "migrations")).filter(fn => fn.endsWith(".sql"));
        for (const fn of fileNames) {
            const query = fs.readFileSync(path.resolve("src", "migrations", fn)).toString();

            await this.store.client.query(query);
            // console.log(`${fn} migration executed`);
        }
    }

    async dropTables() {
        await this.store.client.query("DROP SCHEMA public CASCADE;CREATE SCHEMA public;");
        // console.log("all tables dropped");
    }
}