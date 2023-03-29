This page provides instructions to use the NextGenPSD2XS2AFramework API to provide the
Payment Instrument Issuer Service (PIIS).

### Deploying NextGenPSD2XS2A API v2 for PIIS 

!!! tip "Before you begin:"
    Deploy the [NextGenPSD2XS2AFramework API](deploy-nextgenpsd2-api.md).

1. Sign in to the API Publisher Portal at `https://<APIM_HOST>:9443/publisher` with `creator/publisher` privileges.
2. Navigate to the API listing page, and click on the **NextGenPSD2XS2AFramework API**.
3. Click **Create New Version**.
4. Set the version number to **v2** and click **Create**.
5. You are redirected to the API Overview page of NextGenPSD2XS2AFramework API **v2**.
6. Select **API Configurations > API Definition** from the left menu panel. <br/> ![api_definition](../assets/img/try-out/cof-flow/select-api-definition.png)
7. Click **Import Definition**. ![import_definition](../assets/img/try-out/cof-flow/import_definition.png)
8. Set the Input Type to **OpenAPI File/Archive** and click **Browse File To Upload**.
9. Upload the `<APIM_HOME>/<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/berlin.group.org/ConfirmationOfFunds/psd2-confirmation-of-funds-consent 2.0 20190607.yaml` file.
   ![api_definition](../assets/img/try-out/cof-flow/new_api_definition.png)
10. Click **Import**. The changes are auto-saved.
11. Add a custom policy. Follow the instructions given below according to the API Manager version you are using:

    ??? note "Click here to see how to add a custom policy if you are using API Manager 4.0.0..."

        1. Select **Runtime** from the left menu panel. 
        2. Click the **Edit** button under **Request > Message Mediation**. ![edit_message_mediation](../assets/img/get-started/quick-start-guide/edit-message-mediation.png)
        3. Select the **Custom Policy** option.
        4. Upload the `<APIM_HOME>/<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/berlin.group.org/ConfirmationOfFunds/cof-consents-dynamic-endpoint-sequence-1.3.6.xml` 
            insequence file and click **Select**.
        5. Scroll down and click **SAVE**.

    ??? note "Click here to see how to add a custom policy if you are using API Manager 4.1.0..."

        1. Go to **Develop -> API Configurations -> Policies** in the left menu pane.<br><br>
        <div style="width:40%">
        ![select_policies](../assets/img/get-started/quick-start-guide/select-policies.png)
        </div>

        2. On the **Policy List** card, click on **Add New Policy**.

        3. Fill in the **Create New Policy**.

        4. Upload the `<APIM_HOME>/<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/berlin.group.org/ConfirmationOfFunds/cof-consents-dynamic-endpoint-sequence-1.3.6.xml` insequence file.

        5. Scroll down and click **Save**. Upon successful creation of the policy, you receive an alert as shown below: <br><br>
        <div style="width:35%">
        ![successful](../assets/img/get-started/quick-start-guide/successful.png)
        </div>

        6. Expand the API endpoint you want from the list of API endpoints. For example: ![expand_api_endpoint](../assets/img/get-started/quick-start-guide/expand-api-endpoint.png)

        7. Expand the HTTP method from the API endpoint you selected. For example: ![expand_http_method](../assets/img/get-started/quick-start-guide/expand-http-method.png)

        8. Drag and drop the previously created policy to the **Request Flow** of the API endpoint. ![request_flow](../assets/img/get-started/quick-start-guide/request-flow.png)

        9. Select **Apply to all resources** and click **Save**.

        10. Scroll down and click **Save**.

12. Go to **Deployments** using the left menu pane and click **Deploy New Revision**.
13. Provide a description for the new revision.
14. Select `localhost` from the dropdown list.
15. Click **Deploy**.
16. Go to **Overview** using the left menu panel.
17. Click **Publish**.

### Subscribing to NextGenPSD2XS2A API v2 

1. Go to the Developer portal at `<https://<APIM_HOST>:9443/devportal>`.
2. Go to the **APIs** tab. ![click_apis](../assets/img/get-started/quick-start-guide/tpp-onboarding/click-apis.png)
3. Select the **NextGenPSD2XS2AFramework v2** API. 
4. Locate **Subscriptions** from the left menu pane.

    ![select_subscriptions](../assets/img/try-out/cof-flow/select-subscriptions.png)

5. Select **your application** from the drop-down list.  ![subscribed](../assets/img/try-out/cof-flow/subscribe-to-api.png)
6. Set the **Throttling Policy** and click **SUBSCRIBE**.
    - Once subscribed, the application can access all the supported services of the NextGenPSD2XS2AFramework API resources.
    
### Generating application access token

Once you register the application, generate an application access token.

