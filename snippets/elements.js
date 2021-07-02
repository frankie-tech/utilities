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
