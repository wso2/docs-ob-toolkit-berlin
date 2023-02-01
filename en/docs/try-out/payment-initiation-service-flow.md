This page provides instructions to use the NextGenPSD2XS2AFramework API to provide the Payment Initiation Service (PIS).

!!! tip "Before you begin:"
    Deploy the [NextGenPSD2XS2AFramework API](deploy-nextgenpsd2-api.md). 

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

3. Run the following cURL command in a command prompt to generate the access token. Update the placeholders with relevant values.
``` curl
curl -X POST \
https://<IS_HOST>:9446/oauth2/token \
--cert <TRANSPORT_PUBLIC_KEY_FILE_PATH> --key <TRANSPORT_PRIVATE_KEY_FILE_PATH> \
-d 'grant_type=client_credentials&scope=payments%20openid&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer&client_assertion=<CLIENT_ASSERTION_JWT>&redirect_uri=<REDIRECT_URI>&client_id=<CLIENT_ID>'
```

3. Upon successful token generation, you can obtain a token as follows:
``` json
{
   "access_token":"eyJ4NXQiOiJOVGRtWmpNNFpEazNOalkwWXpjNU1tWm1PRGd3TVRFM01XWXdOREU1TVdSbFpEZzROemM0WkEiLCJraWQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZ19SUzI1NiIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhZG1pbkB3c28yLmNvbUBjYXJib24uc3VwZXIiLCJhdXQiOiJBUFBMSUNBVElPTiIsImF1ZCI6IlBTREdCLU9CLVVua25vd24wMDE1ODAwMDAxSFFRclpBQVgiLCJuYmYiOjE2NDY4OTEyNzIsImF6cCI6IlBTREdCLU9CLVVua25vd24wMDE1ODAwMDAxSFFRclpBQVgiLCJzY29wZSI6InBheW1lbnRzIiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6OTQ0Ni9vYXV0aDIvdG9rZW4iLCJjbmYiOnsieDV0I1MyNTYiOiJ5YmVxYUltNTAwSU1QeTE5VmtQZkhSVEpOdDlxdl9RdDVqbUhkdC1iSm1jIn0sImV4cCI6MTY0Njg5NDg3MiwiaWF0IjoxNjQ2ODkxMjcyLCJqdGkiOiI0Zjg0NmQwMS00ZjAxLTQ4YTAtYjliMi1iOTdjNzRmZjUxYTgifQ.CklCtjHYMzc_7u8EacYPQ-O7mhrFs-oR3pIk1fVz93dYwB5Bq959Z--TCT1BIxzWWEhnuD6jiVmdzJQ8LrZu7LczF-lyaP21UEAM5a23ZXmeG_5WZHXONWmKbo4mvcswqwJXbS9dOO1JU8Rx59JMP2zGBjbK3xf0zalWNC4IqQO6xhl8EzcoBahkqBwcygmhf3QyCKXozZpnCqG7HcYwYVFU7F0SKrGpDl2TZ9axWzBjvVOAK9d0G8EQhGjpNy0FY1lS4ZZGbPrUGTuoWBG1WEfqI_CTU7gXi_gGClKjWGXbqEy8FIgh34GCOt5xwx7XJ-nkwzwQzjXtgO1ZNOmdlA",
   "scope":"payments",
   "token_type":"Bearer",
   "expires_in":3600
}
```

### Initiating a payment consent

This is where the PISP generates a request to get the consent of the PSU to initiate a payment on behalf of the PSU.
There are 3 types of payment initiations:

  - Instant payment initiation
  - Periodic payment initiation
  - Bulk payment initiation

Listed below are the Payment Product types:
 
 - sepa-credit-transfers 
 - instant-sepa-credit-transfers 
 - target-2-payments 
 - cross-border-credit-transfers

The following steps explain how to try out the Payment Initiation Service.

