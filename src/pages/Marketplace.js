import React from 'react';
import TruffleContract from 'truffle-contract';
import axios from 'axios';
// import Web3 from 'web3';

let WorldCupApp = {
    currentAccount: '',
    contract: null,
    teams: [],
    // 初始化web3
    initWeb3(callback) {
        var Web3 = require('web3');
        // 创建web3对象
        var web3 = new Web3();
        // 连接到以太坊节点
        web3.setProvider(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

        axios.get('/data/SparkCup.json').then(res => {
            var data = res.data;
            var address = '0xdd804cc059e5a825b47c76d7050fe22f13805d29';
            var SparkCup = new web3.eth.Contract(data.abi, address);

            WorldCupApp.contract = SparkCup;

            // get all teams.
            WorldCupApp.getAllTeams(callback);
        });
    },
    getAllTeams(callback) {
        for (let i = 0; i < 32; i++) {
            WorldCupApp.contract.methods.getTeam(i).call((err, result) => {
                WorldCupApp.teams.push({
                    ...result,
                    flag: '/images/' + result._code.toLowerCase() + '.jpeg',
                    key: result._tokenId
                });
            })
        }
        callback(WorldCupApp.teams);
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
        this.renderTeams = this.renderTeams.bind(this);
    }

    componentDidMount() {
        WorldCupApp.initWeb3(this.renderTeams);
    }

    buyTeam = (team) => {
        console.log('you clicked me.', team);
        WorldCupApp.handleBuyTeam(team.id);
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
    renderTeams(teams) {
        // let result = [];
        // axios.get('/data/teams.json').then(res => {
        //     if (res.data && res.data.length) {
        //         result = res.data.map(item => ({
        //             ...item,
        //             key: item.id
        //         }));
        //
        //         this.setState({
        //             teams: result
        //         });
        //     }
        // });
        console.log(teams);
        this.setState({ teams });
    }

    render() {
        let result = [];
        if (this.state && this.state.teams && this.state.teams.length) {
            result = this.state.teams.map(team => (
                <li key={team._id}>
                    <div className="marketplace__box">
                        <span>{team._name}</span>
                        <img src={'/' + team.flag} alt="" />
                        <div>
                            Price: {team._price} ETH
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
