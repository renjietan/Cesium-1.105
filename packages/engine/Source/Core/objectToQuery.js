import defined from "./defined.js";
import DeveloperError from "./DeveloperError.js";

/**
 * Converts an object representing a set of name/value pairs into a query string,
 * with names and values encoded properly for use in a URL.  Values that are arrays
 * will produce multiple values with the same name.
 * @function objectToQuery
 *
 * @param {object} obj The object containing data to encode.
 * @returns {string} An encoded query string.
 *
 *
 * @example
 * const str = Cesium.objectToQuery({
 *     key1 : 'some value',
 *     key2 : 'a/b',
 *     key3 : ['x', 'y']
 * });
 *
 * @see queryToObject
 * // str will be:
 * // 'key1=some%20value&key2=a%2Fb&key3=x&key3=y'
 */
function objectToQuery(obj) {
  //>>includeStart('debug', pragmas.debug);
  if (!defined(obj)) {
    throw new DeveloperError("obj is required.");
  }
  //>>includeEnd('debug');

  let result = "";
  for (const propName in obj) {
    if (obj.hasOwnProperty(propName)) {
      const value = obj[propName];

      const part = `${encodeURIComponent(propName)}=`;
      if (Array.isArray(value)) {
        for (let i = 0, len = value.length; i < len; ++i) {
          result += `${part + encodeURIComponent(value[i])}&`;
        }
      } else {
        result += `${part + encodeURIComponent(value)}&`;
      }
    }
  }

  // trim last &
  result = result.slice(0, -1);

  // This function used to replace %20 with + which is more compact and readable.
  // However, some servers didn't properly handle + as a space.
  // https://github.com/CesiumGS/cesium/issues/2192

  return result;
}
export default objectToQuery;
