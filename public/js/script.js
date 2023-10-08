document.addEventListener('DOMContentLoaded', () => {
    // Function to handle comment submission
    const handleCommentSubmit = async (event) => {
      event.preventDefault();
  
      const content = document.querySelector('#comment-content').value.trim();
      const post_id = document.querySelector('#post-id').value.trim();
  
      if (content && post_id) {
        const response = await fetch('/api/comments', {
          method: 'POST',
          body: JSON.stringify({ content, post_id }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.reload();
        } else {
          alert('Failed to submit the comment. Please try again.');
        }
      }
    };
  
    // Add event listener to the comment form
    const commentForm = document.querySelector('#comment-form');
    if (commentForm) {
      commentForm.addEventListener('submit', handleCommentSubmit);
    }
  
    // Function to handle logout
    const handleLogout = async () => {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/login');
      } else {
        alert('Failed to log out. Please try again.');
      }
    };
  
    // Add event listener to the logout button
    const logoutButton = document.querySelector('#logout-button');
    if (logoutButton) {
      logoutButton.addEventListener('click', handleLogout);
    }
  });
  