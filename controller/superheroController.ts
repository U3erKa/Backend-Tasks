// @ts-ignore Can't detect autoimported model
import { SuperHero as __SuperHero } from '../models';
import type { _SuperHero } from '../models/superhero';

// Hack to infer the model type
const SuperHero: _SuperHero = __SuperHero;

console.log(SuperHero)