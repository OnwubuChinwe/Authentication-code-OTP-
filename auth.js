// Generate random numbers
function random(){
    ran1 = Math.floor(Math.random() * 10);
    ran2 = Math.floor(Math.random() * 10);
    ran3 = Math.floor(Math.random() * 10);
    ran4 = Math.floor(Math.random() * 10);
}


let inp = document.querySelectorAll("input") // [ist, 2nd, ....]
inp[0].focus()
for(let i = 0;i < inp.length;i++){
    inp[i].addEventListener("input", function(){
        if(inp[i].value.length == 1){
            this.classList.add("valid")
            this.nextElementSibling.focus()
            inp[inp.length-1].addEventListener("input",()=>{
                 if(inp[inp.length-1].value.length == 1){
                   document.querySelector(".btn").innerHTML = "Verify"
                  }
                  else{
                    document.querySelector(".btn").innerHTML = "Get code"
                    }
                 })
        }else if(inp[i].value.length == 0){
            this.classList.remove("valid")
            this.previousElementSibling.focus()
        }
    })
}

const btn = document.querySelector(".btn")
btn.addEventListener("click",()=>{
    if(btn.innerHTML.trim() == "Get code"){
        inp[0].focus()
        if(document.querySelector(".notifications").classList.contains("display")){
        }else{
            random()
            document.querySelector(".code1").innerHTML = `${ran1}  ${ran2}  ${ran3} ${ran4}`
            document.querySelector(".code2").innerHTML = `Code: ${ran1}  ${ran2}  ${ran3} ${ran4}`
            document.querySelector(".exp_note").innerHTML = `<b>Your Verification code will expire in 15Sec: <span class="expire"></span></b>`
            document.querySelector(".notifications").classList.add("display")
            document.querySelector(".notifications").classList.add("animate")
            btn.innerHTML = "Code sent"
                setTimeout(()=>{
                    document.querySelector(".notifications").classList.remove("display")
                    document.querySelector(".notifications").classList.remove("animate")
                    document.querySelector(".code1").innerHTML = ""
                    btn.innerHTML = "Get code"
                    random()
                },16000)
                i = 15
                count = setInterval(()=>{
                    document.querySelector(".expire").innerHTML = i--      
                },1000)
        
                setTimeout(()=>{
                    clearInterval(count)
                    document.querySelector(".expire").innerHTML = ""
                },16000)
            }
    }else if(btn.innerHTML.trim() == "Verify"){
        inp[inp.length-1].focus()
        document.querySelector(".expire").innerHTML = ""
        let num1 = Number(inp[0].value)
        let num2 = Number(inp[1].value)
        let num3 = Number(inp[2].value)
        let num4 = Number(inp[3].value)
        if(num1 == ran1 && num2 == ran2 && num3 == ran3 && num4 == ran4){
            document.querySelector(".code2").innerHTML = `Successful`
            clearInterval(count)
            document.querySelector(".notifications").classList.add("display")
            document.querySelector(".notifications").classList.add("animate")
            btn.innerHTML = "Get code"
            inp.forEach(inputs => {
                inputs.value = ""
            });
            setTimeout(()=>{
                document.querySelector(".notifications").classList.remove("display")
                document.querySelector(".notifications").classList.remove("animate")
                document.querySelector(".code1").innerHTML = ""
            },3000)
        }else{
            document.querySelector(".code2").innerHTML = `Wrong Code`
            document.querySelector(".notifications").classList.add("display")
            document.querySelector(".notifications").classList.add("animate")
            btn.innerHTML = "Get code"
        }
    }
})