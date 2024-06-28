const WORD = 'ENJOY'
let Alpha = 'QWERTYUIOPASDFGHJKLZXCVBNM';
let inputs_section  = document.querySelector('.inputs')
let keyboard_section  = document.querySelector('.keyboard')
let rows_keyboard = document.querySelectorAll('.keyboard div')
let rows_inputs = document.querySelectorAll('.inputs div')
let btn = document.querySelector('.btn-long')
let count = 10; 
let itreratior = 0;
let arr =[] ;
let arrs = [];
let [green,orange,gray,backgroung,red] = ['#279e64','#f0912a','#464646','#f5f0ec','#ff00a3b0']
let about = document.querySelector('.btn-About')
let home = document.querySelector('.btn-Home')
for(let i =0 ;i<rows_inputs.length;i++){
    for(let n = 0;n<5;n++  ){
        let input = document.createElement('input')
        input.className = 'input-field'
        input.id = `input-${itreratior}`
        rows_inputs[i].appendChild(input)
        itreratior+=1
    }
}
itreratior=0
for(let i = 0 ;i<rows_keyboard.length;i++){
    for(let n = 0 ;n<count;n++){
        let key = document.createElement('div')
        key.className = 'key'
        key.id = `key-${itreratior}`
        let h1 = document.createElement('h1')
        h1.className=  'KeyName'
        h1.textContent = Alpha[itreratior]
        key.append(h1)
        rows_keyboard
        rows_keyboard[i].prepend(key)
        itreratior+=1
    }
    count -= 1
};
let deleteButton = document.querySelector('#key-26');
let img = document.createElement('img')
img.id = 'delete'
img.src = './delete.svg'
img.alt=  'Delete'
deleteButton.appendChild(img)
// JS Main Functions
let inputs = document.querySelectorAll('input')
let keys = document.querySelectorAll('.key')
function Game(){
    inputsHandle()
    keyboardHandle()
    gamehandle()
}
function inputsHandle(){
    inputs[0].focus()
    for(let i = 0;i<inputs.length;i++){
        inputs[i].addEventListener('input',(e,ix)=>{
            input_valid(e,i)
        })
    }
    
    handleCurrentRow()
}
function input_valid(e,i){
    if(!isNaN(parseInt(e.target.value))){
        alert('only strings can be added')
        e.target.value = e.target.value.slice(0,0)
    }
    else{
        input_add_delete(e,i)
    }
    
}
function input_add_delete(e,i){
    e.target.value = e.target.value.toUpperCase()
    if(e.target.value.length >= 1){
        e.target.value = e.target.value.slice(0,1)
        if(inputs[i].nextElementSibling!=null){
            inputs[i].nextElementSibling.focus()
        }
    }else{
        if(inputs[i].previousElementSibling!=null){
            inputs[i].previousElementSibling.focus()
        }
    }
}
function handleCurrentRow(){
    inputs.forEach(function(el){
        el.addEventListener('click',function(event){
            Array.from(inputs).forEach(function(e){
                e.style.pointerEvents= 'none '
            })
            Array.from(event.target.parentElement.children).forEach(function(element){
                element.style.pointerEvents = 'auto'
            })
        })
    })
    btn.onclick = function(){
        arr = []
        for(let  i= 0 ; i < rows_inputs.length ; i++){
            if(rows_inputs[i].lastElementChild.value.length>=1){
                if(rows_inputs[i+1]!= null){
                    rows_inputs[i+1].firstElementChild.focus()
                    setTimeout(function(){
                        rows_inputs[i+1].firstElementChild.click()
                    },0)
                    rows_inputs[0].firstElementChild .style.cssText= ' pointer-events: none;'
                }
            }
        }
        for(let i = 0;i<rows_inputs.length;i++){
            for(let n = 0 ; n< rows_inputs[i].children.length;n++ ){
                if(rows_inputs[i].lastElementChild.value != ''){
                    arr.push(rows_inputs[i].children[n].value)
                }
            }
        }
        winHandle(arr)
    }
    document.addEventListener('keydown',(event)=>{
        for(let i =0 ;i<rows_inputs.length;i++){
            if(event.key == 'Enter'&&rows_inputs[i].lastElementChild.value.length == 1){
                if(rows_inputs[i+1]!= null){
                    rows_inputs[i+1].firstElementChild.focus()
                    rows_inputs[i+1].firstElementChild.style.cssText = 'pointer-events:all;'
                    setTimeout(function(){
                        rows_inputs[i+1].firstElementChild.click()
                    },0)
                    rows_inputs[0].firstElementChild .style.cssText= ' pointer-events: none;'
                }
            }else{
                rows_inputs[0].firstElementChild.style.cssText = 'pointer-events:none;'
            }
        }
})
}
document.addEventListener('keydown',function(e){
    for(let i =0 ;i<rows_inputs.length;i++){
        if(rows_inputs[i].firstElementChild.style.pointerEvents == 'all'&&rows_inputs[i].firstElementChild.value.length!=1){
            rows_inputs[i].firstElementChild.focus()
        }
    }
})
function gamehandle(){
    document.addEventListener('keydown',(e)=>{
        let arr = []
        if(e.key == 'Enter'){
            for(let i = 0;i<rows_inputs.length;i++){
                for(let n = 0 ; n< rows_inputs[i].children.length;n++ ){
                    if(rows_inputs[i].lastElementChild.value != ''){
                        arr.push(rows_inputs[i].children[n].value)
                    }
                }
            }
        } 
        winHandle(arr)
    })
}
itreratior = 0 ;
function winHandle(arr){
    for(let i =itreratior ;i< arr.length ;i+=5){
        arrs.push(arr.slice(i,i+5))
        itreratior+=5
    }
    for(let i =0 ;i<arrs.length;i++){
        if( arrs[i].join('') === WORD ){
            let current = []
            current.push(rows_inputs[i].children)
            current.forEach((element)=>{
                for(let n = 0;n < element.length;n++){
                    element[n].style.cssText = `transition: ${i*.90+1.25}s ; background-color:${green};color:white;`
                    for(let i = 0 ;i<keys.length;i++){
                        if(element[n].value == keys[i].textContent){
                            keys[i].style.cssText = `transition: ${i*.20+.60}s ; background-color:${green};color:white;`
                        }
                    }
                }
            })
        }else if(arrs[i].join('') != WORD){
            let current = []
            let inputWord= [] 
            current.push(rows_inputs[i].children)
            current.forEach((element)=>{
                for(let i =0 ;i<element.length;i++){
                    inputWord.push(element[i].value)
                }
                for(let n = 0;n < element.length;n++){
                    element[n].style.cssText = `transition: ${i*.90+1.25}s ; background-color:${gray};color:white;`
                    for(let i = 0 ;i<keys.length;i++){
                        if(element[n].value == keys[i].textContent){
                            keys[i].style.cssText = `transition: ${i*.20+.60}s ; background-color:${gray};color:white;`
                        }
                    }
                    if(WORD.includes(element[n].value)){
                        if(WORD.indexOf(element[n].value) == inputWord.indexOf(element[n].value)){
                            element[n].style.cssText = `transition: ${n*.90+1.25}s ; background-color:${green};color:white;`
                            for(let i = 0 ;i<keys.length;i++){
                                if(element[n].value == keys[i].textContent){
                                    keys[i].style.cssText = `transition: ${i*.20+.60}s ; background-color:${green};color:white;`
                                }
                            }
                            continue
                        }
                        element[n].style.cssText = `transition: ${n*.90+1.25}s ; background-color:${orange};color:white;`
                        for(let i = 0 ;i<keys.length;i++){
                            if(element[n].value == keys[i].textContent){
                                keys[i].style.cssText = `transition: ${i*.20+.60}s ; background-color:${orange};color:white;`
                            }
                        }
                    }
                }
            })
        }
    }
}
function keyboardHandle(){
    let count2 =0
    let count1 = 0  
    for(let i =0 ;i<keys.length;i++){
        keys[i].addEventListener('click',function(e){
            inputs[count1].parentElement.children[count2].value = e.target.textContent
            if(count2>=inputs[count1].parentElement.children.length-1){
                count2 = inputs[count1].parentElement.children.length-1
            }else{
                count2 += 1
            }
            console.log(count2)
        })
    }
    
    document.addEventListener('keydown',function(e){
        if(e.key == 'Enter'&&inputs[count1].parentElement.lastElementChild.value.length>=1){
            count1 += 5 
            count2 = 0 
        }
    })
    let count3  = 4 
    deleteButton.onclick = function(){
        console.log(count3)
        if(inputs[count1].parentElement.children[count3].value.length<=1){
            inputs[count1].parentElement.children[count3].value = ''
        }
        if(count3 <= 1 ){
            count3 = 0
        }
        else{
            count3-=1
        }
        
        console.log(count3)
    }
    console.log(count2)

}
about.onclick = function(){
    let modal = document.querySelector('.about')
    modal.style.display = 'flex'
    let del = document.querySelector('.del')
    del.onclick = function(){
        modal.style.display = 'none'
    }
}
home.onclick  =function(){
    location.reload()
}
for(let i =0 ;i<inputs.length;i++){
    inputs[i].addEventListener('keydown',function(e){
        if(e.key == 'ArrowRight'&& e.currentTarget.nextElementSibling!= null){
            e.preventDefault()
            e.currentTarget.blur()
            e.currentTarget.nextElementSibling.focus()
        } else if(e.key === 'ArrowLeft' && e.currentTarget.previousElementSibling != null){
            e.preventDefault()
            e.currentTarget.blur()
            e.currentTarget.previousElementSibling .focus()            
            if(e.currentTarget.previousElementSibling === null){
                
            }
        }else if (e.key  == 'Backspace'&& e.currentTarget.previousElementSibling != null){
            e.preventDefault()
            e.currentTarget.value = ''
            e.currentTarget.previousElementSibling.focus()
        }
        
    })
}
setTimeout(function(){
    inputs[0].click()
},0)

Game()