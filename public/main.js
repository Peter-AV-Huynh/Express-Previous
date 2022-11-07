document.getElementById('removeAll').onclick = removeAll;
document.getElementById('removeCompleted').onclick = removeCompleted;

var listItem = document.querySelectorAll(".toDoList")
var trash = document.getElementsByClassName("fa-trash");

Array.from(listItem).forEach(function(element) {
  element.addEventListener('click', function(){
    const taskCompleted = this.childNodes[1].innerText
    fetch('/toDoList', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'task': taskCompleted
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      window.location.reload(true)
    })
  });
})

Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    console.log("click event working")
    const task = this.parentNode.parentNode.childNodes[1].innerText
    fetch('/toDoList', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'task': task
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});

function removeCompleted(){
    fetch('/removeCompleted', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          'completed': '[✓]'
      })
    }).then(function (response) {
      console.log(response)
      window.location.reload()
    })
  };

function removeAll(){

  fetch('/removeAll', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },

  }).then(function (response) {
    console.log(response)
    window.location.reload()
  })
};
