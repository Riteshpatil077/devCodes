
'use strict';

// Open a popup window
function openPopup() {
    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
    width=500,height=500,left=100,top=100`;
    let popup = window.open('https://www.google.com', 'popup', params);
    return popup;
}

// Access popup from the main window
function accessPopup() {
    let popup = openPopup();
    popup.onload = function () {
        popup.document.body.innerHTML = '<h1>Welcome to the Popup!</h1>';
    };
}

// Access the main window from the popup
function accessMainWindow() {
    let popup = openPopup();
    popup.onload = function () {
        popup.document.write(`
            <script>
                window.opener.document.body.innerHTML = '<h1>Modified by Popup</h1>';
            <\/script>
        `);
    };
}

// Close the popup
function closePopup() {
    let popup = openPopup();
    popup.onload = function () {
        popup.close();
        console.log('Popup closed:', popup.closed);
    };
}

// Move and resize the popup
function moveAndResizePopup() {
    let popup = openPopup();
    popup.onload = function () {
        popup.moveTo(200, 200);
        popup.resizeTo(400, 400);
    };
}

// Scroll the popup window
function scrollPopup() {
    let popup = openPopup();
    popup.onload = function () {
        popup.scrollTo(0, 100);
    };
}

// Focus and blur the popup
function focusAndBlurPopup() {
    let popup = openPopup();
    popup.onload = function () {
        popup.focus();
        setTimeout(() => popup.blur(), 2000);
    };
}

// Example usage
document.addEventListener('DOMContentLoaded', () => {
    document.body.insertAdjacentHTML('beforeend', `
        <button onclick="openPopup()">Open Popup</button>
        <button onclick="accessPopup()">Access Popup</button>
        <button onclick="accessMainWindow()">Access Main Window</button>
        <button onclick="closePopup()">Close Popup</button>
        <button onclick="moveAndResizePopup()">Move and Resize Popup</button>
        <button onclick="scrollPopup()">Scroll Popup</button>
        <button onclick="focusAndBlurPopup()">Focus and Blur Popup</button>
    `);
});
