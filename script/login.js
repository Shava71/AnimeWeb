//Function for move to login form or to register form
let btnGoReg = document.getElementById("goReg");
        let btnGoLog = document.getElementById("goLog");

        btnGoReg.addEventListener("click", ()=>{
            document.getElementById("login").style.display = "none";
            document.getElementById("register").style.display = "block";
        })

        btnGoLog.addEventListener("click", ()=>{
            document.getElementById("login").style.display = "block";
            document.getElementById("register").style.display = "none";
        })

//* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

document.getElementById("fold").addEventListener("click", function () {
  var sidenav = document.querySelector(".sidenav");
  sidenav.classList.toggle("sidenav-closed");
});


function changeBackground(image){
    document.body.style.backgroundImage = "url("+image+")";
}