1. Create a consent using the following request:

    !!! note "Mandatory headers"
        The following headers are mandatory for this request:
    
        - `X-Request-ID`: The unique ID of the request as determined by the initiating party.
        - `PSU-IP-Address`: The IP Address on which the PSU is connected to the TPP. This header is mandatory for 
           all accounts and payments consent initiation requests, and optional for funds confirmations consent initiation requests. 
        - `Signature`: Mandatory by default. If the signature validation is not required, remove 
          `SignatureValidationExecutor` from the `<APIM_HOME>/repository/conf/deployment.toml`.
        - `Digest`: Mandatory only if the `Signature` header is present.

    #### For Instant Payment Initiation

    ```  tab="Request"
    curl -X POST 'https://<APIM_HOST>:8243/xs2a/v1/payments/sepa-credit-transfers' \
    -H 'X-Request-ID: 8a725903-f00d-48f9-b23c-457726581fd6' \
    -H 'Date: Fri, 11 Mar 2022 15:35:39 IST' \
    -H 'PSU-IP-Address: 192.168.1.5' \
    -H 'PSU-ID: admin@wso2.com' \
    -H 'PSU-ID-Type: email' \
    -H 'Accept: */*' \
    -H 'Digest: SHA-256=AMuUQALJmENhCTR9yTo6R6WsRN80O2bWjm0Jpsfhq/g6' \
    -H 'Signature: keyId="SN=de730ec5733ead1b,CA=1.2.840.113549.1.9.1=#16116d616c7368616e694077736f322e636f6d,CN=OpenBanking Pre-Production Issuing CA,OU=OpenBanking,O=WSO2 (UK) LIMITED,L=COL,ST=WP,C=LK",algorithm="rsa-sha256", headers="digest x-request-id date psu-id",signature=MKjgyMLQ5AwcsY5YXG7gWPVGKQqqCPSg3078uDYwZzvVsSf9+mdGJWaTG9VrXEYBB6CkBJ9MmyQsfBW7MxR+0qOY+13TwpnMDh8dh0wuhq2iWVAhfPRKY8VqltWjIVTvq0bVuXP8TxwNqgGblszCO9ULNPoTsUDvhINYZi1gM5En57TiATXVGNeMuXSwoy2TK6IoFchfyrf5vQuYQkHsbFoYGcg7vHepq8Orcp2mDhwY+fpK9ylORf6bSt8tjcshzd7MsjS+RKQLo7y+c/A3hCrc6SuauXHh0RZcWWug/VJXUC8p784lM/w8wYXULdeoCdcB9XusBxISV/+Bx3xAmg==' \
    -H 'TPP-Signature-Certificate: <SIGNATURE_CERTIFICATE>' \
    -H 'Content-Type: application/json; charset=UTF-8' \
    -H 'Authorization: <APPLICATION_ACCESS_TOKEN>' \
    --cert <PUBLIC_KEY_FILE_PATH> --key <PRIVATE_KEY_FILE_PATH> \
    -d '{
       "instructedAmount": {
           "currency": "EUR",
           "amount": "123.50"
       },
       "debtorAccount": {
           "iban": "DE12345678901234567890",
           "currency": "EUR"
       },
       "creditorName": "Merchant123",
       "creditorAccount": {
           "iban": "DE98765432109876543210"
       },
       "remittanceInformationUnstructured": "Ref Number Merchant"
    }'
    ```
   
    ``` tab="Response"
    {
       "transactionStatus":"RCVD",
       "chosenScaMethod":{
          "authenticationVersion":"1.0",
          "name":"SMS OTP on Mobile",
          "authenticationType":"SMS_OTP",
          "explanation":"SMS based one time password",
          "authenticationMethodId":"sms-otp"
       },
       "_links":{
          "scaStatus":{
             "href":"/v1/payments/sepa-credit-transfers/ad3459b7-7c07-45ea-ab2a-431a77ff3173/authorisations/fe545b42-c570-412e-b978-7623db44bc2d"
          },
          "scaOAuth":{
             "href":"https://localhost:8243/.well-known/openid-configuration"
          },
          "self":{
             "href":"/v1/payments/sepa-credit-transfers/ad3459b7-7c07-45ea-ab2a-431a77ff3173"
          },
          "status":{
             "href":"/v1/payments/sepa-credit-transfers/ad3459b7-7c07-45ea-ab2a-431a77ff3173/status"
          }
       },
       "paymentId":"ad3459b7-7c07-45ea-ab2a-431a77ff3173"
    }
    ```

    #### For Periodic Payments Initiation

    ``` tab="Request"
    curl -X POST 'https://<APIM_HOST>:8243/xs2a/v1/periodic-payments/sepa-credit-transfers' \
    -H 'X-Request-ID: 2c3e7dbc-9bff-4b23-95a2-93364ace2977' \
    -H 'Date: Fri, 11 Mar 2022 15:35:39 IST' \
    -H 'PSU-IP-Address: 192.168.1.5' \
    -H 'PSU-ID: admin@wso2.com' \
    -H 'PSU-ID-Type: email' \
    -H 'Accept: */*' \
    -H 'Digest: SHA-256=FxRZe+LLWy1JD4QQr9ts51nwpoRFVwzC6GKWB5BLyuM=' \
    -H 'Signature: keyId="SN=de730ec5733ead1b,CA=1.2.840.113549.1.9.1=#16116d616c7368616e694077736f322e636f6d,CN=OpenBanking Pre-Production Issuing CA,OU=OpenBanking,O=WSO2 (UK) LIMITED,L=COL,ST=WP,C=LK",algorithm="rsa-sha256", headers="digest x-request-id date psu-id",signature=nkSODn96gzbeIy+MJCQf/TYj9/ERFfw9wxWT5zWiscLJs+8N4sQ15/y1RV857MQmLglaqk8UMKMWqOtibmRP5e5q145wCxpbiDHCfaF03dFy6Mz7YsPvhMIe5DsRYSfjc7gL9lqQDqeXBXY5zhRKMpiTrHgPlUfWRa1M77NvqfPDzOmgHHqUap9NpKMHkUZ/MpyGkDXiOvug8DLfBp9qrXeXbQDm/5hbZGLZSMYct1BYe0vTs9/l9H9NpyThblDE9TG8UgJVJETscoW9d/h4DE2STAoFWDNIKdrTb2W/joVb3xovJjok2yLt9eTMCoP8Gq3UuXa8351bI26WZXk9EA==' \
    -H 'TPP-Signature-Certificate: <SIGNATURE_CERTIFICATE>' \
    -H 'Content-Type: application/json; charset=UTF-8' \
    -H 'Authorization: <APPLICATION_ACCESS_TOKEN>' \
    --cert <PUBLIC_KEY_FILE_PATH> --key <PRIVATE_KEY_FILE_PATH> \
    -d '{
       "instructedAmount": {
           "currency": "EUR",
           "amount": "123.50"
       },
       "debtorAccount": {
           "iban": "DE12345678901234567890",
           "currency": "EUR"
       },
       "creditorName": "Merchant123",
       "creditorAccount": {
           "iban": "DE98765432109876543210"
       },
       "remittanceInformationUnstructured": "Ref Number Abonnement",
       "startDate": "2022-03-16",
       "executionRule": "following",
       "frequency": "Monthly",
       "dayOfExecution": "01"
    }'
    ```
   
    ``` tab="Response"
    {
       "transactionStatus":"RCVD",
       "chosenScaMethod":{
          "authenticationVersion":"1.0",
          "name":"SMS OTP on Mobile",
          "authenticationType":"SMS_OTP",
          "explanation":"SMS based one time password",
          "authenticationMethodId":"sms-otp"
       },
       "_links":{
          "scaStatus":{
             "href":"/v1/periodic-payments/sepa-credit-transfers/d6cf82ce-0884-4c64-8a97-2bfbb3574d9e/authorisations/406fee1b-0619-478c-a012-fc8cd3b1a80b"
          },
          "scaOAuth":{
             "href":"https://localhost:8243/.well-known/openid-configuration"
          },
          "self":{
             "href":"/v1/periodic-payments/sepa-credit-transfers/d6cf82ce-0884-4c64-8a97-2bfbb3574d9e"
          },
          "status":{
             "href":"/v1/periodic-payments/sepa-credit-transfers/d6cf82ce-0884-4c64-8a97-2bfbb3574d9e/status"
          }
       },
       "paymentId":"d6cf82ce-0884-4c64-8a97-2bfbb3574d9e"
    }
    ```
   
    #### For Bulk Payments Initiation 

    ``` tab="Request"
    curl -X POST 'https://<APIM_HOST>:8243/xs2a/v1/bulk-payments/sepa-credit-transfers' \
    -H 'X-Request-ID: 2c3e7dbc-9bff-4b23-95a2-93364ace2978' \
    -H 'Date: Fri, 11 Mar 2022 15:55:39 IST' \
    -H 'PSU-IP-Address: 192.168.1.5' \
    -H 'PSU-ID: admin@wso2.com' \
    -H 'PSU-ID-Type: email' \
    -H 'Accept: */*' \
    -H 'Digest: SHA-256=APyAWNOZF8RtQYqfjhvEax/XvLNzp+9yWkVqiG8h8IPT' \
    -H 'Signature: keyId="SN=de730ec5733ead1b,CA=1.2.840.113549.1.9.1=#16116d616c7368616e694077736f322e636f6d,CN=OpenBanking Pre-Production Issuing CA,OU=OpenBanking,O=WSO2 (UK) LIMITED,L=COL,ST=WP,C=LK",algorithm="rsa-sha256", headers="digest x-request-id date psu-id",signature=vygh2dDrkoku18LcDgIBA4iKU9V/P/LZCb0OZC3d+yoIygc/ceehj3K13MbTR4m3F+QOC4ksRCuBRxwG3vtp4WYBf3rFckTBxOAlH0yhfbZqg0f5smj/H3CzhuxsxtIIo2ny+NOYbs3ycWfNseB6lL3Pc2x/ZZkEqBT3kTq4zrrRedFkIRZmow8nhCJ00YvWqqgV6MusFl1wI3JRJ4R1nfBEKs2aQTrao3XM29mwulXnOZMg78KSi55W+qbKjqBY9N33ksEGlt2YNAMI8Ap+hh4kyVY7YYwmkSKlXtqz4dZU4f3UMsHz4pk0iEnXM/KCR0PGa8pubYV3lt4wDE/ZXA==' \
    -H 'TPP-Signature-Certificate: <SIGNATURE_CERTIFICATE>' \
    -H 'Content-Type: application/json; charset=UTF-8' \
    -H 'Authorization: <APPLICATION_ACCESS_TOKEN>' \
    --cert <PUBLIC_KEY_FILE_PATH> --key <PRIVATE_KEY_FILE_PATH> \
    -d '{
       "batchBookingPreferred": true,
       "debtorAccount": {
           "iban": "DE12345678901234567890",
           "currency": "EUR"
       },
       "requestedExecutionDate": "2022-03-16",
       "payments": [
           {
               "instructedAmount": {
                   "currency": "EUR",
                   "amount": "123.50"
               },
               "creditorName": "Merchant123",
               "creditorAccount": {
                   "iban": "DE98765432109876543210"
               },
               "remittanceInformationUnstructured": "Ref Number Merchant"
           },
           {
               "instructedAmount": {
                   "currency": "EUR",
                   "amount": "123.50"
               },
               "creditorName": "Merchant",
               "creditorAccount": {
                   "iban": "DE23100120020123456789"
               },
               "remittanceInformationUnstructured": "Ref Number Merchant"
           }
       ]
    }'
    ```
   
    ``` tab="Response"
    {
       "transactionStatus":"RCVD",
       "chosenScaMethod":{
          "authenticationVersion":"1.0",
          "name":"SMS OTP on Mobile",
          "authenticationType":"SMS_OTP",
          "explanation":"SMS based one time password",
          "authenticationMethodId":"sms-otp"
       },
       "_links":{
          "scaStatus":{
             "href":"/v1/bulk-payments/sepa-credit-transfers/9e6229ac-a888-44ac-80cc-d384d8e20e73/authorisations/eb75d62e-5722-4233-aa66-860aaa818366"
          },
          "scaOAuth":{
             "href":"https://localhost:8243/.well-known/openid-configuration"
          },
          "self":{
             "href":"/v1/bulk-payments/sepa-credit-transfers/9e6229ac-a888-44ac-80cc-d384d8e20e73"
          },
          "status":{
             "href":"/v1/bulk-payments/sepa-credit-transfers/9e6229ac-a888-44ac-80cc-d384d8e20e73/status"
          }
       },
       "paymentId":"9e6229ac-a888-44ac-80cc-d384d8e20e73"
    }
    ```

