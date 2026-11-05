// Generated once from the `nav:` of the pre-migration en/mkdocs.yml (commit d13ecb6, since deleted).
// The migration tooling is not part of this repository: edit this file by hand from now on.
import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Get Started',
      className: 'sidebar-section-icon-get-started',
      collapsed: true,
      items: [
        {type: 'doc', id: 'get-started/wso2-open-banking-berlin-toolkit', label: 'NextGenPSD2 Reference Toolkit'},
        {type: 'doc', id: 'get-started/open-banking', label: 'Open Banking'},
        {type: 'doc', id: 'get-started/open-banking-requirements', label: 'Open Banking Requirements'},
        {type: 'doc', id: 'get-started/regulations-and-standards', label: 'Regulations and Standards'},
        {type: 'doc', id: 'get-started/about-this-release', label: 'About this Release'},
        {
          type: 'category',
          label: 'Quick Start Guide',
          items: [
            {type: 'doc', id: 'get-started/quick-start-guide', label: 'Get Started'},
            {type: 'doc', id: 'get-started/set-up-toolkits', label: 'Set up Toolkits'},
            {type: 'doc', id: 'get-started/configure-users-and-roles', label: 'Configure Users and Roles'},
            {type: 'doc', id: 'get-started/configure-is-as-key-manager', label: 'Configure IS as Key Manager'},
            {type: 'doc', id: 'get-started/deploy-api', label: 'Deploy API'},
            {type: 'doc', id: 'get-started/tpp-onboarding', label: 'TPP Onboarding'},
            {type: 'doc', id: 'get-started/try-out-flow', label: 'Tryout Flow'},
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Install and Setup',
      className: 'sidebar-section-icon-install-and-setup',
      collapsed: true,
      items: [
        {type: 'doc', id: 'install-and-setup/prerequisites', label: 'Prerequisites'},
        {type: 'doc', id: 'install-and-setup/setting-up-servers', label: 'Setting up servers'},
        {type: 'doc', id: 'install-and-setup/setting-up-databases', label: 'Setting up databases'},
        {type: 'doc', id: 'install-and-setup/configuring-identity-server-for-ob', label: 'Configuring Identity Server'},
        {type: 'doc', id: 'install-and-setup/configuring-api-manager-for-ob', label: 'Configuring API Manager'},
        {type: 'doc', id: 'install-and-setup/configuring-users-and-roles', label: 'Configuring Users and Roles'},
        {type: 'doc', id: 'install-and-setup/upgrading-the-solution', label: 'Upgrading the solution'},
      ],
    },
    {
      type: 'category',
      label: 'Learn',
      className: 'sidebar-section-icon-learn',
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Consent Management',
          items: [
            {type: 'doc', id: 'learn/consent-management', label: 'Introduction'},
            {type: 'doc', id: 'learn/consent-manager', label: 'Consent Manager'},
          ],
        },
        {type: 'doc', id: 'learn/consent-authorization-intro', label: 'Consent Authorization'},
        {type: 'doc', id: 'learn/token-authentication', label: 'Token Authentication'},
        {
          type: 'category',
          label: 'TPP Onboarding',
          items: [
            {type: 'doc', id: 'learn/tpp-onboarding', label: 'Introduction'},
            {type: 'doc', id: 'learn/tpp-onboarding-configuration', label: 'Configuration'},
          ],
        },
        {
          type: 'category',
          label: 'Strong Customer Authentication',
          items: [
            {type: 'doc', id: 'learn/strong-customer-authentication', label: 'Introduction'},
            {type: 'doc', id: 'learn/strong-customer-authentication-configuration', label: 'Configuration'},
          ],
        },
        {
          type: 'category',
          label: 'API Security',
          items: [
            {type: 'doc', id: 'learn/api-security', label: 'Introduction'},
            {type: 'doc', id: 'learn/api-security-configuration', label: 'Configuration'},
          ],
        },
        {type: 'doc', id: 'learn/integration-with-bank', label: 'Integration with Bank'},
      ],
    },
    {
      type: 'category',
      label: 'Try out',
      className: 'sidebar-section-icon-try-out',
      collapsed: true,
      items: [
        {type: 'doc', id: 'try-out/deploy-nextgenpsd2-api', label: 'Deploy NextGenPSD2XS2A API'},
        {type: 'doc', id: 'try-out/tpp-onboarding', label: 'TPP Onboarding'},
        {type: 'doc', id: 'try-out/account-information-service-flow', label: 'Account Information Service Flow'},
        {type: 'doc', id: 'try-out/payment-initiation-service-flow', label: 'Payment Initiation Service Flow'},
        {type: 'doc', id: 'try-out/confirmation-of-funds-flow', label: 'Confirmation of Funds flow'},
        {type: 'doc', id: 'try-out/consent-manager', label: 'Consent Manager'},
      ],
    },
  ],
};

export default sidebars;
