// let element = document.getElementById('getCookies');
// element.addEventListener("click", function () {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         const activeTabId = tabs[0].id;

//         chrome.tabs.sendMessage(
//             activeTabId,
//             { action: "getCookies" },
//             function (response) {
//                 if (chrome.runtime.lastError || !response || !response.cookies) {
//                     console.error("Error fetching cookies:", chrome.runtime.lastError);
//                     return;
//                 }
//                 document.getElementById("cookies").innerHTML = response.cookies;
//             }
//         );
//     });
// });

document.addEventListener('DOMContentLoaded', function () {
    let element = document.getElementById('getCookies');
    if (element) {
        element.addEventListener("click", function () {
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                const activeTabId = tabs[0].id;
                chrome.tabs.sendMessage(
                    activeTabId,
                    { action: "getCookies" },
                    function (response) {
                        if (chrome.runtime.lastError || !response || !response.cookies) {
                            console.error("Error fetching cookies:", chrome.runtime.lastError);
                            return;
                        }
                        document.getElementById("cookies").innerHTML = response.cookies;
                    }
                );
            });
        });
    } else {
        console.error("Element with id 'getCookies' not found");
    }
});
