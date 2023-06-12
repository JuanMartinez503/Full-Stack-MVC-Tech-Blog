const updateButtonHandler = async (event) => {
  event.preventDefault();
  console.log('hi');
  const comment = document.querySelector('#comment').value.trim();
  
  if (comment) {
    try {
      const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ comment }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
  console.log('hi');

        // document.location.reload();
      } else {
        alert('Failed to add comment!');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      // Handle error here
    }
  }
};

document
  .querySelector('#commentBtn')
  .addEventListener('click', updateButtonHandler);
