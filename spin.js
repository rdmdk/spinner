var button = document.querySelector("button");
var section = document.querySelector("section");
var colors = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"];
var list;
if (localStorage.list) list = localStorage.list;
else {
	var input = window.prompt("Enter a comma-delimmited list of initials");
	if (input !== null && input !== localStorage.list) {
		if (input === "ci") list = "da,alg,sw,jl,sl,ac,li,dl,mt,vz,mf,ba,on,rd";
		else list = input;
		localStorage.list = list;
	}
}

list = list.split(",");
list.sort(() => Math.random() - 0.5);

function setup() {
	section.innerHTML = "";
	list.forEach((a, i) => {
		section.insertAdjacentHTML("beforeend", "<div style='transform:translate(-50%, -50%) rotate(" + ((360 / list.length) * i).toFixed(1) + "deg)'><span title='Take me out'>" + a + "</span></div");
	});
	section.querySelectorAll("span").forEach((s) => {
		s.addEventListener("click", () => {
			list.splice(list.indexOf(s.innerText), 1);
			setup();
		});
	});
}

function shifting(a) {
	for (let i = 0; i < a; i++) {
		var b = list.shift();
		list.push(b);
	}
	setup();
}

function go() {
	section.classList.add("spin");
	setTimeout(() => shifting(Math.floor(Math.random() * list.length) + 1), 2e3);
	setTimeout(() => section.querySelector("div span").className = "winner", 20e3);
}

setup();

button.addEventListener("click", () => {
	if (document.querySelectorAll("div").length > 1) go();
	else window.location.reload();
});

section.className = colors[Math.floor(Math.random() * colors.length)];
