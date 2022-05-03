import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv';
dotenv.config({path: 'variables.env'});

const app = express();

//!Conectarse a la base de datos
db.authenticate()
	.then(() => console.log('Conexión exitosa a la BD'))
	.catch((e) => console.log('Hubo un error al conectar la BD', e));

//Habilitar pug
app.set('view engine', 'pug');

//Obtener el año actual
app.use((req, res, next) => {
	const year = new Date();
	res.locals.actualYear = year.getFullYear();
	res.locals.nombrePagina = 'Agencia Viajes';
	return next();
});

// Agregar body para leer los fomrularios
app.use(express.urlencoded({extended: true}));

//Definir la carpeta publica
app.use(express.static('public'));

//Agregar router
app.use('/', router);

//Puerto y host para la app
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
	console.log(`El servidor esta funcionando en el puerto ${port}`);
});
