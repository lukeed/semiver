export default function (a, b) {
	a = a.split('.');
	b = b.split('.');

	return a[0].localeCompare(b[0], 0, { numeric:1 })
			|| a[1].localeCompare(b[1], 0, { numeric:1 })
			|| a.slice(2).join('.').localeCompare(b.slice(2).join('.'), 0, { numeric:1 });
}
