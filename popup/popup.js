
document.addEventListener('DOMContentLoaded', function () {
    let getButton = document.getElementById('getCookies');
    if (getButton) {
        getButton.addEventListener("click", function () {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                const activeTabId = tabs[0].id;
                chrome.tabs.sendMessage(
                    activeTabId,
                    { action: "getCookies" },
                    function (response) {
                        if (chrome.runtime.lastError || !response || !response.cookies) {
                            console.error("Error fetching cookies:", chrome.runtime.lastError);
                        }
                        else{
                            navigator.clipboard.writeText(parseCookieString(response.cookies));
                            document.getElementById("cookies").style.display = "block";
                            document.getElementById("cookies").innerHTML = "Cookies Copied To Clipboard";
                        }
                    }
                );
            });
        });
    } else {
        console.error("Element with id 'getCookies' not found");
    }

    let setCookiesOuter = document.getElementById('setCookiesOuter');
    if (setCookiesOuter) {
        setCookiesOuter.addEventListener("click", function () {
            document.getElementById("inputCookie").style.display = "block";
            document.getElementById("setCookiesOuter").style.display = "none";
            document.getElementById("setCookiesOuter").style.display = "none";
            document.getElementById("setCookiesinner").style.display = "block";
            sendCookies();
        });
    } else {
        console.error("Element with id 'setCookiesinner' not found");
    }

});

function parseCookieString(cookieString) {
    const cookies = cookieString.split('; ');

    const cookieObject = {};

    cookies.forEach(cookie => {
        const [key, value] = cookie.split('=');
        cookieObject[key] = decodeURIComponent(value);
        try {
            cookieObject[key] = JSON.parse(decodeURIComponent(cookieObject[key]));
        } catch (error) {
            console.error('Error parsing', error);
        }
    });
    return JSON.stringify(cookieObject);
}

function sendCookies() {
    let setButton = document.getElementById('setCookiesinner');
    if (setButton) {
        setButton.addEventListener("click", function () {
            let data = document.getElementById('inputCookie').value.trim();
            if (data !== undefined) {
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    const activeTabId = tabs[0].id;
                    chrome.tabs.sendMessage(activeTabId, { action: "setCookies", data: data }, function (response) {
                        if (chrome.runtime.lastError || !response) {
                            console.error("Error setting cookies:", chrome.runtime.lastError);
                        } else {
                            document.getElementById("cookies").style.display = "block";
                            document.getElementById("cookies").innerHTML = "Cookies Setted Successfully Kindly Refesh The Page.";
                        }
                    });
                });
            }
            else {
                document.getElementById("cookies").style.display = "block";
                document.getElementById("cookies").innerHTML = "Text Box is Empty.";
            }
        });
    } else {
        console.log("element not found")
    }
}

