var fn = new Intl.Collator(0, { numeric:1 }).compare;

export default function (a, b) {
	a = a.split('.');
	b = b.split('.');

	return fn(a[0], b[0])
			|| fn(a[1], b[1])
			|| fn(a.slice(2).join('.'), b.slice(2).join('.'));
}
