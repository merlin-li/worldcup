import React from 'react';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import TruffleContract from 'truffle-contract';
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
        axios.get('/data/Adoption.json').then(res => {
            let data = res.data;
            WorldCupApp.contracts.Adoption = TruffleContract(data);
            WorldCupApp.contracts.Adoption.setProvider(WorldCupApp.web3Provider);
            WorldCupApp.markAdopted();
        });
    },
    markAdopted() {
        let adoptionInstance;

        WorldCupApp.contracts.Adoption.deployed().then((instance) => {
            adoptionInstance = instance;

            return adoptionInstance.getAdopters.call();
        }).then((adopters) => {
            console.log(adopters);
            for (let i = 0; i < adopters.length; i++) {
                if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
                    // 这里是回调函数
                }
            }
        }).catch((err) => {
            console.log(err.message);
        });
    },
    handleAdopt(teamId) {
        let adoptionInstance;

        window.web3.eth.getAccounts((error, accounts) => {
            if (error) {
                console.log(error);
            }

            let account = accounts[0];

            WorldCupApp.contracts.Adoption.deployed().then((instance) => {
                adoptionInstance = instance;

                // Execute adopt as a transaction by sending account
                return adoptionInstance.adopt(teamId, {from: account});
            }).then((result) => {
                return WorldCupApp.markAdopted();
            }).catch((err) => {
                console.log(err.message);
            });
        });
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
        this.renderTeams();
        WorldCupApp.initWeb3();
    }

    buyTeam = (team) => {
        console.log('you clicked me.', team);
        // WorldCupApp.handleAdopt(team.id);
        team.price = 11111;
        team.name = 'xxxxx';
        let copyTeams = this.state.teams;
        copyTeams.map(item => {
            if (item.id === team.id) {
                item.price = 22222;
                item.name = 'xxxxx';
                return {
                    ...item
                };
            }
        });
        this.setState({
            teams: copyTeams
        });
    }

    // 渲染球队
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
