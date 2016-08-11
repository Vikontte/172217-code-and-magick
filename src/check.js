function getMessage(a,b) {
	var numberOfSteps = 0;
	var distancePath = 0;

	if (a === true) {
		return ('Я попал в ' + b);
	} else if (a === false) {
		return ('Я никуда не попал');
	} else if (typeof(a) === 'number') {
		return ('Я прыгнул на ' + a * 100 + ' сантиметров');
	} else if (Array.isArray(a) === true && Array.isArray(b) === true) {
		for (i = 0; i < a.length; i++) {
			distancePath += a[i] * b[i];
		}
		return ('Я прошел ' + distancePath + ' метров');
	} else if (Array.isArray(a) === true) {
		for (i = 0; i < a.length; i++) {
			numberOfSteps += a[i];
		}
		return ('Я прошел ' + numberOfSteps + ' шагов');
	}
}
