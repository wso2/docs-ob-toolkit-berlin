#Integration With Core Banking System

WSO2 Open Banking can be easily integrated into your current banking system.

By default, WSO2 Open Banking Toolkit contains a mock back end that acts as the bank's back-end server. In a production
environment, you need to set up and configure the solution with your banking system. This documentation explains the
integration points and APIs that your banking system needs to provide.

## Bank back end integration

### Account-Request-Information header

WSO2 Open Banking manages the initiation and authorisation of a consent. When a TPP application
requests to retrieve any account information, the toolkit validates the consent against the request. Upon successful
validation, consent-related information is directed to the core banking system in the form of a header. This header is
known as **Account-Request-Information**.

The Account-Request-Information header is a signed JWT, which needs to be decoded by the core banking system.

??? tip "Click here to see the fields in the header..."
    | Field | Description |
    |-------|-------------|
    | clientId | The unique ID of the TPP application |
    | currentStatus | The current status of the consent |
    | createdTimestamp| The date and time when the consent was created |
    | recurringIndicator | Specifies if this is a recurring transaction |
    | authorizationResources | Contains details regarding the consent authorisation |
    | updatedTimestamp | The last date and time the consent was updated |
    | validityPeriod | The validity period of the consent in seconds |
    | consentAttributes| Additional attributes related to the consent |
    | consentId | The unique ID of the consent that is being authorised |
    | consentMappingResources | The details of the accounts that the consent is bound to
    | consentType | The type of the consent. For example, accounts, payments |
    | receipt | Details of the consent, such as expiration time, permissions |
    | consentFrequency | The maximum number of times per day that access can be granted without the involvement of a consumer |

The core banking system will perform all required validations and build a response. This response needs to adhere to the
requirements of the open banking specification.

## Accounts API

A Swagger definition for the back end is available in the following location:

```<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/berlin.group.org/PSD2API_1.3.6/psd2-api_1.3.6_20200327.yaml```

## Account Information Retrieval

In WSO2 Open Banking, integration of accounts flow with the core banking system is used during account information
retrieval requests.

