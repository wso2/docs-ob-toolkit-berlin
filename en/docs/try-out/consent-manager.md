After a certain period, bank customers/PSUs may need to view, update, or revoke consents they have granted to TPP 
applications to access account data. **Consent Manager** is an application in WSO2 Open Banking that supports all these
requirements and manages consents.

!!! note
    - Bank officers with the `CustomerCareOfficerRole` role and bank customers can access the Consent Manager.  
    - Customer Care Officers have privileges such as Advanced Search options and the ability to view the consents of all bank customers. 
    
## Configuring servers

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file and update access control configurations for the 
`consentmgr` resource as follows: 

    ``` toml
    [[resource.access_control]]
    context = "(.*)/consentmgr(.*)"
    secure="false"
    http_method="GET,DELETE"
    ```
   
2. Open the `<APIM_HOME>/repository/conf/deployment.toml` file and add the following gateway executor configurations for 
the Consent flow:
   
    ``` toml
    [[open_banking.gateway.openbanking_gateway_executors.type]]
    name = "Consent"
    [[open_banking.gateway.openbanking_gateway_executors.type.executors]]
    name = "com.wso2.openbanking.accelerator.gateway.executor.impl.selfcare.portal.UserPermissionValidationExecutor"
    priority = 1
    ``` 
   
3. Restart the Identity Server and API Manager servers respectively.

## Creating users and roles

Follow [Configuring users and roles](../install-and-setup/configuring-users-and-roles.md) and do the following:

 1. Create a user and assign the `CustomerCareOfficerRole` role.
    
 2. Create 2 other users and assign them only the `Internal/subscriber` role. 

## Publishing Self-Care Portal API 

1. Sign in to the API Publisher Portal at `https://<APIM_HOST>:9443/publisher` with `creator/publisher` privileges. 

2. On the homepage, go to **REST API** and select **Import Open API**. ![import_API](../assets/img/get-started/quick-start-guide/lets-get-started.png)

3. Select **OpenAPI File/Archive**.

4. Download the `scp-swagger.yaml` file available <a href="../../assets/attachments/scp-swagger.yaml" download> here</a>.

5. Click **Browse File to Upload** and use the `scp-swagger.yaml` file.

6. Click **Next**. 

7. Set the value for **Endpoint** as follows:

    ``` 
    https://<IS_HOST>:9446/api/openbanking/consent
    ```
   
    - Replace the placeholder with the hostname of Identity Server. 
    
8. Click **Create**. 
    
9. Go to **Develop -> API Configurations -> Policies** in the left menu pane to add a custom policy. ![select_policies](../assets/img/get-started/quick-start-guide/select-policies.png)
   
10. On the **Policy List** card, click on **Add New Policy**.

11. Fill in the **Create New Policy**.

12. Download the `scp-insequence.xml` file available <a href="../../assets/attachments/scp-insequence.xml" download> here </a> and use it as the Mediation Policy. 

13. Upload the `scp-insequence.xml` file and click **SELECT**.

14. Scroll down and click **Save**. Upon successful creation of the policy, you receive an alert as shown below: <br><br>
   <div style="width:35%">
   ![successful](../assets/img/get-started/quick-start-guide/successful.png)
   </div>

15. Expand the API endpoint you want from the list of API endpoints.

16. Expand the HTTP method from the API endpoint you selected. 

17. Drag and drop the previously created policy to the **Request Flow** of the API endpoint. For example, ![request_flow](../assets/img/get-started/quick-start-guide/request-flow.png)

18. Select **Apply to all resources** and click **Save**.

19. Scroll down and click **Save**.

20. Go to **Overview** using the left menu pane.

21. Click **Deploy**. 

22. Set the API Gateways configurations and deploy the API.

23. Go back to **Overview**.

24. Click **Publish**.

## Subscribing to Self-Care Portal API

1. Sign in to the Developer Portal at `https://<APIM_HOST>:9443/devportal` with `Internal/subscriber` privileges.

2. Go to the **Applications** tab and click **ADD NEW APPLICATION**. ![create_new_application](../assets/img/try-out/consent-manager/create-new-application.png)

3. Enter `consentmgr` as the name of the application and click **Save**.  ![consent_manager_application](../assets/img/try-out/consent-manager/consent-application.png)

4. Go to the left menu pane and select **Production Keys** or **Sandbox Keys** to generate keys.

