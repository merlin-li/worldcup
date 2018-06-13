import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Row, Col, Button } from 'antd';
import CONFIG from '../components/common';

const { formatPrice, contractAddress, httpProvider } = CONFIG;

export default class GroupState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matches: []
        };
    }
    componentDidMount() {
        this.renderMatches();

        let Web3 = require('web3');
        let worldcupContract = null;
        let web3Provider;

        // Is there an injected web3 instance?
        if (typeof window.web3 !== 'undefined') {
            web3Provider = window.web3.currentProvider;
        } else {
            // If no injected web3 instance is detected, fall back to Ganache
            web3Provider = new Web3.providers.HttpProvider(httpProvider);
        }

        var web3 = new Web3(web3Provider);

        axios.get('/data/SparkCup.json').then(res => {
            let data = res.data;
            let SparkCup = new web3.eth.Contract(data.abi, contractAddress);
            let getAllTeamsPromise = [];

            worldcupContract = SparkCup;
            window.worldcupContract = worldcupContract;
        });
    }

    renderMatches() {
        axios.get('/data/match.json').then(res => {
            let data = res.data;
            let matches = [];
            if (data.matchs && data.matchs.length) {
                data.matchs.map(match => {
                    if (match.rows && match.rows.length) {
                        match.rows.map(row => {
                            matches.push(row);
                        });
                    }
                });
            }
            this.setState({ matches });
        });
    }

    openResult(match, flag) {
        console.log(match, flag);
    }

    render() {
        const matches = this.state.matches;
        let MatchDOM = [];
        if (matches.length) {
            MatchDOM = matches.map(m => (
                <Row gutter={16} key={m.id} type="flex" justify="center" align="middle" className="match__item">
                    <Col span={6}>
                        <span className="match__desc">{m.match_desc}</span>
                        <span className="match__time">时间：{ (new Date(m.match_date * 1000)).toLocaleDateString() }</span>
                        <span className="match__time">{m.time}</span>
                    </Col>
                    <Col span={6}>
                        <img src={m.flag1} />
                        {m.country1}
                    </Col>
                    <Col span={6}>
                        <img src={m.flag2} />
                        {m.country2}
                    </Col>
                    <Col span={6}>
                        <Button onClick={() => this.openResult(m, 'win')}>{m.country1}赢</Button>
                        <Button onClick={() => this.openResult(m, 'fail')}>{m.country2}赢</Button>
                        <Button onClick={() => this.openResult(m, 'tie')}>平局</Button>
                    </Col>
                </Row>
            ));
        }

        return (
            <div className="match__list">
                { MatchDOM }
            </div>
        );
    }
}
