import React from 'react';
import axios from 'axios';

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
        console.log('you clicked me.', team);
        // WorldCupApp.handleBuyTeam(team.id);
        // team.price = 11111;
        // team.name = 'xxxxx';
        // let copyTeams = this.state.teams;
        // copyTeams.map(item => {
        //     if (item.id === team.id) {
        //         item.price = 22222;
        //         item.name = 'xxxxx';
        //         return {
        //             ...item
        //         };
        //     }
        // });
        // this.setState({
        //     teams: copyTeams
        // });
    }

    // 渲染球队
    renderTeams() {
        let Web3 = require('web3');
        // 创建web3对象
        let web3 = new Web3();
        let worldcupContract = null;
        let worldcupTeams = [];
        // 连接到以太坊节点
        web3.setProvider(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

        let formatPrice = (price) => {
            return price / 1000000000000000000;
        }

        axios.get('/data/SparkCup.json').then(res => {
            let data = res.data;
            let address = '0xdd804cc059e5a825b47c76d7050fe22f13805d29';
            let SparkCup = new web3.eth.Contract(data.abi, address);
            let getAllTeamsPromise = [];

            worldcupContract = SparkCup;

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
