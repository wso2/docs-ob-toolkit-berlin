This page explains how to onboard the TPP applications using the WSO2 API Manager Developer Portal.

!!! tip "Before you begin:"
    Configure [WSO2 Identity Server as the Key Manager](../get-started/configure-is-as-key-manager.md). 

### Step 1: Sign up as a TPP

1. Go to the Developer portal at `<https://<APIM_HOST>:9443/devportal>`.

2. Go to the **Applications** tab. ![applications_tab](../assets/img/get-started/quick-start-guide/tpp-onboarding/applications-tab.png)

3. In the Sign-in form, click **Create Account**. <br/> ![sign_in](../assets/img/get-started/quick-start-guide/tpp-onboarding/sign-in-form.png)

4. Provide a username and click **Proceed Self Register**. <br/> ![start_signing_in](../assets/img/get-started/quick-start-guide/tpp-onboarding/start-signing-up.png) <br/>

5. Fill out the **Create New Account** form to complete registration.

6. Read terms and conditions and click the checkbox to agree to the terms and conditions. ![terms_conditions](../assets/img/get-started/quick-start-guide/tpp-onboarding/read-the-policies.png)

7. Click **Register**.

### Step 2: Sign in to the Developer Portal as the TPP

1. Now, sign in to the Developer portal at `https://<APIM_HOST>:9443/devportal` as the TPP.

2. Enter the username and the password you entered when signing up as a TPP.

3. Click Continue. Now, you are on the home page of the Developer Portal.

### Step 3: Create an application

1. In the Developer Portal, go to the **Applications** tab. ![applications_tab](../assets/img/get-started/quick-start-guide/tpp-onboarding/applications-tab.png)

2. Click **ADD NEW APPLICATION**. ![applications_tab](../assets/img/get-started/quick-start-guide/tpp-onboarding/create-new-application.png)

3. Enter the following application details. ![applications_details](../assets/img/get-started/quick-start-guide/tpp-onboarding/enter-application-details.png)

4. Click **SAVE**. The Developer Portal displays the created application as follows: ![created_application](../assets/img/get-started/quick-start-guide/tpp-onboarding/created-application.png)

The application created via the Developer Portal allows you to observe statistics of APIs, subscribe to APIs, and access the subscribed APIs.

### Step 4: Subscribe to API

1. Go to the **APIs** tab in the Developer portal. ![click_apis](../assets/img/get-started/quick-start-guide/tpp-onboarding/click-apis.png)

2. Select the **NextGenPSD2XS2AFramework** API. ![select_api](../assets/img/get-started/quick-start-guide/tpp-onboarding/select-api.png)

3. Go to **Subscriptions** at the bottom of the API and select **SUBSCRIBE**.

4. Select **your application** from the drop-down list then set the **Throttling Policy** and click **SUBSCRIBE**.
   Once subscribed, the application can access all the supported services of the NextGenPSD2XS2AFramework API resources.

### Step 5: Create and upload certificates

The TPP user needs to create certificates to validate whether the TPP is registered in a governing entity.
It is verified in this step. You can use the sample certificates attached below:

!!! note
    WSO2 Open Banking Berlin Toolkit provides Electronic Identification and Trust Services (eIDAS) validation services
    for TPP validation.

1. Download the root and issuer certificates found [here](../assets/attachments/CA_Cert.zip).

2. Issue the given command and upload them to the client trust stores available in the following locations:
    - `<APIM_HOME>/repository/resources/security/client-truststore.jks`
    - `<IS_HOME>/repository/resources/security/client-truststore.jks`

     ```
     keytool -import -alias <alias> -file <certificate_location> -storetype JKS -keystore <truststore_location> -storepass wso2carbon
     ```

3. Restart the Identity Server and API Manager.

### Step 6: Generate keys

The TPP application requires a Client ID (Consumer Key) to access the subscribed API.

1. Go to the **Applications** tab in the Developer Portal.

2. From the application list, select your application, which has subscribed to the NextGenPSD2XS2AFramework API.

3. Select **Production Keys > OAuth2 Tokens** or **Sandbox Keys > OAuth2 Tokens** according to the type of key you require:
    - Production Keys: Generates access tokens in the production environment.
    - Sandbox Keys: Generates access tokens in the sandbox environment.
      ![generate_keys](../assets/img/get-started/quick-start-guide/tpp-onboarding/generate-keys.png)

