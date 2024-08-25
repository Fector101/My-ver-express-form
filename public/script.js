const select_ele = document.getElementById('state');
async function getStates() {
    let res= await fetch('https://countriesnow.space/api/v0.1/countries/states', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          country: "Nigeria"
        })
      })
      let data = await res.json()
      let states=data.data.states.map(({name})=> name.replace(' State',''))
      // console.log(states)
      states.length && select_ele.querySelector('.loading').classList.add('display-none')
      states.slice(1,-1).forEach(state => {
        if(state !== "Nasarawa"){
            const option = document.createElement('option');
            option.value = state.toLowerCase();  // Set the value attribute
            option.text = state;  // Set the display text
            select_ele.appendChild(option); 
        } // Add the option to the select element
      });
}
 getStates()

const password_ele=document.querySelector('#password')
const email_ele=document.querySelector('#email')
function isRightEmailFormat(){
  const email_text=email_ele.value
  if(email_text && !email_text.endsWith('@nsuk.edu.ng')){
    email_ele.parentElement.querySelector('.warning').classList.remove('display-none')
    return false
  }else{
    email_ele.parentElement.querySelector('.warning').classList.add('display-none')
    return true
  }

}
function checkIfAllFiled(){
  if(!isRightEmailFormat())return false
  const bool=[...document.querySelectorAll('input')]
                                  .every(each=>{
					const value = each.value
					if(value){
						each.parentElement.querySelector('.check')?.classList.remove('tiny')
					}else{
						each.parentElement.querySelector('.check')?.classList.add('tiny')
					}
					return value
									})
  bool? submit_btn.classList.add('filled'): submit_btn.classList.remove('filled')
  return bool
}
password_ele.addEventListener('input',function(){
  isRightEmailFormat()
})
const submit_btn = document.querySelector('button.submit')
function saveFormData(){
	let data={}
	['name','user-name','email','state'].forEach(each=>document.querySelector(`form .row [id="${each}"]`).value)
	localStorage.setItem('formData',JSON.stringify(data))
}
submit_btn.addEventListener('click',function(event){
  event.preventDefault()
  const all_not_empty=checkIfAllFiled()//checks if empty
  const general_warning=document.querySelector('.warning.last')
  
  if(all_not_empty === false){
    general_warning.classList.remove('display-none')
  }else{
    general_warning.classList.add('display-none')
    submit_btn.classList.add('done')
  }
  saveFormData()
  document.querySelector('form').submit()
  // 

})


document.querySelector('form').addEventListener('input',function(event){
  // console.log(event)//.target.type)
  // console.log(111)
  if(event.target.nodeName==="INPUT"){
	if(event.target.type==='email'){
		event.target.value=event.target.value.replace(' ','')
	}
    checkIfAllFiled()
    isRightEmailFormat()

  }
})

const show_password_btn = document.querySelector('button.eye-btn')
let password_visble = false
show_password_btn.addEventListener('click',function(e){
  e.preventDefault()
  const show_svg=show_password_btn.querySelector('.open')
  const hide_svg=show_password_btn.querySelector('.close')
 
  if(password_visble){
    password_ele.type="password"
    show_svg.classList.add('hide-eye')
    hide_svg.classList.remove('hide-eye')
  }else{
    password_ele.type='text'
    show_svg.classList.remove('hide-eye')
    hide_svg.classList.add('hide-eye')
  }
  password_visble=!password_visble
})

async function reFill(){
  const data= JSON.parse(localStorage.getItem('formData'))
  if(data !== false){ //false boolean is sent from back end
    Object.keys(data).forEach(each=>{
      document.querySelector(`form .row [id="${each}"]`).value=data[each]
    })
  }
}
reFill()
