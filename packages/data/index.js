// @ts-check
/**
 * Get true type of an object/variable
 * @param {unknown} v 
 * @returns {string}
 */
export const trueTypeOf = v => Object.prototype.toString.call(v).slice(8, -1);


const handler = {
	/**
	 * @param {object} target
	 * @param {string} name
	 * @returns unknown
	 */
	get(target, name) {
		if (typeof target[name] != 'undefined') {
			if ('properties' in target === false)
				return Reflect.get(target, name);
			if (target.properties[target[name]])
				return Reflect.get(target, 'properties')[target[name]];
		}
		console.warn(`No such enumerator: ${name}`);
		return false;
	},
	/**
	 * Since our Enum is read only, this doesn't let us set any new values
	 * @param {object} x
	 * @param {string} key
	 * @param {unknown} name
	 */
	set(x, key, name) {
		console.warn(
			`Cannot add/update properties on an Enum instance after it is defined - ${key}: ${name}`,
		);
		return false;
	},
};

/**
 *
 * @param {object} enumObject
 * @returns {ProxyHandler<object, handler>}
 */
export const Enum = (enumObject) => new Proxy(enumObject, handler);

/**
 * a non CSPRNG random number generator
 * @param {number} a - the length of the returned id
 * @param {number} b? - the length of the Int8Array
 * @returns {string}
 */
export const randid = (a, b = 9) =>
	crypto
		.getRandomValues(new Int8Array(b))
		.map(Math.abs)
		.join('')
		.substr(0, a);
