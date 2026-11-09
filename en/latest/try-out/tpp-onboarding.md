# TPP Onboarding

This page explains how to onboard the TPP applications using the WSO2 API Manager Developer Portal.

Before you begin:

Configure [WSO2 Identity Server as the Key Manager](/en/latest/get-started/configure-is-as-key-manager/.md).

### Step 1: Sign up as a TPP[​](#step-1-sign-up-as-a-tpp "Direct link to Step 1: Sign up as a TPP")

1. Go to the Developer portal at `<https://<APIM_HOST>:9443/devportal>`.

2. Go to the **Applications** tab. ![applications\_tab](/en/latest/assets/images/applications-tab-31dc0ab5ead3719573455cd5922ae523.png)

3. In the Sign-in form, click **Create Account**.<br />![sign\_in](/en/latest/assets/images/sign-in-form-7c6b47ea8f9a96c66d0b216e57355309.png)

4. Provide a username and click **Proceed Self Register**.<br />![start\_signing\_in](/en/latest/assets/images/start-signing-up-b5f8ecc1f57e66b1c642e13df4377595.png)<br />

5. Fill out the **Create New Account** form to complete registration.

6. Read terms and conditions and click the checkbox to agree to the terms and conditions. ![terms\_conditions](/en/latest/assets/images/read-the-policies-1bc3a6fa434711bdf8a2b0e138398c8e.png)

7. Click **Register**.

### Step 2: Sign in to the Developer Portal as the TPP[​](#step-2-sign-in-to-the-developer-portal-as-the-tpp "Direct link to Step 2: Sign in to the Developer Portal as the TPP")

1. Now, sign in to the Developer portal at `https://<APIM_HOST>:9443/devportal` as the TPP.

2. Enter the username and the password you entered when signing up as a TPP.

3. Click Continue. Now, you are on the home page of the Developer Portal.

### Step 3: Create an application[​](#step-3-create-an-application "Direct link to Step 3: Create an application")

1. In the Developer Portal, go to the **Applications** tab. ![applications\_tab](/en/latest/assets/images/applications-tab-31dc0ab5ead3719573455cd5922ae523.png)

2. Click **ADD NEW APPLICATION**. ![applications\_tab](/en/latest/assets/images/create-new-application-62a5af8c09cc452ef0cb6a592caea598.png)

3. Enter the following application details. ![applications\_details](/en/latest/assets/images/enter-application-details-5468f59ee9b2f59f398cdd698b260f10.png)

4. Click **SAVE**. The Developer Portal displays the created application as follows: ![created\_application](/en/latest/assets/images/created-application-c8244d8575056a2e91e7178ad89cc9fa.png)

The application created via the Developer Portal allows you to observe statistics of APIs, subscribe to APIs, and access the subscribed APIs.

### Step 4: Subscribe to API[​](#step-4-subscribe-to-api "Direct link to Step 4: Subscribe to API")

1. Go to the **APIs** tab in the Developer portal. ![click\_apis](/en/latest/assets/images/click-apis-8564fe51146cbd686389574e98574d18.png)

2. Select the **NextGenPSD2XS2AFramework** API. ![select\_api](/en/latest/assets/images/select-api-ce7df9afabf1856d99e1182cdd492e25.png)

3. Go to **Subscriptions** at the bottom of the API and select **SUBSCRIBE**.

4. Select **your application** from the drop-down list then set the **Throttling Policy** and click **SUBSCRIBE**. Once subscribed, the application can access all the supported services of the NextGenPSD2XS2AFramework API resources.

### Step 5: Create and upload certificates[​](#step-5-create-and-upload-certificates "Direct link to Step 5: Create and upload certificates")

The TPP user needs to create certificates to validate whether the TPP is registered in a governing entity. It is verified in this step. You can use the sample certificates attached below:

note

NextGenPSD2 Reference Toolkit provides Electronic Identification and Trust Services (eIDAS) validation services for TPP validation.

1. Download the root and issuer certificates found [here](/en/latest/assets/attachments/CA_Cert.zip).

