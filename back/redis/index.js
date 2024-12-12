import { createClient } from 'redis';

// Créer un client Redis
const redisClient = createClient();

redisClient.on('connect', () => {
    console.log('Connecté à Redis');
});

redisClient.on('error', (err) => {
    console.error('Erreur Redis :', err);
});

// Connecter Redis
await redisClient.connect();

// Exemple : Stocker une base de données simple
await redisClient.set('utilisateur:1', JSON.stringify({ id: 1, nom: 'Alice' }));
await redisClient.set('utilisateur:2', JSON.stringify({ id: 2, nom: 'Bob' }));

// Récupérer les données
const utilisateur1 = JSON.parse(await redisClient.get('utilisateur:1'));
const utilisateur2 = JSON.parse(await redisClient.get('utilisateur:2'));
console.log(utilisateur1 , utilisateur2); // { id: 1, nom: 'Alice' }

await redisClient.quit();