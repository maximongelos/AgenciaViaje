import {Viaje} from '../models/Viaje.js';
import {Testimonial} from '../models/Testimoniales.js';

const paginaDeInicio = async (req, res) => {
	//*Consultar 3 viajes del modelo Viaje

	const promiseDB = [];
	promiseDB.push(Viaje.findAll({limit: 3}));
	promiseDB.push(Testimonial.findAll({limit: 3}));
	try {
		const resultado = await Promise.all(promiseDB);

		res.render('inicio', {
			pagina: 'Inicio',
			clase: 'home',
			viajes: resultado[0],
			testimoniales: resultado[1],
		});
	} catch (e) {
		console.error(e);
	}
};

const paginaNosotros = (req, res) => {
	res.render('nosotros', {
		pagina: 'Nosotros',
	});
};

const paginaViajes = async (req, res) => {
	//*Consultar base de datos
	try {
		const viajes = await Viaje.findAll();

		res.render('viajes', {
			pagina: 'Próximos Viajes',
			viajes: viajes,
		});
	} catch (e) {
		console.error(e);
	}
};

const paginaTestimoniales = async (req, res) => {
	try {
		const testimoniales = await Testimonial.findAll();

		res.render('testimoniales', {
			pagina: 'Testimoniales',
			testimoniales,
		});
	} catch (e) {
		console.error(e);
	}
};

//Muestr un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
	const {slug} = req.params;

	try {
		const viaje = await Viaje.findOne({where: {slug}});

		res.render('viaje', {
			pagina: 'Informacion viaje',
			viaje,
		});
	} catch (e) {
		console.error(e);
	}
};

export {
	paginaDeInicio,
	paginaNosotros,
	paginaViajes,
	paginaTestimoniales,
	paginaDetalleViaje,
};
