import React from 'react';
import Web3 from 'web3';

export default class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasLogin: false,
            walletAddress: '0x4305C293b65a9615F86FA064b5cDBeA64406ce82'
        };
    }

    componentDidMount() {
        let hasLogin = false;
        let checkAccount = () => {
            if (typeof web3 !== 'undefined') {
                window.web3 = new Web3(window.web3.currentProvider);
                window.web3.eth.getAccounts((error, accounts) => {
                    if (accounts.length === 0) {
                        hasLogin = false;
                        this.setState({
                            hasLogin: false
                        });
                    } else {
                        hasLogin = true;
                        this.setState({
                            hasLogin: true,
                            walletAddress: accounts[0]
                        });
                    }
                })
            } else {
                hasLogin = false;
                console.log('No web3? You should consider trying MetaMask!')
            }
        };

        let accountInterval = window.setInterval(() => {
            if (hasLogin) {
                window.clearInterval(accountInterval);
            } else {
                checkAccount();
            }
        }, 100);
    }

    render() {
        let Header = (
            <section className="unlogin__header">
                <h3>Your MetaMask is locked</h3>
                <p>Simply open MetaMask and follow the instructions to unlock it</p>

                <div>
                    <img src="/images/locked-out.svg" />
                </div>
            </section>
        );
        let { hasLogin, walletAddress } = this.state;

        if (hasLogin) {
            Header = (
                <section className="unlogin__header">
                    <h3>Confirm your account details</h3>
                    <p>Your wallet address is <span>{walletAddress}</span></p>

                    <div>
                        <img src="/images/profile-2.png" />
                    </div>

                    <div></div>
                    <a className="button__largest" href="/marketplace" style={{'width': '20rem'}}>Goto the marketplace!</a>
                </section>
            );
        }
        return (
            <div>
                {Header}
            </div>
        );
    }
}
