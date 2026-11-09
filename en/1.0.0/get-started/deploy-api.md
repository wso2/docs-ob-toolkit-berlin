# Deploy NextGenPsd2XS2AFramework API

This page provides instructions to deploy the NextGenPsd2XS2AFramework API. NextGenPSD2 Reference Toolkit provides the Account Information Service (AIS), Payment Initiation Service (PIS), and Confirmation on the Availability of Funds Service (FCS) via the NextGenPsd2XS2AFramework API.

1. Sign in to the API Publisher Portal at `https://<APIM_HOST>:9443/publisher` with the creator/publisher privileges.

   ![sign\_in](/en/1.0.0/assets/images/sign-in-af55224a99febbeb33b9a33f7dbde670.png)

2. In the homepage, go to **REST API** and select **Import Open API**. ![let\&#39;s\_get\_started](/en/1.0.0/assets/images/lets-get-started-285da24b2b0bc7883dcc6833839feb42.png)

3. Select **OpenAPI File/Archive**. ![create-an-api](/en/1.0.0/assets/images/create-an-api-1af65adad3cc1a2e66da827f329a784b.png)

4. Click **Browse File to Upload** and select the `<APIM_HOME>/<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/berlin.group.org/PSD2API_1.3.6/psd2-api_1.3.6_20200327.yaml` file.

5. Click **Next**.

6. Set the context to `/xs2a`.

7. Remove the existing endpoint configuration and leave the field empty. ![set-context](/en/1.0.0/assets/images/set-context-e47d876ec3c9b36ea9b711bff21a8f99.png)

8. Click **Create** to create the API. ![create-accounts](/en/1.0.0/assets/images/create-accounts-f3be674d65dd2f9234ec8ea6525fa5c1.png)

9. After the API is successfully created, go to **Portal Configurations** using the left menu panel. ![portal-configurations](/en/1.0.0/assets/images/portal-configurations-4aa0e19c2e3a09e88b7fbadd086f8977.png)

10. Select **Subscriptions** from the left menu pane and set the business plan to **Unlimited: Allows unlimited requests**. ![business-plan](/en/1.0.0/assets/images/business-plan-cd635503187f9d37541c5b351330be3e.png)

11. Click **Save**.

12. Select **Runtime** from the left menu pane.

13. Toggle the **Schema Validation** button to enable Schema Validation. ![schema-validation](/en/1.0.0/assets/images/schema-validation-c61adf122279ce8cb5b2aa912be7430c.png)

14. Go to **Develop -> API Configurations -> Policies** in the left menu pane to add a custom policy. ![select\_policies](/en/1.0.0/assets/images/select-policies-5d7935fd04a408753ac9bb83df15cd74.png)

15. On the **Policy List** card, click on **Add New Policy**.

16. Fill in the **Create New Policy**.

17. Upload the `<APIM_HOME>/<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/berlin.group.org/PSD2API_1.3.6/dynamic-endpoint-insequence-1.3.6.xml` insequence file. ![uplaoad\_insequence](/en/1.0.0/assets/images/upload-insequence-eb3687a0cd5c408b389a39bb805abb26.png)

18. Scroll down and click **Save**. Upon successful creation of the policy, you receive an alert as shown below: ![successful](/en/1.0.0/assets/images/successful-2cfca6cc1ecdd161d44574d0fe646cef.png)

19. Expand the API endpoint you want from the list of API endpoints. For example: ![expand\_api\_endpoint](/en/1.0.0/assets/images/expand-api-endpoint-d9710cb23518ffe38b4930bc072059da.png)

20. Expand the HTTP method from the API endpoint you selected. For example: ![expand\_http\_method](/en/1.0.0/assets/images/expand-http-method-5e3de2528e564cbf5e72813572b998fe.png)

21. Drag and drop the previously created policy to the **Request Flow** of the API endpoint. ![request\_flow](/en/1.0.0/assets/images/request-flow-4aa869e47a0c2e5864d6a12c6b929ca3.png)

22. Select **Apply to all resources** and click **Save**.

23. Scroll down and click **Save**.

24. Use the left menu panel and go to **API Configurations > Endpoints**.

    ![select\_endpoints](/en/1.0.0/assets/images/select-endpoints-167a237b1d1125806e21098f966c2a6f.png)

25. Add a **Dynamic Endpoint**. ![add\_dynamic\_endpoint](/en/1.0.0/assets/images/add_dynamic_endpoint-ac2976771f6f516f6f6de1261f908a90.png)

26. Go to **Deployments** using the left menu pane.

    ![select\_deployments](/en/1.0.0/assets/images/select-deployments-f81ba4844ddbfe4a10d7aaa7cdf54051.png)

27. Select the API Gateway type, in this scenario, it is **Default**. ![api\_gateway](/en/1.0.0/assets/images/dcr-api-gateway-2973cf919ba6e071a3c40ffdf16179ac.png)

28. Click **Deploy**.

29. Go to **Overview** using the left menu pane.

    ![select\_overview](/en/1.0.0/assets/images/select-overview-a5ce904a426813c5c8877cbdb8787018.png) 30. Click **Publish**. ![publish\_api](/en/1.0.0/assets/images/publish-api-4cdc5546c7864335fd0d27fd60c14cd5.png)

### Summarized information for configuring API[​](#summarized-information-for-configuring-api "Direct link to Summarized information for configuring API")

Given below is a summary of configurations to follow when deploying the API in the toolkit.

| API                        | Swagger definition (yaml file)                                                                                             | Endpoint type    | Message mediation (sequence file)                                                                                                   |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| NextGenPSD2XS2A API v1.3.6 | `<APIM_HOME>/<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/berlin.group.org/PSD2API_1.3.6/psd2-api_1.3.6_20200327.yaml` | Dynamic Endpoint | `<APIM_HOME>/<OB_APIM_TOOLKIT_HOME>/repository/resources/apis/berlin.group.org/PSD2API_1.3.6/dynamic-endpoint-insequence-1.3.6.xml` |
