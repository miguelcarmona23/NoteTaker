displayNotes();
var addBtn = document.getElementById('addBtn');

// below event listener will add user input into the local storage
addBtn.addEventListener('click', function () {

	let notesObj;
	let addNote = document.getElementById('addNote');
	let notesString = localStorage.getItem('notes');

	if (notesString == null) {
		notesObj = [];
	}
	else {
		notesObj = JSON.parse(notesString);
	}

	//Date/Time that note is taken
	let now = new Date();
	let dateTime = `${now.getMonth() + 1}-${now.getDate()}-${now.getFullYear()} | ${now.getHours() % 12 || 12}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()} `;



	//Data being pushed into local storage
	if (addNote.value !== '') {
		let tempObj = { text: addNote.value, time: dateTime };

		notesObj.push(tempObj);
		localStorage.setItem('notes', JSON.stringify(notesObj));

		addNote.value = '';
	}

	displayNotes();
});


// Data stored in the local storage function
function displayNotes() {
	let notesObj;
	let notesString = localStorage.getItem('notes');

	if (notesString == null) {
		notesObj = [];
	}
	else {
		notesObj = JSON.parse(notesString);
	}

	let html = '';

	notesObj.forEach(function (element, index) {
		html += `
		<div div class="card mx-4 my-2 bg-dark text-white thatsMyNote" style = "width: 18rem;" >
			<div class="card-body">
				<h6>${element.time}</h6>
				<p class="card-text">${element.text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
				<button id="${index}" onclick=deleteNote(this.id) class="btn btn-danger">Delete</button>
					</div >
				</div >
	`;
	});

	let noteEle = document.getElementById('notes');

	if (notesObj.length != 0) {
		noteEle.innerHTML = html;
	}
	else {
		noteEle.innerHTML = '<h3 style="text-align: center; color: grey;">Nothing to display</h3>';
	}

}


//To delete a note function
function deleteNote(index) {
	let notesObj;
	let notesString = localStorage.getItem('notes');

	if (notesString == null) {
		notesObj = [];
	}
	else {
		notesObj = JSON.parse(notesString);
	}

	notesObj.splice(index, 1);
	localStorage.setItem('notes', JSON.stringify(notesObj));

	displayNotes();
}



let search = document.getElementById('search');
search.addEventListener('input', function (e) {

	let inputText = search.value;

	//below statement will be executed when the search bar is emptied using backspace
	if (inputText == '') {
		document.getElementById('noMatches').innerHTML = '';
	}

	var countNone = 0;

	let cards = document.getElementsByClassName('thatsMyNote');


	Array.from(cards).forEach(function (ele) {
		let cardText = ele.getElementsByTagName('p')[0].innerText;
		if (cardText.includes(inputText)) {
			ele.style.display = 'block';
		}
		else {
			ele.style.display = 'none';

			countNone++;

			if (countNone === cards.length) {
				document.getElementById('noMatches').innerHTML = '<h3 style="text-align: center; color: grey;">No matches found</h3>';
			}
			else {
				document.getElementById('noMatches').innerHTML = '';
			}
		}
	});

	//Below code will be executed when the input text matches all the elements.
	if (countNone === 0) {
		document.getElementById('noMatches').innerHTML = '';
	}

});