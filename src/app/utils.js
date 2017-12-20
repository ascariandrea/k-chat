const store = {
  getGuestUsername() {
   return window.localStorage.getItem('guestUsername');
  },
  setUsername(username) {
    window.localStorage.setItem('username', username);
  },
  getUsername() {
    return window.localStorage.getItem('username');
  },
  getMessages() {
    return window.localStorage.getItem('messages') ? JSON.parse(window.localStorage.getItem('messages')) : []
  },
  setMessages(messages) {
    window.localStorage.setItem('messages', JSON.stringify(messages));
  },
  addMessage(message) {
    const storedMessages = window.localStorage.getItem('messages') ? JSON.parse(window.localStorage.getItem('messages')) : [];
    let messages = storedMessages.concat(message);
    if (messages.length > 5) {
      messages.shift()
    }
    window.localStorage.setItem('messages', JSON.stringify(messages));
  },
  setUserId(id) {
    window.localStorage.setItem('userId', id);
  },
  getUserId() {
    return window.localStorage.getItem('userId');
  }
}

export { store };

export const randomUsername = () =>
  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
