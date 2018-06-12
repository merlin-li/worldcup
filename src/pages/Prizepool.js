import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

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
        // 创建web3对象
        let web3 = new Web3();
        let worldcupContract = null;
        let worldcupTeams = [];
        // 连接到以太坊节点
        web3.setProvider(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
        window.web3 = web3;

        let formatPrice = (price) => {
            return price / 1000000000000000000;
        }

        axios.get('/data/SparkCup.json').then(res => {
            let data = res.data;
            let address = '0x348c1eddaf55e4145e4c879a6e26ee58708f6b0f';
            let SparkCup = new web3.eth.Contract(data.abi, address);

            worldcupContract = SparkCup;

            // get prize pool
            worldcupContract.methods.getPrizePool().call().then(result => {
                console.log(result);
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
                    finalPoolTotal: {finalPoolTotal}
                </section>
                <section>
                    last16Locked: {last16Locked}
                </section>
                <section>
                    last16PoolTotal: {last16PoolTotal}
                </section>
                <section>
                    quarterLocked: {quarterLocked}
                </section>
                <section>
                    quarterPoolTotal: {quarterPoolTotal}
                </section>
                <section>
                    semiLocked: {semiLocked}
                </section>
                <section>
                    semiPoolTotal: {semiPoolTotal}
                </section>
            </div>
        );
    }
}
