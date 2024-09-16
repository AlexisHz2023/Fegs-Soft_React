const Validation = (values) => {
  const errors = {};

  // Validación del nombre
  if (!values.name.trim()) {
    errors.name = "Nombre requerido";
  }

  // Validación del Documento
  if (!values.Documento.trim()) {
    errors.Documento = "Documento requerido";
  } else if (!/^\d+$/.test(values.Documento)) {
    errors.Documento = "Documento debe contener solo números";
  }

  // Validación del correo
  if (!values.email.trim()) {
    errors.email = "Correo requerido";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Correo no válido";
  }

  // Validación de la contraseña
  if (!values.password.trim()) {
    errors.password = "Contraseña requerida";
  } else if (values.password.length < 6) {
    errors.password = "La contraseña debe tener al menos 6 caracteres";
  }

  // Validación de la confirmación de contraseña
  if (!values.confirmPassword.trim()) {
    errors.confirmPassword = "Confirmación de contraseña requerida";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }

  return errors;
};

export default Validation;