1. Generate the client assertion by signing the following JSON payload using supported algorithms.

    ??? note "Use the sample certificates for signing and transport layer security testing purposes. Click here to see how it is done..."
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
    eyJraWQiOiJXX1RjblFWY0hBeTIwcTh6Q01jZEJ5cm9vdHciLCJhbGciOiJQUzI1NiJ9.eyJzdWIiOiJQU0RHQi1PQi1Vbmtub3duMDAxNTgwMDAwMUhRUXJaQUFYIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6OTQ0Ni9vYXV0aDIvdG9rZW4iLCJpc3MiOiJQU0RHQi1PQi1Vbmtub3duMDAxNTgwMDAwMUhRUXJaQUFYIiwiZXhwIjoxODI3NjY5MzMyLCJpYXQiOjE4Mjc2NTkzMzIsImp0aSI6IjE0MzIyNDM2MzQzNDM1NDQ1In0.qUq9q_Qa5eiVW5C6QzMvB1sX9Ttwz0Db8c2wmRXyrUWDpeoaolUYT_Diu1o33R4U4MME3nBMCdl0wQ1AVnuzjgV6s3TLcyxlphcoGXYVwOLsQBfbLKTzGiz10UORb3WQc9BwxhZVPDWyFXGlqUNwjPbaUslWoal9KMsbnXlBFKQd8GWjhS-kXHn66kAHwH-7DLZ_Z7D01oW2aFon5sWBZfKD_t9NeQJ9gdPs45ermSM45FixlKXkPPXiIq-_w5Hw1Zw_lEW6fVpWCS6IRz5pBtpHO8s_KESjxuPb1dzrV31AZC7BplWeaRRC5UslObbejw35P5v9CQqJR5Uc7_mX0Q
    ```

2. Run the following cURL command in a command prompt to generate the access token. Update the placeholders with relevant values.
``` curl
curl -X POST \
https://<IS_HOST>:9446/oauth2/token \
--cert <TRANSPORT_PUBLIC_KEY_FILE_PATH> --key <TRANSPORT_PRIVATE_KEY_FILE_PATH> \
-d 'grant_type=client_credentials&scope=fundsconfirmations%20openid&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer&client_assertion=<CLIENT_ASSERTION_JWT>&redirect_uri=<REDIRECT_URI>&client_id=<CLIENT_ID>''
```

3. Upon successful token generation, you can obtain a token as follows:
``` json
{
   "access_token":"eyJ4NXQiOiJOVGRtWmpNNFpEazNOalkwWXpjNU1tWm1PRGd3TVRFM01XWXdOREU1TVdSbFpEZzROemM0WkEiLCJraWQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZ19SUzI1NiIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhZG1pbkB3c28yLmNvbUBjYXJib24uc3VwZXIiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6IlBTREdCLU9CLVVua25vd24wMDE1ODAwMDAxSFFRclpBQVgiLCJuYmYiOjE2NDY4OTEyNzIsImF6cCI6IlBTREdCLU9CLVVua25vd24wMDE1ODAwMDAxSFFRclpBQVgiLCJzY29wZSI6ImFjY291bnRzIiwiaXNzIjoiaHR0cHM6XC9cL2xvY2FsaG9zdDo5NDQ2XC9vYXV0aDJcL3Rva2VuIiwiY25mIjp7Ing1dCNTMjU2IjoieWJlcWFJbTUwMElNUHkxOVZrUGZIUlRKTnQ5cXZfUXQ1am1IZHQtYkptYyJ9LCJleHAiOjE2NDY4OTQ4NzIsImlhdCI6MTY0Njg5MTI3MiwianRpIjoiNGY4NDZkMDEtNGYwMS00OGEwLWI5YjItYjk3Yzc0ZmY1MWE4In0.cGQ8h0q9WqPM0VcqNLFz0fnWshPxuqNqJCwqierPjCS84pTK9vYVZqzy66-g-tNylFv9RzMYepOoFCFOcGfUAdtj_PR9GRLnRxKHgiCJMhiVEnZQ1kI0sSICqAB9ezGmtJgZwz2pqfnikCOFz-zTO0UumNDxJ48Qx6U4cr98aG34XLg4EKbvsCbIJuPPM1-sqRgPiQPKQ2EyNzHfRWeNPES5J8UhrIcVZ8pfrBqZ68eMFZxYQ7Bzg9Ch3PDcZyNYczGYFmNJD_pyoccZo5bSC7DDp9r4giQR2P_jL23N4AcKz0eww1FsTQOktBtRGrZ2-RT6zqh5kJ0E20BPYOv8Wg",
   "scope":"fundsconfirmations",
   "token_type":"Bearer",
   "expires_in":3600
}
```

### Initiating a funds-confirmation consent

This is where the PIISP generates a request to get the consent of the PSU to confirm the availability of funds in the 
PSU’s account.

1. Create a consent using the following request:
```
curl -X POST \
https://<APIM_HOST>:8243/xs2a/v2/consents/confirmation-of-funds \
-H 'X-Request-ID: 790916ee-87ac-4f20-a35b-68a435d81873' \
-H 'Date: Mon, 9 May 2022 06:25:58 IST' \
-H 'PSU-IP-Address: 127.0.1.1' \
-H 'PSU-ID: admin@wso2.com' \
-H 'PSU-ID-Type: email' \
-H 'Digest: SHA-256=bERAhF2b5mPJ8UdQ4BNtqMyXNmuh9J8xB+3Jxql3rqw=' \
-H 'Signature: keyId="SN=de730ec5733ead1b,CA=1.2.840.113549.1.9.1=#16116d616c7368616e694077736f322e636f6d,CN=OpenBanking Pre-Production Issuing CA,OU=OpenBanking,O=WSO2 (UK) LIMITED,L=COL,ST=WP,C=LK",algorithm="rsa-sha256", headers="digest x-request-id date psu-id",signature=CtsCyBEKi2CQHHfGao6GjwJzN/GixJS9UPyjihLgCrner49pAskOyTadQQijM8fMQRj7g1XX7jROrvS5sjjeOjtlFFO0V3gaXfWTT6MskXw6EjGsoeQWuRJN04oYyjJV05V/glO0yNsD2aXVm4Ozly7VeWAFSo83WEqzGq44eBolcM2gP4J47wCY2kOERM4Pd6eCazaS8ZRnCbToxcTwCf4FouNcB783QlY/gckD0ZL4AVov2jpAcyCe3iB4jSCK5PcbP3yWmssdJ7Kj/9INavhDa8v9h3blOhci2TXQA9T8/hgTe/yaSgOFg1Jkc+hylDeXL82GraGuPHxN5KH+Aw==' \
-H 'TPP-Signature-Certificate: MIIFdzCCA1+gAwIBAgIJAN5zDsVzPq0bMA0GCSqGSIb3DQEBBQUAMIGsMQswCQYDVQQGEwJMSzELMAkGA1UECAwCV1AxDDAKBgNVBAcMA0NPTDEaMBgGA1UECgwRV1NPMiAoVUspIExJTUlURUQxFDASBgNVBAsMC09wZW5CYW5raW5nMS4wLAYDVQQDDCVPcGVuQmFua2luZyBQcmUtUHJvZHVjdGlvbiBJc3N1aW5nIENBMSAwHgYJKoZIhvcNAQkBFhFtYWxzaGFuaUB3c28yLmNvbTAeFw0yMjAxMTgwNzI4MzdaFw0yNDAxMTgwNzI4MzdaMHMxCzAJBgNVBAYTAkdCMRowGAYDVQQKDBFXU08yIChVSykgTElNSVRFRDErMCkGA1UEYQwiUFNER0ItT0ItVW5rbm93bjAwMTU4MDAwMDFIUVFyWkFBWDEbMBkGA1UEAwwSMDAxNTgwMDAwMUhRUXJaQUFYMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1rhjeBrT0+nb/VaHYrkgNodKUlShQvXHL8/sb1q+sVt459LqX8SDYemp01OWWKv45TBv9WtUVl8T08Zc2n5Q6ha7BKVjXaSsDhkXj7TrOAwBxRWnNjNivvyb4n4Gxek+AcgozEUFj1MHeIkgywEzP3DUNkbZiQjw7LFxLOy9Bh00f089DrCRHxEnUPka9BdRS9M0GWIuMVxn+FxmbZIl7wVxc8t2xFd4uWGtvBX1EbWLYJr1/j5fgjHCSmkj23Ar+6oqv2AKpp9HJ2aeYJozHRy+4asSjTuYeobULGIaSxgPGOJg4fprs+2UKpV2z2B6RMDf78WQJoGn+lm4wLtKWwIDAQABo4HTMIHQMA4GA1UdDwEB/wQEAwIGwDAdBgNVHQ4EFgQUIprePFwGvrdfcP6t14Y5TzPPgJowgZ4GCCsGAQUFBwEDBIGRMIGOMBMGBgQAjkYBBjAJBgcEAI5GAQYCMHcGBgQAgZgnAjBtMEYwRAYHBACBmCcBAQwGUFNQX0FTBgcEAIGYJwECDAZQU1BfUEkGBwQAgZgnAQMMBlBTUF9BSQYHBACBmCcBBAwGUFNQX0lDDBtGaW5hbmNpYWwgQ29uZHVjdCBBdXRob3JpdHkMBkdCLUZDQTANBgkqhkiG9w0BAQUFAAOCAgEAsuTEC6j8u7lGEpSeVekcUXby9DPRaI6He7MW2K9f6nz12nleyUnvQVQqoFUF+kywRgGpIP/9HsI12NYwLVfgm9LJWR+ObBMWDH1OUqgxgy+Pj4+udiR8FJQsEdY6eF4lgfQq6SU+naMFCcJhuIFEVjItiC71nVg2PPdaXRwxOlXhuIpfW3DdIaELNffoVKYxnx/wpRGRAbTFI87pDdqZ/2sbkbnt4Lq+7VIQmdqqrMCIvPqh8n6/I5xotq8kPbBcf7/1wjUDClqX5chBh89sxZhIyRtOq3HiVzQ2c6sYgA640LsxHB4yPWFDv5tPnzohmDmfCYcvbSZhsGm+hlyjaf8/gN8cG+ui7PFKuyI0NUnR3rD88gIzl2lT1Wtw9f2eFkS8NSnB3ENhRYPLcvZDePktOjkj5PEqo4OTZgGnoMzXNvzWaABrcpzw7a1WF7swvvZavUg9bvFbbeVloDZj4w9ODICoe/Sy+2nZBRTVzIHGJ4kNzscXXSMsSD9sXZMT/JmmD+cs/X/9SJzAsunXqpHbTB9PiGWdR7rhk6e0ddwwTa7wLs/h2MOP8LyTVaHQtNXe8x54YwDCP98dZ1G76iLKIZoU84aYcGp7E8tlQl05UhunlTNe+WxWvBt9tWeotaOomSqGRWDk+4j5z91NoFuFQ81aDAJxB8RYI2I1sk8=' \
-H 'Authorization: Bearer <APPLICATION_ACCESS_TOKEN>' \
-H 'Content-Type: application/json; charset=UTF-8' \
-H 'Accept: */*' \
--cert <TRANSPORT_PUBLIC_KEY_FILE_PATH> --key <TRANSPORT_PRIVATE_KEY_FILE_PATH> \
-d '{
    "account": {
        "iban": "DE98765432109876543210"
    },
    "cardNumber": "1234567891234",
    "cardExpiryDate": "2025-12-31",
    "cardInformation": "My Merchant Loyalty Card",
    "registrationInformation": "Your contract Number 1234 with MyMerchant is completed with the registration with your bank."
}'
```

2. The response contains a Consent Id. A sample response is as follows:
``` json
{
   "consentId":"427041f6-97d9-4f98-8f3c-33083f4f4631",
   "chosenScaMethod":{
      "authenticationVersion":"1.0",
      "name":"SMS OTP on Mobile",
      "authenticationType":"SMS_OTP",
      "explanation":"SMS based one time password",
      "authenticationMethodId":"sms-otp"
   },
   "_links":{
      "scaStatus":{
         "href":"/v2/consents/confirmation-of-funds/427041f6-97d9-4f98-8f3c-33083f4f4631/authorisations/88330e7c-51ae-40ae-aa0e-1ff79d2934b1"
      },
      "scaOAuth":{
         "href":"https://localhost:8243/.well-known/openid-configuration"
      },
      "self":{
         "href":"/v2/consents/confirmation-of-funds/427041f6-97d9-4f98-8f3c-33083f4f4631"
      },
      "status":{
         "href":"/v2/consents/confirmation-of-funds/427041f6-97d9-4f98-8f3c-33083f4f4631/status"
      }
   },
   "consentStatus":"received"
}
```

#### Account references

- An account reference is used to address specific accounts. It is a combination of an account identifier and optionally
  a currency.
- WSO2 Open Banking Berlin toolkit supports IBAN, BBAN and Masked PAN account identifier types. These can be configured
  using the following configuration in the `<IS_HOME>/repository/conf/deployment.toml` file.

    ``` toml
    [open_banking_berlin.consent]
    supported_acc_ref_types = ["iban", "bban", "maskedPan"]
    ```

####Multi-currency accounts

- If the PIISP requests for a multi-currency account without the currency attribute in the account reference, it implies 
that the PIISP is requesting access only to the default currency sub-account.
- If the PIISP requests for an account with the currency attribute in the account reference, it implies that the PIISP 
is requesting access only to that particular sub-account.

### Other consent related requests

**GET /consents/confirmation-of-funds/{consentId}**

To retrieve the details of the created consent.

``` tab="Request"
curl -X GET \
https://<APIM_HOST>:8243/xs2a/v2/consents/confirmation-of-funds/30db0093-9258-4d09-aad4-bbf007ad18da \
-H 'X-Request-ID: b4ce6c21-a81d-46e3-a8da-e2a95e74280f' \
-H 'Date: Mon, 9 May 2022 07:20:39 IST' \
-H 'PSU-IP-Address: 127.0.1.1' \
-H 'Authorization: Bearer <APPLICATION_ACCESS_TOKEN>' \
-H 'PSU-ID: admin@wso2.com' \
-H 'PSU-ID-Type: email' \
-H 'Accept: */*' \
-H 'Digest: SHA-256=RBNvo1WzZ4oRRq0W9+hknpT7T8If536DEMBg9hyq/4o=' \
-H 'Signature: keyId="SN=de730ec5733ead1b,CA=1.2.840.113549.1.9.1=#16116d616c7368616e694077736f322e636f6d,CN=OpenBanking Pre-Production Issuing CA,OU=OpenBanking,O=WSO2 (UK) LIMITED,L=COL,ST=WP,C=LK",algorithm="rsa-sha256", headers="digest x-request-id date psu-id",signature=Yd5Z8+bUTDH5YAzb9Vqwg6SM+D+opyQlgkazEjM8HrUPR20V/nBaD8H4ytgdhnWPzJo7NzjBgRWYlOLRjlO/OJ4wRm7ggyffUoO7S98enLatz66fpEdT9LhnypNG7KW8DpMNYOQxBCs53kO0kUi6Ec8XRdnNWJD23Rqb0U8O1kovyLRKnY5YTxtTB6tMurkxPJ/P2Lw8EuK6ZOslRJmCaLR0l4/cIwBrA8pD9vqy8mYEoIG9uMXUqBiAFQMmsXqUgfW1UMmxM67L3nedssxfpF6aA6Iru7Qdvq0hMGOp53r49kYdNNsDpL7SxvewSCWzv5g0sHgkgsL5yhH9VY4s5Q==' \
-H 'TPP-Signature-Certificate: MIIFdzCCA1+gAwIBAgIJAN5zDsVzPq0bMA0GCSqGSIb3DQEBBQUAMIGsMQswCQYDVQQGEwJMSzELMAkGA1UECAwCV1AxDDAKBgNVBAcMA0NPTDEaMBgGA1UECgwRV1NPMiAoVUspIExJTUlURUQxFDASBgNVBAsMC09wZW5CYW5raW5nMS4wLAYDVQQDDCVPcGVuQmFua2luZyBQcmUtUHJvZHVjdGlvbiBJc3N1aW5nIENBMSAwHgYJKoZIhvcNAQkBFhFtYWxzaGFuaUB3c28yLmNvbTAeFw0yMjAxMTgwNzI4MzdaFw0yNDAxMTgwNzI4MzdaMHMxCzAJBgNVBAYTAkdCMRowGAYDVQQKDBFXU08yIChVSykgTElNSVRFRDErMCkGA1UEYQwiUFNER0ItT0ItVW5rbm93bjAwMTU4MDAwMDFIUVFyWkFBWDEbMBkGA1UEAwwSMDAxNTgwMDAwMUhRUXJaQUFYMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1rhjeBrT0+nb/VaHYrkgNodKUlShQvXHL8/sb1q+sVt459LqX8SDYemp01OWWKv45TBv9WtUVl8T08Zc2n5Q6ha7BKVjXaSsDhkXj7TrOAwBxRWnNjNivvyb4n4Gxek+AcgozEUFj1MHeIkgywEzP3DUNkbZiQjw7LFxLOy9Bh00f089DrCRHxEnUPka9BdRS9M0GWIuMVxn+FxmbZIl7wVxc8t2xFd4uWGtvBX1EbWLYJr1/j5fgjHCSmkj23Ar+6oqv2AKpp9HJ2aeYJozHRy+4asSjTuYeobULGIaSxgPGOJg4fprs+2UKpV2z2B6RMDf78WQJoGn+lm4wLtKWwIDAQABo4HTMIHQMA4GA1UdDwEB/wQEAwIGwDAdBgNVHQ4EFgQUIprePFwGvrdfcP6t14Y5TzPPgJowgZ4GCCsGAQUFBwEDBIGRMIGOMBMGBgQAjkYBBjAJBgcEAI5GAQYCMHcGBgQAgZgnAjBtMEYwRAYHBACBmCcBAQwGUFNQX0FTBgcEAIGYJwECDAZQU1BfUEkGBwQAgZgnAQMMBlBTUF9BSQYHBACBmCcBBAwGUFNQX0lDDBtGaW5hbmNpYWwgQ29uZHVjdCBBdXRob3JpdHkMBkdCLUZDQTANBgkqhkiG9w0BAQUFAAOCAgEAsuTEC6j8u7lGEpSeVekcUXby9DPRaI6He7MW2K9f6nz12nleyUnvQVQqoFUF+kywRgGpIP/9HsI12NYwLVfgm9LJWR+ObBMWDH1OUqgxgy+Pj4+udiR8FJQsEdY6eF4lgfQq6SU+naMFCcJhuIFEVjItiC71nVg2PPdaXRwxOlXhuIpfW3DdIaELNffoVKYxnx/wpRGRAbTFI87pDdqZ/2sbkbnt4Lq+7VIQmdqqrMCIvPqh8n6/I5xotq8kPbBcf7/1wjUDClqX5chBh89sxZhIyRtOq3HiVzQ2c6sYgA640LsxHB4yPWFDv5tPnzohmDmfCYcvbSZhsGm+hlyjaf8/gN8cG+ui7PFKuyI0NUnR3rD88gIzl2lT1Wtw9f2eFkS8NSnB3ENhRYPLcvZDePktOjkj5PEqo4OTZgGnoMzXNvzWaABrcpzw7a1WF7swvvZavUg9bvFbbeVloDZj4w9ODICoe/Sy+2nZBRTVzIHGJ4kNzscXXSMsSD9sXZMT/JmmD+cs/X/9SJzAsunXqpHbTB9PiGWdR7rhk6e0ddwwTa7wLs/h2MOP8LyTVaHQtNXe8x54YwDCP98dZ1G76iLKIZoU84aYcGp7E8tlQl05UhunlTNe+WxWvBt9tWeotaOomSqGRWDk+4j5z91NoFuFQ81aDAJxB8RYI2I1sk8=' \
-H 'Content-Type: application/json; charset=UTF-8' \
--cert <TRANSPORT_PUBLIC_KEY_FILE_PATH> --key <TRANSPORT_PRIVATE_KEY_FILE_PATH>
```

``` tab="Response"
{
   "consentStatus":"received",
   "registrationInformation":"Your contract Number 1234 with MyMerchant is completed with the registration with your bank.",
   "cardInformation":"My Merchant Loyalty Card",
   "account":{
      "iban":"DE98765432109876543210"
   },
   "cardNumber":"1234567891234",
   "cardExpiryDate":"2025-12-31"
}
```

**GET /consents/confirmation-of-funds/{consentId}/status**

To retrieve the status of the created consent.

``` tab="Request"
curl -X GET \
https://<APIM_HOST>:8243/xs2a/v2/consents/confirmation-of-funds/427041f6-97d9-4f98-8f3c-33083f4f4631/status \
-H 'X-Request-ID: 08b56284-4336-4564-87a1-4f95ca10481e' \
-H 'Date: Mon, 9 May 2022 06:26:01 IST' \
-H 'PSU-IP-Address: 127.0.1.1' \
-H 'Authorization: Bearer <APPLICATION_ACCESS_TOKEN>' \
-H 'PSU-ID: admin@wso2.com' \
-H 'PSU-ID-Type: email' \
-H 'Accept: */*' \
-H 'Digest: SHA-256=RBNvo1WzZ4oRRq0W9+hknpT7T8If536DEMBg9hyq/4o=' \
-H 'Signature: keyId="SN=de730ec5733ead1b,CA=1.2.840.113549.1.9.1=#16116d616c7368616e694077736f322e636f6d,CN=OpenBanking Pre-Production Issuing CA,OU=OpenBanking,O=WSO2 (UK) LIMITED,L=COL,ST=WP,C=LK",algorithm="rsa-sha256", headers="digest x-request-id date psu-id",signature=cT7durOyUcNvejaeJw6v3oDfPwpZiixdyY7m/bJbcSMFfva7L1lU/OTc+6WouzvVenNkS41uKL90mpkDz31yrf7wWYrR3jLy+lg0m2DTyw7KLacRpdhNxxqFsxRSOBjTCdm+Ub7lZ+HypQFbm5im3Zg4wdCHoGgsRO5f+DjGDvgkjcWm6dKj7lvvJMdqemlDEPdaUsv0glsZGBof0D6vf7rexFILf9pSI6B8JJIEVm7XTTnq0zOzWs4XwbsBWum7Bxvjx9awhU5PPVrlxd/2MnqmHZwn5Ey8l1dt+CZMZlGGON6X/Mvdkq6PwofWz0yjHGKanWwW4FmulozPiyLGRw==' \
-H 'TPP-Signature-Certificate: MIIFdzCCA1+gAwIBAgIJAN5zDsVzPq0bMA0GCSqGSIb3DQEBBQUAMIGsMQswCQYDVQQGEwJMSzELMAkGA1UECAwCV1AxDDAKBgNVBAcMA0NPTDEaMBgGA1UECgwRV1NPMiAoVUspIExJTUlURUQxFDASBgNVBAsMC09wZW5CYW5raW5nMS4wLAYDVQQDDCVPcGVuQmFua2luZyBQcmUtUHJvZHVjdGlvbiBJc3N1aW5nIENBMSAwHgYJKoZIhvcNAQkBFhFtYWxzaGFuaUB3c28yLmNvbTAeFw0yMjAxMTgwNzI4MzdaFw0yNDAxMTgwNzI4MzdaMHMxCzAJBgNVBAYTAkdCMRowGAYDVQQKDBFXU08yIChVSykgTElNSVRFRDErMCkGA1UEYQwiUFNER0ItT0ItVW5rbm93bjAwMTU4MDAwMDFIUVFyWkFBWDEbMBkGA1UEAwwSMDAxNTgwMDAwMUhRUXJaQUFYMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1rhjeBrT0+nb/VaHYrkgNodKUlShQvXHL8/sb1q+sVt459LqX8SDYemp01OWWKv45TBv9WtUVl8T08Zc2n5Q6ha7BKVjXaSsDhkXj7TrOAwBxRWnNjNivvyb4n4Gxek+AcgozEUFj1MHeIkgywEzP3DUNkbZiQjw7LFxLOy9Bh00f089DrCRHxEnUPka9BdRS9M0GWIuMVxn+FxmbZIl7wVxc8t2xFd4uWGtvBX1EbWLYJr1/j5fgjHCSmkj23Ar+6oqv2AKpp9HJ2aeYJozHRy+4asSjTuYeobULGIaSxgPGOJg4fprs+2UKpV2z2B6RMDf78WQJoGn+lm4wLtKWwIDAQABo4HTMIHQMA4GA1UdDwEB/wQEAwIGwDAdBgNVHQ4EFgQUIprePFwGvrdfcP6t14Y5TzPPgJowgZ4GCCsGAQUFBwEDBIGRMIGOMBMGBgQAjkYBBjAJBgcEAI5GAQYCMHcGBgQAgZgnAjBtMEYwRAYHBACBmCcBAQwGUFNQX0FTBgcEAIGYJwECDAZQU1BfUEkGBwQAgZgnAQMMBlBTUF9BSQYHBACBmCcBBAwGUFNQX0lDDBtGaW5hbmNpYWwgQ29uZHVjdCBBdXRob3JpdHkMBkdCLUZDQTANBgkqhkiG9w0BAQUFAAOCAgEAsuTEC6j8u7lGEpSeVekcUXby9DPRaI6He7MW2K9f6nz12nleyUnvQVQqoFUF+kywRgGpIP/9HsI12NYwLVfgm9LJWR+ObBMWDH1OUqgxgy+Pj4+udiR8FJQsEdY6eF4lgfQq6SU+naMFCcJhuIFEVjItiC71nVg2PPdaXRwxOlXhuIpfW3DdIaELNffoVKYxnx/wpRGRAbTFI87pDdqZ/2sbkbnt4Lq+7VIQmdqqrMCIvPqh8n6/I5xotq8kPbBcf7/1wjUDClqX5chBh89sxZhIyRtOq3HiVzQ2c6sYgA640LsxHB4yPWFDv5tPnzohmDmfCYcvbSZhsGm+hlyjaf8/gN8cG+ui7PFKuyI0NUnR3rD88gIzl2lT1Wtw9f2eFkS8NSnB3ENhRYPLcvZDePktOjkj5PEqo4OTZgGnoMzXNvzWaABrcpzw7a1WF7swvvZavUg9bvFbbeVloDZj4w9ODICoe/Sy+2nZBRTVzIHGJ4kNzscXXSMsSD9sXZMT/JmmD+cs/X/9SJzAsunXqpHbTB9PiGWdR7rhk6e0ddwwTa7wLs/h2MOP8LyTVaHQtNXe8x54YwDCP98dZ1G76iLKIZoU84aYcGp7E8tlQl05UhunlTNe+WxWvBt9tWeotaOomSqGRWDk+4j5z91NoFuFQ81aDAJxB8RYI2I1sk8=' \
-H 'Content-Type: application/json; charset=UTF-8' \
--cert <TRANSPORT_PUBLIC_KEY_FILE_PATH> --key <TRANSPORT_PRIVATE_KEY_FILE_PATH>
```

``` tab="Response"
{
   "consentStatus":"received"
}
```

**GET /consents/confirmation-of-funds/{consentId}/authorisations/{authorisationId}**

To retrieve the SCA status of the authorisation.

``` tab="Request"
curl -X GET \
https://<APIM_HOST>:8243/xs2a/v2/consents/confirmation-of-funds/427041f6-97d9-4f98-8f3c-33083f4f4631/authorisations/0724a9cf-4d03-4eb3-90e4-c47b2f742007 \
-H 'X-Request-ID: 57daa273-6e43-4bfb-b29e-20b714c98a6e' \
-H 'Date: Tue, 29 Mar 2022 14:07:03 IST' \
-H 'PSU-IP-Address: 127.0.1.1' \
-H 'Authorization: Bearer <APPLICATION_ACCESS_TOKEN>' \
-H 'PSU-ID: admin@wso2.com' \
-H 'PSU-ID-Type: email' \
-H 'Accept: */*' \
-H 'Digest: SHA-256=RBNvo1WzZ4oRRq0W9+hknpT7T8If536DEMBg9hyq/4o=' \
-H 'Signature: keyId="SN=de730ec5733ead1b,CA=1.2.840.113549.1.9.1=#16116d616c7368616e694077736f322e636f6d,CN=OpenBanking Pre-Production Issuing CA,OU=OpenBanking,O=WSO2 (UK) LIMITED,L=COL,ST=WP,C=LK",algorithm="rsa-sha256", headers="digest x-request-id date psu-id",signature=PJP/fxgHkvJuHBiiNYIRw6VXp9AofVeb5QeqEnQ/Tg/WCElMyPhXxwOqxjI3q3FJzUqWbGWLQwDo2eBnHd427gHKt5xzdFw3N4cT1fdXuPYexZLzgfiZ9QuFT6wjlAN2A/wAvoyWzTel7xK0pSQxgX5vM3VKT9iD7DaCmz6d3IxR4hJxZ3gonE7taGpuSxVGVAhchp63uiS73B5dUhT1WakdvIIgCV7Sl8C/B7BlvsFoLPOCgLxo3LA3uNmCVJnJCCFs1TrcuIGEkriRfIZtqHRLF7JWxo2q3TIJ7LPwM+2L4qB98DczhUNe3Vp3fV8S/xUjPTz+vTa9ZYqN4HWoHQ==' \
-H 'TPP-Signature-Certificate: MIIFdzCCA1+gAwIBAgIJAN5zDsVzPq0bMA0GCSqGSIb3DQEBBQUAMIGsMQswCQYDVQQGEwJMSzELMAkGA1UECAwCV1AxDDAKBgNVBAcMA0NPTDEaMBgGA1UECgwRV1NPMiAoVUspIExJTUlURUQxFDASBgNVBAsMC09wZW5CYW5raW5nMS4wLAYDVQQDDCVPcGVuQmFua2luZyBQcmUtUHJvZHVjdGlvbiBJc3N1aW5nIENBMSAwHgYJKoZIhvcNAQkBFhFtYWxzaGFuaUB3c28yLmNvbTAeFw0yMjAxMTgwNzI4MzdaFw0yNDAxMTgwNzI4MzdaMHMxCzAJBgNVBAYTAkdCMRowGAYDVQQKDBFXU08yIChVSykgTElNSVRFRDErMCkGA1UEYQwiUFNER0ItT0ItVW5rbm93bjAwMTU4MDAwMDFIUVFyWkFBWDEbMBkGA1UEAwwSMDAxNTgwMDAwMUhRUXJaQUFYMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1rhjeBrT0+nb/VaHYrkgNodKUlShQvXHL8/sb1q+sVt459LqX8SDYemp01OWWKv45TBv9WtUVl8T08Zc2n5Q6ha7BKVjXaSsDhkXj7TrOAwBxRWnNjNivvyb4n4Gxek+AcgozEUFj1MHeIkgywEzP3DUNkbZiQjw7LFxLOy9Bh00f089DrCRHxEnUPka9BdRS9M0GWIuMVxn+FxmbZIl7wVxc8t2xFd4uWGtvBX1EbWLYJr1/j5fgjHCSmkj23Ar+6oqv2AKpp9HJ2aeYJozHRy+4asSjTuYeobULGIaSxgPGOJg4fprs+2UKpV2z2B6RMDf78WQJoGn+lm4wLtKWwIDAQABo4HTMIHQMA4GA1UdDwEB/wQEAwIGwDAdBgNVHQ4EFgQUIprePFwGvrdfcP6t14Y5TzPPgJowgZ4GCCsGAQUFBwEDBIGRMIGOMBMGBgQAjkYBBjAJBgcEAI5GAQYCMHcGBgQAgZgnAjBtMEYwRAYHBACBmCcBAQwGUFNQX0FTBgcEAIGYJwECDAZQU1BfUEkGBwQAgZgnAQMMBlBTUF9BSQYHBACBmCcBBAwGUFNQX0lDDBtGaW5hbmNpYWwgQ29uZHVjdCBBdXRob3JpdHkMBkdCLUZDQTANBgkqhkiG9w0BAQUFAAOCAgEAsuTEC6j8u7lGEpSeVekcUXby9DPRaI6He7MW2K9f6nz12nleyUnvQVQqoFUF+kywRgGpIP/9HsI12NYwLVfgm9LJWR+ObBMWDH1OUqgxgy+Pj4+udiR8FJQsEdY6eF4lgfQq6SU+naMFCcJhuIFEVjItiC71nVg2PPdaXRwxOlXhuIpfW3DdIaELNffoVKYxnx/wpRGRAbTFI87pDdqZ/2sbkbnt4Lq+7VIQmdqqrMCIvPqh8n6/I5xotq8kPbBcf7/1wjUDClqX5chBh89sxZhIyRtOq3HiVzQ2c6sYgA640LsxHB4yPWFDv5tPnzohmDmfCYcvbSZhsGm+hlyjaf8/gN8cG+ui7PFKuyI0NUnR3rD88gIzl2lT1Wtw9f2eFkS8NSnB3ENhRYPLcvZDePktOjkj5PEqo4OTZgGnoMzXNvzWaABrcpzw7a1WF7swvvZavUg9bvFbbeVloDZj4w9ODICoe/Sy+2nZBRTVzIHGJ4kNzscXXSMsSD9sXZMT/JmmD+cs/X/9SJzAsunXqpHbTB9PiGWdR7rhk6e0ddwwTa7wLs/h2MOP8LyTVaHQtNXe8x54YwDCP98dZ1G76iLKIZoU84aYcGp7E8tlQl05UhunlTNe+WxWvBt9tWeotaOomSqGRWDk+4j5z91NoFuFQ81aDAJxB8RYI2I1sk8=' \
-H 'Content-Type: application/json; charset=UTF-8' \
--cert <TRANSPORT_PUBLIC_KEY_FILE_PATH> --key <TRANSPORT_PRIVATE_KEY_FILE_PATH>
```

``` tab="Response"
{
   "scaStatus":"received"
}
```

**DELETE /consents/confirmation-of-funds/{consentId}**

To delete a consent.

``` tab="Request"
curl -X DELETE \
https://<APIM_HOST>:8243/xs2a/v2/consents/confirmation-of-funds/4baf1e1f-83ca-4ecc-b8b6-3983c8f678b7 \
-H 'X-Request-ID: 79bafd1a-866c-4c91-93fc-48ba232b7965' \
-H 'Date: Mon, 9 May 2022 07:24:54 IST' \
-H 'PSU-IP-Address: 127.0.1.1' \
-H 'Authorization: Bearer <APPLICATION_ACCESS_TOKEN>' \
-H 'PSU-ID: admin@wso2.com' \
-H 'PSU-ID-Type: email' \
-H 'Accept: */*' \
-H 'Digest: SHA-256=RBNvo1WzZ4oRRq0W9+hknpT7T8If536DEMBg9hyq/4o=' \
-H 'Signature: keyId="SN=de730ec5733ead1b,CA=1.2.840.113549.1.9.1=#16116d616c7368616e694077736f322e636f6d,CN=OpenBanking Pre-Production Issuing CA,OU=OpenBanking,O=WSO2 (UK) LIMITED,L=COL,ST=WP,C=LK",algorithm="rsa-sha256", headers="digest x-request-id date psu-id",signature=jQLGP/EL1GfsYOtWhBrjQRFu/hYv5vt4PCcH+81F1j19hzpHYAh9ojYcESFs2n63J7mfwexhFBzY0KjQmurXGn8pZsRHT6q6CV4qOrFp1EBrkbtz064WFYlTE9vM/kwpnXSS4EMoIkOd7BQjIjH/Mv9OuiiBU3IbSpYqI+f/N0kMT2gPE3aj4P4udSe8dyE791g9ZAvqckHf0WmujpXeYs87M0FQWS6nuZVK+2dXmClG7AGKAEYUTIFstjV/2gzVAC0Mi8IqKGTS+GnPxJCAYrLdmwneij4wVxWohuFCzrli8sAN0Cj5mNgfYL0X3x/yQVEnBe/wnlk5VSsRBQ9mIw==' \
-H 'TPP-Signature-Certificate: MIIFdzCCA1+gAwIBAgIJAN5zDsVzPq0bMA0GCSqGSIb3DQEBBQUAMIGsMQswCQYDVQQGEwJMSzELMAkGA1UECAwCV1AxDDAKBgNVBAcMA0NPTDEaMBgGA1UECgwRV1NPMiAoVUspIExJTUlURUQxFDASBgNVBAsMC09wZW5CYW5raW5nMS4wLAYDVQQDDCVPcGVuQmFua2luZyBQcmUtUHJvZHVjdGlvbiBJc3N1aW5nIENBMSAwHgYJKoZIhvcNAQkBFhFtYWxzaGFuaUB3c28yLmNvbTAeFw0yMjAxMTgwNzI4MzdaFw0yNDAxMTgwNzI4MzdaMHMxCzAJBgNVBAYTAkdCMRowGAYDVQQKDBFXU08yIChVSykgTElNSVRFRDErMCkGA1UEYQwiUFNER0ItT0ItVW5rbm93bjAwMTU4MDAwMDFIUVFyWkFBWDEbMBkGA1UEAwwSMDAxNTgwMDAwMUhRUXJaQUFYMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1rhjeBrT0+nb/VaHYrkgNodKUlShQvXHL8/sb1q+sVt459LqX8SDYemp01OWWKv45TBv9WtUVl8T08Zc2n5Q6ha7BKVjXaSsDhkXj7TrOAwBxRWnNjNivvyb4n4Gxek+AcgozEUFj1MHeIkgywEzP3DUNkbZiQjw7LFxLOy9Bh00f089DrCRHxEnUPka9BdRS9M0GWIuMVxn+FxmbZIl7wVxc8t2xFd4uWGtvBX1EbWLYJr1/j5fgjHCSmkj23Ar+6oqv2AKpp9HJ2aeYJozHRy+4asSjTuYeobULGIaSxgPGOJg4fprs+2UKpV2z2B6RMDf78WQJoGn+lm4wLtKWwIDAQABo4HTMIHQMA4GA1UdDwEB/wQEAwIGwDAdBgNVHQ4EFgQUIprePFwGvrdfcP6t14Y5TzPPgJowgZ4GCCsGAQUFBwEDBIGRMIGOMBMGBgQAjkYBBjAJBgcEAI5GAQYCMHcGBgQAgZgnAjBtMEYwRAYHBACBmCcBAQwGUFNQX0FTBgcEAIGYJwECDAZQU1BfUEkGBwQAgZgnAQMMBlBTUF9BSQYHBACBmCcBBAwGUFNQX0lDDBtGaW5hbmNpYWwgQ29uZHVjdCBBdXRob3JpdHkMBkdCLUZDQTANBgkqhkiG9w0BAQUFAAOCAgEAsuTEC6j8u7lGEpSeVekcUXby9DPRaI6He7MW2K9f6nz12nleyUnvQVQqoFUF+kywRgGpIP/9HsI12NYwLVfgm9LJWR+ObBMWDH1OUqgxgy+Pj4+udiR8FJQsEdY6eF4lgfQq6SU+naMFCcJhuIFEVjItiC71nVg2PPdaXRwxOlXhuIpfW3DdIaELNffoVKYxnx/wpRGRAbTFI87pDdqZ/2sbkbnt4Lq+7VIQmdqqrMCIvPqh8n6/I5xotq8kPbBcf7/1wjUDClqX5chBh89sxZhIyRtOq3HiVzQ2c6sYgA640LsxHB4yPWFDv5tPnzohmDmfCYcvbSZhsGm+hlyjaf8/gN8cG+ui7PFKuyI0NUnR3rD88gIzl2lT1Wtw9f2eFkS8NSnB3ENhRYPLcvZDePktOjkj5PEqo4OTZgGnoMzXNvzWaABrcpzw7a1WF7swvvZavUg9bvFbbeVloDZj4w9ODICoe/Sy+2nZBRTVzIHGJ4kNzscXXSMsSD9sXZMT/JmmD+cs/X/9SJzAsunXqpHbTB9PiGWdR7rhk6e0ddwwTa7wLs/h2MOP8LyTVaHQtNXe8x54YwDCP98dZ1G76iLKIZoU84aYcGp7E8tlQl05UhunlTNe+WxWvBt9tWeotaOomSqGRWDk+4j5z91NoFuFQ81aDAJxB8RYI2I1sk8=' \
-H 'Content-Type: application/json; charset=UTF-8' \
--cert <TRANSPORT_PUBLIC_KEY_FILE_PATH> --key <TRANSPORT_PRIVATE_KEY_FILE_PATH>
```

``` tab="Response"
204 No Content
```

### Authorizing a consent

The PIISP application redirects the PSU to authenticate and approve/deny the provided consent. This can be achieved in
2 ways:

1. Implicit flow
2. Explicit flow

The TPP decides the approach using `TPP-Explicit-Authorisation-Preferred`, which is an optional boolean header.
This header is sent during the consent initiation request. If `TPP-Explicit-Authorisation-Preferred` is set to `false`
or the header is not present, the Implicit approach is followed.

#### Implicit authorisation flow

The Implicit authorisation flow is as follows:

1. The ASPSP creates an authorisation sub-resource implicitly after the funds-confirmation consent is received.
2. The ASPSP replies with the well-known configuration of the Identity Server in the `_links` section of the response.
3. The TPP generates the authorisation URL using the well-known URL.
4. The PSU goes through the authorisation flow with that authorisation URL.

#### Explicit authorisation flow

The Explicit authorisation flow is as follows:

1. Once the consent is granted, the ASPSP replies with one of the `startAuthorisation` links in the `_links` section of
   the response.

    ```  tab="Request"
    curl -X POST \
    https://<APIM_HOST>:8243/xs2a/v2/consents/confirmation-of-funds \
    -H 'X-Request-ID: ee0b39da-c32a-4865-9762-029fb3a4a0f0' \
    -H 'Date: Mon, 9 May 2022 07:43:53 IST' \
    -H 'PSU-IP-Address: 127.0.1.1' \
    -H 'Authorization: Bearer <APPLICATION_ACCESS_TOKEN>' \
    -H 'PSU-ID: admin@wso2.com' \
    -H 'TPP-Explicit-Authorisation-Preferred: true' \
    -H 'PSU-ID-Type: email' \
    -H 'Accept: */*' \
    -H 'Digest: SHA-256=bERAhF2b5mPJ8UdQ4BNtqMyXNmuh9J8xB+3Jxql3rqw=' \
    -H 'Signature: keyId="SN=de730ec5733ead1b,CA=1.2.840.113549.1.9.1=#16116d616c7368616e694077736f322e636f6d,CN=OpenBanking Pre-Production Issuing CA,OU=OpenBanking,O=WSO2 (UK) LIMITED,L=COL,ST=WP,C=LK",algorithm="rsa-sha256", headers="digest x-request-id date psu-id",signature=y/L1azJWyggJUCgj3bD/ldV+DqdFkkVO+Rhl2DjzrJNwDcOyLhJZ8+kzGhONSL8hOhGcYH94Myz2EtCfSWB238rOW6fC9kY+1hUi6k497cJDvg7Ql0cDj+ocC0IVqEdnLfOGnlB2uooqpZwo/kC9nGrlnD0GacSuGsoz5OvQsQnr8VD0/BdYL23oyNkDgFRGl4h7pZJEipXwVR+gZkApoUw9tjOidR2bdiT3m5KS7wq6K3seRvuuLIUPiSHLB78LXg7jzHQIWlvnnw84y8SDpBs84JemtM1lfrm/m9xyMlYmkG6+aqQAEn5jgPU8rIPBoc/Xct5jHRt9STp6QVlN1g==' \
    -H 'TPP-Signature-Certificate: MIIFdzCCA1+gAwIBAgIJAN5zDsVzPq0bMA0GCSqGSIb3DQEBBQUAMIGsMQswCQYDVQQGEwJMSzELMAkGA1UECAwCV1AxDDAKBgNVBAcMA0NPTDEaMBgGA1UECgwRV1NPMiAoVUspIExJTUlURUQxFDASBgNVBAsMC09wZW5CYW5raW5nMS4wLAYDVQQDDCVPcGVuQmFua2luZyBQcmUtUHJvZHVjdGlvbiBJc3N1aW5nIENBMSAwHgYJKoZIhvcNAQkBFhFtYWxzaGFuaUB3c28yLmNvbTAeFw0yMjAxMTgwNzI4MzdaFw0yNDAxMTgwNzI4MzdaMHMxCzAJBgNVBAYTAkdCMRowGAYDVQQKDBFXU08yIChVSykgTElNSVRFRDErMCkGA1UEYQwiUFNER0ItT0ItVW5rbm93bjAwMTU4MDAwMDFIUVFyWkFBWDEbMBkGA1UEAwwSMDAxNTgwMDAwMUhRUXJaQUFYMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1rhjeBrT0+nb/VaHYrkgNodKUlShQvXHL8/sb1q+sVt459LqX8SDYemp01OWWKv45TBv9WtUVl8T08Zc2n5Q6ha7BKVjXaSsDhkXj7TrOAwBxRWnNjNivvyb4n4Gxek+AcgozEUFj1MHeIkgywEzP3DUNkbZiQjw7LFxLOy9Bh00f089DrCRHxEnUPka9BdRS9M0GWIuMVxn+FxmbZIl7wVxc8t2xFd4uWGtvBX1EbWLYJr1/j5fgjHCSmkj23Ar+6oqv2AKpp9HJ2aeYJozHRy+4asSjTuYeobULGIaSxgPGOJg4fprs+2UKpV2z2B6RMDf78WQJoGn+lm4wLtKWwIDAQABo4HTMIHQMA4GA1UdDwEB/wQEAwIGwDAdBgNVHQ4EFgQUIprePFwGvrdfcP6t14Y5TzPPgJowgZ4GCCsGAQUFBwEDBIGRMIGOMBMGBgQAjkYBBjAJBgcEAI5GAQYCMHcGBgQAgZgnAjBtMEYwRAYHBACBmCcBAQwGUFNQX0FTBgcEAIGYJwECDAZQU1BfUEkGBwQAgZgnAQMMBlBTUF9BSQYHBACBmCcBBAwGUFNQX0lDDBtGaW5hbmNpYWwgQ29uZHVjdCBBdXRob3JpdHkMBkdCLUZDQTANBgkqhkiG9w0BAQUFAAOCAgEAsuTEC6j8u7lGEpSeVekcUXby9DPRaI6He7MW2K9f6nz12nleyUnvQVQqoFUF+kywRgGpIP/9HsI12NYwLVfgm9LJWR+ObBMWDH1OUqgxgy+Pj4+udiR8FJQsEdY6eF4lgfQq6SU+naMFCcJhuIFEVjItiC71nVg2PPdaXRwxOlXhuIpfW3DdIaELNffoVKYxnx/wpRGRAbTFI87pDdqZ/2sbkbnt4Lq+7VIQmdqqrMCIvPqh8n6/I5xotq8kPbBcf7/1wjUDClqX5chBh89sxZhIyRtOq3HiVzQ2c6sYgA640LsxHB4yPWFDv5tPnzohmDmfCYcvbSZhsGm+hlyjaf8/gN8cG+ui7PFKuyI0NUnR3rD88gIzl2lT1Wtw9f2eFkS8NSnB3ENhRYPLcvZDePktOjkj5PEqo4OTZgGnoMzXNvzWaABrcpzw7a1WF7swvvZavUg9bvFbbeVloDZj4w9ODICoe/Sy+2nZBRTVzIHGJ4kNzscXXSMsSD9sXZMT/JmmD+cs/X/9SJzAsunXqpHbTB9PiGWdR7rhk6e0ddwwTa7wLs/h2MOP8LyTVaHQtNXe8x54YwDCP98dZ1G76iLKIZoU84aYcGp7E8tlQl05UhunlTNe+WxWvBt9tWeotaOomSqGRWDk+4j5z91NoFuFQ81aDAJxB8RYI2I1sk8=' \
    -H 'Content-Type: application/json; charset=UTF-8' \
    --cert <TRANSPORT_PUBLIC_KEY_FILE_PATH> --key <TRANSPORT_PRIVATE_KEY_FILE_PATH> \
    -d '{
        "account": {
            "iban": "DE98765432109876543210"
        },
        "cardNumber": "1234567891234",
        "cardExpiryDate": "2025-12-31",
        "cardInformation": "My Merchant Loyalty Card",
        "registrationInformation": "Your contract Number 1234 with MyMerchant is completed with the registration with your bank."
    }'    
    ```

    ``` tab="Response"
    {
        "consentId": "2e470730-30f2-4428-9736-a632ffdcc5da",
        "chosenScaMethod": {
            "authenticationVersion": "1.0",
            "name": "SMS OTP on Mobile",
            "authenticationType": "SMS_OTP",
            "explanation": "SMS based one time password",
            "authenticationMethodId": "sms-otp"
        },
        "_links": {
            "self": {
                "href": "/v2/consents/confirmation-of-funds/2e470730-30f2-4428-9736-a632ffdcc5da"
            },
            "startAuthorisationWithPsuIdentification": {
                "href": "/v2/consents/confirmation-of-funds/2e470730-30f2-4428-9736-a632ffdcc5da/authorisations"
            },
            "status": {
                "href": "/v2/consents/confirmation-of-funds/2e470730-30f2-4428-9736-a632ffdcc5da/status"
            }
        },
        "consentStatus": "received"
    }   
    ```   

3. The TPP uses the `startAuthorisation` link to create an authorisation sub-resource explicitly.

    ``` tab="Request"
    curl -X POST \
    https://<APIM_HOST>:8243/xs2a/v2/consents/confirmation-of-funds/2e470730-30f2-4428-9736-a632ffdcc5da/authorisations \  
    -H 'X-Request-ID: 10646d47-264c-4ae4-b180-16a8ec775d22' \
    -H 'Date: Tue, 29 Mar 2022 00:16:38 IST' \
    -H 'PSU-IP-Address: 127.0.1.1' \
    -H 'Authorization: Bearer <APPLICATION_ACCESS_TOKEN>' \
    -H 'PSU-ID: admin@wso2.com' \
    -H 'PSU-ID-Type: email' \
    -H 'Accept: */*' \
    -H 'Digest: SHA-256=RBNvo1WzZ4oRRq0W9+hknpT7T8If536DEMBg9hyq/4o=' \
    -H 'Signature: keyId="SN=de730ec5733ead1b,CA=1.2.840.113549.1.9.1=#16116d616c7368616e694077736f322e636f6d,CN=OpenBanking Pre-Production Issuing CA,OU=OpenBanking,O=WSO2 (UK) LIMITED,L=COL,ST=WP,C=LK",algorithm="rsa-sha256", headers="digest x-request-id date psu-id",signature=pvY8Y7q6OCupbm9ESMcd8QZ2HqpMVhx6MGeUDouLmL1TkAUnRkTYOaWGnaVMZZC1ggPTwqu5/Xn9mp3JGPoEv/833tfvqCuVkJfjBebnLQvXk2TXBXOgh0Bmu+8iZVMEJD2r666+0gayhzBYUSOWLm2enOACcEbMetjYTG1vlvYVYjLeNC+DsDQp6b+0B0oQ8wHa2u2g1XDIYgl7Xl34ET6CRKCNyH+SqZXovVnLmctBCKzMJU1Sh1UxaGVkRhyAUG/h57swWOfr83DQkl2zMYDONZA5Tn3te3ewkz/OdJjyb9jUe+/lhPvOolOSlwFbUrTo88WOI+Eja+HBCzG27Q==' \
    -H 'TPP-Signature-Certificate: MIIFdzCCA1+gAwIBAgIJAN5zDsVzPq0bMA0GCSqGSIb3DQEBBQUAMIGsMQswCQYDVQQGEwJMSzELMAkGA1UECAwCV1AxDDAKBgNVBAcMA0NPTDEaMBgGA1UECgwRV1NPMiAoVUspIExJTUlURUQxFDASBgNVBAsMC09wZW5CYW5raW5nMS4wLAYDVQQDDCVPcGVuQmFua2luZyBQcmUtUHJvZHVjdGlvbiBJc3N1aW5nIENBMSAwHgYJKoZIhvcNAQkBFhFtYWxzaGFuaUB3c28yLmNvbTAeFw0yMjAxMTgwNzI4MzdaFw0yNDAxMTgwNzI4MzdaMHMxCzAJBgNVBAYTAkdCMRowGAYDVQQKDBFXU08yIChVSykgTElNSVRFRDErMCkGA1UEYQwiUFNER0ItT0ItVW5rbm93bjAwMTU4MDAwMDFIUVFyWkFBWDEbMBkGA1UEAwwSMDAxNTgwMDAwMUhRUXJaQUFYMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1rhjeBrT0+nb/VaHYrkgNodKUlShQvXHL8/sb1q+sVt459LqX8SDYemp01OWWKv45TBv9WtUVl8T08Zc2n5Q6ha7BKVjXaSsDhkXj7TrOAwBxRWnNjNivvyb4n4Gxek+AcgozEUFj1MHeIkgywEzP3DUNkbZiQjw7LFxLOy9Bh00f089DrCRHxEnUPka9BdRS9M0GWIuMVxn+FxmbZIl7wVxc8t2xFd4uWGtvBX1EbWLYJr1/j5fgjHCSmkj23Ar+6oqv2AKpp9HJ2aeYJozHRy+4asSjTuYeobULGIaSxgPGOJg4fprs+2UKpV2z2B6RMDf78WQJoGn+lm4wLtKWwIDAQABo4HTMIHQMA4GA1UdDwEB/wQEAwIGwDAdBgNVHQ4EFgQUIprePFwGvrdfcP6t14Y5TzPPgJowgZ4GCCsGAQUFBwEDBIGRMIGOMBMGBgQAjkYBBjAJBgcEAI5GAQYCMHcGBgQAgZgnAjBtMEYwRAYHBACBmCcBAQwGUFNQX0FTBgcEAIGYJwECDAZQU1BfUEkGBwQAgZgnAQMMBlBTUF9BSQYHBACBmCcBBAwGUFNQX0lDDBtGaW5hbmNpYWwgQ29uZHVjdCBBdXRob3JpdHkMBkdCLUZDQTANBgkqhkiG9w0BAQUFAAOCAgEAsuTEC6j8u7lGEpSeVekcUXby9DPRaI6He7MW2K9f6nz12nleyUnvQVQqoFUF+kywRgGpIP/9HsI12NYwLVfgm9LJWR+ObBMWDH1OUqgxgy+Pj4+udiR8FJQsEdY6eF4lgfQq6SU+naMFCcJhuIFEVjItiC71nVg2PPdaXRwxOlXhuIpfW3DdIaELNffoVKYxnx/wpRGRAbTFI87pDdqZ/2sbkbnt4Lq+7VIQmdqqrMCIvPqh8n6/I5xotq8kPbBcf7/1wjUDClqX5chBh89sxZhIyRtOq3HiVzQ2c6sYgA640LsxHB4yPWFDv5tPnzohmDmfCYcvbSZhsGm+hlyjaf8/gN8cG+ui7PFKuyI0NUnR3rD88gIzl2lT1Wtw9f2eFkS8NSnB3ENhRYPLcvZDePktOjkj5PEqo4OTZgGnoMzXNvzWaABrcpzw7a1WF7swvvZavUg9bvFbbeVloDZj4w9ODICoe/Sy+2nZBRTVzIHGJ4kNzscXXSMsSD9sXZMT/JmmD+cs/X/9SJzAsunXqpHbTB9PiGWdR7rhk6e0ddwwTa7wLs/h2MOP8LyTVaHQtNXe8x54YwDCP98dZ1G76iLKIZoU84aYcGp7E8tlQl05UhunlTNe+WxWvBt9tWeotaOomSqGRWDk+4j5z91NoFuFQ81aDAJxB8RYI2I1sk8=' \
    -H 'Content-Type: application/json; charset=UTF-8' \
    --cert <TRANSPORT_PUBLIC_KEY_FILE_PATH> --key <TRANSPORT_PRIVATE_KEY_FILE_PATH> \
    -d '{
        
    }'
    ```

    ``` tab="Response"
    {
       "authorisationId":"33041682-2927-4012-9a33-635b3038b06b",
       "scaStatus":"received",
       "chosenScaMethod":{
          "authenticationVersion":"1.0",
          "name":"SMS OTP on Mobile",
          "authenticationType":"SMS_OTP",
          "explanation":"SMS based one time password",
          "authenticationMethodId":"sms-otp"
       },
       "_links":{
          "scaStatus":{
             "href":"/v2/consents/confirmation-of-funds/2e470730-30f2-4428-9736-a632ffdcc5da/authorisations/33041682-2927-4012-9a33-635b3038b06b"
          },
          "scaOAuth":{
             "href":"https://localhost:8243/.well-known/openid-configuration"
          }
       } 
    }
    ```

4. The ASPSP replies with the well-known configuration of the Identity Server in the `_links` section of the response.
5. The TPP generates the authorisation URL using the well-known URL.
6. PSU goes through the authorisation flow with that authorisation URL.

!!! note "Multiple SCA of more than one PSU (Multi-authorization)"
    - For some accounts, more than one PSU has to give their consent before accessing this account. In this case, Strong
      Customer Authentication (SCA) has to be executed by more than one PSU.
    - In a multi-authorization scenario, steps 2 to 5 must be repeated _n_ number of times for _n_ number of PSUs.
      The consent becomes `valid` only after all the PSUs approve it.

#### Authorisation URL

Regardless of the authorisation flow, once the well-known configuration of the Identity Server is obtained, the TPP must
generate an authorisation URL for the PSU to authorise the consent. This authorisation URL must be authorised by n
number of PSUs in a multi-level authorisation context.

1. The ASPSP sends the request to the PSU stating the accounts and information that the TPP wishes to access. 
   The request is a URL in the format given below. Update the placeholders with relevant values and run this in a
   browser to prompt the invocation of the authorize API:

    ```
    https://<IS_HOST>:9446/oauth2/authorize/?scope=<YOUR_SCOPES>&response_type=code&redirect_uri=<REDIRECT_URI>&state=<DYNAMICALLY_SET_VALUE>&code_challenge_method=<YOUR_CODE_CHALLENGE_METHOD>&client_id=<ORGANIZATION_ID>&code_challenge=<YOUR_CODE_CHALLENGE>
    ```

    ??? "Click here to see the descriptions for the parameters in Authorisation URL"
        | Parameter | Description |
        |-----------|-------------|
        | scope | This is the reference to the payment consent resource for access. It is in the form of `piis:<consentId>`.|
        | response_type | The recommended response type is `code`. |
        | redirect_uri | The TPP's URI that the OAuth2 server redirects the PSU's user agent after the authorisation. |
        | state | TPPs set a dynamic value to prevent XSRF attacks.|
        | code_challenge_method | Code verifier transformation method. NextGenPSD2XS2AFramework specification recommends `S256`.
        | client_id | As provided in the eIDAS certificate, the organization_Identifier must contain the following information in it: <ul> <li> `PSD` as 3 character legal person identity type reference </li><li> 2 character ISO 3166 country code representing the NCA country </li><li> hyphen-minus `-` </li><li> 2-8 character NCA identifier (A-Z uppercase only, no separator - hyphen-minus "-" </li><li> PSP identifier (authorisation number as specified by NCA) </li> </ul> |
        | code_challenge | This is used to avoid code injection attacks using the PKCE challenge in the cryptographic RFC 7636. For more information, see [RFC 7636](https://tools.ietf.org/html/rfc7636). |


    !!! tip
        The WSO2 Open Banking Berlin Toolkit requires PKCE support for authorization. The `state` and `code challenge 
        method` values indicate the PKCE usage. For more information, see 
        [Consent Authorization with PKCE](../learn/consent-authorization-intro.md).

2. Upon successful authentication, the PIISP is redirected to the consent authorise page. Use the login credentials of a
   user that has a **subscriber** role.

3. The page displays the data requested by the TPP for that particular consent along with its accounts and permissions.

    ![consent_page](../assets/img/try-out/cof-flow/consent-page.png)

4. Upon providing consent, an authorization code is generated on the web page of the `redirect_uri`. See the sample
   given below:

    ```
    https://www.wso2.com/?code=5b771c49-dfe3-33f6-abe1-18f0426b8734&state=768ff3be-964c-41d9-9022-848ba379e1bf
    ```

    The authorization code from the above URL is in the code parameter (code=`5b771c49-dfe3-33f6-abe1-18f0426b8734`).

### Generating user access token

In this section, you will be generating an access token using the authorization code generated in the section [above](#authorizing-a-consent).

1. Generate the client assertion by signing the following JSON payload using supported algorithms.

    ??? note "Use the sample certificates for signing and transport layer security testing purposes. Click here to see how it is done..."
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

    ``` tab="Format"
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

    ``` tab="Sample"
    eyJraWQiOiJXX1RjblFWY0hBeTIwcTh6Q01jZEJ5cm9vdHciLCJhbGciOiJQUzI1NiJ9.eyJzdWIiOiJQU0RHQi1PQi1Vbmtub3duMDAxNTgwMDAwMUhRUXJaQUFYIiwiYXVkIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6OTQ0Ni9vYXV0aDIvdG9rZW4iLCJpc3MiOiJQU0RHQi1PQi1Vbmtub3duMDAxNTgwMDAwMUhRUXJaQUFYIiwiZXhwIjoxODI3NjY5MzMyLCJpYXQiOjE4Mjc2NTkzMzIsImp0aSI6IjE0MzIyNDM2MzQzNDM1NDQ1In0.qUq9q_Qa5eiVW5C6QzMvB1sX9Ttwz0Db8c2wmRXyrUWDpeoaolUYT_Diu1o33R4U4MME3nBMCdl0wQ1AVnuzjgV6s3TLcyxlphcoGXYVwOLsQBfbLKTzGiz10UORb3WQc9BwxhZVPDWyFXGlqUNwjPbaUslWoal9KMsbnXlBFKQd8GWjhS-kXHn66kAHwH-7DLZ_Z7D01oW2aFon5sWBZfKD_t9NeQJ9gdPs45ermSM45FixlKXkPPXiIq-_w5Hw1Zw_lEW6fVpWCS6IRz5pBtpHO8s_KESjxuPb1dzrV31AZC7BplWeaRRC5UslObbejw35P5v9CQqJR5Uc7_mX0Q
    ```

