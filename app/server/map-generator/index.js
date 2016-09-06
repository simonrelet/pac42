'use strict';

const createBlueprint = require('./create-blueprint');
const createHalfMap = require('./create-half-map');

const nbLines = 7;
const nbColumns = 9;
const res = createBlueprint(nbLines, nbColumns);
createHalfMap(res.bp, res.groupsCount, nbLines, nbColumns);
