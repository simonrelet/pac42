import aStar from './aStar';
import maps from '../maps';

const map = maps.create();
const from = { line: 8, column: 36 };
const to = { line: 8, column: 8 };

console.log(aStar(from, to, map));
