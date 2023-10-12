document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('comment-form');
    const commentList = document.getElementById('comment-list');

    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nameInput = document.getElementById('name');
        const commentInput = document.getElementById('comment');

        const name = nameInput.value;
        const comment = commentInput.value;

        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${name}:</strong> ${comment}`;
        commentList.appendChild(listItem);

        // Limpe os campos do formulário
        nameInput.value = '';
        commentInput.value = '';
    });
});
