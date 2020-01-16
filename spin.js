var main = document.querySelector("main");
var section = document.querySelector("section");
var button = document.querySelector("button");
var edit = document.querySelector(".edit");
var colors = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"];
var list;
if (localStorage.list) list = localStorage.list;
else update();

list = list.split(",");
list.sort(() => Math.random() - 0.5);

function spacing() {
	var l = list.length;
	var f1, f2, s;
	if (l >= 100) f1 = 10, f2 = 0.05;
	else if (l >= 95) f1 = 10, f2 = 0.05;
	else if (l >= 90) f1 = 10, f2 = 0.075;
	else if (l >= 85) f1 = 10, f2 = 0.1;
	else if (l >= 80) f1 = 10, f2 = 0.125;
	else if (l >= 75) f1 = 10, f2 = 0.15;
	else if (l >= 70) f1 = 10, f2 = 0.175;
	else if (l >= 65) f1 = 10, f2 = 0.2;
	else if (l >= 60) f1 = 10, f2 = 0.225;
	else if (l >= 55) f1 = 10, f2 = 0.25;
	else if (l >= 50) f1 = 10, f2 = 0.275;
	else if (l >= 45) f1 = 10, f2 = 0.3;
	else if (l >= 40) f1 = 10, f2 = 0.325;
	else if (l >= 35) f1 = 10, f2 = 0.35;
	else if (l >= 30) f1 = 10, f2 = 0.375;
	else if (l >= 25) f1 = 10, f2 = 0.4;
	else if (l >= 20) f1 = 10, f2 = 0.425;
	else if (l >= 15) f1 = 10, f2 = 0.45;
	else if (l >= 10) f1 = 10, f2 = 0.475;
	else if (l >= 5) f1 = 10, f2 = 0.5;
	s = "main{font-size:" + f1 + "rem}span{font-size:" + f2 + "em}";
	if (document.head.querySelector("style")) document.head.querySelector("style").innerText = s;
	else document.head.insertAdjacentHTML("beforeend", "<style>" + s + "</style>");
}

function update() {
	var input = window.prompt("Enter a comma-delimmited list of initials", localStorage.list);
	if (input !== null && input !== localStorage.list) {
		if (input.match(/^[0-9]+$/gm)) {
			var n = parseInt(input);
			list = "";
		    	for (var i = 1; i <= n; i++) {
				list += i + ",";
			}
		} else if (input === "abc") list = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z";
		else if (input === "ci") list = "ac,alg,ba,da,dl,jl,li,mf,mt,on,rd,sl,sw,vz";
		else list = input;
		list = list.replace(/^\,|\,$/gm, "").replace(/\,+/gm, ",");
		localStorage.list = list;
		spacing();
	}
}

function setup() {
	section.innerHTML = "";
	list.forEach((a, i) => {
		section.insertAdjacentHTML("beforeend", "<div style='transform:translate(-50%, -50%) rotate(" + ((360 / list.length) * i).toFixed(1) + "deg)'><span title='Take me out'>" + a + "</span></div");
	});
	spacing();
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
	var t = section.querySelector(".winner") ? 22e3 : 20e3;
	if (section.querySelector(".winner")) section.querySelector(".winner").classList.remove("winner");
	section.classList.add("spin");
	button.classList.add("marker");
	setTimeout(() => shifting(Math.floor(Math.random() * list.length) + 1), 2e3);
	setTimeout(() => {
		section.querySelector("div span").className = "winner";
		section.classList.remove("spin");
		setTimeout(() => button.classList.remove("marker"), 2e3);
	}, t);
}

spacing();
setup();

button.addEventListener("click", () => {
	if (document.querySelectorAll("div").length > 1) go();
	else window.location.reload();
});

section.className = colors[Math.floor(Math.random() * colors.length)];

edit.addEventListener("click", () => {
	update();
	window.location.reload();
});
