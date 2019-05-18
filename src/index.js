export default function (a, b) {
	var i=0, tmp;

	a = a.split('.');
	b = b.split('.');

	a[2] = a.slice(2).join('.');
	b[2] = b.slice(2).join('.');

	for (; i < 3; i++) {
		if (tmp = a[i].localeCompare(b[i], 0, { numeric:1 })) {
			return tmp;
		}
	}

	return 0;
}
