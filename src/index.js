const express = require(`express`);
const {PORT,INTEGRATION_KEY,USER_ID,BASE_PATH, TEMPLATE_ID,ACCOUNT_ID,CLIENT_USER_ID} = require('../config/config');
const path = require('path');
const app = express();
const body_parser = require('body-parser');
const  docusign  = require('docusign-esign');
const fs  = require('fs');
const session = require('express-session');

app.use(body_parser.urlencoded({extended:true}));
app.use(session({
    secret : 'dfdfgh3465sd',
    resave : true,
    saveUninitialized : true
}))

async function checkToken(request){
    if (request.session.access_token && Date.now() < request.session.expires_at) {
        console.log("re-using access_token ", request.session.access_token);
     } else {
        console.log("generating a new access token");
        let dsApiClient = new docusign.ApiClient();
        dsApiClient.setBasePath(BASE_PATH);
        const results = await dsApiClient.requestJWTUserToken(
            INTEGRATION_KEY,
            USER_ID,
            "signature",
            fs.readFileSync(path.join(__dirname, "private.key")),
            3600
        );
        console.log(results.body);
        request.session.access_token = results.body.access_token;
        request.session.expires_at = Date.now() + (results.body.expires_in - 60) * 1000;
     }
}

function makeEnvelope(name, email, company){
    let env = new docusign.EnvelopeDefinition();
    env.templateId = TEMPLATE_ID;
    let text = docusign.Text.constructFromObject({
       tabLabel: "company_name", value: company});
 
    // Pull together the existing and new tabs in a Tabs object:
    let tabs = docusign.Tabs.constructFromObject({
       textTabs: [text],
    });
 
    let signer1 = docusign.TemplateRole.constructFromObject({
       email: email,
       name: name,
       tabs: tabs,
       clientUserId: CLIENT_USER_ID,
       roleName: 'Applicant'});
 
    env.templateRoles = [signer1];
    env.status = "sent";
 
    return env;
 }

app.get('/', async (req,res)=>{
    await checkToken(req);
    res.sendFile(path.join(__dirname,'main.html'));
})

app.post('/form',async(req,res)=>{

        await checkToken(req);
        let envelopesApi = getEnvelopesApi(req);        

        let envelope = makeEnvelope(req.body.name, req.body.email);

        let results = await envelopesApi.createEnvelope(
        ACCOUNT_ID, {envelopeDefinition: envelope});
        
        console.log("envelop results ", results);
        let viewRequest = makeRecipientViewRequest(req.body.name, req.body.email);
        results = await envelopesApi.createRecipientView(ACCOUNT_ID, results.envelopeId,
            {recipientViewRequest: viewRequest});
        
        res.redirect(results.url)
})

function getEnvelopesApi(request) {
    let dsApiClient = new docusign.ApiClient();
    dsApiClient.setBasePath(process.env.BASE_PATH);
    dsApiClient.addDefaultHeader('Authorization', 'Bearer ' + request.session.access_token);
    return new docusign.EnvelopesApi(dsApiClient);
}

function makeRecipientViewRequest(name,email) {

    let viewRequest = new docusign.RecipientViewRequest();
    viewRequest.returnUrl = 'http://localhost:3000/success'

    viewRequest.authenticationMethod = 'none';

    viewRequest.email = email;
    viewRequest.userName = name;
    viewRequest.clientUserId = CLIENT_USER_ID;

    return viewRequest
}

app.get('/success', (req,res)=>{
    res.send("SUCCESS")
})


app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});


// https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature%20impersonation&client_id=2c6a22b4-b6d8-4155-9f13-53ca95ce69c0&redirect_uri=http://localhost:3000/