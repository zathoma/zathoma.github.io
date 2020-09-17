const abstractTodoItem = "" +
"<div class='row' id='var4'>"
	+"<div class='col-sm-12'>"
		+"<div class='ddMenu-container color-primary' id='var1|-|var2|-|var4'>"
			+"<div class='row'>"
				+"<div class='col-xs-10'>"
					+"<span class='var8 todo-item-title-container' parentBlockID='var1|-|var2|-|var4'>"
						+"<span closed-text='var5' opened-text='var6'>var1 <hr class='todo-item-divider'> due on:  var2</span>"
						+"var7"
					+"</span>"
				+"</div>"
				+"<div class='col-xs-2'>"
					+"<span class='right-align-inline-1'>"
						+"<div class='delete-item-button' parentBlockID='var1|-|var2|-|var4'>"
							+"<img src='Icons\\delete.png'>"
						+"</div>"
					+"</span>"
					+"<span class='right-align-inline-2'>"
						+"<div class='strikethrough-button' parentBlockID='var1|-|var2|-|var4'>"
							+"<img src='Icons\\strikethrough.png'>"
						+"</div>"
					+"</span>"
					+"<span class='right-align-inline-3'>"
						+"<div class='colorToggleCube color-secondary' parentBlockID='var1|-|var2|-|var4'></div>"
					+"</span>"
				+"</div>"
			+"</div>"
			+"<div class='row'>"
				+"<div class='col-xs-12'>"
					+"<ul class='ddMenu hidden' id='description_var4'>"
						+"<li>var3</li>"
					+"</ul>"
				+"</div>"
			+"</div>"	
		+"</div>"
	+"</div>"
+"</div>"

class TodoItem {
	constructor(title, dueDate, description) {
		this.title = title;
		this.dueDate = dueDate;
		this.description = description;
	}
}

class MyListObject {
	constructor() {
		this.list = [];
	}

	addItem(item) {
		this.list.push(item);
	}

	removeItem(inputTitle, inputDueDate) {
		let index = this.list.findIndex(function(item) {return ((item.title === inputTitle) && (item.dueDate === inputDueDate));});
		if (index < 0) {
			return "Sorry, that item isn't on your list";
		} else {
			return "Succesfully removed: " + this.list.splice(index, 1)[0].title;
		}
	}

	removeKnownItem(inputItem) {
		let index = this.list.findIndex(function(item) {return ((item.title === inputItem.title) && (item.dueDate === inputItem.dueDate) && (item.description === inputItem.description));});
		if (index < 0) {
			return "Sorry, that item isn't on your list";
		} else {
			return "Succesfully removed: \"" + this.list.splice(index, 1)[0].title + "\"";
		}
	}

	setItemStrikeThrough(title, dueDate, description, state) {
		let index = this.list.findIndex(function(item) {return ((item.title === inputItem.title) && (item.dueDate === inputItem.dueDate) && (item.description === inputItem.description));});
		this.list[index]; //TODO -- store strikethrough state and rerender on any listItems() call;
	}

	getList() {
		let returnArr = [];
		for (let i = 0; i < this.list.length; i++) {
			returnArr[i] = this.list[i];
		}
		return returnArr;
	}
}

const todoList = {
	list: new MyListObject(),
	addItem: function(title, dueDate, description) {
		let newItem = new TodoItem(title, dueDate, description);
		let newLength = this.list.addItem(newItem);
		// return "Succesfully added \n" + newItem.title + "\n your todo list is now: " + newLength + " items long.";
	},
	dateValidation: function(dueDate) {
		let myRe = /\//g;
		let loopArray;
		let slashTest = [];
		while ((loopArray = myRe.exec(dueDate)) !== null) {
		  slashTest.push(loopArray[0]);
		}
		myRe = /-/g;
		let dashTest = [];
		while ((loopArray = myRe.exec(dueDate)) !== null) {
		  dashTest.push(loopArray[0]);
		}
		if ((slashTest.length !== 2 && dashTest.length !== 2) || (dashTest.length > 1 && slashTest.length > 1)) {
			return false;
		} else {
			return true;
		}
	},
	removeItem: function(item) {
		return this.list.removeKnownItem(item);
	},
	listItems: function() {
		let listDisplay = document.getElementById("list-display");
		let currentDisplayHTML = "";
		listDisplay.innerHTML = "";
		let itemArray = this.list.getList();
		console.log(itemArray);
		for (let i = 0; i < itemArray.length; i++) {
			item = itemArray[i];
			console.log(itemArray[i]);
			console.log(item);
			console.log(item.title + ", " + item.dueDate + ", " + item.description);
			let parentBlockId = "todoItem_" + i;
			let openedText = "";
			let closedText = "";
			let carat = "";
			let clickable = "";
			if (item.description !== "") {
				openedText = " (hide description)  ";
				closedText = " (view description)  ";
				carat = "<img src=\"Icons\\carrat_2.png\">";
				clickable = "ddMenu-clickable"
			}
			if (!(item.title === undefined || item.dueDate === undefined || item.description === undefined)) {
				itemString = abstractTodoItem;
				itemString = itemString.replace(/var1/gi, item.title);
				itemString = itemString.replace(/var2/gi, item.dueDate);
				itemString = itemString.replace(/var3/gi, item.description);
				itemString = itemString.replace(/var4/gi, parentBlockId);
				itemString = itemString.replace(/var5/gi, closedText);
				itemString = itemString.replace(/var6/gi, openedText);
				itemString = itemString.replace(/var7/gi, carat);
				itemString = itemString.replace(/var8/gi, clickable);
				console.log(itemString);

				currentDisplayHTML = currentDisplayHTML + itemString;
			}
		}
		listDisplay.innerHTML = currentDisplayHTML;

		var menuHeaders = document.querySelectorAll("span.ddMenu-clickable");
		for (let i = 0; i < menuHeaders.length; i++) {
			let currentContent = menuHeaders[i].children[0].innerHTML;
			menuHeaders[i].children[0].innerHTML = currentContent + menuHeaders[i].children[0].getAttribute("closed-text");
		}

		let ddMenuClickableSpans = document.querySelectorAll("span.ddMenu-clickable");
		for (let i = 0; i < ddMenuClickableSpans.length; i++) {
			ddMenuClickableSpans[i].addEventListener("click", toggleDDMenu);
			ddMenuClickableSpans[i].addEventListener("mouseover", function() {
				this.classList.add("hover-highlight");
			});
			ddMenuClickableSpans[i].addEventListener("mouseout", function() {
				this.classList.remove("hover-highlight");
			});
		}

		let colorToggleCubes = document.querySelectorAll(".colorToggleCube");
		for (let i = 0; i < colorToggleCubes.length; i++) {
			colorToggleCubes[i].addEventListener("click", colorToggle);
			colorToggleCubes[i].classList.add("color-secondary-solid");
		}

		let stirkethroughButtons = document.querySelectorAll(".strikethrough-button");
		for (let i = 0; i < stirkethroughButtons.length; i++) {
			stirkethroughButtons[i].addEventListener("click", strikethrough);
		}

		let deleteItemButtons = document.querySelectorAll(".delete-item-button");
		for (let i = 0; i < deleteItemButtons.length; i++) {
			deleteItemButtons[i].addEventListener("click", removeItemMenus)
		}
	}
};

