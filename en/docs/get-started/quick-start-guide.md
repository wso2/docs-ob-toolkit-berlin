NextGenPSD2 Reference Toolkit contains the customizations done on top of WSO2  Open Banking Accelerator to comply with 
the Berlin Group's NextGenPSD2 Framework. This toolkit has been developed as an extension of WSO2 Open Banking Accelerator. 
The accelerators run on top of WSO2 Identity Server and WSO2 API Manager, which are referred to as base products.

This section guides you on how to set up the solution in a local environment. Follow the instructions to find how you 
can quickly set up and try out a basic flow.

!!! tip "Prerequisites"
    1. Download Oracle JDK 1.8 to the local environment.
        - In the environment variables, update the JAVA_HOME and PATH variables. For instance, you can do this on a 
        Mac/Linux server by adding the following to the `~/.bashrc` file:
        ```
        export JAVA_HOME="<JDK_LOCATION>"
        export PATH=$PATH:$JAVA_HOME/bin
        ```
    
    2. Setup a database server using any of the following:
         - MySQL 8.0
         - Oracle 19c
         - Microsoft SQL Server 2017
         - PostgreSQL 13

        !!!info
            See [Compatibility](../install-and-setup/prerequisites.md#compatibility) if you are using MySQL 8.0.
         
        !!!note
            We do not recommend configuring H2 database in the production environment.

## Installing base products

1. Download and extract the following base products:
    - [WSO2 Identity Server 5.11.0](https://wso2.com/identity-server/#)
    - [WSO2 API Manager 4.1.0](https://wso2.com/api-manager/) or [WSO2 API Manager 4.0.0](https://wso2.com/api-management/previous-releases/)
 
2. To configure the Identity Server with the API Manager, download the respective WSO2 IS Connector according to the API Manager version you have downloaded.
    - [WSO2 IS Connector for API Manager 4.1.0](https://apim.docs.wso2.com/en/4.1.0/assets/attachments/administer/wso2is-extensions-1.4.2.zip)
    - [WSO2 IS Connector for API Manager 4.0.0](https://apim.docs.wso2.com/en/4.0.0/assets/attachments/administer/wso2is-extensions-1.2.10.zip)
    
## Installing WSO2 Open Banking Accelerator

1. If you have an active WSO2 Open Banking subscription, contact us via 
[WSO2 Online Support System](https://support.wso2.com/) to download Open Banking Accelerator 3.0.0.
       
    !!! note
        If you don't have a WSO2 Open Banking subscription, [contact us](https://wso2.com/solutions/financial/open-banking/#contact) 
        for more information.
              
2. Extract the downloaded WSO2 Open Banking Accelerator zip files. WSO2 Open Banking Accelerator contains the following 
accelerators:
   
    - wso2-obiam-accelerator-3.0.0
    - wso2-obam-accelerator-3.0.0
            
## Installing NextGenPSD2 Reference Toolkit

1. If you have an active WSO2 Open Banking subscription, contact us via 
[WSO2 Online Support System](https://support.wso2.com/) to download Open Banking Berlin Toolkit 1.0.0.
       
    !!! note
        If you don't have a WSO2 Open Banking subscription, [contact us](https://wso2.com/solutions/financial/open-banking/#contact) 
        for more information.
              
2. Extract the downloaded NextGenPSD2 Reference Toolkit zip files. NextGenPSD2 Reference Toolkit contains the following 
accelerators:
   
    - wso2-obiam-toolkit-berlin-1.0.0
    - wso2-obam-toolkit-berlin-1.0.0

3. This document uses the following placeholders to refer to the following products:
        
    | Product | Placeholder |
    |---------|---------    |
    |WSO2 Identity Server|`<IS_HOME>`|
    |WSO2 API Manager|`<APIM_HOME>`|
    |WSO2 Open Banking Identity Server Accelerator|`<OB_IS_ACCELERATOR_HOME>`|
    |WSO2 Open Banking API Manager Accelerator |`<OB_APIM_ACCELERATOR_HOME>`|
    |WSO2 Open Banking Identity Server Berlin Toolkit|`<OB_IS_TOOLKIT_HOME>`|
    |WSO2 Open Banking API Manager Berlin Toolkit|`<OB_APIM_TOOLKIT_HOME>`|

## Getting WSO2 Updates

The WSO2 Update tool delivers hotfixes and updates seamlessly on top of products as WSO2 Updates. They include 
improvements that are released by WSO2. You need to update the base products, accelerators, and toolkits using relevant 
scripts.

1. Go to `<PRODUCT_HOME>/bin` and run the WSO2 Update tool:

    - Repeat this step for the WSO2 Identity Server and API Manager products.
    
        ```bash tab='On Linux'
        ./wso2update_linux 
        ```
        
        ```bash tab='On Mac'
        ./wso2update_darwin
        ```
        
        ```bash tab='On Windows'
        ./wso2update_windows.exe
        ```

2. Go to `<ACCELERATOR_HOME>/bin` and run the WSO2 Update tool:

    - Repeat this step for the WSO2 Open Banking Identity Server and API Manager accelerators.

        ```bash tab='On Linux'
        ./wso2update_linux 
        ```
        
        ```bash tab='On Mac'
        ./wso2update_darwin
        ```
        
        ```bash tab='On Windows'
        ./wso2update_windows.exe
        ```
      
3. Go to `<TOOLKIT_HOME>/bin` and run the WSO2 Update tool:

    - Repeat this step for the WSO2 Open Banking Identity Server and API Manager toolkits.

        ```bash tab='On Linux'
        ./wso2update_linux 
        ```
        
        ```bash tab='On Mac'
        ./wso2update_darwin
        ```
        
        ```bash tab='On Windows'
        ./wso2update_windows.exe
        ```
      
For more information, see the [WSO2 Updates documentation](https://updates.docs.wso2.com/en/latest/updates/overview/).