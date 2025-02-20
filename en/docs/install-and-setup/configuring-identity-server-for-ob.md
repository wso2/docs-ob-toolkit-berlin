NextGenPSD2 Reference Toolkit contains TOML-based configurations. All the server-level configurations of the Identity 
Server instance can be applied using a single configuration file, which is the `deployment.toml` file. 

## Configuring deployment.toml

Follow the steps below to configure the `deployment.toml` file and set up the open banking flow for WSO2 Identity Server.

1. Replace the `deployment.toml` file as explained in the 
[Setting up the servers](setting-up-servers.md#copying-the-deploymenttoml) section.
 
2. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

3. Set the hostname of the Identity Server:

    ``` toml
    [server]	
    hostname = "<IS_HOST>"	 
    ```
   
4. Update the datasource configurations with your database properties, such as the username, password, JDBC URL for the 
database server, and the JDBC driver. 

    - Given below are sample configurations for a MySQL database. For other DBMS types and more information, 
    see [Setting up databases](setting-up-databases.md).

    ```toml tab='shared_db'
    [database.shared_db]
    url = "jdbc:mysql://localhost:3306/openbank_govdb?autoReconnect=true&amp;useSSL=false"
    username = "root"
    password = "root"
    driver = "com.mysql.jdbc.Driver"
    ```
   
    ```toml tab='identity_db'
    [database.identity_db]
    url = "jdbc:mysql://localhost:3306/openbank_apimgtdb?autoReconnect=true&amp;useSSL=false"
    username = "root"
    password = "root"
    driver = "com.mysql.jdbc.Driver"
    ```
     
    ```toml tab='config'
    [database.config]
    url = "jdbc:mysql://localhost:3306/openbank_iskm_configdb?autoReconnect=true&amp;useSSL=false"
    username = "root"
    password = "root"
    driver = "com.mysql.jdbc.Driver"
    ```
    
    ```toml tab='user'
    [database.user]
    url = "jdbc:mysql://localhost:3306/openbank_userdb?autoReconnect=true&amp;useSSL=false"
    username = "root"
    password = "root"
    driver = "com.mysql.jdbc.Driver"
    ```
    
    ```toml tab='WSO2OB_DB'
    [[datasource]]
    id="WSO2OB_DB"
    url = "jdbc:mysql://localhost:3306/openbank_openbankingdb?autoReconnect=true&amp;useSSL=false"
    username = "root"
    password = "root"
    driver = "com.mysql.jdbc.Driver"
    ```

5. Configure the authentication endpoints with the hostname of the Identity Server.

    ``` toml
    [authentication.endpoints]	
    login_url = "https://<IS_HOST>:9446/authenticationendpoint/login.do"	
    retry_url = "https://<IS_HOST>:9446/authenticationendpoint/retry.do"
    ```
   
    ``` toml
    [oauth.endpoints]	
    oauth2_consent_page = "${carbon.protocol}://<IS_HOST>:${carbon.management.port}/ob/authenticationendpoint/oauth2_authz.do"	
    oidc_consent_page = "${carbon.protocol}://<IS_HOST>:${carbon.management.port}/ob/authenticationendpoint/oauth2_consent.do"
    ```
   
6. Configure the Notification Endpoint for the `token_revocation` event listener with the hostname of the API Manager.  

    ``` toml
    [[event_listener]]	
    id = "token_revocation"	
    ...
    [event_listener.properties]
    notification_endpoint = "https://<APIM_HOST>:9443/internal/data/v1/notify"	
    ```

7. Add and configure the following tags:
    - `signing_certificate_kid`: Configure the `kid` value for the signing certificate of the bank. The same value is 
    configured as the `kid` value of the ID Token.
    - `client_transport_cert_as_header_enabled`: To send the client certificate as a transport header, set this to `true`.

    ``` toml
    [open_banking.identity]
    signing_certificate_kid="123"
    client_transport_cert_as_header_enabled = true
    ```

8. Configure the event publisher URL for adaptive authentication with the hostname of the Identity Server.

    ``` toml
    [authentication.adaptive.event_publisher]	
    url = "http://<IS_HOST>:8006/"
    ```

9. Update access control configurations for the `consentmgr` resource as follows: 

    ``` toml
    [[resource.access_control]]
    context = "(.*)/consentmgr(.*)"
    secure="false"
    http_method="GET,DELETE"
    ```
   
10. Configure the endpoints to retrieve sharable and payable accounts. This is required when displaying the accounts on 
the consent page.

    ``` toml
    [open_banking_berlin.consent]
    payable_account_retrieval_endpoint = "https://<APIM_HOST>:9443/api/openbanking/berlin/backend/services/v130/accounts/payable"
    shareable_account_retrieval_endpoint = "https://<APIM_HOST>:9443/api/openbanking/berlin/backend/services/v130/accounts/shareable"
    ```

11. An account reference is used to address specific accounts. It is a combination of an account identifier and optionally
    a currency. The NextGenPSD2 Reference Toolkit supports IBAN, BBAN and Masked PAN account identifier types. You 
    can configure them using the following tag:

    ``` toml
    [open_banking_berlin.consent]
    supported_acc_ref_types = ["iban", "bban", "maskedPan"]
    ```


12. Configure the code challenge method used in the solution using the following tag:

    ``` toml
    [open_banking_berlin.consent]
    supported_challenge_methods = ["S256"]
    ```
 
13. Enable Request-URI validation that validates `AccountID` in the request against the `AccountID` in consent during
    account retrieval. By default, this is disabled and the configuration is set to `false`.

    ``` toml
    [open_banking_berlin.consent.accounts]
    single_acc_no_retrieval_validation.enable = false
    ```

14. Configure the following tags regarding Account consents:

    - `single_acc_no_retrieval_validation.enable`: If enabled, the permission validation will be performed against the 
       account ID by NextGenPSD2 Reference Toolkit. If disabled, the permission validation happens against the 
       consent ID by NextGenPSD2 Reference Toolkit. Also, when disabled, the account ID validation should be 
       performed by the bank backend.
    - `freq_per_day`: Configure minimum frequency per day for recurring consents. For more details, see 
        [Types of consents](../try-out/account-information-service-flow.md#types-of-consents).
    - `valid_until_date_cap.enable`: To enable the feature that provides the accounts consents a fixed amount of days 
       after which the consents will expire.
    - `valid_until_date_cap.value`: To define the number of days all account consent will be valid until. This is only 
       applicable if `valid_until_date_cap.enable` is set `true`.
    - `multiple_recurring_consent.enable `: To enable multiple recurring consents.

    ``` toml
    [open_banking_berlin.consent.accounts]
    single_acc_no_retrieval_validation.enable = true
    freq_per_day.value = 4
    valid_until_date_cap.enable = false
    valid_until_date_cap.value = 0
    multiple_recurring_consent.enable = false
    ```


16. Configure the following tags regarding Payment consents:

    - `auth_cancellation.enable`: To enable authorisation for payment cancellation, set this flag to `true`.
    - `bulk_payments.max_future_payment_days`: To define the maximum number of payment execution days allowed by the
      ASPSP. The bulk payments request payload contains the `requested execution date`, which is an optional element and
      the configuration checks whether the mentioned `requested execution date` is within the allowed period.
    - `debtor_acc_currency_validation.enable`: To perform a currency validation for the debtor account during the 
       authorization process, set this flag to `true`. By default, this value is `true`. 
        - If the debtor account retrieved from the payable accounts endpoint doesn't match the currency of the 
          debtor account in the consent initiation request payload, the payment will be rejected. 
        - If the value is `false`, validation is not performed, and the debtor account in the consent 
          initiation request will be used as the debtor account.
        
            !!! note
                When the bank can decide to deduct the amount of the payment from a sub-account of a different currency 
                type when the original debtor account does not have enough balance or there is no account from 
                the originally requested currency type in the bank backend, set `debtor_acc_currency_validation.enable` 
                to `false`

    ``` toml
    [open_banking_berlin.consent.payments]
    auth_cancellation.enable = true
    bulk_payments.max_future_payment_days = "10"
    debtor_acc_currency_validation.enable = true
    ```

17. Configure the Well Known endpoint of the Identity Server by replacing the `<APIM_HOST>` placeholder with the hostname
    of the API Manager.

     ``` toml
     [open_banking_berlin.consent.sca]
     oauth_metadata_endpoint = "https://<APIM_HOST>:8243/.well-known/openid-configuration"
     ```

18. Configure the base URL for payment submission as follows:

    By default, the base URL for the payment mock backend of the WSO2 Open Banking API Manager is configured.

     ``` toml
     [open_banking_berlin.consent.payments]
     backend_url = "https://<APIM_HOST>:9443/api/openbanking/berlin/backend/services/payments"
     ```

     The payment submission request is sent with the suffix `submit` with the payment ID appended to the above base URL.

     ```xml
     https://<APIM_HOST>:9443/api/openbanking/berlin/backend/services/payments/submit/{paymentId}
     ```

     The payment cancellation submission request is sent with the suffix `cancel` with the payment ID appended to the above base URL.

     ```xml
     https://<APIM_HOST>:9443/api/openbanking/berlin/backend/services/payments/cancel/{paymentId}
     ```

    !!! note
        - The above-mentioned suffixes `submit` and `cancel` can be used to identify whether the coming request is a payment submission or a payment cancellation submission.
        - The `paymentId` parameter can be used to identify the particular payment resource.

19. Configure the consent persist steps after the `BerlinAccountListRetrievalStep` and before the `BerlinConsentPersistStep`. Set the priorities as needed.

    Configure the consent persist step to submit the payment to the bank back end as follows:
    
    ```toml
    [[open_banking.consent.authorize_steps.persist]]
    class = "com.wso2.openbanking.berlin.consent.extensions.authorize.impl.persist.PaymentSubmissionBankingIntegrationStep"
    priority = 1
    ```
    
    Configure the consent persist step to submit the payment cancellation to the bank back end as follows:
    
    ```toml
    [[open_banking.consent.authorize_steps.persist]]
    class = "com.wso2.openbanking.berlin.consent.extensions.authorize.impl.persist.PaymentCancellationBankingIntegrationStep"
    priority = 2
    ```

    !!! note
         - For a successful payment submission or payment cancellation, `PaymentSubmissionBankingIntegrationStep` and `PaymentCancellationBankingIntegrationStep` require a **202 Accepted** response code from the bank.
         - The Consent ID (`paymentId`) of the payment consent will be used to address a particular payment. The bank needs to implement a mapping mechanism to map the consent ID (`paymentId`) to the ID of the payment that persists in the bank back end.

20. To enable idempotency support for the consent APIs:
    
        ```toml
        [open_banking.consent.idempotency]
        enabled=true
        allowed_time_duration=1440
        ```


## Starting servers

1. Go to the `<IS_HOME>/bin` directory using a terminal.

2. Run the `wso2server.sh` script as follows:

    ``` bash
    ./wso2server.sh
    ``` 
    