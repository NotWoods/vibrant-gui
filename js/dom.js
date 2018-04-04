/**
 * @typedef {object} ColorSwatch
 * @prop {string} color - main color, as a hex string
 * @prop {string} textColor - text color, as a hex string
 */

/**
 * @typedef {object} ColorPalette
 * @prop {ColorSwatch | null} [vibrant]
 * @prop {ColorSwatch | null} [darkVibrant]
 * @prop {ColorSwatch | null} [lightVibrant]
 * @prop {ColorSwatch | null} [muted]
 * @prop {ColorSwatch | null} [darkMuted]
 * @prop {ColorSwatch | null} [lightMuted]
 */

/**
 * Update a palette descriptor - either a grid item, or the palette page
 * @param {HTMLElement} node element to update
 * @param {string} imgSrc image source url
 * @param {ColorPalette} colors object with colors to use
 */
function updatePaletteData(node, imgSrc = "icons/placeholder.svg", colors = {}) {
	node.querySelector("img.preview").src = imgSrc;
	updateSwatch(node, "vibrant", colors.vibrant);
	updateSwatch(node, "dark-vibrant", colors.darkVibrant);
	updateSwatch(node, "light-vibrant", colors.lightVibrant);
	updateSwatch(node, "muted", colors.muted);
	updateSwatch(node, "dark-muted", colors.darkMuted);
	updateSwatch(node, "light-muted", colors.lightMuted);
}

/**
 * Update a swatch element
 * @param {HTMLElement} parent
 * @param {string} name
 * @param {ColorSwatch | null} data
 */
function updateSwatch(parent, name, data) {
	const swatch = parent.querySelector(`.swatch.${name}`);
	const text = swatch.querySelector("swatch-text");

	swatch.hidden = data == null;
	if (data) {
		parent.style.setProperty(`--${name}`, data.color);
		parent.style.setProperty(`--${name}-text`, data.textColor);
	} else {
		parent.style.removeProperty(`--${name}`);
		parent.style.removeProperty(`--${name}-text`);
	}

	if (text) {
		text.textContent = data != null ? data.color : "#??????"
	}
}

/**
 * Get an image source from a FileList
 * @param {FileList} files
 * @returns {string} used as `<img src="return value">`
 */
function processImageFiles(files) {
	const file = Array.from(files).find(file => file.type.match(/^image\//));
	if (file !== null) {
		return URL.createObjectURL(file);
	} else {
		return "";
	}
}