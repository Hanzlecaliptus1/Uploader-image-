const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const previewImg = document.getElementById('preview-img');
const uploadBtn = document.getElementById('upload-btn');
const progressEl = document.getElementById('progress');
const messageEl = document.getElementById('message');
const resultEl = document.getElementById('result');

let selectedFile = null;

function showMessage(msg, isError = false) {
  messageEl.textContent = msg;
  messageEl.style.color = isError ? 'crimson' : '#1a73e8';
}

function resetMessage() {
  messageEl.textContent = '';
}

fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  handleFile(file);
});

dropZone.addEventListener('click', () => fileInput.click());

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', (e) => {
  dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  handleFile(file);
});

function handleFile(file) {
  resetMessage();
  resultEl.innerHTML = '';
  progressEl.style.display = 'none';
  progressEl.value = 0;

  if (!file) return;
  if (!file.type.startsWith('image/')) {
    showMessage('File bukan gambar!', true);
    return;
  }
  selectedFile = file;

  // Preview
  const reader = new FileReader();
  reader.onload = () => {
    previewImg.src = reader.result;
    previewImg.style.display = 'block';
  };
  reader.readAsDataURL(file);
}

uploadBtn.addEventListener('click', () => {
  if (!selectedFile) {
    showMessage('Pilih gambar dulu sebelum upload.', true);
    return;
  }
  uploadFile(selectedFile);
});

function uploadFile(file) {
  const formData = new FormData();
  formData.append('image', file);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/upload');

  xhr.upload.onprogress = (e) => {
    if (e.lengthComputable) {
      const percent = Math.round((e.loaded / e.total) * 100);
      progressEl.style.display = 'block';
      progressEl.value = percent;
    }
  };

  xhr.onload = () => {
    progressEl.style.display = 'none';
    if (xhr.status === 200) {
      try {
        const res = JSON.parse(xhr.responseText);
        if (res.success) {
          showMessage('Upload berhasil ✅');
          const link = document.createElement('a');
          link.href = res.fileUrl;
          link.textContent = res.fileUrl;
          link.target = '_blank';
          resultEl.innerHTML = '';
          resultEl.appendChild(link);
        } else {
          showMessage(res.message || 'Upload gagal', true);
        }
      } catch (err) {
        showMessage('Response tidak valid', true);
      }
    } else {
      showMessage('Upload gagal. Status: ' + xhr.status, true);
    }
  };

  xhr.onerror = () => {
    progressEl.style.display = 'none';
    showMessage('Terjadi kesalahan saat mengupload', true);
  };

  xhr.send(formData);
                           }
