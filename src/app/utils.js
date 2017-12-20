const store = {
  getMessages: () => {
    return window.localStorage.getItem('messages') || []
  }
}

export { store };