<!---

    #### Multi-Currency Payments 

    A sample request payload for a multi-currency payment initiation is as follows: 

    ```json
    {
      "instructedAmount":{
        "currency":"EUR",
        "amount":"123.50"
      },
      "debtorAccount":{
        "iban":"DE12345678901234567890",
        "currency":"EUR"
      },
      "creditorName":"Merchant123",
      "creditorAccount":{
        "iban":"DE98765432109876543210"
      },
      "remittanceInformationUnstructured":"Ref Number Merchant"
    }
    ```
   
    - The `instructedAmount` and `debtorAccount` objects can have a `currency` element to indicate the payment's currency.
    - The `currency` element is mandatory for the `instructedAmount` object.
    - The `currency` element is optional for the `debtorAccount` object.
    - If the `instructedAmount` contains no currency type:
         - If the account reference is identified as a multi-currency account reference by the banking back end, 
           an error is displayed during the authorization.
         - If the sent account reference is **not** identified as a multi-currency account reference by the banking 
           back end, it is considered as a base account and authorization will happen.
    - If the `debtorAccount` contains a currency type:
         - If the account reference is identified as a single currency account, an error is displayed during the 
           authorization
         - If the sent account reference is identified as a multi-currency account, it will be considered as a 
           multi-currency account and proceed with the authorization.
         - If the provided currency type is different to the currency type in the `debtorAccount`, an error is sent 
           during authorization as the currency types cannot be matched.

-->        
 
### Authorizing a consent

The PISP application redirects the PSU to authenticate and approve/deny the provided consent. This can be achieved in 
2 ways:

  1. Implicit flow
  2. Explicit flow

The TPP decides the approach using `TPP-Explicit-Authorisation-Preferred`, which is an optional boolean header. 
This header is sent during the consent initiation request. If `TPP-Explicit-Authorisation-Preferred` is set to `false` 
or the header is not present, the Implicit approach is followed.

#### Implicit authorisation flow

The Implicit authorisation flow is as follows:

1. The ASPSP creates an authorisation sub-resource implicitly after the payment consent is received.
2. The ASPSP replies with the well-known configuration of the Identity Server in the `_links` section of the response. 
3. The TPP generates the authorisation URL using the well-known URL. 
4. The PSU goes through the authorisation flow with that authorisation URL.

#### Explicit authorisation flow

The Explicit authorisation flow is as follows:

