// @ts-check
/**
 * @param {HTMLElement} element
 * @param {string} [prefix]
 */
export const getOptionsFromDataset = (element, prefix) => (
	(prefix = !!prefix ? prefix + '-' : ''),
	Object.assign(
		{},
		...Array.from(Object.values(element.attributes), (attr) =>
			attr.name.match('data-' + prefix)
				? {
						// key === attribute name after data-, and replace - & the following character with following character uppercase;
						[attr.name
							.split('data-' + prefix)[1]
							.replace(/-./g, (x) => x.toUpperCase()[1])]:
							attr.value,
				  }
				: false,
		).filter((v) => v),
	)
);

export const fixRelOpener = () =>
	requestAnimationFrame((e) =>
		document
			.querySelectorAll('a[target=_blank]:not([rel*=noopener])')
			.forEach((e) => {
				e.setAttribute('rel', e.getAttribute('rel') + ' noopener');
			}),
	);

export const rIC =
	// @ts-expect-error
	self.requestIdleCallback ||
	((
		/** @type {(callbackArguments: { didTimeout: boolean; timeRemaining: (e: undefined) => number; }) => any} */ callback,
		start = +new Date(),
	) =>
		setTimeout(
			/** @param {undefined} l */ (l) =>
				callback({
					didTimeout: !1,
					timeRemaining: /** @param {undefined} e */ (e) =>
						Math.max(0, 50 - (+new Date() - start)),
				}),
			1,
		));

export const cIC =
	//@ts-expect-error
	self.cancelIdleCallback || ((/** @type {number} */ e) => clearTimeout(e));
