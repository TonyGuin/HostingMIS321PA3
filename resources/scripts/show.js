
let drivers = [] //javascrip is async by default //lets drivers be see by all
let baseUrl = 'https://localhost:7217/api/'



function handleOnLoad()
{
    getDrivers() //lets get all drivers
}
    


function getDrivers()
{

    const allTasksUrl =  baseUrl + 'drivers'

    fetch(allTasksUrl).then(
        function(response)
        {
            console.log(response)
            return response.json()
        }).then(
            function(json)
            {
            console.log(json)
            drivers = json

            //to combt the async, use.then
            //access to app
            const app = document.getElementById('root')

            //create table
            let table = createTable(); //create a table of drivers

            //add table to app
            app.appendChild(table)
        })
}



function createTable()
{
    let table = document.createElement('TABLE')
    table.id = 'driversTable'
    let tableBody = document.createElement('TBODY')
    table.border = '1'
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
    th5.appendChild(document.createTextNode('Date Hired'))
    tr.appendChild(th5) //add it to the row


    drivers.forEach((driver)=>
    {

        let tr2 = document.createElement('TR')
        tr2.id = "tbtr" //table body table row
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

    })


    

    return table



}

