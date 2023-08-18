const modalStr =`
<div class="modal">
    <form action="" class="form">
        <input type="text" name="title" id="title" placeholder="title" required>
        <input type="text" name="assignee" id="" placeholder="assignee" required>
        <select name="status">
            <option value="">---select---</option>
            <option value="TODO">To do</option>
            <option value="IN_PROGRESS">In progress</option>
            <option value="DONE">Done</option>
        </select>
        <textarea name="description" id="" cols="40" rows="5" placeholder=" Description.."></textarea>
        <div class="btn-container">
        <button class="btn" id="form-submit">Submit</button>   
        <button class="btn" id="close">Close</button>
        </div>

    </form>
</div>`;
let count =0;
const btn = document.getElementsByClassName("btn")[0];
btn.addEventListener("click",()=>{
    // create modal :
    let modalContainer = document.createElement("div");
    modalContainer.className="modal-container";
    modalContainer.innerHTML=modalStr;
    
    let container = document.getElementsByClassName("container")[0];
    
    container.appendChild(modalContainer);
    //close modal
    let modal = document.getElementsByClassName("modal")[0];
    let closeBtn = document.getElementById("close");
    modal.addEventListener("click",(e)=>{
        e.stopPropagation();
    })
    modalContainer.addEventListener("click",(e)=>{ 
        modalContainer.remove();
    })
    closeBtn.addEventListener("click",()=>{
        modalContainer.remove();
    })
    
    //------------ modal creation end-----------
    //form submission :
    let form = document.getElementsByClassName("form")[0];

    const addData =(e)=>{
        e.preventDefault();
        let elements = e.target.elements;
        let taskObj = {};

        for(let i=0;i<elements.length;++i){
            (taskObj[elements[i].name]=elements[i].value)
        }
        addTask(taskObj);
        
        modalContainer.remove();
    }
    form.addEventListener("submit", addData);
})
//--------------form-submittion-end--------------------

// task addition :


    const addTask=(obj)=>{
        let pannel = document.getElementById(obj.status);
        const taskStr=  ` <h4>${obj.title}</h4>
                           <p>${obj.assignee}</p>
                            
                            <p class="para-des">${obj.description}</p>`;
        let task = document.createElement("div");
        task.className="task";
        task.draggable="true";
        task.innerHTML= taskStr;
        task.id=`task-${count}`;
        ++count;
    
        task.addEventListener("dragstart",(e)=>{
            e.dataTransfer.setData("tkey",task.id);
            e.dataTransfer.setData("pkey",task.parentElement.id);
            console.log(task.id)
        })
        pannel.appendChild(task);
    };  

    //drag start :
    let pannels = document.getElementsByClassName("pannel");
    

    for(let i=0 ; i<pannels.length; ++i){

        pannels[i].addEventListener("dragover",(e)=>{
            e.preventDefault(); 
        })
        pannels[i].addEventListener("drop",(e)=>{
            let taskId = e.dataTransfer.getData("tkey"); // id of dragable task
            let parentId = e.dataTransfer.getData("pkey");
            if(parentId===pannels[i].id){
                window.alert("you can't drop in the same zone")
                return;
            }
            let newElement = document.getElementById(taskId);
            
            pannels[i].appendChild(newElement);
        })
    }


   