1. Once the consent is granted, the ASPSP replies with one of the `startAuthorisation` links in the `_links` section of 
the response.

    ```  tab="Request"
    curl -X POST 'https://<APIM_HOST>:8243/xs2a/v1/payments/sepa-credit-transfers' \
    -H 'X-Request-ID: 8a725903-f00d-48f9-b23c-457726581fd6' \
    -H 'Date: Fri, 11 Mar 2022 15:35:39 IST' \
    -H 'PSU-IP-Address: 192.168.1.5' \
    -H 'PSU-ID: admin@wso2.com' \
    -H 'TPP-Explicit-Authorisation-Preferred: true' \
    -H 'PSU-ID-Type: email' \
    -H 'Accept: */*' \
    -H 'Digest: SHA-256=AMuUQALJmENhCTR9yTo6R6WsRN80O2bWjm0Jpsfhq/g6' \
    -H 'Signature: keyId="SN=de730ec5733ead1b,CA=1.2.840.113549.1.9.1=#16116d616c7368616e694077736f322e636f6d,CN=OpenBanking Pre-Production Issuing CA,OU=OpenBanking,O=WSO2 (UK) LIMITED,L=COL,ST=WP,C=LK",algorithm="rsa-sha256", headers="digest x-request-id date psu-id",signature=MKjgyMLQ5AwcsY5YXG7gWPVGKQqqCPSg3078uDYwZzvVsSf9+mdGJWaTG9VrXEYBB6CkBJ9MmyQsfBW7MxR+0qOY+13TwpnMDh8dh0wuhq2iWVAhfPRKY8VqltWjIVTvq0bVuXP8TxwNqgGblszCO9ULNPoTsUDvhINYZi1gM5En57TiATXVGNeMuXSwoy2TK6IoFchfyrf5vQuYQkHsbFoYGcg7vHepq8Orcp2mDhwY+fpK9ylORf6bSt8tjcshzd7MsjS+RKQLo7y+c/A3hCrc6SuauXHh0RZcWWug/VJXUC8p784lM/w8wYXULdeoCdcB9XusBxISV/+Bx3xAmg==' \
    -H 'TPP-Signature-Certificate: <SIGNATURE_CERTIFICATE>' \
    -H 'Content-Type: application/json; charset=UTF-8' \
    -H 'Authorization: <APPLICATION_ACCESS_TOKEN>' \
    --cert <PUBLIC_KEY_FILE_PATH> --key <PRIVATE_KEY_FILE_PATH> \
    -d '{
       "instructedAmount": {
           "currency": "EUR",
           "amount": "123.50"
       },
       "debtorAccount": {
           "iban": "DE12345678901234567890",
           "currency": "EUR"
       },
       "creditorName": "Merchant123",
       "creditorAccount": {
           "iban": "DE98765432109876543210"
       },
       "remittanceInformationUnstructured": "Ref Number Merchant"
    }'
    ```

    ``` tab="Response"
    {
       "transactionStatus":"RCVD",
       "chosenScaMethod":{
          "authenticationVersion":"1.0",
          "name":"SMS OTP on Mobile",
          "authenticationType":"SMS_OTP",
          "explanation":"SMS based one time password",
          "authenticationMethodId":"sms-otp"
       },
       "_links":{
          "scaStatus":{
             "href":"/v1/payments/sepa-credit-transfers/ad3459b7-7c07-45ea-ab2a-431a77ff3173/authorisations/fe545b42-c570-412e-b978-7623db44bc2d"
          },
          "scaOAuth":{
             "href":"https://localhost:8243/.well-known/openid-configuration"
          },
          "self":{
             "href":"/v1/payments/sepa-credit-transfers/ad3459b7-7c07-45ea-ab2a-431a77ff3173"
          },
          "status":{
             "href":"/v1/payments/sepa-credit-transfers/ad3459b7-7c07-45ea-ab2a-431a77ff3173/status"
          }
       },
       "paymentId":"ad3459b7-7c07-45ea-ab2a-431a77ff3173"
    }
    ```

2. The TPP uses the `startAuthorisation` link to create an authorisation sub-resource explicitly.

    - Replace the `<PAYMENT_SERVICE>` placeholder with the relevant payment product (payments, bulk-payments, periodic-payments). 
      This request contains an empty JSON payload.

        ``` tab="Request"
        curl -L -X POST 'https://<APIM_HOST>:8243/xs2a/v1/<PAYMENT_SERVICE>/sepa-credit-transfers/<CONSENT_ID>/authorisations' \
        -H 'X-Request-ID: 10b3a7a1-690c-4317-8959-b7edcf9338db' \
        -H 'Authorization: Bearer <APPLICATION_ACCESS_TOKEN>' \
        -H 'Content-Type: application/json' \
        -d '{}'
        ```
      
        ``` tab="Response"
        {
           "authorisationId":"72644123-5880-43ae-9039-bf2d26fe75a1",
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
                 "href":"/v1/payments/sepa-credit-transfers/ab676e45-44ae-4baf-bc76-22bc1a076c8b/authorisations/72644123-5880-43ae-9039-bf2d26fe75a1"
              },
              "scaOAuth":{
                 "href":"https://localhost:8243/.well-known/openid-configuration"
              }
           }
        }
        ```

3. The ASPSP replies with the well-known configuration of the Identity Server in the `_links` section of the response.
4. The TPP generates the authorisation URL using the well-known URL.
5. PSU goes through the authorisation flow with that authorisation URL.

    !!! note "Multiple SCA of more than one PSU (Multi-authorization)"
         - For some accounts, more than one PSU has to give their consent before accessing this account. In this case, Strong
           Customer Authentication (SCA) has to be executed by more than one PSU.
         - In a multi-authorization scenario, steps 2 to 5 must be repeated _n_ number of times for _n_ number of PSUs. 
           The consent becomes `valid` only after all the PSUs approve it.
         - If only one PSU has authorized the consent, the consent status will change to `partiallyAuthorised`. If one 
           of the users does not authorize the consent, the consent status will change to `rejected`.


#### Authorisation URL

Regardless of the authorisation flow, once the well-known configuration of the Identity Server is obtained, the TPP must 
generate an authorisation URL for the PSU to authorise the consent. This authorisation URL must be authorised by n 
number of PSUs in a multi-level authorisation context.

1. The ASPSP sends the request to the PSU stating the accounts and information that the TPP wishes to access. The  
request is a URL in the format given below. Update the placeholders with relevant values and run this in a 
browser to prompt the invocation of the authorize API:

    ```
    https://<IS_HOST>:9446/oauth2/authorize/?scope=<YOUR_SCOPES>&response_type=code&redirect_uri=<REDIRECT_URI>&state=<DYNAMICALLY_SET_VALUE>&code_challenge_method=<YOUR_CODE_CHALLENGE_METHOD>&client_id=<ORGANIZATION_ID>&code_challenge=<YOUR_CODE_CHALLENGE>
    ```
    
    ??? "Click here to see the descriptions for the parameters in Authorisation URL"
        | Parameter | Description |
        |-----------|-------------|
        | scope | This is the reference to the payment consent resource for access. It is in the form of `pis:<consentId>`.|
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

2. Upon successful authentication, the PISP is redirected to the consent authorise page. Use the login credentials of a 
user that has a **subscriber** role.

