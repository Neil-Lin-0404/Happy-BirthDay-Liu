let EnToNum = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"];

// Show only the detail panel at `index` (0-based). Hide the others.
function showIndex(index) {
	EnToNum.forEach((id, i) => {
		const el = document.getElementById(id);
		if (!el) return;
		el.style.display = (i === index) ? 'block' : 'none';
	});
}

// Convenience functions matching the inline onclick handlers in the HTML
function show1(){ showIndex(0); }
function show2(){ showIndex(1); }
function show3(){ showIndex(2); }
function show4(){ showIndex(3); }
function show5(){ showIndex(4); }
function show6(){ showIndex(5); }
function show7(){ showIndex(6); }
function show8(){ showIndex(7); }
function show9(){ showIndex(8); }
function show10(){ showIndex(9); }

// Initialize: hide all panels then show the first one
document.addEventListener('DOMContentLoaded', () => {
	showIndex(0);
});

// Responsive image mapping: mobile / desktop only
const imageMap = [
	{ mobile: './images-vertical/train-1.png', desktop: './images-horziontal/train-1.jpg' },
	{ mobile: './images-vertical/train-2.png', desktop: './images-horziontal/train-2.jpg' },
	{ mobile: './images-vertical/train-3.png', desktop: './images-horziontal/train-1.jpg' },
	{ mobile: './images-vertical/train-4.png', desktop: './images-horziontal/train-4.jpg' },
	{ mobile: './images-vertical/train-5.png', desktop: './images-horziontal/train-5.jpg' },
	{ mobile: './images-vertical/train-6.png', desktop: './images-horziontal/train-6.jpg' },
	{ mobile: './images-vertical/train-7.png', desktop: './images-horziontal/train-7.jpg' },
	{ mobile: './images-vertical/train-8.png', desktop: './images-horziontal/train-8.jpg' },
	{ mobile: './images-vertical/train-9.png', desktop: './images-horziontal/train-9.jpg' },
	{ mobile: './images-vertical/train-10.png', desktop: './images-horziontal/train-10.jpg' }
];

let currentIndex = 0;

function getSizeKey() {
	// breakpoint: mobile < 768, desktop >= 768
	return (window.innerWidth < 768) ? 'mobile' : 'desktop';
}

function applyBackgroundFor(index) {
	const bg = document.getElementById('page-bg');
	if (!bg) return;
	const map = imageMap[index] || {};
	const key = getSizeKey();
	const desired = map[key] || map['desktop'] || bg.src;
	if (bg.src === desired) return;

	// preload desired image to ensure it exists; fall back to desktop if mobile missing
	const probe = new Image();
	probe.onload = function() {
		// fade out, swap source, then fade in on load
		try { bg.style.transition = bg.style.transition || 'opacity 0.35s ease'; } catch(e) {}
		bg.style.opacity = '0';
		bg.onload = function() {
			bg.style.opacity = '1';
			bg.onload = null;
		};
		bg.src = desired;
	};
	probe.onerror = function() {
		// fallback to desktop if available
		const fallback = map['desktop'] || bg.src;
		if (fallback && bg.src !== fallback) {
			const probe2 = new Image();
			probe2.onload = function() {
				try { bg.style.transition = bg.style.transition || 'opacity 0.35s ease'; } catch(e) {}
				bg.style.opacity = '0';
				bg.onload = function() {
					bg.style.opacity = '1';
					bg.onload = null;
				};
				bg.src = fallback;
			};
			probe2.onerror = function() {
				// give up: do nothing
			};
			probe2.src = fallback;
		}
	};
	probe.src = desired;
}

// wrap original showIndex so clicks also set background
const _showIndex = showIndex;
function showIndexWithBg(index) {
	currentIndex = index;
	_showIndex(index);
	// update active button state
	for (let i = 1; i <= 10; ++i) {
		const btn = document.getElementById('train-' + i);
		if (btn) btn.classList.toggle('active', i === (index + 1));
	}

	// fade out the detailed panel briefly for smoother transition
	const det = document.getElementById('detailed');
	if (det) {
		det.style.opacity = '0.6';
		window.requestAnimationFrame(() => {
			// apply background then fade back in
			applyBackgroundFor(index);
			setTimeout(() => { det.style.opacity = '1'; }, 80);
		});
	} else {
		applyBackgroundFor(index);
	}
}

// replace global convenience functions to call the new one
function show1(){ showIndexWithBg(0); }
function show2(){ showIndexWithBg(1); }
function show3(){ showIndexWithBg(2); }
function show4(){ showIndexWithBg(3); }
function show5(){ showIndexWithBg(4); }
function show6(){ showIndexWithBg(5); }
function show7(){ showIndexWithBg(6); }
function show8(){ showIndexWithBg(7); }
function show9(){ showIndexWithBg(8); }
function show10(){ showIndexWithBg(9); }

// update background on resize
window.addEventListener('resize', () => {
	applyBackgroundFor(currentIndex);
});

// ensure initial background set after DOM loaded
document.addEventListener('DOMContentLoaded', () => {
	applyBackgroundFor(0);
	alert("生日快樂！！刀哥");
});

