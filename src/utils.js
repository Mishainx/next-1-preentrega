const titleRegex = /^[a-zA-Z0-9\s\-]{1,50}$/;
const slugRegex = /^[a-z0-9-]{1,50}$/;
const priceRegex = /^\d{1,6}$/;
const stockRegex = /^\d{1,4}$/;
const categoryRegex = /^[a-z]{1,25}$/;
const descriptionRegex = /^[\s\S]{1,255}$/;
const nameRegex = /^[a-zA-Z\s]+$/;
const surnameRegex = /^[a-zA-Z\s]+$/;
const telephoneRegex = /^\d{1,13}$/;// Asumiendo que el formato del teléfono puede ser +5491132396935
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^[a-zA-Z0-9]{6,}$/;


export function titleValidate(title) {
    return titleRegex.test(title);
  }

export function slugValidate(slug) {
    return slugRegex.test(slug);
}

export function priceValidate(price) {
    return priceRegex.test(price);
}

export function stockValidate(stock) {
    return stockRegex.test(stock);
}

export function categoryValidate(category) {
    return categoryRegex.test(category);
}

export function descriptionValidate(description) {
    return descriptionRegex.test(description);
}

export function isValidName(name) {
    return nameRegex.test(name);
  }
  
export  function isValidSurname(surname) {
    return surnameRegex.test(surname);
  }
  
export  function isValidTelephone(telephone) {
    return telephoneRegex.test(telephone);
  }
  
export  function isValidEmail(email) {
    return emailRegex.test(email);
  }
  
export  function isValidPassword(password) {
    return passwordRegex.test(password);
  }