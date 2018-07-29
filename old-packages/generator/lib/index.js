import createBlueprint from './createBlueprint';
import createHalfMap from './createHalfMap';

export default {
  createMap: ({ nbLines, nbColumns }) => {
    const blueprint = createBlueprint({ nbLines, nbColumns });
    return createHalfMap(
      blueprint.blueprint,
      blueprint.groupsCount,
      nbLines,
      nbColumns,
    );
  },
};
