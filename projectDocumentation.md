# Cobalt Assignment Project Documentaion(Backend Developer Internship)

 <details close>
 <summary><h1>What is OAuth ?</h1></summary>

**Roles**

   ***OAuth defines four roles:***

*resource owner

      An entity capable of granting access to a protected resource.
      When the resource owner is a person, it is referred to as an
      end-user.

*resource server

      The server hosting the protected resources, capable of accepting
      and responding to protected resource requests using access tokens.

*client

      An application making protected resource requests on behalf of the
      resource owner and with its authorization.  The term "client" does
      not imply any particular implementation characteristics (e.g.,
      whether the application executes on a server, a desktop, or other
      devices).

*authorization server

      The server issuing access tokens to the client after successfully
      authenticating the resource owner and obtaining authorization.

>NOTE - The interaction between the authorization server and resource server
   is beyond the scope of this specification.  The authorization server
   may be the same server as the resource server or a separate entity.
   A single authorization server may issue access tokens accepted by
   multiple resource servers.

**Protocol Flow**

     +--------+                               +---------------+
     |        |--(A)- Authorization Request ->|   Resource    |
     |        |                               |     Owner     |
     |        |<-(B)-- Authorization Grant ---|               |
     |        |                               +---------------+
     |        |
     |        |                               +---------------+
     |        |--(C)-- Authorization Grant -->| Authorization |
     | Client |                               |     Server    |
     |        |<-(D)----- Access Token -------|               |
     |        |                               +---------------+
     |        |
     |        |                               +---------------+
     |        |--(E)----- Access Token ------>|    Resource   |
     |        |                               |     Server    |
     |        |<-(F)--- Protected Resource ---|               |
     +--------+                               +---------------+
</details>

# Journey

* first, i created a normal files like index.js --> which helps to get the the form data for further authentication.
                                      main.html--> simple boiler plate to genrate the front page.
* We are going to Integrate `eSignatures` into our application, because I find out this is the main `feature` of the `DocUsign`.
* Now, lets use the `SDKs` features of DocUsign.
* Why we using Sdks? --> They provide SDKs to wrap our eSignature REST API with objects, properties, and methods in your favorite programming language.

> Start working in Node.js SDKs
* Installing `docusign-esign` dependencies.
* Using the SDK

To make eSignature REST API calls with the SDK, you need:

- A current accessToken.
- The basePath for the API call.
- For most API calls, you’ll also need the relevant accountId. Note that it is common for a user to be a member of multiple accounts.

<details close>
<summary><h1> Integration of Auth with DocUsign</h1></summary>

**Obtaining an access token**

The goal of authentication is to obtain an access token. An `access token` is needed for every API call to DocuSign.

**Determining OAuth flow**

1.Authorization Code Grant with Node.js

2.JSON Web Tokens (JWT) with Node.js

# Now, Authentication Part

### Obtaining an access token
* The goal of authentication is to obtain an access token. An access token is needed for every API call to DocuSign. Access tokens last from one to eight hours, depending on the grant type used to obtain the access token.

### Determining the OAuth flow
* We are going to Authenticate with JWT Token.
* So, Every Node.js SDK (eSignature as well as others) includes two JWT Grant functions:
      1.requestJWTUserToken.
      2.requestJWTApplicationToken.

### Information we need to get JWT token.

1. Integration key (client ID):
2. RSA private key:
3. Base path:
4. Impersonated User ID (UserID)
5. Scopes:

> Settting all these confidential data in our `.env file`.
> All these data is avaiilable in `App and keys` section of your developer account.

### Intialising docuSign API client

* We need this to generate the token.
```js
let dsApiClient = new docusign.ApiClient();
    dsApiClient.setBasePath(BASE_PATH);
    const results = await dsApi.requestJWTUserToken(
         INTEGRATION_KEY,
         USER_ID,
         "signature",
         fs.readFileSync(path.join(__dirname,"private.key")),
         3600
        );
    res.sendFile(path.join(__dirname,'main.html'));
```
* Our JWT token is present in `results.body`, but there is a catch-

>NOTE - The owner of the devlopment account needs to authorise to use it. Because, JWT Grant enables developers to obtain OAuth access tokens without requiring users to log in, given that they have already provided consent for the application to impersonate them when making API calls. 

* SO, we gonna grant consent individually.
* The JWT supposed to be used reuse b/w req for certain user and we will acheive this by saving both the access token and expires timestamp  inside the session.
* So, we need to add new dependencies to our application `express-session`.

> Now, our application is `authenticated`, now we can make starting calls to our docUsign Api.

</details>


### How to request a signature by email using a template(remote signing)

* From all required data we need `TemplateID`, so we need to create a template inside our `DocUsign`.
* And, for that we need a PDF.

Step 1. Obtain your OAuth token  --> the JWT we already got
Step 2. Create an envelope definition from a template  --> we created a new template and get his template id
Step 3. Create and send the envelope.


# Now envelop is created, Now done signing ceremony to the envelop we created 

// https://developers.docusign.com/docs/esign-rest-api/how-to/request-signature-in-app-embedded/


# Challenges face

* Not able to use JWT grant function  - `requestJWTApplicationToken`, IDK its not working in code.
* Granting the consent.