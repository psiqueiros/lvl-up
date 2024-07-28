const timer = 30;
let messageStrings;
let dialogbox;
let arrow;
let currMessage;
let messageId;
let loadingComplete = true;
let skipNextPress = false;
let isMessageSkipped = false;

document.addEventListener("DOMContentLoaded", function(){
  dialogbox = document.getElementById("dialogbox");
  arrow = document.getElementById("arrow");
  arrow.style.display = 'none';
  
  messageStrings = dialogbox.innerHTML.split('|');
  dialogbox.innerHTML = "";
  messageId = 0;
  currMessage = messageStrings[messageId];
  nextMessage();
  
  dialogbox.addEventListener("click", handleClick);
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);
});

function handleClick() {
  if (!loadingComplete) {
    clearTimeouts();
    displayFullMessage();
  } else if (!skipNextPress) {
    nextMessage();
  } else {
    skipNextPress = false;
  }
}

function nextMessage() {
  if (!loadingComplete || skipNextPress) {
    skipNextPress = false;
    return;
  }

  messageId = (messageId >= messageStrings.length) ? 0 : messageId;
  currMessage = messageStrings[messageId];
  messageId++;
  
  loadMessage(currMessage.split(''));
}

function loadMessage(dialog) {
  loadingComplete = false;
  dialogbox.innerHTML = "";
  arrow.style.display = 'none';
  
  for (let i = 0; i < dialog.length; i++) {
    setTimeout(function() {
      dialogbox.innerHTML += dialog[i];
      if (i === dialog.length - 1) {
        arrow.style.display = 'block';
        loadingComplete = true;
      }
    }, timer * i);
  }
}

function handleKeyDown(e) {
  if ((e.key === 'Enter' || e.key === ' ') && !loadingComplete && !isMessageSkipped) {
    clearTimeouts();
    displayFullMessage();
    isMessageSkipped = true;
  }
}

function handleKeyUp(e) {
  if ((e.key === 'Enter' || e.key === ' ') && loadingComplete) {
    if (!isMessageSkipped) {
      nextMessage();
    }
    isMessageSkipped = false;
  }
}

function displayFullMessage() {
  dialogbox.innerHTML = currMessage;
  arrow.style.display = 'block';
  loadingComplete = true;
}

function clearTimeouts() {
  var highestTimeoutId = setTimeout(";");
  for (var i = 0; i < highestTimeoutId; i++) {
    clearTimeout(i);
  }
}