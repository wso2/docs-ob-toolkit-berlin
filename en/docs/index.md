---
title: "NextGenPSD2 Reference Toolkit Documentation"
hide_title: true
displayed_sidebar: null
hide_table_of_contents: true
hide_markdown_actions: true
---
import Link from '@docusaurus/Link';

<style>{`
\x20   @font-face {
\x20   font-family: 'Material Icons';
\x20   font-style: normal;
\x20   font-weight: 400;
\x20   src: url(https://wso2.cachefly.net/wso2/sites/all/fonts/docs/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2) format('woff2');
\x20   }

\x20   .material-icons {
\x20   font-family: 'Material Icons';
\x20   font-weight: normal;
\x20   font-style: normal;
\x20   font-size: 24px;
\x20   line-height: 1;
\x20   letter-spacing: normal;
\x20   text-transform: none;
\x20   display: inline-block;
\x20   white-space: nowrap;
\x20   word-wrap: normal;
\x20   direction: ltr;
\x20   -webkit-font-feature-settings: 'liga';
\x20   -webkit-font-smoothing: antialiased;
\x20   }
`}</style>

<div>
    <header>
        <h1>Welcome to the NextGenPSD2 Reference Toolkit Documentation!</h1>
    </header>
    <div className="md-main .md-content" style={{float: "left", width: "45%", textAlign: "justify", maxHeight: "100%"}}>
        <p>
        {"NextGenPSD2 Reference Toolkit delivers end-to-end compliance for Berlin Group's NextGenPSD2 Framework. It increases the speed \n        and reduces the complexity of adopting open banking compliance. Instead of building a solution from scratch, you \n        can simply deploy NextGenPSD2 Reference Toolkit to meet all legislative requirements with additional benefits \n        beyond compliance."}
        </p>
        <p>
        {"The toolkit runs on top of WSO2 Identity Server and WSO2 API Manager. \n        Get a head start with our Quick Start Guide or dive straight into the documentation to understand what we offer."}
        </p>
     </div>
    <div className="md-main .md-content " style={{float: "left", width: "55%", align: "left", flexShrink: "0", minWidth: "40%", maxHeight: "100%", maxWidth: "50%", marginLeft: "20px", marginTop: "20px"}}>
        <img src="assets/img/home/accelerator-toolkit-model.png" frameBorder="0" />
    </div>
    <div>
        <div className="content">
            {/* card */}
            <Link to="get-started/quick-start-guide" className="card">
                <div className="line"></div>
                <div className="card-icon">
                    <i className="material-icons md-36">timer</i>
                </div>
                <div className="card-content">
                    <p className="title">Quick Start Guide</p>
                    <p className="hint">Set up and try out in your local environment</p>
                </div>
            </Link>
            {/* end card */}
            {/* card */}
            <Link to="learn/consent-management/" className="card">
                <div className="line"></div>
                <div className="card-icon">
                    <i className="material-icons md-36">{"manage_accounts"}</i>
                </div>
                <div className="card-content">
                    <p className="title">Consent Management</p>
                    <p className="hint">Create, view, revoke, and manage consents</p>
                </div>
            </Link>
            {/* end card */}
            {/* card */}
            <Link to="learn/tpp-onboarding" className="card">
                <div className="line"></div>
                <div className="card-icon">
                    <i className="material-icons md-36">{"app_registration"}</i>
                </div>
                <div className="card-content">
                    <p className="title">Client Registration</p>
                    <p className="hint">A thorough verification before onboarding</p>
                </div>
            </Link>
            {/* end card */}
        </div>
        <div className="content">
            {/* card */}
            <Link to="learn/api-security" className="card">
                <div className="line"></div>
                <div className="card-icon">
                    <i className="material-icons md-36">{"verified_user"}</i>
                </div>
                <div className="card-content">
                    <p className="title">Secured API Invocation</p>
                    <p className="hint">Comprehensive support of FAPI and eIDAS certificate validation</p>
                </div>
            </Link>
            {/* end card */}
            {/* card */}
            {/* <div class="card" onclick="location.href='learn/data-publishing/';">
                <div class="line"></div>
                <div class="card-icon">
                    <i class="material-icons md-36">analytics</i>
                </div>
                <div class="card-content">
                    <p class="title">Analytics and Data Publishing</p>
                    <p class="hint">Publish and summarize data for reporting</p>
                </div>
            </div> */}
            {/* end card */}
            {/* card */}
            <Link to="learn/integration-with-bank/" className="card">
                <div className="line"></div>
                <div className="card-icon">
                    <i className="material-icons md-36">{"settings_input_component"}</i>
                </div>
                <div className="card-content">
                    <p className="title">Easily Pluggable</p>
                    <p className="hint">Easy integration with core banking systems</p>
                </div>
            </Link>
            {/* end card */}
            {/* 
            <div class="card" onclick="location.href='develop/develop-toolkit/';">
                <div class="line"></div>
                <div class="card-icon">
                    <i class="material-icons md-36">code</i>
                </div>
                <div class="card-content">
                    <p class="title">Develop toolkit</p>
                    <p class="hint">Customize features according to your open banking requirements</p>
                </div>
            </div>
            */}
        </div>
</div></div>
