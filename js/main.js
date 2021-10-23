import './similar-offers.js';
import {toggleFormState, formSubmit} from './form.js';
import './form-offer-validate.js';

import {
  createObjects
} from './utils/data.js';

createObjects();

toggleFormState(true);
setTimeout(() => {toggleFormState(false);}, 2000);

formSubmit();
