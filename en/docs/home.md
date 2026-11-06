---
title: "Home"
slug: /
wide: true
hide_title: true
---
import {FeatureTiles, FeatureTile, SectionSummaries, SectionSummary} from '@site/src/components/HomePage';

<div className="ob-home">

<div className="ob-home__top ob-home__top--stacked">

<header className="ob-home__hero">
  <h1>Welcome to the NextGenPSD2 Reference Toolkit Documentation!</h1>
  <p>
    NextGenPSD2 Reference Toolkit delivers end-to-end compliance for Berlin Group's NextGenPSD2 Framework. It increases the speed and reduces the complexity of adopting open banking compliance. Instead of building a solution from scratch, you can simply deploy NextGenPSD2 Reference Toolkit to meet all legislative requirements with additional benefits beyond compliance.
  </p>
  <p>
    The toolkit runs on top of WSO2 Identity Server and WSO2 API Manager. Get a head start with our Quick Start Guide or dive straight into the documentation to understand what we offer.
  </p>
</header>

<div>

![](./assets/img/home/accelerator-toolkit-model.png)

</div>

</div>

<FeatureTiles columns={5}>
  <FeatureTile to="/get-started/quick-start-guide/" icon="timer" title="Quick Start Guide" hint="Set up and try out in your local environment" />
  <FeatureTile to="/learn/consent-management/" icon="consent" title="Consent Management" hint="Create, view, revoke, and manage consents" />
  <FeatureTile to="/learn/tpp-onboarding/" icon="register" title="Client Registration" hint="A thorough verification before onboarding" />
  <FeatureTile to="/learn/api-security/" icon="shield" title="Secured API Invocation" hint="Comprehensive support of FAPI and eIDAS certificate validation" />
  <FeatureTile to="/learn/integration-with-bank/" icon="plug" title="Easily Pluggable" hint="Easy integration with core banking systems" />
</FeatureTiles>

<h2 className="ob-home__heading">Explore the documentation</h2>

<SectionSummaries columns={4}>
  <SectionSummary
    to="/get-started/wso2-open-banking-berlin-toolkit/"
    icon="book"
    title="Get Started"
    description="Learn about the toolkit and the regulations it supports, then set up a working environment."
    links={[
      {to: '/get-started/wso2-open-banking-berlin-toolkit/', label: 'NextGenPSD2 Reference Toolkit'},
      {to: '/get-started/open-banking/', label: 'Open Banking'},
      {to: '/get-started/regulations-and-standards/', label: 'Regulations and Standards'},
      {to: '/get-started/quick-start-guide/', label: 'Quick Start Guide'},
    ]}
  />
  <SectionSummary
    to="/install-and-setup/prerequisites/"
    icon="download"
    title="Install and Setup"
    description="Install, configure and upgrade the toolkit with the WSO2 products it runs on."
    links={[
      {to: '/install-and-setup/prerequisites/', label: 'Prerequisites'},
      {to: '/install-and-setup/setting-up-servers/', label: 'Setting up servers'},
      {to: '/install-and-setup/setting-up-databases/', label: 'Setting up databases'},
      {to: '/install-and-setup/upgrading-the-solution/', label: 'Upgrading the solution'},
    ]}
  />
  <SectionSummary
    to="/learn/consent-management/"
    icon="cap"
    title="Learn"
    description="Understand how the consent, onboarding and authentication features of the toolkit work."
    links={[
      {to: '/learn/consent-management/', label: 'Consent Management'},
      {to: '/learn/tpp-onboarding/', label: 'TPP Onboarding'},
      {to: '/learn/token-authentication/', label: 'Token Authentication'},
      {to: '/learn/strong-customer-authentication/', label: 'Strong Customer Authentication'},
    ]}
  />
  <SectionSummary
    to="/try-out/deploy-nextgenpsd2-api/"
    icon="flask"
    title="Try out"
    description="Try out the flows of the toolkit on your own deployment."
    links={[
      {to: '/try-out/deploy-nextgenpsd2-api/', label: 'Deploy NextGenPSD2XS2A API'},
      {to: '/try-out/tpp-onboarding/', label: 'TPP Onboarding'},
      {to: '/try-out/account-information-service-flow/', label: 'Account Information Service Flow'},
      {to: '/try-out/payment-initiation-service-flow/', label: 'Payment Initiation Service Flow'},
    ]}
  />
</SectionSummaries>

</div>
