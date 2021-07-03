// @ts-check
/** Singleton, will only ever be one DynamicImporter class */
class DynamicImporter {
	constructor() { }

	/**
	 * Appends script elements to the document.body
	 * @param {string} url 
	 * @param {object} attrs 
	 * @param {function} cb 
	 * @returns {Promise<unknown, HTMLScriptElement>}
	 */
	append(url, attrs, cb) {
		let options = { once: true, capture: true };

		return new Promise((res, rej) => {
			let script = document.createElement('script');
			script.async = true;
			script.defer = true;
			for (let attr in attrs || {}) {
				script[attr] = attrs[attr];
			}

			script.addEventListener('load', () => cb(res, script), options);
			script.addEventListener('error', () => rej(script), options);

			document.body.appendChild(script);

			script.src = url;

			script = null;
		});
	}

	/**
	 * 
	 * @param {string|string[]} urls 
	 * @param {object} attr 
	 * @param {function} cb 
	 * @returns {Promise<unknown, HTMLScriptElement>}
	 */
	import(urls, attr, cb) {
		if (!cb) {
			cb = (res, script) => res(script);
		}
		if (!Array.isArray(urls)) {
			urls = [urls];
		}

		return Promise.all(urls.map(url => this.append(url, attr, cb)));
	}
	/**
	 * 
	 * @param  {...[(string|string[]), object, function]} urls 
	 * @returns 
	 */
	importChain(...urls) {
		const hasLoadedScript = this.import(...urls.shift());

		return urls.length ? hasLoadedScript.then(() => this.importChain(...urls)) : hasLoadedScript;
	}
}

/**
 * Returns a created DynamicImporter class so that it
 * acts similarly to a Singleton, such as Date or Math
 */
export default new DynamicImporter()
