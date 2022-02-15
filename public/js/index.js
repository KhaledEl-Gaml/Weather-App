const weatherForm = document.querySelector("form")
const message1    = document.querySelector("#message1")
const message2    = document.querySelector("#message2")

weatherForm.addEventListener("submit" , (e)=>{
    e.preventDefault()
    const address = document.querySelector("#address").value

    message1.textContent = "Loading..."
    message2.textContent = ""
    message1.style.color = "blue"
    message1.style.fontSize = "20px"


    //validation for special character in the address
    var iChars = "!`@#$%^&*()+=-[]\\\';,./{}|\":<>?~_ ''";   

     for (var i = 0; i < address.length; i++){      
          if (iChars.indexOf(address.charAt(i)) !== -1)
              {    
                message1.textContent = "This Location isn't a valid location"
                message2.textContent = "Enter another location";
                return false
              } 
        }
  
    if(address.length == 0 || address === ''){
        message1.textContent = "No Address Provided"
        message2.textContent = "Please Enter A Valid Address"
    }

    if(address.length >= 15){
        message1.textContent = "Address Not Valid"
        message2.textContent = "Please Enter A Valid Address"
    }

    fetch(`http://localhost:5000/weather?address=${address}`)
    .then((response)=>{
        response.json().then((data)=>{
        if(data.message){
           message2.textContent =data.message; 
        } 
        message1.textContent = `${data.forecast}`
        message2.textContent = `${data.location}`  
        message1.style.color = "black"  
        message2.style.color = "black" 
        message1.style.fontSize = "20px"   
        message2.style.fontSize = "20px"
        message1.style.fontWeight = "bolder"   
        message2.style.fontWeight = "bolder"      
        })
    })
})  