2. Issue the given command and upload them to the client trust stores available in the following locations:

   * `<APIM_HOME>/repository/resources/security/client-truststore.jks`
   * `<IS_HOME>/repository/resources/security/client-truststore.jks`

   ```
   keytool -import -alias <alias> -file <certificate_location> -storetype JKS -keystore <truststore_location> -storepass wso2carbon
   ```

3. Restart the Identity Server and API Manager.

### Step 6: Generate keys[​](#step-6-generate-keys "Direct link to Step 6: Generate keys")

The TPP application requires a Client ID (Consumer Key) to access the subscribed API.

1. Go to the **Applications** tab in the Developer Portal.

2. From the application list, select your application, which has subscribed to the NextGenPSD2XS2AFramework API.

3. Select **Production Keys > OAuth2 Tokens** or **Sandbox Keys > OAuth2 Tokens** according to the type of key you require:

   * Production Keys: Generates access tokens in the production environment.
   * Sandbox Keys: Generates access tokens in the sandbox environment. ![generate\_keys](/en/latest/assets/images/generate-keys-2458262250d75f6f88f879a6bd1587b5.png)

4. Provide the requested information as defined below:

   | Field                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                               |
   | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | Grant Types             | Determine the credentials that are used to generate the access token. - Code: Relates to the authorisation code grant type and is applicable when consuming the API as a user. **It is mandatory to select the code grant type for regulatory applications.**<br />- Client Credentials: Relates to the client credentials grant type and is applicable when consuming the API as an application.<br />- Refresh Token: To renew an expired access token. |
   | Callback URL            | The URL used by the TPP to receive the authorization code sent from the bank. The authorisation code can be used later to generate an OAuth2 access token.<br />**This is a mandatory field for the authorization code grant type.**                                                                                                                                                                                                                      |
   | Regulatory Application  | The type of application. If your application is compliant with the NextGenPSD2XS2AFramework framework, it is a Regulatory application.                                                                                                                                                                                                                                                                                                                    |
   | Organization Id         | The Organization Identifier as provided in the application certificate. For example. PSDUK-NCA-OrganizationID                                                                                                                                                                                                                                                                                                                                             |
   | Application Certificate | This is the content of the application certificate (.PEM) that you created in the step above.<br />For testing purposes, you may use this sample application certificate.<br />**For Regulatory applications, it is mandatory to use an application certificate.** You can download the [signing certificate](/en/latest/assets/attachments/signing-certs/obsigning.pem) for testing purposes                                                             |

   ![enter\_application\_details](/en/latest/assets/images/enter-application-details-1-49665482f48384b908cb878b9220835f.png) ![enter\_application\_details](/en/latest/assets/images/enter-application-details-2-4431680373a09a5d8ed956945b87dcd5.png)

5. Click **GENERATE KEYS** to generate production or sandbox keys. It generates the consumer key and consumer secret.

### Step 7: Generate application access token[​](#step-7-generate-application-access-token "Direct link to Step 7: Generate application access token")

1. Go to the **Applications** tab in the Developer Portal.

2. Select your application from the Application List.

3. View the keys you generated. ![production\_keys](/en/latest/assets/images/production-keys-cbf9acac73d9650f2295f9f34d11907c.png)

4. Note down the **Consumer Key** for your application.