3. The page displays the data requested by the TPP for that particular consent along with its accounts and permissions.

    ![consent_page](../assets/img/try-out/payment-flow/consent-page.png)

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
          "access_token":"eyJ4NXQiOiJOVGRtWmpNNFpEazNOalkwWXpjNU1tWm1PRGd3TVRFM01XWXdOREU1TVdSbFpEZzROemM0WkEiLCJraWQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZ19SUzI1NiIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhZG1pbkB3c28yLmNvbUBjYXJib24uc3VwZXIiLCJhdXQiOiJBUFBMSUNBVElPTl9VU0VSIiwiYXVkIjoiUFNER0ItT0ItVW5rbm93bjAwMTU4MDAwMDFIUVFyWkFBWCIsIm5iZiI6MTY0ODU0MTA2MiwiYXpwIjoiUFNER0ItT0ItVW5rbm93bjAwMTU4MDAwMDFIUVFyWkFBWCIsInNjb3BlIjoicGF5bWVudCBwaXM6YzBkM2RhOGMtZGY3Ny00MjRmLWFiMDEtMGRmNDczODQ3MTNiIiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6OTQ0Ni9vYXV0aDIvdG9rZW4iLCJjbmYiOnsieDV0I1MyNTYiOiJ5YmVxYUltNTAwSU1QeTE5VmtQZkhSVEpOdDlxdl9RdDVqbUhkdC1iSm1jIn0sImV4cCI6MTY0ODU0NDY2MiwiaWF0IjoxNjQ4NTQxMDYyLCJqdGkiOiIzZDdiOGExOC03MTFjLTQ5Y2ItOWExNi01YmY4MzIwOTRmYzQiLCJjb25zZW50X2lkIjoiYzBkM2RhOGMtZGY3Ny00MjRmLWFiMDEtMGRmNDczODQ3MTNiIn0.vh_YgnDWgLD1cs0XT1s5SgEYDnzueqzB9l_xYYl1HPBkxAc8Xu1Vd8HTK1M3CHAA7Yu2OLug3Zd9pCOUGEtApu2SClDmlEEKOjcoaYFQKIR2ljVsh67eVIWaUZmCb6vF_QoKemhtQ6YDMyfooQiHreFSn3NfjTzNtWsfWFPDlFdHswWWcva-6NKWCY2OxdlITQKmgqdehAP40p6VHFi6GFgumRXl9O5OVzS4FP6BmpBKP_UXZzgrK7TqUcZLKTwWY8vxltZNn2m--6C-IeQOCxWej_Lft3_RRp99-TCKNkDBaTio1hAaXv2h6N7ITHoxBSZbehF94M1mckmiIDE22A",
          "refresh_token":"5c5d0d00-eb31-38b6-ba97-4f46994051d9",
          "scope":"payments pis:c0d3da8c-df77-424f-ab01-0df47384713b",
          "token_type":"Bearer",
          "expires_in":3600
       }
      ```

### Payment information/status retrieval related requests

!!! info
    This is only available as a WSO2 Update from **WSO2 Open Banking Identity Server Berlin Toolkit Level 1.0.0.5** and
    **WSO2 Open Banking API Manager Berlin Toolkit Level 1.0.0.5** onwards. For more information on updating, see
    [Getting WSO2 Updates](../install-and-setup/setting-up-servers.md#getting-wso2-updates).

!!! note
    All the following endpoints need a user access token to retrieve payment information.

**GET /payments/{payment-product}/{paymentId}**

``` tab="Request"
curl -X GET 'https://<APIM_HOST>:8243/xs2a/v1/payments/sepa-credit-transfers/4a8ac7c7-d5ee-42cb-8a29-44fc7778bd96' \
-H 'PSU-IP-Address: 127.0.1.1' \
-H 'PSU-ID-Type: email' \
-H 'X-Request-ID: 6bb5c0b0-5f63-4872-b3dc-e4987f58f879' \
-H 'Date: Mon, 31 Oct 2022 11:59:20 GMT' \
-H 'PSU-ID: admin@wso2.com' \
-H 'Signature: keyId="SN=de730ec5733ead1b,CA=1.2.840.113549.1.9.1=#16116d616c7368616e694077736f322e636f6d,CN=OpenBanking Pre-Production Issuing CA,OU=OpenBanking,O=WSO2 (UK) LIMITED,L=COL,ST=WP,C=LK",algorithm="rsa-sha256", headers="digest x-request-id date psu-id",signature=f/ozcQhnzQwGCGNbMe1bdpYMTqECO65uVBrwGCCYGajtilTs9O0wh3cA3Mrdtw2JUreEmSKDFpb0gjNObHCP6wdtOoCZpzU2EKhdhcPFVqkcJfL+9rMrJZU2l+U6sZs+FO7Bc2H/VQnvXXHRjD9UfPkrBLSvftDm1LxodQkei+7QuCfmvltILfynFQ/c/85ITnYqUQzlP6f/LDsWjOgQqXwWTVW7WMOHitLENwGaHNy6EjiIPFZIVYNJdHd51XHbqMNN332QQuE26IRzfUqy2Cus8a94hE8OZ4hx863M7V8YKIfWj3MSJSicSXwCeMClXalphV1NKUixRDKuqds85Q==' \
-H 'Digest: SHA-256=RBNvo1WzZ4oRRq0W9+hknpT7T8If536DEMBg9hyq/4o= \
-H 'TPP-Signature-Certificate: <SIGNATURE_CERTIFICATE>' \
-H 'Authorization: Bearer <APPLICATION_ACCESS_TOKEN>'
```

``` tab="Response"
200 OK
Header: X-Request-ID: 6bb5c0b0-5f63-4872-b3dc-e4987f58f879
{
   "debtorAccount": {
       "iban": "DE12345678901234567890",
       "currency": "EUR"
   },
   "creditorName": "Merchant123",
   "transactionStatus": "ACCP",
   "creditorAccount": {
       "iban": "DE98765432109876543210"
   },
   "instructedAmount": {
       "amount": "123.50",
       "currency": "EUR"
   },
   "remittanceInformationUnstructured": "Ref Number Merchant"
}
```

!!! note
    - This response should be constructed by the core banking back end.
    - The `transactionStatus` property shows the status of the real payment at the time the request arrives at the bank backend.
    - The response to the request must comply with the response specified in the specification.

**GET /bulk-payments/{payment-product}/{paymentId}**

``` tab="Request"
curl -X GET 'https://<APIM_HOST>:8243/xs2a/v1/bulk-payments/sepa-credit-transfers/319b67d3-f66d-42e3-b05d-2e26006ba775' \
-H 'PSU-IP-Address: 127.0.1.1' \
-H 'PSU-ID-Type: email' \
-H 'X-Request-ID: f044aa8c-eee3-4d2b-8c22-49652bdf1531' \
-H 'Date: Mon, 31 Oct 2022 11:52:49 GMT' \
-H 'PSU-ID: admin@wso2.com' \
-H 'Signature: keyId="SN=de730ec5733ead1b,CA=1.2.840.113549.1.9.1=#16116d616c7368616e694077736f322e636f6d,CN=OpenBanking Pre-Production Issuing CA,OU=OpenBanking,O=WSO2 (UK) LIMITED,L=COL,ST=WP,C=LK",algorithm="rsa-sha256", headers="digest x-request-id date psu-id",signature=lVHEoQ1PKXE3Ns7fW97I0gqluiu6mmXU+KKmccZmWVggCw1UEdjKLUSfV5a7GMj9qJyh8ddiXVRqnRcUUbSTpq72Czuvy+iuD/FBZuJmFrLIyxZ5G5nf50/CS9UauLPF2XBp7cAiz7ot+ON0oixNfOxv/hlFy7BXADo3rT4VlHE1Gy0eajHW5Sb8TMItkS1WqWHreSvPJw0uUr2/LfGA1gNCX+qNRi4KOboCWSlArlAneR1tvJ5Ng7jSe8lG+Z60neovBtDuFEdQSJK1wRAvTW3Akz//Cj5z7fp04NC+nK2ORhb8CzC8yW2ly4m/z48BAyWyEI9M4f2VesBJ0dubSA==' \
-H 'Digest: SHA-256=RBNvo1WzZ4oRRq0W9+hknpT7T8If536DEMBg9hyq/4o= \
-H 'TPP-Signature-Certificate: <SIGNATURE_CERTIFICATE>' \
-H 'Authorization: Bearer <APPLICATION_ACCESS_TOKEN>'
```

``` tab="Response"
200 OK
Header: X-Request-ID: f044aa8c-eee3-4d2b-8c22-49652bdf1531
{
   "debtorAccount": {
       "iban": "DE40100100103307118608"
   },
   "requestedExecutionDate": "2025-08-01",
   "transactionStatus": "ACCP",
   "payments": [
       {
           "creditorName": "Merchant123",
           "creditorAccount": {
               "iban": "DE02100100109307118603"
           },
           "instructedAmount": {
               "amount": "123.50",
               "currency": "EUR"
           },
           "remittanceInformationUnstructured": "Ref Number Merchant 1"
       },
       {
           "creditorName": "Merchant456",
           "creditorAccount": {
               "iban": "FR7612345987650123456789014"
           },
           "instructedAmount": {
               "amount": "34.10",
               "currency": "EUR"
           },
           "remittanceInformationUnstructured": "Ref Number Merchant 2"
       }
   ],
   "batchBookingPreferred": true
}
```

!!! note
    - This response is constructed by the core banking back end.
    - The `transactionStatus` property shows the status of the real payment at the time the request arrives at the bank backend.
    - The response to the request must comply with the response specified in the specification.

**GET /periodic-payments/{payment-product}/{paymentId}**

``` tab="Request"
curl -X GET 'https://localhost:8243/xs2a/v1/periodic-payments/sepa-credit-transfers/31169aed-3a46-4404-9035-99de2e776a60' \
-H 'PSU-IP-Address: 127.0.1.1' \
-H 'PSU-ID-Type: email' \
-H 'X-Request-ID: eea1ced4-2ae3-499a-9e10-192d8e2ecb7a' \
-H 'Date: Mon, 31 Oct 2022 12:08:10 GMT' \
-H 'PSU-ID: admin@wso2.com' \
-H 'Signature: keyId="SN=de730ec5733ead1b,CA=1.2.840.113549.1.9.1=#16116d616c7368616e694077736f322e636f6d,CN=OpenBanking Pre-Production Issuing CA,OU=OpenBanking,O=WSO2 (UK) LIMITED,L=COL,ST=WP,C=LK",algorithm="rsa-sha256", headers="digest x-request-id date psu-id",signature=znJTzGuMdw/GUGnFypWMQVZkxUDJ4VhO1rv2Ro7PBSFX1SpA/XkfcrydXIVXtUDEcUpiBSi97C3JzT93aN8htBgd2gEvEocVfxogXnylfcpQzu07JkMLdcr9MOvHJpZ6CxO0GRkhKYndDPXB1o/gDIRMLcDQNPyvSrMQT+lMuzKlJDCsZ3wkwu9HPSRfrpb5Mrc2T9vU8fa1kqOUCfOkrx8MIo42GnZB/BTYdzdNwRLJA0bbqPcFTFnhYhqfhUTDFfd+me6ull2zrijEp7x3oWO7wNHBqtGWJbUaQHaha6OSWGrtb5cSIfAU3hqFGiJKvnZN32hfPyBX3tcUq6m5xg==' \
-H 'Digest: SHA-256=RBNvo1WzZ4oRRq0W9+hknpT7T8If536DEMBg9hyq/4o=' \
-H 'TPP-Signature-Certificate: <SIGNATURE_CERTIFICATE>' \
-H 'Authorization: Bearer <APPLICATION_ACCESS_TOKEN>'
```

``` tab="Response"
200 OK
Header: X-Request-ID: eea1ced4-2ae3-499a-9e10-192d8e2ecb7a
{
   "executionRule": "following",
   "debtorAccount": {
       "iban": "DE12345678901234567890"
   },
   "creditorName": "Merchant123",
   "transactionStatus": "ACCP",
   "endDate": "2023-09-10",
   "dayOfExecution": "01",
   "creditorAccount": {
       "iban": "DE98765432109876543210"
   },
   "instructedAmount": {
       "amount": "123.50",
       "currency": "EUR"
   },
   "remittanceInformationUnstructured": "Ref Number Abonnement",
   "startDate": "2023-09-05",
   "frequency": "Monthly"
}
```

!!! note
    - This response is constructed by the core banking back end.
    - The `transactionStatus` property shows the status of the real payment at the time the request arrives at the bank backend.
    - The response to the request must comply with the response specified in the specification.

**GET /{payment-service}/{payment-product}/{paymentId}/status**

This request is applicable for instant payments, bulk payments, and periodic payments.

Given below is a sample request for a periodic payment:

``` tab="Request"
curl -X GET 'https://localhost:8243/xs2a/v1/periodic-payments/sepa-credit-transfers/31169aed-3a46-4404-9035-99de2e776a60/status' \
-H 'PSU-IP-Address: 127.0.1.1' \
-H 'PSU-ID-Type: email' \
-H 'X-Request-ID: d029c37a-d464-4304-b175-7c27fd7f5728' \
-H 'Date: Mon, 31 Oct 2022 12:12:08 GMT' \
-H 'PSU-ID: admin@wso2.com' \
-H 'Signature: keyId="SN=de730ec5733ead1b,CA=1.2.840.113549.1.9.1=#16116d616c7368616e694077736f322e636f6d,CN=OpenBanking Pre-Production Issuing CA,OU=OpenBanking,O=WSO2 (UK) LIMITED,L=COL,ST=WP,C=LK",algorithm="rsa-sha256", headers="digest x-request-id date psu-id",signature=AEtotwhYvGkGQEZYD0a/rvBwW6JCqJ2hBFha8lQdcSI/zruoxF2cYkeRNSir3pwTYF9QmYwp2aPJZ8LoAozSHNQUs2Q9BmNHVET/g8HFV+7iBzfEqK6Mtyzu0u9u7qhBaLdu3vq1gSyMuQHPFoKgWgTGGVFiL0cTICp1Zka5niCxa6GGGwpwvER9DrApSk3nvwm/+vwHwmEEeP3LoQubvKDyDF6Vj438VLKpMGBl1kWv/WwkLhIUSW6OSVvxX+xWhgYBS0qxEW8FroSJIul1ncbhst8qAgFCmoV4fSon1o9qaEHQwnnIec/qpldbtEOmEZNGVCmnfu2OY1XyVw3Vxw==' \
-H 'Digest: SHA-256=RBNvo1WzZ4oRRq0W9+hknpT7T8If536DEMBg9hyq/4o=' \
-H 'TPP-Signature-Certificate: <SIGNATURE_CERTIFICATE>' \
-H 'Authorization: Bearer <APPLICATION_ACCESS_TOKEN>'
```

``` tab="Response"
200 OK
Header: X-Request-ID: d029c37a-d464-4304-b175-7c27fd7f5728
{
   "transactionStatus": "ACCP"
}
```

!!! note
    - This response is constructed by the core banking back end.
    - The `transactionStatus` property shows the status of the real payment at the time the request arrives at the bank backend.
    - The response to the request must comply with the response specified in the specification.

### Payment cancellation requests

!!! info
    This is only available as a WSO2 Update from **WSO2 Open Banking Identity Server Berlin Toolkit Level 1.0.0.5** and
    **WSO2 Open Banking API Manager Berlin Toolkit Level 1.0.0.5** onwards. For more information on updating, see
    [Getting WSO2 Updates](../install-and-setup/setting-up-servers.md#getting-wso2-updates).

!!! note
    - There are three types of payments.
        - Instant payments
        - Bulk payments
        - Periodic payments
    - Only bulk payments and periodic payments can be cancelled. 
    - The bank should decide whether the payment cancellation needs authorization or not.

**DELETE /{payment-service}/{payment-product}/{paymentId}**

To cancel an already submitted payment

- This will go to the core banking back end and respond accordingly.

    !!! note
        - Successful response code will be either 204 or 202. This is decided by the bank.
        - If you get 204 as the response code, it indicates that the bank does not need authorization to cancel this payment. Therefore, the payment status must be updated from the banking side as `CANC`. The consent status will be updated as `CANC`.
        - If you get 202 as the response code, it indicates that the bank needs the authorization to cancel this payment. The consent status will be updated to `ACTC`.

Sample DELETE Request for a bulk payment cancellation without authorization is given below:

``` tab="Request"
curl -X DELETE 'https://localhost:8243/xs2a/v1/bulk-payments/sepa-credit-transfers/ecf7844a-6876-47c5-86e3-e41c005bd517' \
-H 'X-Request-ID: 94343777-125d-4d87-80d7-ab62c668514b' \
-H 'PSU-IP-Address: 127.0.0.1' \
-H 'TPP-Signature-Certificate: <SIGNATURE_CERTIFICATE>' \
-H 'PSU-ID: admin@wso2.com' \
-H 'Digest: SHA-256=RBNvo1WzZ4oRRq0W9+hknpT7T8If536DEMBg9hyq/4o=' \
-H 'Signature: keyId="SN=de730ec5733ead1b,CA=1.2.840.113549.1.9.1=#16116d616c7368616e694077736f322e636f6d,CN=OpenBanking Pre-Production Issuing CA,OU=OpenBanking,O=WSO2 (UK) LIMITED,L=COL,ST=WP,C=LK",algorithm="rsa-sha256", headers="digest x-request-id date psu-id",signature=pCFdkT3tzqow04u9CVZGHWfhSQEXdMFdwXTVzsQNPLBQ2BSbnNhe9sg62MTcxUP5IIL+GVZ0UKy/UPjRT0KnWT7DGEIL9XVIg1J64nFZDV03kPrKF9eyx14eX7FJGn2TSbO/5G7FB33019j45RmHusRB6g0iunpOaf7Bciy3YtDz5De4OuHDyRkAP4RICBBRLXraLA6pUmHVutqI/UBbvZGJgJ7klgvt0MBHUYtMOdKsPSuFjNX5lcimBVwkI/RkMIVcbNF5Wt90YnbwxI6LzpNtBKbLonvFNBFhsRgsiTEFfUjMz8jL2P0g2S7g2XHWo2Is7Nl8VXIVV8oWuCqxOw==' \
-H 'Date: Mon, 31 Oct 2022 12:25:56 GMT' \
-H 'Authorization: Bearer <APPLICATION_ACCESS_TOKEN>'
```

``` tab="Response"
Header: 'X-Request-ID: 94343777-125d-4d87-80d7-ab62c668514b' 
204 No Content
```

!!! note

     If the bank decides not to require an authorization to cancel the payment, the response will be a 204 response code with no response body. The payment cancellation flow will end from there and the payment will be cancelled.

Sample DELETE Request for a bulk payment cancellation with authorization is given below:

``` tab="Request"
curl -X DELETE 'https://localhost:8243/xs2a/v1/bulk-payments/sepa-credit-transfers/ecf7844a-6876-47c5-86e3-e41c005bd517' \
-H 'X-Request-ID: 94343777-125d-4d87-80d7-ab62c668514b' \
-H 'PSU-IP-Address: 127.0.0.1' \
-H 'TPP-Signature-Certificate: <SIGNATURE_CERTIFICATE>' \
-H 'PSU-ID: admin@wso2.com' \
-H 'Digest: SHA-256=RBNvo1WzZ4oRRq0W9+hknpT7T8If536DEMBg9hyq/4o=' \
-H 'Signature: keyId="SN=de730ec5733ead1b,CA=1.2.840.113549.1.9.1=#16116d616c7368616e694077736f322e636f6d,CN=OpenBanking Pre-Production Issuing CA,OU=OpenBanking,O=WSO2 (UK) LIMITED,L=COL,ST=WP,C=LK",algorithm="rsa-sha256", headers="digest x-request-id date psu-id",signature=pCFdkT3tzqow04u9CVZGHWfhSQEXdMFdwXTVzsQNPLBQ2BSbnNhe9sg62MTcxUP5IIL+GVZ0UKy/UPjRT0KnWT7DGEIL9XVIg1J64nFZDV03kPrKF9eyx14eX7FJGn2TSbO/5G7FB33019j45RmHusRB6g0iunpOaf7Bciy3YtDz5De4OuHDyRkAP4RICBBRLXraLA6pUmHVutqI/UBbvZGJgJ7klgvt0MBHUYtMOdKsPSuFjNX5lcimBVwkI/RkMIVcbNF5Wt90YnbwxI6LzpNtBKbLonvFNBFhsRgsiTEFfUjMz8jL2P0g2S7g2XHWo2Is7Nl8VXIVV8oWuCqxOw==' \
-H 'Date: Mon, 31 Oct 2022 12:25:56 GMT' \
-H 'Authorization: Bearer <APPLICATION_ACCESS_TOKEN>'
```

``` tab="Response"
200 OK
Header: 'X-Request-ID: 94343777-125d-4d87-80d7-ab62c668514b' 
{
   "transactionStatus": "ACTC",
   "chosenScaMethod": {
       "authenticationVersion": "1.0",
       "name": "SMS OTP on Mobile",
       "authenticationType": "SMS_OTP",
       "explanation": "SMS based one time password",
       "authenticationMethodId": "sms-otp"
   },
   "_links": {
       "self": {
           "href": "/v1/bulk-payments/sepa-credit-transfers/ecf7844a-6876-47c5-86e3-e41c005bd517"
       },
       "startAuthorisationWithPsuIdentification": {
           "href": "/v1/bulk-payments/sepa-credit-transfers/ecf7844a-6876-47c5-86e3-e41c005bd517/cancellation-authorisations"
       },
       "status": {
           "href": "/v1/bulk-payments/sepa-credit-transfers/ecf7844a-6876-47c5-86e3-e41c005bd517/status"
       }
   }
}
```

!!! note

     - If the bank requires an authorization to cancel the payment, the core banking backend will return a 202 response code and the body must comply with the specification.
     
     - The transactionStatus property must be `ACTC`.

If the bank returns `202` with the above payload for the `DELETE` request, the `POST /{payment-service}/{payment-product}/{paymentId}/cancellation-authorisations` request must be sent to create an authorization resource for the cancellation. This is indicated in the response of the `DELETE` request in the `startAuthorisationWithPsuIdentification` property. This request requires an application access token.

A sample POST cancellation authorisations request for bulk payments type is given below:

``` tab="Request"
curl -X POST 'https://localhost:8243/xs2a/v1/bulk-payments/sepa-credit-transfers/697a4c4b-b939-4a18-8bfa-eae30ea90804/cancellation-authorisations' \
-H 'Content-Type: application/json' \
-H 'PSU-IP-Address: 127.0.1.1' \
-H 'PSU-ID-Type: email' \
-H 'X-Request-ID: 2a7fb573-5a2d-49ba-bcdc-4b438930df1b' \
-H 'PSU-ID: admin@wso2.com' \
-H 'Digest: SHA-256=RBNvo1WzZ4oRRq0W9+hknpT7T8If536DEMBg9hyq/4o=' \
-H 'Signature: keyId="SN=de730ec5733ead1b,CA=1.2.840.113549.1.9.1=#16116d616c7368616e694077736f322e636f6d,CN=OpenBanking Pre-Production Issuing CA,OU=OpenBanking,O=WSO2 (UK) LIMITED,L=COL,ST=WP,C=LK",algorithm="rsa-sha256", headers="digest x-request-id date psu-id",signature=OAAiz/XR3B7cj6g7Esmet8LX/gqJ3Hi7di4IurF8mn8oe/fxtBFC/sy6H+BEpPhySbDdE4TGoIhKESrhcuDHOYGIHWC1bwxCvV1V9P1XWcZmobBLPY9BCoM7osmblKcEvettmU+jPAUTCzNKmOxJIQouDkjf63+r/celk3Q/U0SE+RHByr47Dn3Bf54Fpeue2akzFfltyflTJaNCJIRjKIQSumBX27miQyhBhUkX0Et4M4fHPTmMcLitx5z52RufYSqQAuAtvKXaiVbM87g9MYDEvXhusxYNTx0HNYxvPrmL4KZCJvpeY4GbFRCE8qq8UMFJp95SCkhGOoJrpjHRUA==' \
-H 'Date: Mon, 31 Oct 2022 12:58:37 GMT' \
-H 'TPP-Signature-Certificate: <SIGNATURE_CERTIFICATE>' \
-H 'Authorization: Bearer <APPLICATION_ACCESS_TOKEN>' \
--data-raw '{}'
```

``` tab="Response"
201 Created
Header: X-Request-ID:2a7fb573-5a2d-49ba-bcdc-4b438930df1b
ASPSP-SCA-Approach: REDIRECT
{
   "authorisationId": "df702657-b5be-4a6e-a8e4-5ce4db592b8e",
   "scaStatus": "received",
   "chosenScaMethod": {
       "authenticationVersion": "1.0",
       "name": "SMS OTP on Mobile",
       "authenticationType": "SMS_OTP",
       "explanation": "SMS based one time password",
       "authenticationMethodId": "sms-otp"
   },
   "_links": {
       "scaStatus": {
           "href": "/v1/bulk-payments/sepa-credit-transfers/697a4c4b-b939-4a18-8bfa-eae30ea90804/cancellation-authorisations/df702657-b5be-4a6e-a8e4-5ce4db592b8e"
       },
       "scaOAuth": {
           "href": "https://localhost:8243/.well-known/openid-configuration"
       }
   }
}
```

If the `POST cancellation-authorisations` request is successful, the TPP should send the authorization request as follows to inform the bank to cancel the payment. Then the bank displays a page similar to the consent page asking the PSU to approve or deny the cancellation authorization. 

```
https://localhost:9446/oauth2/authorize/?scope=pis:<payment_id>&response_type=code&redirect_uri=<redirect_uri>&state=55e9d72a-218c-44bb-824e-cf0d61c3fdb1&code_challenge_method=S256&client_id=<client_id>&code_challenge=re6uXq06M40gS82XcmUM6s9SQVTxtY5bLSYCNLuS1XE
```

Given below is a sample page for cancellation authorization for bulk payment type:

[ ![consent_page](../assets/img/try-out/payment-flow/cancellation-authorization-bulk-payment.png) ](../assets/img/try-out/payment-flow/cancellation-authorization-bulk-payment.png)

- If the PSU proceeds to the cancellation by selecting Confirm,
    - The payment cancellation will be submitted to the core banking back end
    - It will be cancelled by the bank.
- If the PSU selects Deny,
    - The cancellation flow will end without submitting the payment cancellation
    - The payment will not be cancelled.