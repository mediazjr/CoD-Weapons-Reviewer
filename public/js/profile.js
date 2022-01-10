let id;

const newFormHandler = async(event) => {
    event.preventDefault();

    const name = document.querySelector('#review-name').value.trim();
    const comment = document.querySelector('#review-comment').value.trim();
    console.log(name, comment)

    if (name && comment) {
        const response = await fetch(`/api/reviews`, {
            method: 'POST',
            body: JSON.stringify({ name, comment, weapon_id: id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/review/4');
        } else {
            document.location.replace('/login');
        }
    }
};

const delButtonHandler = async(event) => {
    if (event.target.hasAttribute('data-id')) {
        id = event.target.getAttribute('data-id');
        console.log(id)
            // const response = await fetch(`/api/reviews/${id}`, {
            //     method: 'DELETE',
            // });

        // if (response.ok) {
        //     document.location.replace('/');
        // } else {
        //     alert('Failed to delete review');
        // }
    }
};

document
    .querySelector('.new-review-form')
    .addEventListener('submit', newFormHandler);

document
    .querySelector('.card-body')
    .addEventListener('click', delButtonHandler);