- The URL of the API endpoints of the core banking system, which corresponds to the account's information retrieval
  requests, should be configured in the In sequences of the Accounts API. For more information, see [Configuring Sequence files](#configuring-sequence-files).

In the Open Banking Accounts flow, WSO2 Open Banking manages the consent initiation and authorisation. When the TPP
makes account information retrieval requests, the WSO2 Open Banking toolkit validates the consent request, and upon
successful validation, the consent-related information is directed to the core banking system in the form of a header.
This header is known as **Account-Request-Information**.

This header is a signed JWT, which needs to be decoded by the core banking system. A sample decoded JSON is given below:

``` json
{
   "clientId":"PSDGB-OB-Unknown0015800001HQQrZAAX",
   "currentStatus":"valid",
   "createdTimestamp":1650891510,
   "recurringIndicator":true,
   "authorizationResources":[
      {
         "updatedTime":1650891558,
         "consentId":"8896dc1f-65b8-4574-be15-8ef294d8d15d",
         "authorizationId":"0439e04e-778c-4ea2-b44c-96f71cf1c6fb",
         "authorizationType":"authorisation",
         "userId":"admin@wso2.com",
         "authorizationStatus":"psuAuthenticated"
      }
   ],
   "updatedTimestamp":1650891558,
   "validityPeriod":1650844800,
   "consentAttributes":{
      "SCA-Method:0439e04e-778c-4ea2-b44c-96f71cf1c6fb":"sms-otp",
      "ExpirationDateTime":"1650844800",
      "SCA-Approach:0439e04e-778c-4ea2-b44c-96f71cf1c6fb":"REDIRECT",
      "Permission":"dedicatedAccounts"
   },
   "consentId":"8896dc1f-65b8-4574-be15-8ef294d8d15d",
   "consentMappingResources":[
      {
         "mappingId":"30fb7df5-ced0-4fe6-afda-4376b263ee0d",
         "mappingStatus":"active",
         "accountId":"iban:DE98765432109876543210",
         "authorizationId":"0439e04e-778c-4ea2-b44c-96f71cf1c6fb",
         "permission":"accounts"
      },
      {
         "mappingId":"88aacd5d-7264-4650-970a-000f0d05e1c9",
         "mappingStatus":"active",
         "accountId":"iban:DE98765432109876543210",
         "authorizationId":"0439e04e-778c-4ea2-b44c-96f71cf1c6fb",
         "permission":"transactions"
      },
      {
         "mappingId":"a2323dcb-79a7-4848-a959-97376b28b695",
         "mappingStatus":"active",
         "accountId":"iban:DE98765432109876543210",
         "authorizationId":"0439e04e-778c-4ea2-b44c-96f71cf1c6fb",
         "permission":"balances"
      }
   ],
   "additionalConsentInfo":{
      "X-Request-ID":"911a40f5-62f0-4b73-aec0-a60ab842a66d"
   },
   "consentType":"accounts",
   "receipt":{
      "access":{
         "balances":[
            {
               "iban":"DE98765432109876543210"
            }
         ],
         "accounts":[
            {
               "iban":"DE98765432109876543210"
            }
         ],
         "transactions":[
            {
               "iban":"DE98765432109876543210"
            }
         ]
      },
      "combinedServiceIndicator":false,
      "validUntil":"2022-04-25",
      "recurringIndicator":true,
      "frequencyPerDay":4
   },
   "consentFrequency":4
}
```

### Card-account Requests

The banks need to follow these points for card-account requests:

- Banks should perform all card-account request account ID (Masked PAN and PAN) validations and user validations 
  of the account ID.
- For card-account requests, only a permission level validation will be performed against the consent ID from the 
  WSO2 Open Banking solution. The banks should return the proper response or the error according to the 
  NextGenPSD2 specification.

  - **When the account ID is a Primary Account Number (PAN):**
       - The bank should decide and implement the tokenization and validation method as a custom implementation. 
       - The bank has to configure the TOML file with PAN in the list of supported account identifiers 
         configuration as it is not configured by default.
       - The bank has to write a custom **retrieval step** to validate the tokenized PAN sent with the consent 
         against their back end during the authorisation process. Upon successful validation, it is displayed on
         the consent page. This step also needs to include proper error handling. The validated PAN should be correctly 
         positioned in the `JSONObject`. The step must be configured after `BerlinAccountListRetrievalStep` and 
         must modify the JSON object passed to it through the execute method.

    !!! note 
        - For Accounts consents:
            - In the JSON object, the position `accountData.accountDetailsList[].accountRefObjects[]` must 
              be replaced with the validated PAN account references.
         
        - For Payments and CoF consents:
            - In the JSON object, the position `accountData.accountRefObjects[]` must be replaced with the 
              validated PAN account references.
            - Modify the `consentData.consentDetails[].data` path of the JSON object with the 
              validated PAN account reference to reflect the validated PAN account reference on the consent page.
  
        - For all consent types (Accounts, Payments, CoF):
            - For the authorisation flow to function properly, the details in the `accountData` object of 
              the JSON object must be reflected in the metadata map of `ConsentData`.


     - The bank should use the same tokenization implementation to validate the account ID during the submission request.

  - **Account Consent validation process during submission:**

    - Validate against the consent ID:
        - If the retrieval request is of type `card-accounts`, the validation will 
          always happen against the consent ID since the account ID validation is passed to the bank as 
          mentioned above. 
        - If the request is not of type `card-accounts`, the validation will be based on the account ID 
          validation configuration in `<IS_HOME>/repository/conf/deployment.toml`.
     
             ``` toml
             [open_banking_berlin.consent.accounts]
             single_acc_no_retrieval_validation.enable = true
             ```
      
        - It is recommended to set this configuration to `false` if a resource ID is used as the account reference. 
          In this case, the bank needs to do the account ID validation
   
    - Validate against the account ID:
        - If the above configuration is `true`, the account ID will be validated for its permissions against the initiated 
          consent. If the permissions are not valid, an error is returned.
        - If the above configuration is `false`, the consent ID will be validated against the permissions provided during 
          the consent initiation. If the permissions are not valid, an error is returned.

## Payments API

A Swagger definition for the back end is available in the following location:

```<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/berlin.group.org/PSD2API_1.3.6/psd2-api_1.3.6_20200327.yaml```

- The URL of the API endpoints of the core banking system, which corresponds to the payment initiation requests, should
  be configured in the In sequences of the Payments API. For more information, see [Configuring Sequence files](#configuring-sequence-files).

### Payments Submission

In the Open Banking payments flow, the NextGenPSD2 Reference Toolkit manages the consent initiation and
authorisation. The integration of the payments flow with the core banking system is used during the payment authorisation flow.


#### Single Authorisation

After the consent is authorised, the bank should handle the payment submission request since the 
NextGenPSD2 specification does not specify such requests.

#### Multiple- Authorisation

An account can have one or more owners. When there are multiple owners, each owner has to authorise the
account (multiple-authorisation) while if it is a single owner it requires single-authorisation. Let's look at a multiple
authorisation scenario in the Payments API:

 1. The consent initiation must be an [explicit initiation](../try-out/payment-initiation-service-flow.md#explicit-authorisation-flow). 
 2. Each owner should perform [start authorisation](../try-out/payment-initiation-service-flow.md#:~:text=TPP%20uses%20the-,startAuthorisation,-link%20to%20create) requests to create their own authorisation resources. 
 3. Each owner should perform the authorisation of the consent.
 4. Upon consent approval of all owners, the consent status changes to `ACCP`.
 
#### Debtor Account Currency Validation

During the authorisation process, you can perform a currency validation for the debtor account.

If the payment is made from a sub-account when there is not enough balance in the original debtor account:

- The bank should implement a [custom authorisation retrieval step](https://ob.docs.wso2.com/en/latest/develop/consent-management-authorize/#retrieve) 
  to check for other sub-accounts for the required balances to make the payment.
- If the payment is made from a different debtor account and not the one provided with the consent, the bank should 
  [customise the UI](https://ob.docs.wso2.com/en/latest/develop/customize-consent-page/) 
  to display the account from which the payment amount was deducted.
- The bank needs to implement a [custom authorisation persist step](https://ob.docs.wso2.com/en/latest/develop/consent-management-authorize/#persist)
  to amend the original consent with the account reference that was used to deduct the payment amount.

### Funds Confirmation

In WSO2 Open Banking, integration of the Confirmation of Funds (CoF) consent flow with the core banking system is used 
during funds confirmation requests. A Swagger definition for the back end is available in the following location:

```<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/berlin.group.org/ConfirmationOfFunds/psd2-confirmation-of-funds-consent 2.0 20190607.yaml```

In the Open Banking payments flow, the WSO2 Open Banking toolkit manages the consent initiation and authorisation.
When the TPP makes a funds confirmation request for domestic payments, international payments, and international-scheduled
payments; it is validated. Upon successful validation, the request is directed to the core banking system. The
funds-confirmation-related information is directed to the core banking system in the form of a
header known as **Account-Request-Information**.

This header is a signed JWT, which needs to be decoded by the core banking system. A sample decoded JSON is given below:

``` json
{
   "clientId":"PSDGB-OB-Unknown0015800001HQQrZAAX",
   "currentStatus":"valid",
   "createdTimestamp":1650891954,
   "recurringIndicator":false,
   "authorizationResources":[
      {
         "updatedTime":1650891971,
         "consentId":"6a99c115-2092-4096-89f4-50feb31a2ea6",
         "authorizationId":"7bd87890-9dc1-4268-b728-28f50914dd26",
         "authorizationType":"authorisation",
         "userId":"admin@wso2.com",
         "authorizationStatus":"psuAuthenticated"
      }
   ],
   "updatedTimestamp":1650891971,
   "validityPeriod":0,
   "consentAttributes":{
      "SCA-Approach:7bd87890-9dc1-4268-b728-28f50914dd26":"REDIRECT",
      "SCA-Method:7bd87890-9dc1-4268-b728-28f50914dd26":"sms-otp"
   },
   "consentId":"6a99c115-2092-4096-89f4-50feb31a2ea6",
   "consentMappingResources":[
      {
         "mappingId":"e604cd19-a8c5-4a10-b007-4dcc25efe795",
         "mappingStatus":"active",
         "accountId":"iban:DE98765432109876543210",
         "authorizationId":"7bd87890-9dc1-4268-b728-28f50914dd26",
         "permission":"n/a"
      }
   ],
   "additionalConsentInfo":{
      "X-Request-ID":"216e24cf-e09a-440f-a3ec-c0efe82eb8d9",
      "payload":{
         "instructedAmount":{
            "amount":"123",
            "currency":"EUR"
         },
         "cardNumber":"12345678901234",
         "account":{
            "iban":"DE98765432109876543210"
         }
      }
   },
   "consentType":"funds-confirmations",
   "receipt":{
      "registrationInformation":"Your contract Number 1234 with MyMerchant is completed with the registration with your bank.",
      "cardInformation":"My Merchant Loyalty Card",
      "account":{
         "iban":"DE98765432109876543210"
      },
      "cardNumber":"1234567891234",
      "cardExpiryDate":"2025-12-31"
   },
   "consentFrequency":0
}
```

In the core banking system, the required validations should be performed and then the response will be built according 
to the requirements of the Open Banking Confirmation of Funds specification.

## Configuring sequence files

WSO2 Open Banking API Manager contains a mock bank back end, which is configured in the In sequences by default.
Therefore, in order to integrate the toolkit with the banking system the In sequence files for Accounts, Payment, and
CoF must be updated individually.

- They are available in the `<APIM_HOME>/repository/resources/finance/apis/berlin.group.org/<API_NAME>` directory.
- Replace the `<WSO2_OB_KM_HOST>` placeholder with the hostname of the Identity Server.
- Replace the `<WSO2_OB_APIM_HOST>` placeholder with the hostname of the API Manager.
- Replace the following in the sequence file with the core banking system’s API endpoints for production/sandbox environments:
    - For Accounts (card-accounts) and Payments:
        1. Open the `<APIM_TOOLKIT_HOME>/repository/resources/apis/berlin.group.org/PSD2API_1.3.6/dynamic-endpoint-insequence-1.3.6` file.
        2. Replace the `https://<APIM_HOST>:9443/api/openbanking/berlin/backend/services/accounts` URL.
    - For CoF submission request:
        1. Open the `<APIM_TOOLKIT_HOME>/repository/resources/apis/berlin.group.org/ConfirmationOfFunds/cof-consents-dynamic-endpoint-sequence-1.3.6` file.
        2. Replace the `https://<APIM_HOST>:9443/api/openbanking/berlin/backend/services/funds-confirmations` URL.


## Accounts Retrieval Endpoints

In some banks, some PSUs may have a certain number of accounts, but not all accounts have the ability to be shared
externally or to make a payment online. Therefore, in a bank, the shareable account list and the payable account list can
either be the same or different.

In the default NextGenPSD2 Reference Toolkit, at least two APIs are expected to return shareable and payable accounts.
When passing the `user_id` a JSON response must be returned. Then it automatically loads the accounts list on the consent page.

### Payable Accounts API

The back-end endpoint for the Payable Accounts API is used to retrieve the payable accounts of the user during the
authentication flow. This API validates whether the debtor account provided in the Payment/CoF consent is available in 
the bank backend. When invoking this API, the `consentId` and `userId` (PSU ID) must be sent in the URL as query parameters.

The back end endpoints for payable and sharable accounts retrieval can be configured in the
`<IS_HOME>/repository/conf/deployment.toml` file as follows.
By default, the mock back end that is deployed in the API Manager is configured in this file.

``` toml
[open_banking_berlin.consent]
payable_account_retrieval_endpoint = "https://<APIM_HOST>:9443/api/openbanking/berlin/backend/services/v130/accounts/payable”
```

Required parameters can be passed as query parameters to those endpoints. Given below is an example of configuring the
endpoint to retrieve payable accounts:

``` toml
[open_banking_berlin.consent]
payable_account_retrieval_endpoint = "https://<APIM_HOST>:9443/api/openbanking/berlin/backend/services/v130/accounts/payable/{user}”
```

The response from the API should be formatted as follows:

``` json
{
   "customerIdentification":{
      "customerIdentification":"JEAN123",
      "userIdentification":"user"
   },
   "accounts":[
      {
         "iban":"DE12345678901234567890",
         "isDefault":true,
         "currency":"USD"
      },
      {
         "bban":"BARC12345612345678",
         "isDefault":true,
         "currency":"USD"
      },
      {
         "pan":"5409050000000000",
         "isDefault":true,
         "currency":"USD"
      },
      {
         "maskedPan":"123456xxxxxx1234",
         "isDefault":true,
         "currency":"USD"
      }
   ]
}
```

### Shareable Accounts API

The Shareable Accounts API is used in the AISP flow to retrieve the account IDs from the bank during authorization.
The account IDs are then displayed on the consent page.

- In a bank offered consent scenario, the Shareable Accounts API retrieves all available accounts for the user and 
displays them on the consent page for the user to select accounts.
- In a scenario where account IDs are already provided in the consent, the Shareable Accounts API checks whether the 
accounts in the consent are available in the bank backend.

When invoking this API, the `consentId` and `userId` (PSU ID) parameters are required to be sent in the URL as query
parameters.

The back-end endpoint for shareable accounts retrieval can be configured in
the ` <APIM_HOME>/repository/conf/deployment.toml` file as follows.
By default, this is connected to the mock back end in the API Manager server.

``` json
[open_banking_berlin.consent]
shareable_account_retrieval_endpoint = "https://<APIM_HOST>:9443/api/openbanking/berlin/backend/services/v130/accounts/shareable"
```

Required parameters can be passed as query parameters to those endpoints. Given below is an example of configuring the
endpoint to retrieve sharable accounts:

``` xml
[open_banking_berlin.consent]
shareable_account_retrieval_endpoint = "https://<APIM_HOST>:9443/api/openbanking/berlin/backend/services/v130/accounts/shareable/{user}"
```

The response from the API should be formatted as follows:

``` json
{
   "customerIdentification":{
      "customerIdentification":"JEAN123",
      "userIdentification":"user"
   },
   "accounts":[
      {
         "iban":"DE12345678901234567890",
         "isDefault":true,
         "currency":"USD"
      },
      {
         "bban":"BARC12345612345678",
         "isDefault":true,
         "currency":"USD"
      },
      {
         "pan":"5409050000000000",
         "isDefault":true,
         "currency":"USD"
      },
      {
         "maskedPan":"123456xxxxxx1234",
         "isDefault":true,
         "currency":"USD"
      }
   ]
}
```

## X-Request-ID

In accounts, payments and funds confirmation services, the X-Request-ID is used as an identifier to verify a replication of an action. The X-Request-ID header is used for the following types of endpoints:

- Account/Payment/Funds Confirmation consent endpoints
- Account/Payment/Funds Confirmation retrieval endpoints

Idempotency validation for consent requests are handled by the WSO2 Open Banking solution.

Idempotency validation for retrieval requests should be handled in the core banking system. The required validations should be performed and then the response should be built according to the NextGenPSD2 specification.