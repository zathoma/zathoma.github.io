
/* Reccomended HTML structure for basic drop-down with color toggle
   use with ddMenu_withColorToggle.css
<div class="ddMenu-container color-primary" id="mainDDMenu">
	<span class="right-align-inline"><div class="colorToggleCube" parentBlockID="mainDDMenu"></div></span>
	<span class="ddMenu-clickable">
		<span closed-text=" (see more...)" opened-text=" (see less...)">Menu or Sub-Menu Title</span>
		<img src="C:\Users\Zach\Documents\WebProjects\Icons\carrat_2.png"/> //this can be ddIcon you want
	</span>
	<ul class="ddMenu hidden">
		<li>Menu Item</li>
	</ul>
</div>
*/

var menuHeaders = document.querySelectorAll("span.ddMenu-clickable");
for (let i = 0; i < menuHeaders.length; i++) {
	let currentContent = menuHeaders[i].children[0].innerHTML;
	menuHeaders[i].children[0].innerHTML = currentContent + menuHeaders[i].children[0].getAttribute("closed-text");
}

const rotateDDCarat = function(element) {
	let caratElem = element.children[1];
	let transformString = caratElem.style.transform;
	let totalRotated;
	let linkedHideableContent = document.getElementById("description_" + element.getAttribute("parentBlockID").split("|-|")[2]);
	if (transformString === "") {
		totalRotated = 0;
	} else {
		totalRotated = transformString.slice(transformString.indexOf("(") + 1, transformString.indexOf("deg"));
	}
	if (linkedHideableContent.classList.contains("hidden")) {
		let idVar = setInterval(function() {
			caratElem.style.transform = "rotate(" + totalRotated + "deg)";
			totalRotated -= 4;
			if (totalRotated < -90){
				caratElem.style.transform = "rotate(-90deg)";
				clearInterval(idVar);
				linkedHideableContent.classList.toggle("hidden");
			}
		}, 10);
	} else {
		let idVar = setInterval(function() {
			caratElem.style.transform = "rotate(" + totalRotated + "deg)";
			totalRotated -= -4;
			if (totalRotated > 0) {
				caratElem.style.transform = "rotate(0deg)";
				clearInterval(idVar);
				linkedHideableContent.classList.toggle("hidden");
			}
		}, 10);
	}
}

const toggleDDMenu = function() {
	let closedText = this.children[0].getAttribute("closed-text");
	let openedText = this.children[0].getAttribute("opened-text");

	rotateDDCarat(this);
	let linkedHideableContent = document.getElementById("description_" + this.getAttribute("parentBlockID").split("|-|")[2]);
	let displayed = linkedHideableContent.classList.contains("hidden");
	let menuItems = linkedHideableContent.children;
	if (displayed) {
		let currentHTML = this.children[0].innerHTML;
		this.children[0].innerHTML = currentHTML.slice(0, currentHTML.indexOf(closedText) + 1) + "<span class='description-toggle-text'>" + openedText + "</span>";
		for (let i = 0; i < menuItems.length; i++) {
			if(menuItems[i].children.length > 1) {
				if(menuItems[i].children[1].classList.contains("hidden")) {
				menuItems[i].children[0].addEventListener("click", toggleDDMenu);
				}
			}
		}
	} else {
		let currentHTML = this.children[0].innerHTML;
		this.children[0].innerHTML = currentHTML.slice(0, currentHTML.indexOf(openedText) + 1) + "<span class='description-toggle-text'>" + closedText + "</span>";
		for (let i = 0; i < menuItems.length; i++) {
			if(menuItems[i].children.length > 1) {
				if(menuItems[i].children[1].classList.contains("hidden")) {
					menuItems[i].children[0].removeEventListener("click", toggleDDMenu);
				}
			}
		}
	}
}

var ddMenuClickableSpans = document.querySelectorAll("span.ddMenu-clickable");
for (let i = 0; i < ddMenuClickableSpans.length; i++) {
	ddMenuClickableSpans[i].addEventListener("click", toggleDDMenu);
}

const colorToggle = function() {
	if (this.classList.contains("color-secondary-solid")) {
		let parentBlock = document.getElementById(this.getAttribute("parentBlockID"));
		parentBlock.classList.remove("color-primary");
		parentBlock.classList.add("color-secondary");
		this.classList.remove("color-secondary-solid");
		this.classList.add("color-primary-solid");
	} else {
		let parentBlock = document.getElementById(this.getAttribute("parentBlockID"));
		parentBlock.classList.remove("color-secondary");
		parentBlock.classList.add("color-primary");
		this.classList.remove("color-primary-solid");
		this.classList.add("color-secondary-solid");
	}
}

var colorToggleCubes = document.querySelectorAll(".colorToggleCube");
for (let i = 0; i < colorToggleCubes.length; i++) {
	colorToggleCubes[i].addEventListener("click", colorToggle);
	colorToggleCubes[i].classList.add("color-secondary-solid");
}

const strikethrough = function() {
	let parentBlock = document.getElementById(this.getAttribute("parentBlockID"));
	parentBlock.children[0].children[0].classList.toggle("strikethrough");
}

var stirkethroughButtons = document.querySelectorAll(".strikethrough-button");
for (let i = 0; i < stirkethroughButtons.length; i++) {
	stirkethroughButtons[i].addEventListener("click", strikethrough);
}