# Our universe

Access the website here: [Application](https://haukebartsch.github.io/RemissionAfterECT/fhir_app/)

Predict: probability of remittance (MADRS <10 = no depressive symptoms) of depressive episode

Without knowledge about the participant the prob. of remission rate is 50% (given some time period).

Variables of interest:

 - Sex (no change in prob. of remission )
 - Age (positive correlation, the older the more probable is remission)
 - Psychotic episodes (yes or no variable about ongoing episodes, if yes higher prob. of remission)
 - MADRS scores (0…10 = normal, 10 .. 19 mild depression, 20 .. 34 moderate depression, 35 .. 60 severe depression, the higher the depression score the higher the prob. of remission)
 - Duration of current episode (shorter episodes the higher the probability of remission)


# Fhir application

From description to data to model to FHIR.

Start the FHIR app (see link above) from a FHIR server like ehr.formlab.fhirlab.net, to link the application to clinical test data. In the above formlab instance select a demo practitioner, go to settings (wheel icon left) and enter our Launch URL "https://haukebartsch.github.io/RemissionAfterECT/fhir_app/" and the Client ID (add to all.js).

Information about the application launch and authorization can be found here: https://hl7.org/fhir/smart-app-launch/app-launch.html

