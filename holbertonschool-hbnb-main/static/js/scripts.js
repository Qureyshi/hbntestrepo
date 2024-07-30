document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        console.log('Login form found');
        loginForm.addEventListener('submit', async (event) => {
            console.log('Form submitted');
            event.preventDefault(); // Prevent the default form submission

            // Get the values from the form fields
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            console.log('Email:', email);
            console.log('Password:', password);

            try {
                // Send a POST request to the login endpoint
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                // Check if the response status is OK (status code 200-299)
                if (response.ok) {
                    const data = await response.json();
                    // Store the JWT token in a cookie
                    document.cookie = `token=${data.access_token}; path=/`;
                    // Redirect to the main page
                    window.location.href = '/';
                } else {
                    // Attempt to parse error response as JSON
                    let errorText = 'Login failed. Please check your credentials.';
                    try {
                        const errorData = await response.json();
                        errorText = errorData.msg || errorText;
                    } catch (jsonError) {
                        console.error('Error parsing JSON response:', jsonError);
                    }
                    alert(errorText);
                }
            } catch (error) {
                console.error('An error occurred:', error);
                alert('An unexpected error occurred. Please try again.');
            }
        });
    } else {
        console.log('Login form not found');
    }
});








/*















document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        console.log('Login form found');
        loginForm.addEventListener('submit', async (event) => {
            console.log('Form submitted');
            event.preventDefault(); // Prevent the default form submission

            // Get the values from the form fields
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            console.log('Email:', email);
            console.log('Password:', password);

            try {
                // Send a POST request to the login endpoint
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                // Handle the response
                if (response.ok) {
                    const data = await response.json();
                    // Store the JWT token in a cookie
                    document.cookie = `token=${data.access_token}; path=/`;
                    // Redirect to the main page
                    window.location.href = '/';
                } else {
                    // Display an error message
                    const error = await response.json();
                    alert('Login failed: ' + error.msg);
                }
            } catch (error) {
                console.error('An error occurred:', error);
                alert('An unexpected error occurred. Please try again.');
            }
        });
    } else {
        console.log('Login form not found');
    }
});

*/