4. Provide the requested information as defined below:

       | Field | Description |
       |-------|-------------|
       | Grant Types | Determine the credentials that are used to generate the access token. <ul> <li> Code: Relates to the authorisation code grant type and is applicable when consuming the API as a user. **It is mandatory to select the code grant type for regulatory applications.**</li> <li> Client Credentials: Relates to the client credentials grant type and is applicable when consuming the API as an application. </li> <li> Refresh Token: To renew an expired access token. </li> </ul> |
       | Callback URL | The URL used by the TPP to receive the authorization code sent from the bank. The authorisation code can be used later to generate an OAuth2 access token. <br/> **This is a mandatory field for the authorization code grant type.** |
       | Regulatory Application | The type of application. If your application is compliant with the NextGenPSD2XS2AFramework framework, it is a Regulatory application. |
       | Organization Id | The Organization Identifier as provided in the application certificate. For example. PSDUK-NCA-OrganizationID |
       | Application Certificate | This is the content of the application certificate (.PEM) that you created in the step above.  <br/> For testing purposes, you may use this sample application certificate. <br/> **For Regulatory applications, it is mandatory to use an application certificate.** |

      ![enter_application_details](../assets/img/get-started/quick-start-guide/tpp-onboarding/enter-application-details-1.png)
      ![enter_application_details](../assets/img/get-started/quick-start-guide/tpp-onboarding/enter-application-details-2.png)

5. Click **GENERATE KEYS** to generate production or sandbox keys. It generates the consumer key and consumer secret.

### Step 7: Generate application access token

1. Go to the **Applications** tab in the Developer Portal.

2. Select your application from the Application List.

3. View the keys you generated. ![production_keys](../assets/img/get-started/quick-start-guide/tpp-onboarding/production-keys.png)

4. Note down the **Consumer Key** for your application.

5. Generate the client assertion by signing the following JSON payload using supported algorithms.

    ??? note "Use the sample certificates for signing and transports layer security testing purposes. Click here to see how it is done..."
        1. Download the [cert.pem](../../assets/attachments/cert.pem) and upload it to the client trust stores as follows:
            - The client trust stores for the Identity Server and API Manager are located in the following locations:
               - `<APIM_HOME>/repository/resources/security/client-truststore.jks`
               - `<IS_HOME>/repository/resources/security/client-truststore.jks`
        2. Use the following commands to add the certificate to the client trust store:
               ```shell
               keytool -import -alias cert -file <PATH_TO_CERT.PEM> -keystore client-truststore.jks -storepass wso2carbon
               ```
        3. Open the `<APIM_HOME>/repository/conf/deployment.toml` file and update the following configurations:
            - Add `SHA1withRSA` as a supported signature algorithm:
               ```
               supported_signature_algorithms = ["SHA256withRSA", "SHA512withRSA", "SHA1withRSA"]
               ```
            - Update the following tag according to the sample:
               ```
               [[open_banking.gateway.certificate_management.certificate.revocation.excluded]]
               issuer_dn = "EMAILADDRESS=malshani@wso2.com, CN=OpenBanking Pre-Production Issuing CA, OU=OpenBanking, O=WSO2 (UK) LIMITED, L=COL, ST=WP, C=LK"
               ```
        4. Restart the servers.
        5. Download the following certificates and keys, and use them for testing purposes.
            - Use the [transport private key](../../assets/attachments/transport-certs/obtransport.key) and
              [transport public certificate](../../assets/attachments/transport-certs/obtransport.pem) for Transport
              layer security testing purposes.
            - Use the [signing certificate](../../assets/attachments/signing-certs/obsigning.pem) and
              [signing private keys](../../assets/attachments/signing-certs/obsigning.key) for signing purposes.

    ``` tab='Format'
    
    {
    "alg": "<The algorithm used for signing.>",
    "kid": "<The thumbprint of the certificate.>",
    "typ": "JWT"
    }
     
    {
    "iss": "<This is the issuer of the token. For example, client ID of your application>",
    "sub": "<This is the subject identifier of the issuer. For example, client ID of your application>",
    "exp": <This is the epoch time of the token expiration date/time>,
    "iat": <This is the epoch time of the token issuance date/time>,
    "jti": "<This is an incremental unique value>",
    "aud": "<This is the audience that the ID token is intended for. For example, https://<IS_HOST>:9446/oauth2/token>"
    }
     
    <signature: The client assertion must be signed using the private key of the application certificate.>
    ```
    
    ``` tab='Sample'
    eyJraWQiOiIyTUk5WFNLaTZkZHhDYldnMnJoRE50VWx4SmMiLCJhbGciOiJQUzI1NiJ9.eyJzdWIiOiJZRGNHNGY0OUcxM2tXZlZzbnFkaHo4Z2JhMndhIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6OTQ0Ni9vYXV0aDIvdG9rZW4iLCJpc3MiOiJZRGNHNGY0OUcxM2tXZlZzbnFkaHo4Z2JhMndhIiwiZXhwIjoxNjI4Nzc0ODU1LCJpYXQiOjE2Mjg3NDQ4NTUsImp0aSI6IjE2Mjg3NDQ4NTUxOTQifQ.PkKRSDtkCyXabzLgGwAoy5C3jSORVU8X8sGDVrKpetPnjbCNx2wPlH-PzWUU1n05gdC7lDmoU21nsKLF_nE3iC-9hKEy4YsvJ7PFjNBPMOMUYDhRh9PCkPnec6f042zonb_ZifBq8r1aScUDoZ1L0hq7yjfZubwReFCWbESQ8PauuBuHRl7__kWvglthfgruQ7TTiIWiM60LWYct5TQWSF1IDcYGy03l-9OV5l260JBHPT4heLXzUQTarsh0PoWpv09xYLu8uGCexEt-HtRH8qwJGiFi5PiCA09_KyWVqbrcdjBloCmD5Kiqa1X0AnEbf9kKs0fqvcl7NN5-yVQUjg
    ```
    
    ??? tip "The value of the `aud` claim should contain the same value as the `Identity Provider Entity ID`. Click here to see the Identity Provider Entity ID..."
        a. Sign in to the Management Console of the Identity Server at `<https://<localhost>t:9446/carbon>`.
    
        b. In the **Main** menu, go to **Home > Identity > Identity Providers > Resident**.
    
        c. View the value in **Resident Identity Provider > Inbound Authentication Configuration > OAuth2/OpenID Connect Configuration > Identity Provider Entity ID**. By default this value is set to `https://<APIM_HOST>:8243/token` .

