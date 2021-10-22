import './similar-offers.js';
import {toggleFormState} from './form.js';

import {
  createObjects
} from './utils/data.js';

createObjects();

toggleFormState(true);
setTimeout(() => {toggleFormState(false);}, 2000);
