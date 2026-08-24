// Expresiones regulares para formularios de Stock y Usuarios

export const stockRegex = {
	nombre: /^(?=.{2,80}$)[A-Za-zÁÉÍÓÚáéíóúÑñ0-9][A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s.,()\-_/]*$/,
	codigo: /^[A-Za-z0-9][A-Za-z0-9\-_]{1,29}$/,
	categoria: /^(?=.{2,50}$)[A-Za-zÁÉÍÓÚáéíóúÑñ0-9][A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s\-_/]*$/,
	descripcion: /^.{0,300}$/,
	precio: /^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/,
	costo: /^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/,
	cantidad: /^(?:0|[1-9]\d{0,8})$/,
	unidad: /^(?=.{1,20}$)[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/,
};

export const userRegex = {
	nombre: /^(?=.{2,60}$)[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/,
	apellido: /^(?=.{2,60}$)[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/,
	username: /^(?=.{4,25}$)[a-zA-Z0-9._-]+$/,
	email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
	telefono: /^(?:\+?\d{1,3})?[\s-]?(?:\d[\s-]?){7,14}\d$/,
	rol: /^(?=.{2,30}$)[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
	password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,64}$/,
};

export const commonRegex = {
	id: /^\d+$/,
	estado: /^(?:0|1|true|false|activo|inactivo)$/i,
};

export const validateByRegex = (regex, value) => regex.test(String(value ?? "").trim());

