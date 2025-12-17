function triggerCompute() {
    // Placeholder function to simulate computation trigger
    console.log('Computation triggered due to input change.');
    // Here you would add the logic to recompute risk score or other calculations
    
    // Get input values
    const duration = parseFloat(document.getElementById('episodeDuration').value) || 0;
    const age = parseFloat(document.getElementById('ageRange').value) || 0;
    const madrs = parseFloat(document.getElementById('madrsScore').value) || 0;
    
    let remissionRate = 0; // default
    
    if (duration >= 73 && age < 50 && madrs < 34) {
        remissionRate = 0.094;
    } else if (duration >= 50 && duration < 73 && age < 50 && madrs < 34) {
        remissionRate = 0.217;
    } else if (duration >= 77 && age >= 50 && madrs < 29) {
        remissionRate = 0.220;
    } else if (duration >= 75 && age < 50 && madrs >= 34) {
        remissionRate = 0.236;
    } else if (duration >= 26 && duration < 50 && age < 50 && madrs < 32) {
        remissionRate = 0.328;
    } else if (duration >= 50 && duration < 77 && age >= 50 && madrs < 29) {
        remissionRate = 0.348;
    } else if (duration >= 50 && duration < 75 && age < 50 && madrs >= 34) {
        remissionRate = 0.359;
    } else if (duration >= 77 && age >= 50 && madrs >= 29) {
        remissionRate = 0.375;
    } else if (duration < 26 && age < 50 && madrs < 32) {
        remissionRate = 0.453;
    } else if (duration >= 25 && duration < 50 && age < 50 && madrs >= 32) {
        remissionRate = 0.480;
    } else if (duration >= 25 && duration < 50 && age >= 50 && madrs < 31) {
        remissionRate = 0.485;
    } else if (duration >= 50 && duration < 77 && age >= 50 && madrs >= 29) {
        remissionRate = 0.500;
    } else if (duration < 25 && age < 50 && madrs >= 32) {
        remissionRate = 0.604;
    } else if (duration < 25 && age >= 50 && madrs < 31) {
        remissionRate = 0.610;
    } else if (duration >= 23 && duration < 50 && age >= 50 && madrs >= 31) {
        remissionRate = 0.641;
    } else if (duration < 23 && age >= 50 && madrs >= 31) {
        remissionRate = 0.763;
    }
    
    // Set the risk score to the computed RemissionRate
    const riskScore = remissionRate * 100;
    console.log('Computed risk score (RemissionRate):', riskScore);
    
    // Assuming there's an element with id 'riskScore' to display it
    const riskScoreElement = document.getElementById('riskScore');
    if (riskScoreElement) {
        riskScoreElement.textContent = riskScore.toFixed(1) + '%';
    }
}


document.addEventListener('DOMContentLoaded', function() {

    // our FHIR endpoint in Australia
    const client = FHIR.client("https://cdr.fhirlab.net/fhir");
 
    // FHIR client example usage (just print all to console)
    client.request("Patient").then( function(patients) {
        if (patients.entry && patients.entry.length > 0) {
            console.log("First patient from FHIR server:", patients.entry[0].resource);
        } else {
            console.log("No patients found on FHIR server.");
        } 
    }).catch(console.error);

    // 
    FHIR.oauth2.ready().then(function(client) {
        
        // Render the current patient (or any error)
        client.patient.read().then(
            function(pt) {
                document.getElementById("patientsName").innerText = JSON.stringify(pt, null, 4);
            },
            function(error) {
                document.getElementById("patientsName").innerText = error.stack;
            }
        );

        // example patient is https://cdr.fhirlab.net/fhir/Patient/2897
        // get the gender for the current patient from the FHIR
        client.patient.read().then(function(patient) {
            const gender = patient.gender;
            console.log("Patient gender: " + gender);
            if (gender == "male") {
                document.getElementById("radioSexMale").checked = true;
            }
        });
        
        // get the birth date for the current patient from the FHIR
        // birthDate: "1974-01-12"
        client.patient.read().then(function(patient) {
            const birthDate = patient.birthDate;
            console.log("Patient birth date: " + birthDate);
            // parse the birth date and compute age
            const birth = new Date(birthDate);
            const today = new Date();
            let age = today.getFullYear() - birth.getFullYear();
            const m = today.getMonth() - birth.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
                age--;
            }
            console.log("Patient age: " + age);
            document.getElementById("ageRange").value = age;
            document.getElementById("birthDate").value = birthDate;
        });



        // Get MedicationRequests for the selected patient
        client.request("/MedicationRequest?patient=" + client.patient.id, {
            resolveReferences: [ "medicationReference" ],
            graph: true
        })
        
        // Reject if no MedicationRequests are found
        .then(function(data) {
            if (!data.entry || !data.entry.length) {
                throw new Error("No medications found for the selected patient");
            }
            return data.entry;
        })
        
        
        // Render the current patient's medications (or any error)
        .then(
            function(meds) {
                document.getElementById("meds").innerText = JSON.stringify(meds, null, 4);
            },
            function(error) {
                document.getElementById("meds").innerText = error.stack;
            }
        );
        
    }).catch(console.error);
    
    
    
    // Select all input elements
    const inputs = document.querySelectorAll('input');
        
    // Add event listener to each input for 'input' event (fires on every change)
    inputs.forEach(input => {
        input.addEventListener('input', function(event) {
            // React to the change
            triggerCompute();
            // console.log('Input changed:', event.target.name || event.target.id, event.target.value);
            // Add your custom logic here, e.g., validate, update UI, etc.
        });
    });
});