2. Run the following cURL command in a command prompt to generate the access token. Update the placeholders with relevant values.

    ```
    curl -X POST \
    https://<IS_HOST>:9446/oauth2/token \
    --cert <TRANSPORT_PUBLIC_KEY_FILE_PATH> --key <TRANSPORT_PRIVATE_KEY_FILE_PATH> \ 
    -d 'client_assertion_type=urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&code=<GENERATED_CODE>&grant_type=authorization_code&redirect_uri=<REDIRECT_URI>&client_assertion=<CLIENT_ASSERTION_JWT>&code_verifier=<CODE_VERIFIER>'
    ```

3. Upon successful token generation, you can obtain a token as follows:

      ``` json
      {
         "access_token":"eyJ4NXQiOiJOVGRtWmpNNFpEazNOalkwWXpjNU1tWm1PRGd3TVRFM01XWXdOREU1TVdSbFpEZzROemM0WkEiLCJraWQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZ19SUzI1NiIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhZG1pbkB3c28yLmNvbUBjYXJib24uc3VwZXIiLCJhdXQiOiJBUFBMSUNBVElPTl9VU0VSIiwiYXVkIjoiUFNER0ItT0ItVW5rbm93bjAwMTU4MDAwMDFIUVFyWkFBWCIsIm5iZiI6MTY0ODU0MTA2MiwiYXpwIjoiUFNER0ItT0ItVW5rbm93bjAwMTU4MDAwMDFIUVFyWkFBWCIsInNjb3BlIjoiYWNjb3VudHMgYWlzOmMwZDNkYThjLWRmNzctNDI0Zi1hYjAxLTBkZjQ3Mzg0NzEzYiIsImlzcyI6Imh0dHBzOlwvXC9sb2NhbGhvc3Q6OTQ0Nlwvb2F1dGgyXC90b2tlbiIsImNuZiI6eyJ4NXQjUzI1NiI6InliZXFhSW01MDBJTVB5MTlWa1BmSFJUSk50OXF2X1F0NWptSGR0LWJKbWMifSwiZXhwIjoxNjQ4NTQ0NjYyLCJpYXQiOjE2NDg1NDEwNjIsImp0aSI6IjNkN2I4YTE4LTcxMWMtNDljYi05YTE2LTViZjgzMjA5NGZjNCIsImNvbnNlbnRfaWQiOiJjMGQzZGE4Yy1kZjc3LTQyNGYtYWIwMS0wZGY0NzM4NDcxM2IifQ.ipVzAeTfHgDB3lgd7s06MD1GYAJec6anqwo-jiz99ucs9LxFHYVHK1XKpXB2YPx-R5FR_ssWGycqvQ4jima_QHjEI82us9l1c5o81L6y1EC_3jKuODEcigyxcmgha5MnnmAONgA9HT6o5bOQUBVSzjMogsvsF6MafyRUfItMXFJFwp_E-_tcSWprYq_1aMUa3sQuzBP1SpZxLUkbxp0mrtM3wgt9mBQVfhqGdqqwMH4l0iapA1O4cILDZTYlg29sEduznFwgqTbfygU5S_5Jd09NLyhFfwA96plEUbrGlQozcSiER2D6L3I8Rx2VkFYeKM9VlvOi3uIkq5THRC_gcg",
         "refresh_token":"5c5d0d00-eb31-38b6-ba97-4f46994051d9",
         "scope":"fundsconfirmations piis:c0d3da8c-df77-424f-ab01-0df47384713b",
         "token_type":"Bearer",
         "expires_in":3600
      }
      ```

