// @ts-check

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
