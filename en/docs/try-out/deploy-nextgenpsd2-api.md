This page provides instructions to deploy the NextGenPsd2XS2AFramework API. WSO2 Open Banking Berlin Toolkit 
provides the Account Information Service (AIS), Payment Initiation Service (PIS), and Confirmation on the Availability 
of Funds Service (FCS) via the NextGenPSD2XS2AFramework API. 

1. Sign in to the API Publisher Portal at `https://<APIM_HOST>:9443/publisher` with the creator/publisher privileges.

    ![sign_in](../assets/img/get-started/quick-start-guide/sign-in.png)

2. In the homepage, go to **REST API** and select **Import Open API**. ![let's_get_started](../assets/img/get-started/quick-start-guide/lets-get-started.png)

3. Select **OpenAPI File/Archive**. ![create-an-api](../assets/img/get-started/quick-start-guide/create-an-api.png)

4. Click **Browse File to Upload** and select the `<APIM_HOME>/<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/berlin.group.org/PSD2API_1.3.6/psd2-api_1.3.6_20200327.yaml` file.

5. Click **Next**.

6. Set the context to `/xs2a`.

7. Remove the existing endpoint configuration and leave the field empty. ![set-context](../assets/img/try-out/account-flow/set-context.png)

8. Click **Create** to create the API. ![create-accounts](../assets/img/get-started/quick-start-guide/create-accounts.png)

9. After the API is successfully created, go to **Portal Configurations** using the left menu panel. ![portal-configurations](../assets/img/get-started/quick-start-guide/portal-configurations.png)

10. Select **Subscriptions** from the left menu pane and set the business plan to **Unlimited: Allows unlimited requests**. ![business-plan](../assets/img/get-started/quick-start-guide/business-plan.png)

11. Click **Save**.

12. Select **Runtime** from the left menu pane.

13. Toggle the **Schema Validation** button to enable Schema Validation. ![schema-validation](../assets/img/get-started/quick-start-guide/schema-validation.png)

14. Click the **Edit** button under **Request > Message Mediation**. ![edit_message_mediation](../assets/img/get-started/quick-start-guide/edit-message-mediation.png)

15. Select the **Custom Policy** option.

16. Upload the `<APIM_HOME>/<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/berlin.group.org/PSD2API_1.3.6/dynamic-endpoint-insequence-1.3.6.xml` insequence file. ![uplaoad_insequence](../assets/img/try-out/account-flow/upload-insequence.png)

17. Click **Select**.

18. Scroll down and click **SAVE**.

19. Use the left menu panel and go to **API Configurations > Endpoints**.

    ![select_endpoints](../assets/img/get-started/quick-start-guide/select-endpoints.png)

20. Add a **Dynamic Endpoint**. ![add_dynamic_endpoint](../assets/img/get-started/quick-start-guide/add_dynamic_endpoint.png)

21. Go to **Deployments** using the left menu pane.

    ![select_deployments](../assets/img/get-started/quick-start-guide/select-deployments.png)

22. Select the API Gateway type, in this scenario, it is **Default**. ![api_gateway](../assets/img/get-started/quick-start-guide/dcr-api-gateway.png)

23. Click **Deploy**.

24. Go to **Overview** using the left menu pane.

    ![select_overview](../assets/img/get-started/quick-start-guide/select-overview.png)

25. Click **Publish**. ![publish_api](../assets/img/get-started/quick-start-guide/publish-api.png)