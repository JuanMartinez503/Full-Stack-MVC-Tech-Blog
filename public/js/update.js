const updateButtonHandler = async (event) => {
    console.log('hi')
    const title = document.querySelector('#title').value.trim();
    const description = document.querySelector('#description').value.trim();
    if (event.target.hasAttribute('data-update')) {
      const id = event.target.getAttribute('data-update');
  
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, description }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (response.ok) {
        document.location.replace('/blogs');
      } else {
        alert('Failed to update blog!');
      }
    }
  };
document
.querySelector('#update')
.addEventListener('click', updateButtonHandler);