let dropArea = document.getElementById('DragContext');
let h1=dropArea.children[0];

function preventDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}

function highlight(e) {
  dropArea.classList.add('highlight')
}
function unhighlight(e) {
  dropArea.classList.remove('highlight')
}

function handleDrop(e) {
  h1.style.visibility="hidden";

  let dt = e.dataTransfer;
  let files = dt.files;
  let formData = new FormData();

  [...files].forEach((file)=>{
    formData.append('file',file,file.name);
  });

  uploadFiles(formData);
}

function uploadFiles(formData){
    let xhr = new XMLHttpRequest();
    xhr.open("POST","http://192.168.1.67:3001",true);
    xhr.send(formData);
    xhr.onreadystatechange = () => {
      if (xhr.readyState != 4) return;
      if (xhr.status != 200) {
        alert('Error: '+ xhr.status + ': ' + xhr.statusText);
      } else {
        alert(xhr.responseText);
      }
    }
  }

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false)
});

['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false)
});
['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false)
});

dropArea.addEventListener('drop', handleDrop, false);
