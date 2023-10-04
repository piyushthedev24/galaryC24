 // Initialize Firebase (replace with your Firebase project configuration)
 const firebaseConfig = {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    databaseURL: 'YOUR_DATABASE_URL',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID'
  };
  firebase.initializeApp(firebaseConfig);

  // Reference to the Firebase Realtime Database
  const database = firebase.database();

  // Reference to the chat messages
  const chatRef = database.ref('chat');

  // Function to send a message
  function sendMessage(event) {
    event.preventDefault();
    const message = document.getElementById('message').value;
    if (message.trim() !== '') {
      chatRef.push({ text: message, timestamp: firebase.database.ServerValue.TIMESTAMP });
      document.getElementById('message').value = '';
    }
  }

  // Function to display chat messages
  function displayMessages(snapshot) {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = '';
    snapshot.forEach(childSnapshot => {
      const messageData = childSnapshot.val();
      const messageText = document.createElement('div');
      messageText.textContent = messageData.text;
      chatBox.appendChild(messageText);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // Event listener for form submission
  document.getElementById('chat-form').addEventListener('submit', sendMessage);

  // Event listener for new chat messages
  chatRef.limitToLast(10).on('value', displayMessages);
