const addBtn = document.getElementById('add');


addBtn.addEventListener("click", () => {
    addNewNote();
});

function addNewNote() {
    const note = document.createElement('div');
    note.classList.add('notes');

    note.innerHTML = `<div class="tools">
        <button id="edit"><i class="fa-solid fa-floppy-disk"></i></i></button>
        <button id="delete"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="main hidden">
        </div>
        <textarea name="" id="" cols="30" rows="10"></textarea>
    `;

    const editBtn = note.querySelector('#edit');
    const deleteBtn = note.querySelector('#delete');
    const main = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    editBtn.addEventListener("click", () => {
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
        editBtn.classList.toggle('edit-karo');
        if(editBtn.classList.contains('edit-karo')){
            editBtn.innerHTML = '<i class="fas fa-edit">';
        } else{
            editBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i>';
        }
    });

    deleteBtn.addEventListener("click", ()=> {
        note.remove();
    });

    textArea.addEventListener("input", (e) => {
        const {value} = e.target;
        main.innerHTML = marked(value);
    });

    document.body.appendChild(note);
}


const saveBtn = document.getElementById("save");
let notesText = [];
saveBtn.addEventListener("click", () => {
    notesText = [];
    const allNotes = document.querySelectorAll(".notes");
    allNotes.forEach((note) => {
        notesText.push(note.innerText);
    });
    localStorage.setItem("notes", notesText);

});


window.onload = function(e){ 
    const notesData = localStorage.getItem("notes");

    const newDatas = notesData.split(',');
    // console.log(newDatas);
    newDatas.forEach((newData) => {
        console.log(newData);

        const note = document.createElement('div');
        note.classList.add('notes');

        note.innerHTML = `<div class="tools">
            <button id="edit"><i class="fa-solid fa-floppy-disk"></i></i></button>
            <button id="delete"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="main hidden">
                ${newData}
            </div>
            <textarea name="" id="" cols="30" rows="10">${newData}</textarea>
        `;
        const editBtn = note.querySelector('#edit');
        const deleteBtn = note.querySelector('#delete');
        const main = note.querySelector('.main');
        const textArea = note.querySelector('textarea');

        editBtn.addEventListener("click", () => {
            main.classList.toggle('hidden');
            textArea.classList.toggle('hidden');
            editBtn.classList.toggle('edit-karo');
            if(editBtn.classList.contains('edit-karo')){
                editBtn.innerHTML = '<i class="fas fa-edit">';
            } else{
                editBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i>';
            }
        });

        deleteBtn.addEventListener("click", ()=> {
            note.remove();
        });

        textArea.addEventListener("input", (e) => {
            const {value} = e.target;
            main.innerHTML = marked(value);
        });

        document.body.appendChild(note);
    });
}