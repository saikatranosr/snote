
// console.log("Welcome to notes app. This is app.js");
let warning = document.getElementById('alert');
// Modal
let deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'), {keyboard: false})
//Toast
var deleteToastElList = [].slice.call(document.querySelectorAll('.deleteToast'))
        var deleteToast = deleteToastElList.map(function(toastEl) {
        // Creates an array of toasts (it only initializes them)
          return new bootstrap.Toast(toastEl) // No need for options; use the default options
        });
var addToastElList = [].slice.call(document.querySelectorAll('.addToast'))
        var addToast = addToastElList.map(function(toastEl) {
        // Creates an array of toasts (it only initializes them)
          return new bootstrap.Toast(toastEl) // No need for options; use the default options
        });

   

showNotes();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function(e) {
  let addTitle = document.getElementById("addTitle");
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  if (addTitle.value =="") {
    addTitle.value = "Note " + String(notesObj.length +1);
  }
  if(addTxt.value == ""){
    warning.style.display = "flex"
    
  } else{
  notesObj.push({title: addTitle.value, desc: addTxt.value});
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
//   console.log(notesObj);
    warning.style.display = "none"
  showNotes();
  document.getElementById("addToastCont").style.display = "block";
  addToast.forEach(toast => toast.show()); // 

}});


        // console.log(toastList); // Testing to see if it works
      

// deleteToast.show()
// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
    document.title = `S Notes — Add Notes`
  } else {
    notesObj = JSON.parse(notes);
    document.title = `S Notes — ${notesObj.length+1}`
  }
  let html = "";
  notesObj.forEach(function(element, index) {
 
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title order-${index}">${element.title}</h5>
                        <p class="card-text">${element.desc}</p>
                        <button id="${index}"onclick="deleteNoteIndexFoo(this.id);" class="btn btn-sm btn-danger">Delete Note</button>
                    </div>
                </div>`;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

// Function to delete a note
function deleteNoteIndexFoo(index){
  deleteNoteIndex = index;
  deleteModal.show()
  let confirmMsg = document.getElementById('confirmMsg');
  confirmMsg.innerText = "Delete " + notesObj[index].title + " ?";
}
  let deleteBtn = document.getElementById('confirmDelete');
  // let cancelBtn = document.getElementById('confirmCancel');
function deleteNote() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(deleteNoteIndex, 1);
  // console.log("I am deleting", deleteNoteIndex);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
  document.getElementById("deleteToastCont").style.display = "block";
  deleteToast.forEach(toast => toast.show()); // 
}

// Filtering Elements
let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("h5")[0].innerText.toLowerCase() + element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        } else{
            element.style.display = "none";
        } if(search.value == ""){
        document.getElementById("addNoteCard").style.display = "block";
        document.getElementById("yourNotesTxt").style.display = "block";
        document.getElementById("headingText").innerHTML = `<h2>Welcome To S Note</h2>`;
        } else {
        document.getElementById("addNoteCard").style.display = "none";
        document.getElementById("yourNotesTxt").style.display = "none";
        document.getElementById("headingText").innerHTML = `<p class="lead"> Matching notes from your search: <i>${search.value}</p>`;
        }
        // console.log(cardTxt);
    })
})

/*
Further Features:
1. Add Title (Done)
2. Mark a note as Important
3. Separate notes by user
4. Sync and host to web server 
*/ 