let elForm = document.querySelector('.form');
let elInput = document.querySelector('.input');
let elList = document.querySelector('.list');
let elAll = document.querySelector('.all');
let check = document.querySelector('.check');
let unCompletedTxt = document.querySelector('.top');
let gruop = document.querySelector('.grup');
let temp = document.querySelector('.temp').content;

let todos = [];

let url = async () => {
	let res = await fetch('https://todos1-0-0.herokuapp.com/todos');
	let data = await res.json();
	renderTodo(data, elList);
};

url();

let renderTodo = (array, node) => {
	node.innerHTML = '';
	array.forEach((element) => {
		let newtemp = temp.cloneNode(true);
		let newItem = newtemp.querySelector('.itm');
		let newSpa = newtemp.querySelector('.span');
		let newButton = newtemp.querySelector('.delete-btn');
		let newCheckbox = newtemp.querySelector('.todo-check');
		newSpa.textContent = element.title;
		newButton.textContent = 'Delete';
		newButton.setAttribute('id', element.todoId);
		newCheckbox.setAttribute('class', 'todo-check');
		newCheckbox.setAttribute('id', element.todoId);
		node.appendChild(newtemp);
	});
};

elForm.addEventListener('submit', function (evt) {
	evt.preventDefault();
	let elInputVal = elInput.value;
	fetch('https://todos1-0-0.herokuapp.com/todos', {
		method: 'POST',
		body: JSON.stringify({
			title: elInputVal,
		}),
	})
		.then((res) => res.json())
		.then((data) => location.reload(true));
});

elList.addEventListener('click', function (evt) {
	let evtid = evt.target.id;
	if (evt.target.matches('.delete-btn')) {
		fetch('https://cors-anywhere.herokuapp.com/https://todos1-0-0.herokuapp.com/todos', {
			method: 'DELETE',
			body: {
				id: evtid,
			},
		})
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	}
});