5. Run the following cURL command in a command prompt to generate the access token. Update the placeholders with relevant values.

   Use the sample certificates for testing purposes. Click here to see how it is done...

   1. Download the [cert.pem](/en/latest/assets/attachments/cert.pem) and upload it to the client trust stores as follows:

      * The client trust stores for the Identity Server and API Manager are located in the following locations:
      * `<APIM_HOME>/repository/resources/security/client-truststore.jks`
      * `<IS_HOME>/repository/resources/security/client-truststore.jks`

   2. Use the following commands to add the certificate to the client trust store:

      ```
      keytool -import -alias cert -file <PATH_TO_CERT.PEM> -keystore client-truststore.jks -storepass wso2carbon
      ```

   3. Open the `<APIM_HOME>/repository/conf/deployment.toml` file and update the following configurations. Add the relevant signature algorithm supported by the certificate to the following configuration. Sample certificate supports `SHA1withRSA` signature algorithm:

      ```
      supported_signature_algorithms = ["SHA256withRSA", "SHA512withRSA", "SHA1withRSA"]
      ```

      Configure the issuer of the certificate as below if the certificate needs to be skipped form revocation validation.

      ```
      [[open_banking.gateway.certificate_management.certificate.revocation.excluded]]

      issuer_dn = "EMAILADDRESS=<EMAIL_ADDRESS>, CN=<COMMON_NAME>, OU=<ORGANIZATIONAL_UNIT>, O=<ORGANIZATION>, L=<LOCALITY>, ST=<STATE/PROVINCE>, C=<COUNTRY>"
      ```

      Configure as below if the test certificates are used:

      ```
      [[open_banking.gateway.certificate_management.certificate.revocation.excluded]]

      issuer_dn = "EMAILADDRESS=malshani@wso2.com, CN=OB, OU=OB, O=WSO2, L=COL, ST=WP, C=LK"
      ```

   4. Restart the servers.

   5. Download the following certificates and keys, and use them for testing purposes. Use the [transport private key](/en/latest/assets/attachments/transport-certs/obtransport.key) and [transport public certificate](/en/latest/assets/attachments/transport-certs/obtransport.pem) for Transport layer security testing purposes. Use the [signing certificate](/en/latest/assets/attachments/signing-certs/obsigning.pem) and [signing private keys](/en/latest/assets/attachments/signing-certs/obsigning.key) for signing purposes.

```
curl -X POST \

https://<IS_HOST>:9446/oauth2/token \

--cert <TRANSPORT_PUBLIC_KEY_FILE_PATH> --key <TRANSPORT_PRIVATE_KEY_FILE_PATH> \

-d 'grant_type=client_credentials&scope=accounts&client_id=<CLIENT_ID>'
```

7. Upon successful token generation, you can obtain an access token as follows:

   ```
   {

      "access_token":"eyJ4NXQiOiJOVGRtWmpNNFpEazNOalkwWXpjNU1tWm1PRGd3TVRFM01XWXdOREU1TVdSbFpEZzROemM0WkEiLCJraWQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZ19SUzI1NiIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhZG1pbkB3c28yLmNvbUBjYXJib24uc3VwZXIiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6IllEY0c0ZjQ5RzEza1dmVnNucWRoejhnYmEyd2EiLCJuYmYiOjE2Mjg3NDQ4NTYsImF6cCI6IllEY0c0ZjQ5RzEza1dmVnNucWRoejhnYmEyd2EiLCJzY29wZSI6ImFjY291bnRzIiwiaXNzIjoiaHR0cHM6XC9cL2xvY2FsaG9zdDo5NDQ2XC9vYXV0aDJcL3Rva2VuIiwiY25mIjp7Ing1dCNTMjU2IjoidllvVVlSU1E3Q2dvWXhOTVdXT3pDOHVOZlFyaXM0cFhRWDBabWl0Unh6cyJ9LCJleHAiOjE2Mjg3NDg0NTYsImlhdCI6MTYyODc0NDg1NiwianRpIjoiNzBjZDIzYzItMzYxZS00YTEwLWI4YTQtNzg2MTljZmQ2MWJmIn0.WT9d2ov9kfSe75Q6ia_VNvJ12lNkrkMZNWdHu_Ata_nEpM8AWj4Mtc0e8Yb0oZFif_ypNgBtE2ck29nQLFgQ1IicL_OMIFUuwykro2oOCcFAbz7o_rhGsh39aW-ORlxm11_csmNeaWZNfC7lPp-9hBmNt9Sons_pCm2beTMFreZQyywPrJoQ9vwt1QCmkAlTP33YnPrf0u0RQePQvUq81RiJiokhZvwVufHARZv8KLtS8VLrpfbEoSglON_XkumydVjvRWs17I3Ot9zUj6kndHBsqMPZdq_aNQHntftdSI7TVNj5f66Q_4Uafz_hMXADS46pw87rTgzENHHf-5SRhw",

      "scope":"accounts",

      "token_type":"Bearer",

      "expires_in":3600

   }
   ```

Use this generated application access token to invoke the NextGenPSD2XS2AFramework API.
