import './similar-offers.js';
import {disableForms, enableForms} from './form.js';

import {
  createObjects
} from './utils/data.js';

createObjects();

disableForms();

setTimeout(() => {enableForms();}, 2000);
