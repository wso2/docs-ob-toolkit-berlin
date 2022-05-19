This page explains the modifications that need to be performed after the upgrade/migration process.

## Open Banking Internal Scopes

Configure open banking internal scopes as follows:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

2. Update the allowed scopes according the sample below: 

      ``` toml
      [oauth]
      allowed_scopes = ["consent.*", "OB_.*"]
      ```

## Two-Factor Authentication

If the migrated Service Provider is configured to use two-factor authentication:

1. Update the `<IS_HOME>/repository/conf/common.auth.script.js` file with the following steps:
 
    ```
    var psuChannel = 'Online Banking';
   
    var onLoginRequest = function(context) {
        publishAuthData(context, "AuthenticationAttempted", {'psuChannel': psuChannel});
        executeStep(1, {
            onSuccess: function (context) {
                Log.info("Authentication Successful");
                publishAuthData(context, "AuthenticationSuccessful", {'psuChannel': psuChannel});
                executeStep(2, {
                    onSuccess: function (context) {
                        Log.info("Authentication Successful");
                        publishAuthData(context, "AuthenticationSuccessful", {'psuChannel': psuChannel});
                    },
                    onFail: function (context) {
                        Log.info("Authentication Failed");
                        publishAuthData(context, "AuthenticationFailed", {'psuChannel': psuChannel});
                    }
                });
            },
            onFail: function (context) {
                Log.info("Authentication Failed");
                publishAuthData(context, "AuthenticationFailed", {'psuChannel': psuChannel});
            }
        });
    };
    ```

2. Update the common auth script of the existing service provider.
     1. Go to the Identity Server Management Console `https://<IS_HOST>:9446/carbon` and log in as the admin user. ![service_providers](../../assets/img/install-and-setup/upgrading-the-solution/serivice-providers.png)
     2. Go to **Service Providers > List**.
     3. Edit the relevant Service Provider. ![edit_service_providers](../../assets/img/install-and-setup/upgrading-the-solution/edit-service-provider.png)
     4. Go to **Local & Outbound Authentication Configuration > Advanced Configuration**. ![advanced_configs_of_service_provider](../../assets/img/install-and-setup/upgrading-the-solution/advanced-configurations.png)
     5. Replace the existing adaptive authentication script under the **Script Based Adaptive Authentication** section with the following:

          ```
          var psuChannel = 'Online Banking';
      
          var onLoginRequest = function(context) {
              publishAuthData(context, "AuthenticationAttempted", {'psuChannel': psuChannel});
              executeStep(1, {
                  onSuccess: function (context) {
                      Log.info("Authentication Successful");
                      publishAuthData(context, "AuthenticationSuccessful", {'psuChannel': psuChannel});
                      executeStep(2, {
                          onSuccess: function (context) {
                              Log.info("Authentication Successful");
                              publishAuthData(context, "AuthenticationSuccessful", {'psuChannel': psuChannel});
                          },
                          onFail: function (context) {
                              Log.info("Authentication Failed");
                              publishAuthData(context, "AuthenticationFailed", {'psuChannel': psuChannel});
                          }
                      });
                  },
                  onFail: function (context) {
                      Log.info("Authentication Failed");
                      publishAuthData(context, "AuthenticationFailed", {'psuChannel': psuChannel});
                  }
              });
          }; 
          ```

     6. Click **Update**.