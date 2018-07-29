import generator from './lib';

const map = generator.createMap({
  nbLines: 7,
  nbColumns: 9,
});

console.log(`size: ${map.size.nbLines} x ${map.size.nbColumns}`);
console.log(`center at: ${map.center.line} x ${map.center.column}`);
map.map.forEach(line => {
  console.log(line.map(c => (c === '_' ? ' ' : c)).join(''));
});
