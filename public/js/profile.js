const newFormHandler = async(event) => {
    event.preventDefault();

    const name = document.querySelector('#review-name').value.trim();
    const comment = document.querySelector('#review-comment').value.trim();


    if (name && comment) {
        const response = await fetch(`/api/reviews`, {
            method: 'POST',
            body: JSON.stringify({ name, comment }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            document.location.replace('/login');
        }
    }
};

const delButtonHandler = async(event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/reviews/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to delete review');
        }
    }
};

document
    .querySelector('.new-review-form')
    .addEventListener('submit', newFormHandler);

document
    .querySelector('.review-list')
    .addEventListener('click', delButtonHandler);