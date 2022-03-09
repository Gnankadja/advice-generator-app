// Makes some ajax request with a link and his data.
function ajax_request(link, method, data, success = null, failed = null) {
    // Creating a new "xml http request" and Opens the xhr with the passed parameters.
    let xhr = new XMLHttpRequest(); xhr.open(method, link, true);
    // Changes the default header.
    // xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    // Sends the passed data.
    xhr.send(JSON.stringify(data)); xhr.onload = () => {
        // A 200 status has been returned.
        if (xhr.status === 200) success(JSON.parse(xhr.responseText), xhr.status);
        // Otherwise.
        else failed(xhr.status);
    }
}


function getAdvice() {
    // Use Promise
    return new Promise((resolve, reject) => {
        // Ajax request
        ajax_request('https://api.adviceslip.com/advice', "GET", 
        new Object({}), 
        success => resolve(success.slip),
        fail => {reject("Error to get advice. Please retry")});
    });
}

function displayAdvice() {
    getAdvice().then(
        advice => {
            // Display id of advice
            document.querySelector('#advice-id-number').innerHTML = advice.id;
            // Display advice text
            document.querySelector('#advice-text').innerHTML = advice.advice;
        },
        error => {
            document.querySelector('#advice-id-number').innerHTML = null;
            document.querySelector('#advice-text').innerHTML = error;
        }

    )

}

// After all DOM is loaded, display first advice
document.addEventListener('DOMContentLoaded', ()=>{
    displayAdvice();
})

// Listen click on icon-dice
document.getElementById('icon-dice').addEventListener('click', ()=>{
    displayAdvice();
})
