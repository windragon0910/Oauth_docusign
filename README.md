# DocuSign eSignature Quickstart

## Instructions

1. Navigate to `App and Keys` in the DocuSign developer portal and create a new app.
2. On the app creation page, create a new RSA Key and save the private key in a new file `private.key`
3. Whitelist `http://localhost:3000/` in Redirect URIs in the App creation page
4. Fill in the `.env` file with your app credentials
5. Install the dependencies by running `npm install` in the terminal
6. Create a new template in DocuSign. You can use the `Docusign Load Application.pdf` present in this directory.

When giving consent to your app you can use the URL below, fill in your client id before openin the URL

```
https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature%20impersonation&client_id=(YOUR CLIENT ID)&redirect_uri=http://localhost:3000/
```

# Project Screenshot


## FRONT PAGE TO SEND DETAILS
#
 ![Screenshot 2023-04-29 100120](https://user-images.githubusercontent.com/99763066/235283525-0129a0d9-f9c7-45c0-9032-1b63ef848682.jpg)
 
 ## Getting Access Token 
 #
 ![Screenshot 2023-04-29 100345](https://user-images.githubusercontent.com/99763066/235283576-b2f95dea-8633-43f2-81c8-baaf77db1403.jpg)

## Creating templates 
#
![Screenshot 2023-04-29 100547](https://user-images.githubusercontent.com/99763066/235283632-5b9d1096-dd35-4aff-90b8-b41a30cdd637.jpg)

## Getting Mails
![Screenshot 2023-04-29 100657](https://user-images.githubusercontent.com/99763066/235283676-daa00506-4ac6-4808-97e9-1e59eaca6b09.jpg)

