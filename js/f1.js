createYearField()
createRoundField()
addSubmitButton()
createTable()

function createYearField(){
    yearInput = document.createElement('input');
    yearInput.placeholder="Enter the year of the race";
    yearInput.name = "year"
    yearInput.classList.add("form-control");
    document.body.appendChild(yearInput);
}

function createRoundField(){
    roundInput = document.createElement("input");
    roundInput.placeholder = "Enter the round you wish to lookup";
    roundInput.name = "round";
    roundInput.classList.add("form-control");
    document.body.appendChild(roundInput);
}

function addSubmitButton(){
    button = document.createElement('button');
    button.innerText="Submit";
    button.classList.add("btn", "btn-outline-danger")
    button.addEventListener("click", ()=>handleSubmitButton())
    document.body.appendChild(button);
}

function handleSubmitButton(){
    year = document.getElementsByName("year")[0].value;
    round = document.getElementsByName("round")[0].value;
    console.log(round)

    APICall(year, round);
}

async function APICall(year, round){
    result = await axios.get(`https://ergast.com/api/f1/${year}/${round}/driverStandings.json`).catch((e)=>{console.error(e);alert('Something went wrong. Most likely there no year/round combo of that description.')}).finally(console.log("Got 'er done!"))
    console.log(result)

    result = result.data
    
    tbody = document.getElementsByTagName('tbody')[0]
    console.log (result)
    console.log (result.MRData.StandingsTable.season)
    driverStandings = result.MRData.StandingsTable.StandingsLists[0].DriverStandings

    for (let standing of driverStandings){
        console.log(standing)
    
        // retrieve and show:
        // first name
        // last name
        // date of birth
        // position
        // wins
        // nationality
        // Constructor

        tbody = document.getElementsByTagName('tbody')[0];
        tr = document.createElement('tr');
        tbody.appendChild(tr);

        th = document.createElement('th');
        th.scope="row";
        th.innerText = standing.Driver.givenName
        tr.appendChild(th)

        td = document.createElement ("td");
        td.innerText= standing.Driver.familyName
        tr.appendChild(td)
        
        td = document.createElement ("td");
        td.innerText= standing.Driver.dateOfBirth
        tr.appendChild(td)
        
        td = document.createElement ("td");
        td.innerText= standing.position
        tr.appendChild(td)

        td = document.createElement ("td");
        td.innerText= standing.wins
        tr.appendChild(td)

        td = document.createElement ("td");
        td.innerText= standing.Driver.nationality
        tr.appendChild(td)

        td = document.createElement ("td");
        td.innerText= standing.Constructors[0].constructorId
        tr.appendChild(td)
    }
}

function createHeaderEntry(headerEntryName){
    th = document.createElement("th");
    th.innerText = headerEntryName
    th.scope = "col"
    tr.appendChild(th)
}

function createTable(){
    table = document.createElement("table");
    table.classList.add("table", "table-striped");
    document.body.appendChild(table);

    thead = document.createElement("thead");
    table.appendChild(thead)

    // retrieve and show:
    // first name
    // last name
    // date of birth
    // position
    // wins
    // nationality
    // Constructor

    tr = document.createElement("tr");
    thead.appendChild(tr)

    createHeaderEntry("First Name");
    createHeaderEntry("Last Name");
    createHeaderEntry("Date of Birth");
    createHeaderEntry("Position");
    createHeaderEntry("Wins");
    createHeaderEntry("Nationality");
    createHeaderEntry("Constructor");

    tbody = document.createElement("tbody");
    table.appendChild(tbody)
}

