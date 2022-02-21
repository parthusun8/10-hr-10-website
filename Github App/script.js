const API_URL = "https://api.github.com/users/";

const formEl = document.getElementById("form");
const usernameEl = document.getElementById("input");
formEl.addEventListener("submit", (e)=> {
    e.preventDefault();
    console.log(usernameEl.value);
    fetchUserInfo(usernameEl.value);
    formEl.remove();
});

function showDetails(details, commits){
    const parentContainer = document.createElement('div');
    parentContainer.classList.add("git-container");

    parentContainer.innerHTML = `
        <div class="img-container">
            <img
            src="${details.avatar_url}"
            alt=""
            />
        </div>
        <div class="details-container">
            <span class="name">${details.name ? details.name : details.login}</span>
            <span class="designation">Front End Developer</span>
            <p class="description">${details.bio ? details.bio : "Lorem Ipsum"}</p>
            <div class="stats-container">
            <button class="tooltip"><i class="fa-solid fa-clock-rotate-left"></i><span class="tooltiptext">Commits</span><span class="text">${commits}</span></button
            > 

            <button class="tooltip"><i class="fa-solid fa-users"></i><span class="tooltiptext">Followers</span><span class="text">${details.followers}</span></button
            >

            <button class="tooltip"><i class="fa-solid fa-user-group"></i><span class="tooltiptext">Following</span><span class="text">${details.following}</span></button
            >
        </div>
        </div>
    `;

    
    document.body.appendChild(parentContainer);
}

async function fetchUserInfo(username){
    const resp = await fetch(API_URL + username);
    const respData = await resp.json();
    const response = await fetch("https://api.github.com/search/commits?q=author:" + username);
    const responseDetails = await response.json();
    // console.log(respData);
    showDetails(respData, responseDetails.total_count);
}
