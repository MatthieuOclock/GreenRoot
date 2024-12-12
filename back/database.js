import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

// on a mis une url de connexion dans un fichier .env
// du type postgres://user:pass@example.com:5432/dbname
// ici PG_URL=postgres://bob:bob@:5432/bob
// ici on a ajoutée une option pour dire qu'on utilise la convention de nommage snake_case
const sequelize = new Sequelize(process.env.PG_URL, {
    define: {
        underscored: true,
    }
});

// on exporte ce qui représente notre client connecté à la base donnée
export default sequelize;


//Autre méthode pour la migration et le seeding par docker compose
// import { Sequelize } from "sequelize";
// import * as dotenv from 'dotenv';
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

// dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const sequelize = new Sequelize(process.env.PG_URL, {
//     define: {
//         underscored: true,
//     }
// });

// async function runMigrations() {
//     try {

//         const migrationPath = path.resolve(__dirname, 'migration.sql');
//         const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

//         await sequelize.query(migrationSQL);
//         console.log('Migration completed successfully!');
//     } catch (error) {
//         console.error('Error running migration:', error);
//     }
// }


// async function runSeeding() {
//     try {

//         const seedingPath = path.resolve(__dirname, 'seeding.sql');
//         const seedingSQL = fs.readFileSync(seedingPath, 'utf8');

//         await sequelize.query(seedingSQL);
//         console.log('Seeding completed successfully!');
//     } catch (error) {
//         console.error('Error running seeding:', error);
//     }
// }


// async function initializeDatabase() {
//     try {
//         await sequelize.authenticate();
//         await runMigrations();
//         await runSeeding();
//     } catch (error) {
//         console.error('Error initializing database:', error);
//     }
// }


// initializeDatabase();


// export default sequelize;