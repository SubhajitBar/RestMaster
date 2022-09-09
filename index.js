// console.log("PestMaster Configered");
// Utility functions
function getElementFromString(string){
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}


// initialize number of parameters 
let addedParamCount = 0;



// hide parametersBox  
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = "none";


// if user clicks on params box 
let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener('click', ()=>{
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})

// if user clicks on json box 
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener('click', ()=>{
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';
})


// click "+" to add parameters
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', ()=>{
    let params = document.getElementById("params");
    let string = `<div class="form-row">
                    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount+2}</label>
                    <div class=" my-2 col-md-4">
                    <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount+2} Key">
                    </div>
                    <div class=" my-2 col-md-4"> 
                    <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount+2} Value">
                    </div>
                    <button class=" my-2 btn btn-primary deleteParam" > - </button>
                </div>`

    // convert the element string to dom node

    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);

    // Delete Parameters 
    let deleteParam = document.getElementsByClassName("deleteParam");
    for ( item of deleteParam) {
        item.addEventListener('click',(e)=>{
            e.target.parentElement.remove();
        })
    }
    addedParamCount++;
})


let submit = document.getElementById("submit");
submit.addEventListener('click',()=>{
    // document.getElementById('responseJsonText').value = "Please wait... Fetching response...";
    document.getElementById('responsePrism').innerHTML = "Please wait... Fetching response...";


    // fetching all the values entered by user 
    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='RequestType']:checked").value;
    let contentType = document.querySelector("input[name='ContentType']:checked").value;


    // if user choose params , collect all the parameters in an object
    if(contentType == 'params'){
        data = {};
        for (let i=0; i< addedParamCount+1 ;i++){
            if(document.getElementById('parameterKey' + (i+1)) != undefined){
                let key = document.getElementById('parameterKey' + (i+1)).value;
                let value = document.getElementById('parameterValue' + (i+1)).value;
                data[key] = value;
                console.log(data);
            }
        }
        data = JSON.stringify(data);
    }
    else{
        data = document.getElementById('requestJsonText').value;

    }
    // console.log("url is: ", url);
    // console.log("Request type:", requestType);
    // console.log("content type:", contentType);
    // console.log("data is :", data);


    // if the request type is get, invoke fetch to create a get request
        if(requestType == 'GET'){
            fetch(url,{
                method: 'GET',
            })
            .then(response=> response.text())
            .then((text)=>{
                // document.getElementById('responseJsonText').value = data;
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            })
        }
        
     // if the request type is post, invoke fetch to create a post request
        else{
            fetch(url,{
                method: 'POST',
                body: data,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
            .then(response=> response.text())
            .then((text)=>{
                // document.getElementById('responseJsonText').value = text;
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            })
        }


})

