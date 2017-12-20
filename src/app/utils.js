const store = {
  getGuestUsername() {
   return window.localStorage && window.localStorage.getItem('guestUsername');
  },
  setUsername(username) {
    window.localStorage.setItem('username', username);
  },
  getUsername() {
    return window.localStorage && window.localStorage.getItem('username');
  },
  getMessages() {
    return window.localStorage.getItem('messages') ? JSON.parse(window.localStorage.getItem('messages')) : []
  },
  addMessage(message) {
    const storedMessages = window.localStorage.getItem('messages') ? JSON.parse(window.localStorage.getItem('messages')) : [];
    const messages = storedMessages.concat(message);
    window.localStorage.setItem('messages', JSON.stringify(messages));
  }
}

export { store };

export const randomUsername = () =>
  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
