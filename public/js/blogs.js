const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#project-title').value.trim();
    const description = document.querySelector('#project-desc').value.trim();
  
    if (title  && description) {
      const response = await fetch(`/api/blogs`, {
        method: 'POST',
        body: JSON.stringify({ title, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/blogs');
      } else {
        alert('Failed to create project');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/blogs');
      } else {
        alert('Failed to delete blog');
      }
    }
  };
  const updateButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-update')) {
      const id = event.target.getAttribute('data-update');
  
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
      });
  
      if (response.ok) {
        document.location.replace('/blogs');
      } else {
        alert('Failed to update blog!');
      }
    }
  };
  document
    .querySelector('.new-project-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.project-list')
    .addEventListener('click', delButtonHandler);
  
    document
    .querySelector('.project-list')
    .addEventListener('click', updateButtonHandler);