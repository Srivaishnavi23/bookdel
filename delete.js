function saveToLocalStorage(event){
    event.preventDefault();
    let name=event.target.name.value;
    let email=event.target.email.value;
    let phonenumber=event.target.phonenumber.value;
   const obj={
    name:name,
    email:email,
phonenumber:phonenumber
   }
axios.post("https://crudcrud.com/api/59ffff7d8f204a9fa4e87358a3c18b2c/AppointmentData", obj)
.then((response) => {
    console.log(response)
})
.catch((err) => {
    console.log(err)
})
   //localStorage.setItem(obj.email,JSON.stringify(obj));
   showUserOnScreen(obj)
}
window.addEventListener("DOMContentLoaded" ,() =>{
    axios.get("https://crudcrud.com/api/59ffff7d8f204a9fa4e87358a3c18b2c/AppointmentData")
.then((response) => {
    console.log(response)
    for(var i=0; i<response.data.length;i++)
    {
        showUserOnScreen(response.data[i])
    }
})
.catch((err) => {
    console.log(err)
})

})
function showUserOnScreen(user){
    
        document.getElementById('name').value = user.name
        document.getElementById('email').value = user.email
        document.getElementById('phonenumber').value = user.phonenumber
//console.log(localstorage.getItem(user.email))
if(localStorage.getItem(user.email)!== null)
{
  removeUserFromScreen(user.email)
}

const parentNode= document.getElementById('users');
const childHTML =`<li id=${user._id}> ${user.name} - ${user.email}
                 <button onclick=deleteUser('${user._id}')> Delete user</button>
                 <button onclick=editUserDetails('${user.email}','${user.name}','${user.phonenumber}','${user._id}')>Edit user </button>
                 </li>`
parentNode.innerHTML=parentNode.innerHTML+childHTML

    }

    function editUserDetails(email, name, phonenumber, userId){
    document.getElementById('name').value = name
        document.getElementById('email').value = email
        document.getElementById('phonenumber').value = phonenumber

        deleteUser(userId)
}

function deleteUser(userId){
axios.delete(`https://crudcrud.com/api/59ffff7d8f204a9fa4e87358a3c18b2c/AppointmentData/${userId}`)
   .then(() => {
   
    removeUserFromScreen(userId)

})
.catch((err) => {
    console.log(err)
})
}
//console.log(email)
//localStorage.removeItem(email)
//removeUserFromScreen(email)

function removeUserFromScreen(userId){
    const parentNode =document.getElementById('users');
    const childNodeToBeDeleted = document.getElementById(userId)
    if(childNodeToBeDeleted)
    {
        parentNode.removeChild(childNodeToBeDeleted)
    }
}