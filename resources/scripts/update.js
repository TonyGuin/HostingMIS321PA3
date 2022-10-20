
let driver // Have a driver for all the functions
let table = '' //a table for all the functions
app = document.getElementById('root') // allows for the app to be appended 
let baseUrl = 'https://localhost:7217/api/'
let allTasksUrl =  baseUrl + 'drivers' // connection var



function handleOnLoad()
{
    console.log(driver) //Log the driver if there is one
    getDrivers()
}
    


function getDrivers()
{
            
            //create insert form
            let form = createForm()
            app.appendChild(form)


}






function createForm()
{
    let form = document.createElement('form')
    let textInput = document.createElement('input')
    textInput.type = 'text'
    textInput.placeholder = 'Enter the drivers ID'
    textInput.id = 'driverIDEnterBox'
    form.appendChild(textInput)
    let submitButton = document.createElement('button')
    submitButton.id = 'driverIDEntersubmit'
    submitButton.textContent = 'Submit'
    submitButton.addEventListener('click', function(e){

                e.preventDefault() 
                submitID()}); //submit ID
    form.appendChild(submitButton)
    return form
}






function submitID()
{

        temp = document.getElementById('driverIDEnterBox').value
        if(temp != '') //make sure an id is enetered
        {
            //preventDefault() //dont refresh the page when submitted

            window.alert(`Please wait`)
            console.log('submitted')
            console.log(temp)
            
            fetch(allTasksUrl+'/'+temp).then(
            function(response)
            {
                console.log(response)
                return response.json()
            }).then(
            function(driverjson){
                console.log(driverjson)
                driver = driverjson
            }).then(function(){
                driverThere() //see if a driver was returned
            })
            document.getElementById('driverIDEnterBox').value = ''
        }
        else
        {
            window.alert(`Enter an ID`)
            console.log('response from the get 1', driver) 
        } 

}


//only called after event listener
function driverThere()
{
    if(driver.driverFName != null) //driver returned
    {
        window.alert(`Driver has been found`) 
        console.log(driver);
        table = createTable() 
        app.innerHTML = "" //remove current screen
        app.appendChild(table)
        form = createRatingForm()//make new form of table and submit buttons
        app.append(form)
        console.log(table)
    }
    else
    {
        window.alert(`Driver not found`)
        console.log(driver) 
    }
    console.log(table)
    
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
    td1.appendChild(document.createTextNode(`${driver.id}`))
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


function createRatingForm()
{
    let form = document.createElement('form')
    let textInput = document.createElement('input')
    textInput.type = 'text'
    textInput.placeholder = 'New Rating'
    textInput.id = 'driverRatingEnterBox'
    form.appendChild(textInput)

    let submitButton = document.createElement('button')
    submitButton.id = 'driverRatingEnterSubmit'
    submitButton.textContent = 'Submit'
    submitButton.addEventListener('click', function (e){
        e.preventDefault()
        let value = document.getElementById('driverRatingEnterBox').value
        submitRating(value)});
    form.appendChild(submitButton)

    let cancelButton = document.createElement('button')
    cancelButton.id = 'driverRatingEnterCancel'
    cancelButton.textContent = 'Cancel'
    cancelButton.addEventListener('click', function (e){

        e.preventDefault()
        cancelRating()});

    form.appendChild(cancelButton)

    return form

}

function submitRating(value)
{
        let putURL = allTasksUrl+'/'+driver.id

        const sendDriver = {
            "id" : driver.id, 
            "driverFName" : driver.driverFName,
            "driverLName" : driver.driverLName,
            "driverRating" : value,
            "driverHiredDate" : driver.driverHiredDate,
            "driverActive" : driver.driverActive
        }
        if(value > 10 || value < 0)
        {
            window.alert("invalid input (format #.#)")
            document.getElementById('driverRatingEnterBox').value = ''
        }
        else
        {
            fetch(putURL,{
                method: 'PUT',
                headers: {
                    "Accept" : 'application/json',
                    "Content-Type" : 'application/json'
                },
                body: JSON.stringify(sendDriver)
            }).then((response)=> {
                if(response.status == 200)
                {
                    window.alert(`Driver has been updated`) //200 means made it to the back end
                    cancelRating()
                }
                else
                {
                    window.alert("invalid input")
                    document.getElementById('driverRatingEnterBox').value = ''
                }
                console.log('response from the save', response)
                

            })
        }
}



function cancelRating()
{

    app.innerHTML = "" //clears screen back to orginal
    handleOnLoad()

}







