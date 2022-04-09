This page provides instructions to deploy the NextGenPsd2XS2AFramework API. WSO2 Open Banking Berlin Toolkit 
provides the Account Information Service (AIS), Payment Initiation Service (PIS), and Confirmation on the Availability 
of Funds Service (FCS) via the NextGenPsd2XS2AFramework API. 

1. Sign in to the API Publisher Portal at `https://<APIM_HOST>:9443/publisher` with the creator/publisher privileges.

    ![sign_in](../assets/img/get-started/quick-start-guide/sign-in.png)

2. In the homepage, go to **REST API** and select **Import Open API**. ![let's_get_started](../assets/img/get-started/quick-start-guide/lets-get-started.png)

3. Select **OpenAPI File/Archive**. ![create-an-api](../assets/img/get-started/quick-start-guide/create-an-api.png)

4. Click **Browse File to Upload** and select the `<APIM_HOME>/<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/berlin.group.org/PSD2API_1.3.6/psd2-api_1.3.6_20200327.yaml` file.

5. Click **Next**.

6. Set the context to `/xs2a` and leave the endpoint empty. ![set-context](../assets/img/try-out/account-flow/set-context.png)

7. Click **Create** to create the API. ![create-accounts](../assets/img/get-started/quick-start-guide/create-accounts.png)

8. After the API is successfully created, go to **Portal Configurations** using the left menu panel. ![portal-configurations](../assets/img/get-started/quick-start-guide/portal-configurations.png)

9. Select **Subscriptions** from the left menu pane and set the business plan to **Unlimited: Allows unlimited requests**. ![business-plan](../assets/img/get-started/quick-start-guide/business-plan.png)

10. Click **Save**.

11. Select **Runtime** from the left menu pane.

12. Toggle the **Schema Validation** button to enable Schema Validation. ![schema-validation](../assets/img/get-started/quick-start-guide/schema-validation.png)

13. Click the **Edit** button under **Request > Message Mediation**. ![edit_message_mediation](../assets/img/get-started/quick-start-guide/edit-message-mediation.png)

14. Select the **Custom Policy** option.

15. Upload the `<APIM_HOME>/<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/berlin.group.org/PSD2API_1.3.6/dynamic-endpoint-insequence-1.3.6.xml` insequence file. ![uplaoad_insequence](../assets/img/try-out/account-flow/upload-insequence.png)

16. Click **Select**.

17. Scroll down and click **SAVE**.

18. Use the left menu panel and go to **API Configurations > Endpoints**.

    ![select_endpoints](../assets/img/get-started/quick-start-guide/select-endpoints.png)

19. Add a **Dynamic Endpoint**. ![add_dynamic_endpoint](../assets/img/get-started/quick-start-guide/add_dynamic_endpoint.png)

20. Go to **Deployments** using the left menu pane.

    ![select_deployments](../assets/img/get-started/quick-start-guide/select-deployments.png)

21. Select the API Gateway type, in this scenario, it is **Default**. ![api_gateway](../assets/img/get-started/quick-start-guide/dcr-api-gateway.png)

22. Click **Deploy**.

23. Go to **Overview** using the left menu pane.

    ![select_overview](../assets/img/get-started/quick-start-guide/select-overview.png)

24. Click **Publish**. ![publish_api](../assets/img/get-started/quick-start-guide/publish-api.png)