6. Run the following cURL command in a command prompt to generate the access token. Update the placeholders with relevant values.
    ``` curl
    curl -X POST \
    https://<IS_HOST>:9446/oauth2/token \
    --cert <TRANSPORT_PUBLIC_KEY_FILE_PATH> --key <TRANSPORT_PRIVATE_KEY_FILE_PATH> \
    -d 'grant_type=client_credentials&scope=accounts%20openid&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer&client_assertion=<CLIENT_ASSERTION_JWT>&redirect_uri=<REDIRECT_URI>&client_id=<CLIENT_ID>'
    ```

7. Upon successful token generation, you can obtain an access token as follows:

    ``` json
    {
       "access_token":"eyJ4NXQiOiJOVGRtWmpNNFpEazNOalkwWXpjNU1tWm1PRGd3TVRFM01XWXdOREU1TVdSbFpEZzROemM0WkEiLCJraWQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZ19SUzI1NiIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhZG1pbkB3c28yLmNvbUBjYXJib24uc3VwZXIiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6IllEY0c0ZjQ5RzEza1dmVnNucWRoejhnYmEyd2EiLCJuYmYiOjE2Mjg3NDQ4NTYsImF6cCI6IllEY0c0ZjQ5RzEza1dmVnNucWRoejhnYmEyd2EiLCJzY29wZSI6ImFjY291bnRzIiwiaXNzIjoiaHR0cHM6XC9cL2xvY2FsaG9zdDo5NDQ2XC9vYXV0aDJcL3Rva2VuIiwiY25mIjp7Ing1dCNTMjU2IjoidllvVVlSU1E3Q2dvWXhOTVdXT3pDOHVOZlFyaXM0cFhRWDBabWl0Unh6cyJ9LCJleHAiOjE2Mjg3NDg0NTYsImlhdCI6MTYyODc0NDg1NiwianRpIjoiNzBjZDIzYzItMzYxZS00YTEwLWI4YTQtNzg2MTljZmQ2MWJmIn0.WT9d2ov9kfSe75Q6ia_VNvJ12lNkrkMZNWdHu_Ata_nEpM8AWj4Mtc0e8Yb0oZFif_ypNgBtE2ck29nQLFgQ1IicL_OMIFUuwykro2oOCcFAbz7o_rhGsh39aW-ORlxm11_csmNeaWZNfC7lPp-9hBmNt9Sons_pCm2beTMFreZQyywPrJoQ9vwt1QCmkAlTP33YnPrf0u0RQePQvUq81RiJiokhZvwVufHARZv8KLtS8VLrpfbEoSglON_XkumydVjvRWs17I3Ot9zUj6kndHBsqMPZdq_aNQHntftdSI7TVNj5f66Q_4Uafz_hMXADS46pw87rTgzENHHf-5SRhw",
       "scope":"accounts",
       "token_type":"Bearer",
       "expires_in":3600
    }
    ```

Use this generated application access token to invoke the NextGenPSD2XS2AFramework API.