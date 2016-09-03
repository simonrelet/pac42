'use strict';

export default function(obj, funcs) {
  funcs.forEach(func => {
    obj[func] = obj[func].bind(obj);
  });
}
