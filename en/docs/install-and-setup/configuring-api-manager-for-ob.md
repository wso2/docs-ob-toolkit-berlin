WSO2 Open Banking Berlin Toolkit contains TOML-based configurations. All the server-level configurations of the 
API Manager instance can be applied using a single configuration file, which is the `deployment.toml` file. 

## Configuring deployment.toml

Follow the steps below to configure the `deployment.toml` file and set up the open banking flow for WSO2 API Manager.

1. Replace the `deployment.toml` file as explained in the 
[Setting up the servers](setting-up-servers.md#copying-the-deploymenttoml) section.
 
2. Open the `<APIM_HOME>/repository/conf/deployment.toml` file.

3. Set the hostname of the API Manager:

    ``` toml
    [server]
    hostname = "<APIM_HOST>" 
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
    
    ```toml tab='apim_db'
    [database.apim_db]
    url = "jdbc:mysql://localhost:3306/openbank_apimgtdb?autoReconnect=true&amp;useSSL=false"
    username = "root"
    password = "root"
    driver = "com.mysql.jdbc.Driver"
    ```
    
    ```toml tab='config'
    [database.config]
    url = "jdbc:mysql://localhost:3306/openbank_am_configdb?autoReconnect=true&amp;useSSL=false"
    username = "root"
    password = "root"
    driver = "com.mysql.jdbc.Driver"
    ```
    
    ```toml tab='WSO2UM_DB'
    [[datasource]]
    id="WSO2UM_DB"
    url = "jdbc:mysql://localhost:3306/openbank_userdb?autoReconnect=true&amp;useSSL=false"
    username = "root"
    password = "root"
    driver = "com.mysql.jdbc.Driver"
    ```

5. Update the following configurations with the hostname of the Identity Server.  
   
    ``` toml
    [apim.key_manager]
    service_url = "https://<IS_HOST>:9446${carbon.context}services/"
    ```
   
    ``` toml
    [apim.key_manager.configuration]
    ServerURL = "https://<IS_HOST>:9446${carbon.context}services/"
    ```

6. Update the hostname of the Identity Server in the following configuration:

    ``` toml
    [open_banking.gateway]
    consent.validation.endpoint="https://<IS_HOST>:9446/api/openbanking/consent/validate"
    ```

7. The `frequencyPerDay` value is sent in the consent initiation request body to indicate the requested maximum frequency 
   for access without PSU involvement per day. 

    - This enables request throttling according to the `frequencyPerDay` value provided in accounts initiation request.
    - For a request to be throttled, the TPP should initiate the request.

    a. To configure the custom throttling policy, enable the following configuration:

    ``` toml
    [open_banking_berlin.consent.freq_per_day]
    enable = true
    ```

    b. Deploy the throttling policy located in `<WSO2_OB_APIM_BERLIN_TOOLKIT_HOME>/repository/resources/frequencyPerDayPolicy` 
       as a custom throttling policy in the Admin Portal of WSO2 API Manager. 

    !!! note
            - Set the Throttle Key as follows:
            ```
            $customProperty.accountId:$customProperty.consentId:$userId:$customProperty.consumerKey
            ```
            - Set the Siddhi Query provided in the `<WSO2_OB_APIM_BERLIN_TOOLKIT_HOME>/repository/resources/frequencyPerDayPolicy` file.

            See [API Manager Documentation](https://apim.docs.wso2.com/en/4.0.0/design/rate-limiting/advanced-topics/custom-throttling/) for the instructions.

8. The supported signature algorithms and digest algorithms are used in `SignatureValidationExecutor` to perform signature verification and digest validation.

    - You can configure them using the following configurations.
    - You can configure any number of algorithms by separating them using a comma. 
    - By default, the following values are configured:

        ``` toml
        [open_banking_berlin.gateway.signature_verification]
        supported_hash_algorithms = ["SHA-256", "SHA-512"]
        supported_signature_algorithms = ["SHA256withRSA", "SHA512withRSA"]
        ```
    
9. By default, the following regex is used to validate the Organization ID:

    ```
    ^PSD[A-Z]{2}-[A-Z]{2,8}-[a-zA-Z0-9]*$
    ```
    
    You can override the above and use your own regex when validating the Organization ID of the TPP application. 
    Configure the required regex as follows:

    ```
    [open_banking.berlin.keymanager.org_id_validation]
    regex=”<CUSTOM_REGEX>”
    ```
    
    For more information, see [Customize Consumer Key Validation](../learn/tpp-onboarding-configuration.md)

## Starting servers

1. Go to the `<APIM_HOME>/bin` directory using a terminal.

2. Run the `wso2server.sh` script as follows:

    ``` bash
    ./api-manager.sh
    ``` 

## Configure Identity Server as Key Manager

 1. Sign in to the Admin Portal of API Manager at `https://<APIM_HOST>:9443/admin`.
 2. Go to **Key Manager** on the left main menu. ![add_Key_Manager](../assets/img/get-started/quick-start-guide/add_Key_Manager.png)
 3. Click **Add New Key Manager** and configure Key Manager. 
    
    ??? tip "Click here to see the full list of configurations..."
        | Configuration       | Description                           | Value                    |
        | -------------       |-------------                          | -----                    |
        | Name                | The name of the authorization server. | OBKM                     |
        | Display Name        | A name to display on the UI.          | OBKM                     |
        | Description         | The name of the authorization server. | (Optional)               |
        | Key Manager Type    | The type of the Key Manager to be selected. | Select `ObKeyManager` |
        |Well-known-url      | The well-known URL of the authorization server (Key Manager).|   `https://<IS_HOST>:9446/oauth2/token/.well-known/openid-configuration` |
        | Issuer              | The issuer that consumes or validates access tokens.         | `https://<IS_HOST>:9446/oauth2/token` |
        |**Key Manager Endpoints**                                                                |
        | Client Registration Endpoint | The endpoint that verifies the identity and obtain profile information of the end-user based on the authentication performed by an authorization server.  |  `https://<IS_HOST>:9446/keymanager-operations/dcr/register`| 
        | Introspection Endpoint | The endpoint that allows authorized protected resources to query the authorization server to determine the set of metadata for a given token that was presented to them by an OAuth Client. | `https://<IS_HOST>:9446/oauth2/introspect` |
        | Token Endpoint      | The endpoint that issues the access tokens. | `https://<IS_HOST>:9446/oauth2/token` |
        | Revoke Endpoint     | The endpoint that revokes the access tokens.| `https://<IS_HOST>:9446/oauth2/revoke` |
        | Userinfo Endpoint   | The endpoint that allows clients to verify the identity of the end-user based on the authentication performed by an authorization server, as well as to obtain basic profile information about the end-user. | `https://<IS_HOST>:9446/oauth2/userinfo?schema=openid` |
        | Authorize Endpoint  | The endpoint used to obtain an authorization grant from the resource owner via the user-agent redirection. | `https://<IS_HOST>:9446/oauth2/authorize` |
        | Scope Management Endpoint | The endpoint used to manage the scopes. | `https://<IS_HOST>:9446/api/identity/oauth2/v1.0/scopes` |
        | **Connector Configurations**                        |
        | Username            | The username of an admin user who is authorized to connect to the authorization server. |  |
        | Password            | The password corresponding to the latter mentioned admin user who is authorized to connect to the authorization server. | |
        | **Claim URIs**      |   
        | Consumer Key Claim URI | The claim URI for the consumer key.  | (Optional)  |
        | Scopes Claim URI | The claim URI for the scopes | (Optional) | 
        | Grant Types | The supported grant types. According to your open banking specification, add multiple grant types by adding a grant type press Enter. For example, `refresh_token`, `client_credentials`, `authorization_code`.| (Optional) |
        | **Certificates** | 
        | PEM | Either copy and paste the certificate in PEM format or upload the PEM file. | (Optional) |
        | JWKS | The JSON Web Key Set (JWKS) endpoint is a read-only endpoint. This URL returns the Identity Server's public key set in JSON web key set format. This contains the signing key(s) the Relying Party (RP) uses to validate signatures from the Identity Server. | `https://<IS_HOST>:9446/oauth2/jwks` |
        | **Advanced Configurations** |
        | Token Generation | This enables token generation via the authorization server. | (Mandatory) |
        | Out Of Band Provisioning | This enables the provisioning of Auth clients that have been created without the use of the Developer Portal, such as previously created Auth clients. | (Mandatory) |
        | Oauth App Creation | This enables the creation of Auth clients. | (Mandatory) |
        | **Token Validation Method** | The method used to validate the JWT signature. |
        | Self Validate JWT | The kid value is used to validate the JWT token signature. If the kid value is not present, `gateway_certificate_alias` will be used. | (Mandatory) |
        | Use introspect | The JWKS endpoint is used to validate the JWT token signature. | - |
        | Token Handling Options | This provides a way to validate the token for this particular authorization server. This is mandatory if the Token Validation Method is introspect.| (Optional) |
        | REFERENCE | The tokens that match a specific regular expression (regEx) are validated. e.g., <code>[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}</code> | (Optional) |
        | JWT | The tokens that match a specific JWT are validated. | Select this icon |
        | CUSTOM | The tokens that match a custom pattern are validated. | (Optional) |
        | **Claim Mappings** | Local and remote claim mapping. | (Optional) |
    

4. Go to the list of Key Managers and select **Resident Key Manager**. ![select_resident_KM](../assets/img/get-started/quick-start-guide/select_resident_KM.png)

5. Locate **Connector Configurations** and provide a username and a password for a user with super admin credentials.

6. Click **Update**.

7. Disable the Resident Key Manager. ![disable_resident_KM](../assets/img/get-started/quick-start-guide/disable_resident_KM.png)
