chrome.cookies.getAll({}, function (cookies) {
    // Create a container div to hold cookie information
    let cookieContainer = document.createElement('div');

    // Iterate through the cookies and append information to the container
    for (let i = 0; i < cookies.length; i++) {
        let cookieInfo = document.createElement('div');

        cookieInfo.innerHTML = `
            <strong>Cookie Name:</strong> ${cookies[i].name}<br>
            <strong>Cookie Value:</strong> ${cookies[i].value}<br>
            <strong>Domain:</strong> ${cookies[i].domain}<br>
            <strong>Path:</strong> ${cookies[i].path}<br>
            <strong>Secure:</strong> ${cookies[i].secure}<br>
            <strong>HttpOnly:</strong> ${cookies[i].httpOnly}<br>
            <strong>Expiration Date:</strong> ${cookies[i].expirationDate ? new Date(cookies[i].expirationDate * 1000) : "Session cookie"}<br>
            <hr>
        `;

        // Append the cookie information to the container
        cookieContainer.appendChild(cookieInfo);
    }

    // Append the container to the HTML body or another container element
    document.body.appendChild(cookieContainer);
});
