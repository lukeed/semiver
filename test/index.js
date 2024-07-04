import test from 'tape';
import semiver from '../src';

test.Test.prototype.semiver = function (a, b, val) {
	let txt = val === -1 ? 'less than' : val === 1 ? 'greater than' : 'equal to';
	this.is(semiver(a, b), val, `~> "${a}" is ${txt} "${b}"`);
};

test('exports', t => {
	t.is(typeof semiver, 'function', 'exports a function');
	t.end();
});

test('compare :: equal', t => {
	t.semiver('0.0.0', '0.0.0', 0);
	t.semiver('1.2.3', '1.2.3', 0);
	t.end();
});

test('compare :: less than', t => {
	t.semiver('0.0.0', '0.0.1', -1);
	t.semiver('0.0.0', '0.1.0', -1);
	t.semiver('1.9.0', '2.1.0', -1);
	t.semiver('1.9.0', '1.9.1', -1);
	t.semiver('1.0.0', '10.0.0', -1);
	t.semiver('8.9.0', '10.0.0', -1);
	t.semiver('1.2.3-next.6', '1.2.3-next.10', -1);
	t.semiver('2.0.0-alpha-6', '2.0.0-alpha-10', -1);
	t.semiver('2.0.0-alpha.8', '2.0.0-beta.1', -1);
	t.end();
});

test('compare :: greater than', t => {
	t.semiver('0.0.1', '0.0.0', 1);
	t.semiver('0.1.0', '0.0.0', 1);
	t.semiver('2.1.0', '1.9.0', 1);
	t.semiver('1.9.1', '1.9.0', 1);
	t.semiver('10.0.0', '1.0.0', 1);
	t.semiver('10.0.0', '8.9.0', 1);
	t.semiver('1.2.3-next.10', '1.2.3-next.6', 1);
	t.semiver('2.0.0-alpha-10', '2.0.0-alpha-6', 1);
	t.semiver('2.0.0-beta.1', '2.0.0-alpha.8', 1);
	t.end();
});

test('compare :: clean vs suffix', t => {
	// "stable"/clean is always bigger
	t.semiver('1.0.0', '1.0.0-canary', 1);
	t.semiver('1.0.0', '1.0.0-alpha.1', 1);
	t.semiver('1.0.0', '1.0.0.alpha', 1);
	t.semiver('1.0.0', '1.0.0-beta', 1);

	t.semiver('1.0.0-canary', '1.0.0', -1);
	t.semiver('1.0.0-alpha.1', '1.0.0', -1);
	t.semiver('1.0.0.alpha', '1.0.0', -1);
	t.semiver('1.0.0-beta', '1.0.0', -1);

	t.semiver('1.0.0', '1.0.1-canary', -1);
	t.semiver('1.0.0', '1.0.1-alpha.1', -1);
	t.semiver('1.0.0', '1.0.1-beta', -1);

	t.end();
});

test('compare :: sorting', t => {
	t.same(
		[
			'4.11.6', '4.2.0',
			'1.5.19', '1.5.5',
			'4.1.3',
			'2.3.1',
			'10.5.5',
			'11.3.0',
			'1.0.0', '1.0.0-rc.1',
			'1.2.3', '1.2.3-alpha',
			'1.0.0-beta.11', '1.0.0-beta', '1.0.0-beta.2',
			'1.0.0-alpha.1', '1.0.0-alpha',
			'1.0.0-alpha.beta',
		].sort(semiver),
		[
			'1.0.0-alpha', '1.0.0-alpha.1', '1.0.0-alpha.beta',
			'1.0.0-beta', '1.0.0-beta.2', '1.0.0-beta.11',
			'1.0.0-rc.1',
			'1.0.0',
			'1.2.3-alpha', '1.2.3',
			'1.5.5', '1.5.19',
			'2.3.1',
			'4.1.3', '4.2.0', '4.11.6',
			'10.5.5',
			'11.3.0'
		]
	);

	t.end();
});
