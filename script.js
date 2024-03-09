const myimg = document.querySelector("img");

myimg.onclick = () => {
    const mySrc = myimg.getAttribute("src");
    if (mySrc === "https://i.pinimg.com/236x/60/c3/19/60c319db3b4f5aa9a8d2f16a53999a8c.jpg") {
        myimg.setAttribute("src", "https://i.pinimg.com/236x/b8/42/49/b84249b80ce5f518c3c42a32da66aad5.jpg");
    } else {
        myimg.setAttribute("src", "https://i.pinimg.com/236x/60/c3/19/60c319db3b4f5aa9a8d2f16a53999a8c.jpg");
    }
};

let myButton = document.querySelector("button");
let myHeading = document.querySelector("h1");

function setUserName() {
    const myName = prompt("Please enter your name");
    if (!myName) {
        setUserName();
    } else {
        localStorage.setItem("name", myName);
        myHeading.textContent = `Welcome, ${myName}`;
    };
};

if (!localStorage.getItem("name")) {
    setUserName();
} else {
    const storedName = localStorage.getItem("name");
    myHeading.textContent = `Welcome, ${storedName}`;
}

myButton.onclick = () => {
    setUserName();
};