import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import CONFIG from '../components/common';

const { formatPrice, contractAddress, httpProvider } = CONFIG;

export default class Prizepool extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            finalPoolTotal: '0',
            last16Locked: false,
            last16PoolTotal: '0',
            quarterLocked: false,
            quarterPoolTotal: '0',
            semiLocked: false,
            semiPoolTotal: '0'
        };
    }
    componentDidMount() {
        let Web3 = require('web3');
        // let web3 = new Web3();
        let worldcupContract = null;
        let web3Provider;

        // Is there an injected web3 instance?
        if (typeof window.web3 !== 'undefined') {
            web3Provider = window.web3.currentProvider;
        } else {
            // If no injected web3 instance is detected, fall back to Ganache
            web3Provider = new Web3.providers.HttpProvider(httpProvider);
        }
        let web3 = new Web3(web3Provider);

        axios.get('/data/SparkCup.json').then(res => {
            let data = res.data;
            let SparkCup = new web3.eth.Contract(data.abi, contractAddress);

            worldcupContract = SparkCup;

            // get prize pool
            worldcupContract.methods.getPrizePool().call().then(result => {
                this.setState(result);
            });
        });
    }
    render() {
        const {
            finalPoolTotal,
            last16Locked,
            last16PoolTotal,
            quarterLocked,
            quarterPoolTotal,
            semiLocked,
            semiPoolTotal
        } = this.state;

        return (
            <div className="prizepool__box">
                <section>
                    奖池金额: {formatPrice(finalPoolTotal)} ETH
                </section>
                <section>
                    last16Locked: {last16Locked.toString()}
                </section>
                <section>
                    16强奖池: {formatPrice(last16PoolTotal)}
                </section>
                <section>
                    quarterLocked: {quarterLocked.toString()}
                </section>
                <section>
                    四分之一决赛奖池: {formatPrice(quarterPoolTotal)}
                </section>
                <section>
                    semiLocked: {semiLocked.toString()}
                </section>
                <section>
                    半决赛奖池: {formatPrice(semiPoolTotal)}
                </section>
            </div>
        );
    }
}
