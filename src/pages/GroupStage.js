import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Row, Col, Button } from 'antd';

export default class GroupState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matches: []
        };
    }
    componentDidMount() {
        this.renderMatches();
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
            console.log(matches);
            this.setState({ matches });
        });
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
                        <Button>{m.country1}赢</Button>
                        <Button>{m.country2}赢</Button>
                        <Button>平局</Button>
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
