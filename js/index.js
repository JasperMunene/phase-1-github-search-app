document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("github-form");
    const searchInput = document.getElementById("search");
    const userList = document.getElementById("user-list");
    const reposList = document.getElementById("repos-list");
  
    // Handle form submission
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      const query = searchInput.value;
  
      if (!query) return;
  
      userList.innerHTML = '';
      reposList.innerHTML = '';
  
      // Fetch GitHub users based on the search query
      fetch(`https://api.github.com/search/users?q=${query}`)
        .then(response => response.json())
        .then(data => {
          displayUsers(data.items);
        })
        .catch(error => {
          console.error("Error fetching users:", error);
        });
    });
  
    // Function to display the list of users
    function displayUsers(users) {
      users.forEach(function(user) {
        const userItem = document.createElement("li");
        userItem.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}" width="50" height="50">
          <a href="${user.html_url}" target="_blank">${user.login}</a>
          <button data-username="${user.login}">View Repositories</button>
        `;
  
        userItem.querySelector("button").addEventListener("click", function() {
          fetchUserRepos(user.login);
        });
  
        userList.appendChild(userItem);
      });
    }
  
    // Function to fetch and display a user's repositories
    function fetchUserRepos(username) {
      reposList.innerHTML = '';
  
      fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(data => {
          displayRepos(data);
        })
        .catch(error => {
          console.error("Error fetching repositories:", error);
        });
    }
    
    function displayRepos(repos) {
      repos.forEach(function(repo) {
        const repoItem = document.createElement("li");
        repoItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
        reposList.appendChild(repoItem);
      });
    }
  });
  