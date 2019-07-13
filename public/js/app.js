const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const msg1=document.querySelector('#msg1')
const msg2=document.querySelector('#msg2')
msg1.textContent=''
msg2.textContent=''

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location=search.value

    fetch("/weather?adresse="+location).then((response) =>{
    response.json().then((data)=>{
        if (data.error){
            msg2.textContent=''
            return msg1.textContent='Invalide location'
        }
        msg1.textContent=data.forecast.sum+" temperture is "+data.forecast.temp+" with "+data.forecast.prob+" % chance of rain"
        msg2.textContent=data.location
    })
})

})