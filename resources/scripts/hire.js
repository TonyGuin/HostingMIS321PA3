let driver = {driverFName: '', driverLName: '', driverRating : ''}; //make defaut driver
let table = '' 
app = document.getElementById('root') //lets app be seen by all functions
let baseUrl = 'https://localhost:7217/api/'
let allTasksUrl =  baseUrl + 'drivers'



function handleOnLoad()
{
    form =createForm() //creates the form for a driver info to be entered
    app.appendChild(form)
}




function createForm()
{   
    let form = document.createElement('form')

    let textInput = document.createElement('input')
    textInput.type = 'text'
    textInput.placeholder = 'First name'
    textInput.id = 'driverFNameEnterBox'
    form.appendChild(textInput)

    let textInput2 = document.createElement('input')
    textInput2.type = 'text'
    textInput2.placeholder = 'Last name'
    textInput2.id = 'driverLNameEnterBox'
    form.appendChild(textInput2)

    let textInput3 = document.createElement('input')
    textInput3.type = 'rating'
    textInput3.placeholder = 'Rating (format #.#)'
    textInput3.id = 'driverRateEnterBox'
    form.appendChild(textInput3)



    let createButton = document.createElement('button')
    createButton.id = 'driverCreateButton'
    createButton.textContent = 'Create Driver'
    createButton.addEventListener('click', function (e){

        e.preventDefault()

        //checks to see if any field is not updated
        driver.driverFName = (document.getElementById('driverFNameEnterBox').value == '') ? '' : document.getElementById('driverFNameEnterBox').value
        driver.driverLName = (document.getElementById('driverLNameEnterBox').value == '') ? '' : document.getElementById('driverLNameEnterBox').value
        driver.driverRating =  (document.getElementById('driverRateEnterBox').value == '') ? '' : document.getElementById('driverRateEnterBox').value
        NewDriver()});

    form.appendChild(createButton)

    return form

}






function NewDriver()
{

        if(!driver.driverFName=='' && !driver.driverLName=='' && !driver.driverRating == '')
        {

            //check if there are numbers in the name
            if(!Number.isInteger(parseInt(driver.driverFName.match(/\d/))) && !Number.isInteger(parseInt(driver.driverLName.match(/\d/))))
            {
                try
                {
                    //check to see if the rating starts with a character
                    parseFloat(driver.driverRating.toString("0.0"))
                    driver.driverHiredDate = new Date().toJSON().slice(0,10)
                    table = createTable()
                    app.innerHTML=''
                    app.appendChild(table)
                    form = createConformation()
                    app.appendChild(form)
                }
                catch(e)
                {
                    window.alert("Rating must be a number")
                }
            }
            else
            {
                window.alert("Only use characters in the name")
                
            }
        }
        else
        {
            window.alert(`Complete all fields`)
            console.log('response from the get 1', driver) 
        } 

}







//only called after event listener
function createTable()
{ 
    let table = document.createElement('TABLE')
    table.id = 'driverTable'
    table.border = '1'
    let tableBody = document.createElement('TBODY')
    tableBody.id = 'driverTableBody'
    table.appendChild(tableBody)

    //create header row
    let tr = document.createElement('TR')
    tr.id = "thtr"
    tableBody.appendChild(tr)

        //header 1
    let th1 = document.createElement('TH')
    th1.width = 200;
    th1.appendChild(document.createTextNode('ID'))
    tr.appendChild(th1) //add it to the row

        //header 2
    let th2 = document.createElement('TH')
    th2.width = 200;
    th2.appendChild(document.createTextNode('First Name'))
    tr.appendChild(th2) //add it to the row

        //header 3
    let th3 = document.createElement('TH')
    th3.width = 200;
    th3.appendChild(document.createTextNode('Last Name'))
    tr.appendChild(th3) //add it to the row

    //header 4
    let th4 = document.createElement('TH')
    th4.width = 200;
    th4.appendChild(document.createTextNode('Rating'))
    tr.appendChild(th4) //add it to the row

        //header 5
    let th5 = document.createElement('TH')
    th5.width = 200;
    th5.appendChild(document.createTextNode('Date Hired '))
    tr.appendChild(th5) //add it to the row



    let tr2 = document.createElement('TR') //create the driver table
    tr2.id = "tbtr"
    tableBody.appendChild(tr2)


    let td1 = document.createElement('TD')
    td1.width = 200;
    td1.appendChild(document.createTextNode(`TBD`))
    tr2.appendChild(td1)

    let td2 = document.createElement('TD')
    td2.width = 200;
    td2.appendChild(document.createTextNode(`${driver.driverFName}`))
    tr2.appendChild(td2)

    let td3 = document.createElement('TD')
    td3.width = 200;
    td3.appendChild(document.createTextNode(`${driver.driverLName}`))
    tr2.appendChild(td3)

    let td4 = document.createElement('TD')
    td4.width = 200;
    td4.appendChild(document.createTextNode(`${driver.driverRating}`))
    tr2.appendChild(td4)

    let td5 = document.createElement('TD')
    td5.width = 200;
    td5.appendChild(document.createTextNode(`${driver.driverHiredDate}`))
    tr2.appendChild(td5)



    return table



}


//buttons to submit or cancel
function createConformation()
{
    let form = document.createElement('form')

    let submitButton = document.createElement('button')
    submitButton.id = 'driverNewDriverSubmit'
    submitButton.textContent = 'Submit'
    submitButton.addEventListener('click', function (e){
        e.preventDefault()
        submitDriver()});
    form.appendChild(submitButton)

    let cancelButton = document.createElement('button')
    cancelButton.id = 'driverNewDriverCancel'
    cancelButton.textContent = 'Cancel'
    cancelButton.addEventListener('click', function (e){

        e.preventDefault()
        cancelDriver()});

    form.appendChild(cancelButton)

    return form
}




function submitDriver()
{
        let postURL = allTasksUrl

        const sendDriver = {
            "id" : "1", 
            "driverFName" : driver.driverFName,
            "driverLName" : driver.driverLName,
            "driverRating" : driver.driverRating,
            "driverHiredDate" : driver.driverHiredDate,
            "driverActive" : true
        }

        fetch(postURL,{
            method: 'POST',
            headers: {
                "Accept" : 'application/json',
                "Content-Type" : 'application/json'
            },
            body: JSON.stringify(sendDriver)
        }).then((response)=> {
            if(response.status == 200)
            {
                window.alert(`Driver has been created`) //200 means made it to the back end
                cancelDriver()
            }
            else
            {
                window.alert("error creating")
            }
            console.log('response from the save', response)
            

        })
}




function cancelDriver()
{

    app.innerHTML = ""
    handleOnLoad()

}