### Invoking Payment Instrument Issuer Service

Once the PSU approves the funds-confirmation consent, the PIISP is eligible to access the account details of the PSU 
based on the provided permissions.

1. The sample request is as follows:

    ```
    curl -X POST \
    https://<APIM_HOST>:8243/xs2a/v1/funds-confirmations \
    -H 'X-Request-ID: 9b04ed2f-06fe-4f5e-801a-9660272beeaa' \
    -H 'Date: Mon, 9 May 2022 08:10:56 IST' \
    -H 'PSU-IP-Address: 127.0.1.1' \
    -H 'Authorization: Bearer <USER_ACCESS_TOKEN>' \
    -H 'PSU-ID: admin@wso2.com' \
    -H 'PSU-ID-Type: email' \
    -H 'Consent-ID: f10b6846-39f7-4f38-b4a0-a9a114b55f94' \
    -H 'Accept: */*' \
    -H 'Digest: SHA-256=AJi8UrgHXbciE7oXw4qa5pr0F3LYRXMQbjLOCUnX8J1a' \
    -H 'Signature: keyId="SN=de730ec5733ead1b,CA=1.2.840.113549.1.9.1=#16116d616c7368616e694077736f322e636f6d,CN=OpenBanking Pre-Production Issuing CA,OU=OpenBanking,O=WSO2 (UK) LIMITED,L=COL,ST=WP,C=LK",algorithm="rsa-sha256", headers="digest x-request-id date psu-id",signature=MqVxkIW5U0zewIptkYK783qm0aYeYdIIq8Ko+Fecu1oLL1y/kFuI71iMpeZqn8bKNH2yWsDpFVxLPbAjRIhA+yw2INcTvZy7rGsvRr1wOuBn0/8RLeL9GIsZ17SIrLzVxrKyivH8ccIZ+o2hXT36WWak1Af5a+lBeyN2IVN/REEsplLtRDLDIagVqNixxnMisZCa7M1MGS8DDs6eIb1zICvYPLQj01Cdpe92XvPAaGp8vnOGgitaClJJ2ll7FsM2O+m7f55dt+c0nDnDTf+HO0tH2WXsgTEaqtlLLgWjifkl5cdKxSXq9jiHmGYfQlb50Y2erAhRgFxRT3h64u4SuQ==' \
    -H 'TPP-Signature-Certificate: MIIFdzCCA1+gAwIBAgIJAN5zDsVzPq0bMA0GCSqGSIb3DQEBBQUAMIGsMQswCQYDVQQGEwJMSzELMAkGA1UECAwCV1AxDDAKBgNVBAcMA0NPTDEaMBgGA1UECgwRV1NPMiAoVUspIExJTUlURUQxFDASBgNVBAsMC09wZW5CYW5raW5nMS4wLAYDVQQDDCVPcGVuQmFua2luZyBQcmUtUHJvZHVjdGlvbiBJc3N1aW5nIENBMSAwHgYJKoZIhvcNAQkBFhFtYWxzaGFuaUB3c28yLmNvbTAeFw0yMjAxMTgwNzI4MzdaFw0yNDAxMTgwNzI4MzdaMHMxCzAJBgNVBAYTAkdCMRowGAYDVQQKDBFXU08yIChVSykgTElNSVRFRDErMCkGA1UEYQwiUFNER0ItT0ItVW5rbm93bjAwMTU4MDAwMDFIUVFyWkFBWDEbMBkGA1UEAwwSMDAxNTgwMDAwMUhRUXJaQUFYMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1rhjeBrT0+nb/VaHYrkgNodKUlShQvXHL8/sb1q+sVt459LqX8SDYemp01OWWKv45TBv9WtUVl8T08Zc2n5Q6ha7BKVjXaSsDhkXj7TrOAwBxRWnNjNivvyb4n4Gxek+AcgozEUFj1MHeIkgywEzP3DUNkbZiQjw7LFxLOy9Bh00f089DrCRHxEnUPka9BdRS9M0GWIuMVxn+FxmbZIl7wVxc8t2xFd4uWGtvBX1EbWLYJr1/j5fgjHCSmkj23Ar+6oqv2AKpp9HJ2aeYJozHRy+4asSjTuYeobULGIaSxgPGOJg4fprs+2UKpV2z2B6RMDf78WQJoGn+lm4wLtKWwIDAQABo4HTMIHQMA4GA1UdDwEB/wQEAwIGwDAdBgNVHQ4EFgQUIprePFwGvrdfcP6t14Y5TzPPgJowgZ4GCCsGAQUFBwEDBIGRMIGOMBMGBgQAjkYBBjAJBgcEAI5GAQYCMHcGBgQAgZgnAjBtMEYwRAYHBACBmCcBAQwGUFNQX0FTBgcEAIGYJwECDAZQU1BfUEkGBwQAgZgnAQMMBlBTUF9BSQYHBACBmCcBBAwGUFNQX0lDDBtGaW5hbmNpYWwgQ29uZHVjdCBBdXRob3JpdHkMBkdCLUZDQTANBgkqhkiG9w0BAQUFAAOCAgEAsuTEC6j8u7lGEpSeVekcUXby9DPRaI6He7MW2K9f6nz12nleyUnvQVQqoFUF+kywRgGpIP/9HsI12NYwLVfgm9LJWR+ObBMWDH1OUqgxgy+Pj4+udiR8FJQsEdY6eF4lgfQq6SU+naMFCcJhuIFEVjItiC71nVg2PPdaXRwxOlXhuIpfW3DdIaELNffoVKYxnx/wpRGRAbTFI87pDdqZ/2sbkbnt4Lq+7VIQmdqqrMCIvPqh8n6/I5xotq8kPbBcf7/1wjUDClqX5chBh89sxZhIyRtOq3HiVzQ2c6sYgA640LsxHB4yPWFDv5tPnzohmDmfCYcvbSZhsGm+hlyjaf8/gN8cG+ui7PFKuyI0NUnR3rD88gIzl2lT1Wtw9f2eFkS8NSnB3ENhRYPLcvZDePktOjkj5PEqo4OTZgGnoMzXNvzWaABrcpzw7a1WF7swvvZavUg9bvFbbeVloDZj4w9ODICoe/Sy+2nZBRTVzIHGJ4kNzscXXSMsSD9sXZMT/JmmD+cs/X/9SJzAsunXqpHbTB9PiGWdR7rhk6e0ddwwTa7wLs/h2MOP8LyTVaHQtNXe8x54YwDCP98dZ1G76iLKIZoU84aYcGp7E8tlQl05UhunlTNe+WxWvBt9tWeotaOomSqGRWDk+4j5z91NoFuFQ81aDAJxB8RYI2I1sk8=' \
    -H 'Content-Type: application/json; charset=UTF-8' \
    --cert <TRANSPORT_PUBLIC_KEY_FILE_PATH> --key <TRANSPORT_PRIVATE_KEY_FILE_PATH> \
    -d '{
        "cardNumber": "12345678901234",
        "account": {
            "iban": "DE98765432109876543210"
        },
        "instructedAmount": {
            "currency": "EUR",
            "amount": "123"
        }
    }'
    ```
   
2. The above request checks if the account consented by the PSU holds the requested funds. 
Given below is a sample response:

    ``` json
    {
       "fundsAvailable":true
    }
    ```