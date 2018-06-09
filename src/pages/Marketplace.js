import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import Contract from 'truffle-contract';
import axios from 'axios';

let WorldCupApp = {
    web3Provider: null,
    contracts: {},
    initWeb3() {
        if (typeof web3 !== 'undefined') {
            WorldCupApp.web3Provider = window.web3.currentProvider;
        } else {
            // If no injected web3 instance is detected, fall back to Ganache
            WorldCupApp.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
        }
        window.web3 = new Web3(WorldCupApp.web3Provider);

        return WorldCupApp.initContract();
    },
    initContract() {

    }
};

export default class Marketplace extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasLogin: false,
            walletAddress: '',
            teams: []
        };
    }

    componentDidMount() {
        let hasLogin = false;

        if (typeof web3 !== 'undefined') {
            window.web3 = new Web3(window.web3.currentProvider);
            window.web3.eth.getAccounts((error, accounts) => {
                if (accounts.length == 0) {
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
                    console.log(this.state);
                }
            })
        } else {
            hasLogin = false;
            console.log('No web3? You should consider trying MetaMask!')
        }
        this.renderTeams();
    }

    buyTeam = () => {
        console.log('you clicked me.');
    }

    renderTeams() {
        let result = [];
        axios.get('/data/teams.json').then(res => {
            if (res.data && res.data.length) {
                result = res.data.map(item => ({
                    ...item,
                    key: item.id
                }));

                this.setState({
                    teams: result
                });
            }
        });
    }

    render() {
        let result = [];
        if (this.state && this.state.teams && this.state.teams.length) {
            result = this.state.teams.map(team => (
                <li key={team.id}>
                    <div className="marketplace__box">
                        <span>{team.name}</span>
                        <img src={'/' + team.picture} />
                        <div>
                            Price: {team.price} ETH
                        </div>
                        <button onClick={() => this.buyTeam(team)}>Buy</button>
                    </div>
                </li>
            ));
        }

        return (
            <div>
                <section className="marketplace__header">
                    <div>
                        <a href="javascript:">All Teams</a>
                    </div>
                </section>
                <ul className="marketplace__teams">
                    {result}
                </ul>
            </div>
        );
    }
}
