const APIURL = 'https://api.github.com/users/'

const main = document.querySelector("main");
const form = document.querySelector("form");
const search = document.querySelector("input");


async function getUser(username) {
    try {
        const { data } = await axios(APIURL + username);
        createUserCard(data);
        getRepos(username);
    } catch (err) {
        if (err.response.status === 404) {
            createErrorMesssage("No profile found with the username ")
        }   
    }
}

async function getRepos(username) {
    try {
        const { data } = await axios(APIURL + username + '/repos?sort=created');

        addReposeToCard(data)
    } catch (err) {
        createErrorMesssage('Problem Fetching Repose')
    }
}

function createUserCard(data) {
    const cardHtml = `
    <div class="card">
    <div class="img-container">
            <img src="${data.avatar_url}" alt="${data.name} image">
    </div>
        <div>
            <h3 class="name">${data.name}</h3>
            <p class="job- decription">${data.bio}</p>
            <div class="following-count">
                <small class="followers">${data.followers} followers</small>
                <small class="following">${data.following} following</small>
                <small class="repos">${data.public_repos} Repos</small>
            </div>
            <div class="repos"></div>
        </div> -->
    </div>`
    main.innerHTML = cardHtml
}

function createErrorMesssage(msg) {
    const cardHtml = `
        <div class = "card>
            <h1>${msg}<h1>
        </div>`
    main.innerHTML = cardHtml;
}

function addReposeToCard(repos) {
    const reposEl = document.querySelector('repos');
    repos 
        .slice(0, 5)
        .forEach(repo => {
            const reposEL = document.createElement('a');
            reposEL.classList.add("repo");
            reposEL.target = '_black';
            reposEL.href = repo.html_url;
            reposEL.innerText = repo.name;

            reposEL.appendChild(reposEL)
        })
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const user = search.value;

    if (user) {
        getUser(user);
        search.value =""
    }
})