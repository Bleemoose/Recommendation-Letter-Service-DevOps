function init(){
    getUsers();
}

function getUsers(email){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/allUsers");
    xhttp.send();
    xhttp.onload =function(){
        makeUsersArray(xhttp.responseText);
    }
}

var CurrSelectedUserEmail;

function makeUsersArray(responseText) {
    let as = JSON.parse(responseText);
    makeList(as);
}

function makeList(data){
    var listDiv = document.getElementById('listDiv');
    var ul = document.createElement('ul');
    listDiv.appendChild(ul);
    for (var i = 0; i < data.length; ++i) {
        var li = document.createElement('li');
        li.setAttribute("id",data[i].email);
        li.setAttribute("onclick","onUserClicked(this.id)")
        var textnode = document.createTextNode(data[i].email);
        li.appendChild(textnode);
        ul.appendChild(li);
    }
}

function onUserClicked(email){
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/user?email="+email);
    xhttp.send();
    xhttp.onload =function(){
        CurrSelectedUserEmail=email;
        renderUser(JSON.parse(xhttp.responseText));
    }
}

function renderUser(user){
    var detailsDiv=document.getElementById("detailsDiv");
    detailsDiv.innerHTML="";
    var namePar=document.createElement("p");
    namePar.innerText="Name:\n"+user.fname+" "+user.lname+"\n"+"Email Address: "+user.email;
    var delBtn=document.createElement("button");
    delBtn.setAttribute("class","button");
    delBtn.setAttribute("onclick","deleteUser()");
    delBtn.setAttribute("style","background-color:#ff4646");
    delBtn.innerText="Delete User";
    detailsDiv.appendChild(namePar);
    detailsDiv.appendChild(delBtn);
}

function deleteUser(){
    var xhr = new XMLHttpRequest();
    xhr.open("PATCH","/admin/delete");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("userEmail="+CurrSelectedUserEmail);
    document.getElementById("listDiv").innerHTML="";
    document.getElementById("detailsDiv").innerHTML=""
    setTimeout(function (){init()},50);
}
