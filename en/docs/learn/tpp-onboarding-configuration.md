## Customize Consumer Key Validation

To allow a custom regex when creating a consumer key:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

2. Add the following tags and configure the required regex.

      ``` toml
      [oauth.client.id.validation]
      regex = "^PSD[A-Z]{2}-[A-Z]{2,8}-[a-zA-Z0-9]*$"
      ```

## Customize Organization Id Validation

By default, the following regex is used to validate the Organization Id:
   ```
   ^PSD[A-Z]{2}-[A-Z]{2,8}-[a-zA-Z0-9]*$
   ```

You can override the above and use your own regex when validating the Organization Id:

   1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.
   2. Add the following tags and configure the required regex.

      ``` toml
      [open_banking.berlin.keymanager.org_id_validation]
      regex=”<CUSTOM_REGEX>”
      ```

!!! note
    The organization Id of an application is used as its consumer key. Therefore, both [Consumer Key Validation](#customize-consumer-key-validation) 
    and [Organization Id Validation](#customize-organization-id-validation) regexes should be the same.

## Configure Additional Application Properties

When onboarding TPP applications via WSO2 API Manager Developer Portal, you can request the TPP for additional 
application properties. 

1. Open the `<APIM_HOME>/repository/conf/deployment.toml` file.

2. Follow the given format and add configurations according to the properties you require:

    ``` toml tab="Format"
    [[open_banking.keymanager.application.type.attributes]]
    name="<Name>" - The application property will be saved in SP_METADATA table with this name
    label="<Lable>" - The UI will show this label 
    type="<input,select>" - Define whether the field is a input field or a dropdown
    tooltip="<Placeholder>"
    values="<allowed values>" - If it is a dropdown, add comma separated values to the list
    default="" - The default selected value
    required="true" - Whether this is mandatory property
    mask="false"
    multiple="false"
    priority="1"
    ```
   
    ``` toml tab="Sample"
    [[open_banking.keymanager.application.type.attributes]]
    name="REGULATORY"
    label="Regulatory Application"
    type="select"
    tooltip="Is this a Regulatory Application?"
    values="true,false"
    default=""
    required="true"
    mask="false"
    multiple="false"
    priority="1"
    ```

3. The configured properties will be available to fill in the Developer Portal when creating a TPP application.

      ![enter_application_details](../assets/img/get-started/quick-start-guide/tpp-onboarding/enter-application-details-1.png)
      ![enter_application_details](../assets/img/get-started/quick-start-guide/tpp-onboarding/enter-application-details-2.png)
