import './similar-offers.js';
import {formSubmit} from './form.js';
import './form-offer-validate.js';
import {form, title, price, capacity} from './form-offer-validate.js';
import './map.js';
import {createObjects} from './utils/data.js';

createObjects();
formSubmit(form, title, price, capacity);