5. Set the **Grant Types** to **Refresh Token** and **Code**.

    [ ![](../assets/img/try-out/consent-manager/generate-keys.png) ](../assets/img/try-out/consent-manager/generate-keys.png)
    
    ??? tip "If these grant types are not visible in the Developer Portal, click here to see how to configure them. "
        Follow the steps below and configure the Grant Types for the Key Manager according to your Open Banking specification:
        
        1. Sign in to the Admin Portal of API Manager at `https://<APIM_HOST>:9443/admin`.
        
        2. Go to the `Key Managers` tab using the left menu pane.
        
        3. Select the **OBKM** key manager. ![obkm_keymanager](../assets/img/try-out/consent-manager/keymanager-obkm.png)
        
        4. Enter the required grant types and press enter. ![configure_grant_types](../assets/img/try-out/consent-manager/grant-types.png)
        
        5. Scroll down and click **Update**.
        
        For more information see, [Configure Identity Server as the Key Manager](../dynamic-client-registration-try-out/#step-2-configure-is-as-key-manager).
    
6. Set the **Callback URL** to `https://<IS_HOST>:9446/consentmgr/scp_oauth2_callback`.

    - Replace the placeholder with the hostname of the Identity Server.

7. Leave their default values for other configurations.

8. Scroll down and click **GENERATE KEYS**.

9. A message box will display the access token. 

10. You can see that the consumer key and consumer secret are generated for the `consentmgr` application.  

11. Now, go to the left menu pane and select **Subscriptions**.

12. Click **SUBSCRIBE APIS**. ![subscribe_to_apis](../assets/img/try-out/consent-manager/subscribe-to-consent-api.png)

13. Find the **SelfCarePortalAPI** from the list and click the **Subscribe** button corresponding to it.

14. If you are using **WSO2 Identity Server 6.0.0**, follow the below instructions:

    1. Sign in to the Management Console at `https://<IS_HOST>:9446/carbon/`.
    
    2. In the **Main** tab, click **Identity -> Service Providers -> List**.
    
    3. Select the Service Provider of the `consentmgr` application, and click the corresponding **Edit** icon.
    
    4. Expand the **Claim Configuration** section.
    
    5. Select **http://wso2.org/claims/username** from the **Subject Claim URI** list.
    
    6. Click **Update** to save the configurations.
    
## Configuring Consent Manager

1. Open the `<IS_HOME>/repository/deployment/server/webapps/consentmgr/runtime-config.js` file.

    - Update the `SERVER_URL` parameter with a URL to the Identity Server. For example:
    
        ``` javascript
        window.env = {
            // This option can be retrieved in "src/index.js" with "window.env.API_URL".
            SERVER_URL: 'https://<IS_HOST>:9446',
            TENANT_DOMAIN: 'carbon.super',
            NUMBER_OF_CONSENTS: 25,
            VERSION: '3.0.0'
          };
        ```
      
2. Open the `<IS_HOME>/repository/deployment/server/webapps/consentmgr/WEB-INF/web.xml` file.

    | Configuration | Description |
    | ----------| ------------|
    | identityServerBaseUrl | The hostname of the Identity Server. |
    | apiManagerServerUrl | The hostname of the API Manager. |
    | scpClientKey | The Consumer Key of the [application created](#subscribing-to-self-care-portal-api). |
    | scpClientSecret | The Consumer Secret of the [application created](#subscribing-to-self-care-portal-api). |
    
    For example, 
    
    ``` xml
    <context-param>
    	<param-name>identityServerBaseUrl</param-name>
    	<param-value>https://<IS_HOST>:9446</param-value>
    </context-param>
    <context-param>
    	<param-name>apiManagerServerUrl</param-name>
    	<param-value>https://<APIM_HOST>:8243</param-value>
    </context-param>
    <context-param>
    	<param-name>scpClientKey</param-name>
    	<param-value>2zB5s9wGHWVwmlrvHdWa6Mwc4vsa</param-value>
    </context-param>
    <context-param>
    	<param-name>scpClientSecret</param-name>
    	<param-value>cqblprasAniVfi02IXGFvp8VREAa</param-value>
    </context-param>
    ```
    
## Using Consent Manager

1. Go to the Consent Manager application at
   `https://<IS_HOST>:9446/consentmgr` 

2. Sign in with the credentials provided by the bank.

3. The `consentmgr` application requests access to your profile. To grant access, click **Continue**.
    
    ![consentmgr request access](../assets/img/try-out/consent-manager/consentmgr-request-access.png)

4. You are redirected to the homepage of the Consent Manager portal.

    ![consent manger homepage](../assets/img/try-out/consent-manager/consent-manger-homepage.png)

The three tabs are as follows:

   - **Active**: Lists active consents that can access your account/payment information.
   - **Expired**: Lists expired consent that cannot access your account/payment information anymore.
   - **Withdrawn**: Lists the consents that you have revoked.

!!! tip
    Use the **Search** button to search consents.

### Viewing consent details

- To view consent details, click the respective `Action` button. 

    ![view consent](../assets/img/try-out/consent-manager/view-consent.png)

- You can view the details such as the associated TPP application, consent granted date, consent expiry date, 
account numbers, and permissions that you have granted.

    ![consent details](../assets/img/try-out/consent-manager/consent-details.png)

### Revoking a consent

- To revoke a consent, review the details and click **Stop Sharing**. 
    
    ![consent details](../assets/img/try-out/consent-manager/stop-sharing.png)
    
- Revoking a consent consists of 2 steps:

    - Step 1: The first step shows the impact of withdrawing the consent.
    
        ![stop sharing step 1](../assets/img/try-out/consent-manager/stop-sharing-step1.png)
    
    - Step 2: Displays the information the consent has access to. 
    
        ![stop sharing step 2](../assets/img/try-out/consent-manager/stop-sharing-step2.png)
    
- Once you click **Stop Sharing**, the status of the consent changes to `withdrawn`. You can find this consent in the 
**Withdrawn** tab now.