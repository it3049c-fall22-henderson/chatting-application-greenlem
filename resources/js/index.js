const nameInput = document.getElementById("my-name-input");
const myMessage = document.getElementById("my-message");
const sendButton = document.getElementById("send-button");
const saveButton = document.getElementById("save-Button");
const chatBox = document.getElementById("chat");
const serverURL = `https://it3049c-chat-application.herokuapp.com/messages`;

function fetchMessages() {
    return fetch(serverURL)
        .then( response => response.json())
}

async function updateMessages() {
  // Fetch Messages
  const messages = await fetchMessages();
  // Loop over the messages. Inside the loop we will
      // get each message
      // format it
      // add it to the chatbox
      let formattedMessages = "";
      messages.forEach(message => {
        formattedMessages += formatMessage(message, nameInput.value);
      });
      chatBox.innerHTML = formattedMessages;
}

function formatMessage(message, myNameInput) {
  const time = new Date(message.timestamp);
  const formattedTime = `${time.getHours()}:${time.getMinutes()}`;

  if (myNameInput === message.sender) {
      return `
      <div class="mine messages">
          <div class="message">
              ${message.text}
          </div>
          <div class="sender-info">
              ${formattedTime}
          </div>
      </div>
      `
  } else {
      return `
          <div class="yours messages">
              <div class="message">
                  ${message.text}
              </div>
              <div class="sender-info">
                  ${message.sender} ${formattedTime}
              </div>
          </div>
      `
  }
}

updateMessages()
const MILLISECONDS_IN_TEN_SECONDS = 10000;
setInterval(updateMessages, MILLISECONDS_IN_TEN_SECONDS);

function sendMessages(username, text) {
  const newMessage = {
      sender: username,
      text: text,
      timestamp: new Date()
  }

  fetch (serverURL, {
      method: `POST`, 
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMessage)
  });
}

sendButton.addEventListener("click", function(sendButtonClickEvent) {
  sendButtonClickEvent.preventDefault();
  const sender = nameInput.value;
  const message = myMessage.value;

  sendMessages(sender,message);
  myMessage.value = "";
});

//localStorage.setItem('nameSet', JSON.stringify(nameInput));

//localData;
//localData = JSON.parse(localStorage.getItem('nameSet'));

function checkName(){
    var f = nameInput;
    var canSubmit = true;

    for ( var i = 0; i < f.clientHeight; i++) {
        if (f[i].value.length == 0)
        canSubmit = false;
    }
    document.getElementById('my-name-input').disabled = !canSubmit;
}

saveButton.addEventListener("click", function (saveButtonClickEvent){
    saveButtonClickEvent.preventDefault();
    
    localStorage.setItem('nameSet', JSON.stringify(nameInput));

    localData;
    localData = JSON.parse(localStorage.getItem('nameSet'));
});