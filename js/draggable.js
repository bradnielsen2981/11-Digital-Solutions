const draggableElems = document.querySelectorAll(".draggable");
const droppableElems = document.querySelectorAll(".droppable");

draggableElems.forEach((elem) => {
  elem.addEventListener("dragstart", dragStart);
  // elem.addEventListener("drag", drag);
  // elem.addEventListener("dragend", dragEnd);
});

droppableElems.forEach((elem) => {
  elem.addEventListener("dragenter", dragEnter);
  elem.addEventListener("dragover", dragOver);
  elem.addEventListener("dragleave", dragLeave);
  elem.addEventListener("drop", drop);
});

function dragStart(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function dragEnter(event) {
  event.target.classList.add("droppable-hover");
}

function dragOver(event) {
  event.preventDefault();
}

function dragLeave(event) {
  event.target.classList.remove("droppable-hover");
}

function drop(event) {
  event.preventDefault();
  
  // Set unique data for both elements 
  const draggableElemData = event.dataTransfer.getData("text");
  const droppableElemData = event.target.dataset.draggableId;
  
  // Check if element is positioned correctly 
  if (draggableElemData === droppableElemData) {
    // Get elements 
    const droppableElem = event.target;
    const draggableElem = document.getElementById(draggableElemData);
    
    // Change the state of droppable element
    droppableElem.style.backgroundColor = draggableElem.style.backgroundColor;
    droppableElem.classList.add("dropped");
    
    // Change the state of draggable element
    draggableElem.classList.add("dragged");
    draggableElem.setAttribute("draggable", "false");
  } else {
    event.target.classList.remove("droppable-hover");
  }
}

  