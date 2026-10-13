/* 4CoreSteel: mobile menu and form sending. Runs entirely in the browser. */
(function () {
	var toggle = document.querySelector('.fcs-navtoggle');
	var nav = document.getElementById('fcs-nav');
	if (toggle && nav) {
		toggle.addEventListener('click', function () {
			var open = toggle.getAttribute('aria-expanded') === 'true';
			toggle.setAttribute('aria-expanded', String(!open));
			nav.classList.toggle('is-open', !open);
		});
		document.addEventListener('keydown', function (event) {
			if (event.key === 'Escape' && nav.classList.contains('is-open')) {
				toggle.setAttribute('aria-expanded', 'false');
				nav.classList.remove('is-open');
				toggle.focus();
			}
		});
	}

	/*
	 * Forms are delivered by Formspree (formspree.io), the same service as the
	 * RentMate waitlist. Each form's action holds its Formspree address.
	 */
	var SENT = {
		'fcs-contact': 'Message sent. We reply within one working day.',
		'fcs-application': 'Application sent. We read every application and reply if there is a match.'
	};
	var FAILED = 'The message did not send. Check your connection and try again.';
	var NOT_SET_UP = 'This form is not connected yet. Try again later.';

	function show(form, text, ok) {
		var old = form.querySelector('.fcs-notice');
		if (old) {
			old.remove();
		}
		var note = document.createElement('p');
		note.className = 'fcs-notice ' + (ok ? 'fcs-notice--ok' : 'fcs-notice--err');
		note.setAttribute('role', ok ? 'status' : 'alert');
		note.setAttribute('tabindex', '-1');
		note.textContent = text;
		form.insertBefore(note, form.firstChild);
		note.focus();
	}

	Array.prototype.forEach.call(document.querySelectorAll('form.fcs-form'), function (form) {
		form.addEventListener('submit', function (event) {
			event.preventDefault();
			if (form.action.indexOf('YOUR_') !== -1) {
				show(form, NOT_SET_UP, false);
				return;
			}
			var button = form.querySelector('button[type="submit"]');
			var label = button.textContent;
			button.disabled = true;
			button.textContent = 'Sending…';
			fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
				.then(function (response) {
					if (!response.ok) {
						throw new Error('HTTP ' + response.status);
					}
					form.reset();
					show(form, SENT[form.id] || SENT['fcs-contact'], true);
				})
				.catch(function () {
					show(form, FAILED, false);
				})
				.then(function () {
					button.disabled = false;
					button.textContent = label;
				});
		});
	});
})();
