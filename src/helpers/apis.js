const APIs = {
  google: {
    link: (query) => {
      return `https://www.googleapis.com/books/v1/volumes?q=isbn:${query}&key=${APIs.google.key}`;
    },
    key: "AIzaSyArxFW_EwixEUGj48zkoIhG6yS-8dOuGMA",
  },
  nytimes: {
    link: () => {
      return `https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=${APIs.nytimes.key}`;
    },
    key: "VGTHTRB7qDzUPZN73Z5NtZ5Mh06p68xS",
  },
  dictionary: {
    key: "49a4f377-61f9-43e6-9416-aabfbe90942a",
  },
};

export default APIs;