const addItemMenus = function() {
	document.getElementById("new-item-button").classList.toggle("hidden");
	let title = "";
	let date = "";
	let description = "";
	let instructions = document.getElementById("dialogue-pane-instructions");
	let textArea = document.getElementById("dialogue-pane-textarea");
	let enterButton = document.getElementById("dialogue-pane-enter-button");
	let cancelButton = document.getElementById("dialogue-pane-cancel-button");

	let getTitle = function() {
		title = textArea.value;
		if (title !== "") {
			instructions.textContent = "Enter a due date for \"" + title + "\"";
			enterButton.addEventListener("click", getDate, true);
			enterButton.removeEventListener("click", getTitle, true);
		} else {
			instructions.textContent = "Title cannot be blank";
			setTimeout(function() {
				instructions.textContent = "Enter your todo item's title...";
			}, 3000);
		}
		textArea.value = "";
	}

	let getDate = function() {
		date = textArea.value;
		textArea.value = "";
		if (todoList.dateValidation(date)) {
			instructions.textContent = "Enter a description for \"" + title + "\"";
			enterButton.addEventListener("click", getDescription, true);
			enterButton.removeEventListener("click", getDate, true);
		} else {
			instructions.textContent = "Invalid date format, please try again...";
		}
	}

	let getDescription = function() {
		description = textArea.value;
		textArea.value = "";
		instructions.textContent = "Succesfully added \"" + title + "\"";
		textArea.classList.toggle("hidden");
		enterButton.classList.toggle("hidden");
		cancelButton.classList.toggle("hidden");
		todoList.addItem(todoList.addItem(title, date, description));
		enterButton.removeEventListener("click", getDescription, true);
		cancelButton.removeEventListener("click", cancelAdd, true);
		todoList.listItems();

		setTimeout(function() {
			document.getElementById("dialogue-pane-container").classList.toggle("hidden");
			textArea.classList.toggle("hidden");
			enterButton.classList.toggle("hidden");
			cancelButton.classList.toggle("hidden");
			document.getElementById("new-item-button").classList.toggle("hidden");
		}, 3000);
	}

	let cancelAdd = function() {
		enterButton.removeEventListener("click", getTitle, true);
		enterButton.removeEventListener("click", getDate, true);
		enterButton.removeEventListener("click", getDescription, true);
		cancelButton.removeEventListener("click", cancelAdd, true);
		textArea.value = "";
		document.getElementById("dialogue-pane-container").classList.toggle("hidden");
		document.getElementById("new-item-button").classList.toggle("hidden");
	}

	instructions.textContent = "Enter your todo item's title...";
	cancelButton.addEventListener("click", cancelAdd, true);
	enterButton.addEventListener("click", getTitle, true);
	document.getElementById("dialogue-pane-container").classList.toggle("hidden");
}

document.getElementById("new-item-button").addEventListener("click", addItemMenus);

const removeItemMenus = function() {
	let parentBlock = document.getElementById(this.getAttribute("parentBlockID"));
	let idArr = parentBlock.getAttribute("id").split("|-|");
	let title = idArr[0];
	let dueDate = idArr[1];
	let description = document.getElementById("description_" + this.getAttribute("parentBlockID").split("|-|")[2]).children[0].innerHTML;
	if (description === null || description === undefined) {
		description = "";
	}
	let choice = prompt("Are you sure you want to delete \"" + title + "\" | due on: " + dueDate + "?");
	console.log("user choice = " + choice);
	if (!(choice === null)) {
		alert(todoList.removeItem(new TodoItem(title, dueDate, description)));
	}
	todoList.listItems();
}

const borderAdjust = function() {
	listDisplay = document.getElementById("list-display");
	if (window.innerWidth <= 992) {
		listDisplay.classList.remove("pane-border-left");
		listDisplay.classList.add("pane-border-top");
	} else if (listDisplay.classList.contains("pane-border-top")) {
		listDisplay.classList.remove("pane-border-top");
		listDisplay.classList.add("pane-border-left");
	}
}

window.onresize = borderAdjust;

if (window.inerWidth <= 992) {
	document.getElementById("list-display").classList.add("pane-border-top");
} else {
	document.getElementById("list-display").classList.add("pane-border-left");
}