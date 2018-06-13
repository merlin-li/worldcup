import React from 'react';
import axios from 'axios';
import { notification } from 'antd';
import 'antd/dist/antd.css';

const formatPrice = (price) => {
    return price / 1000000000000000000;
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
    }

    buyTeam = (team) => {
        let copyTeams = this.state.teams;
        let teamId = parseInt(team._tokenId);
        let teamPrice = team._price;
        let teamName = team._name;
        let teamOwner = team._owner;
        let me = this;
        let currentAccount;

        if (window.worldcupContract && window.web3) {
            window.web3.eth.getAccounts((error, accounts) => {
                if (accounts && accounts.length) {
                    currentAccount = accounts[0];

                    // 如果球队的owner和当前账号为同一人，不能购买
                    if (currentAccount.toLowerCase() == teamOwner.toLowerCase()) {
                        notification.warning({
                            message: 'Failed!',
                            description: 'You are already the owner of this team!'
                        });
                        return;
                    }

                    window.worldcupContract.methods.buyTeam(teamId).send({
                        from: currentAccount,
                        value: teamPrice
                    }).then(receipt => {
                        notification.success({
                            message: 'Congratulations!',
                            description: `You have bought the ${teamName} team successfully!`,
                        });
                        // 重新获取当前的球队的价格
                        copyTeams = copyTeams.map(team => {
                            if (team._tokenId == teamId) {
                                team.price = formatPrice(team._price * 2);
                                team._owner = currentAccount;
                            }
                            return {
                                ...team
                            };
                        });
                        this.setState({ teams: copyTeams });
                    }).catch(err => {
                        notification.error({
                            message: 'Failed!',
                            description: 'You cannot buy the team!'
                        });
                    });
                }
            });
        }
    }

    // 渲染球队
    renderTeams() {
        let Web3 = require('web3');
        // 创建web3对象
        // let web3 = new Web3();
        let worldcupContract = null;
        let web3Provider;
        let worldcupTeams = [];

        // Is there an injected web3 instance?
        if (typeof window.web3 !== 'undefined') {
            web3Provider = window.web3.currentProvider;
        } else {
            // If no injected web3 instance is detected, fall back to Ganache
            web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
        }

        // 连接到以太坊节点
        // web3.setProvider(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
        var web3 = new Web3(web3Provider);

        axios.get('/data/SparkCup.json').then(res => {
            let data = res.data;
            let address = '0x348c1eddaf55e4145e4c879a6e26ee58708f6b0f';
            let SparkCup = new web3.eth.Contract(data.abi, address);
            let getAllTeamsPromise = [];

            worldcupContract = SparkCup;
            window.worldcupContract = worldcupContract;

            // get all teams.
            for (let i = 0; i < 32; i++) {
                getAllTeamsPromise.push(new Promise((resolve, reject) => {
                    worldcupContract.methods.getTeam(i).call().then(result => {
                        worldcupTeams.push({
                            ...result,
                            flag: '/images/' + result._code.toLowerCase() + '.jpeg',
                            key: result._tokenId,
                            price: formatPrice(result._price)
                        });
                        resolve();
                    }).catch(reject);
                }));
            }

            Promise.all(getAllTeamsPromise).then(() => {
                this.setState({
                    teams: worldcupTeams
                });
            });
        });
    }

    render() {
        let result = [];
        if (this.state && this.state.teams && this.state.teams.length) {
            result = this.state.teams.map(team => (
                <li key={team._tokenId}>
                    <div className="marketplace__box">
                        <span>{team._name}</span>
                        <img src={team.flag} alt="" />
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
