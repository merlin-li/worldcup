import React from 'react';
import ReactDOM from 'react-dom';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="worldcup__banner">
                <section>
                    <a href="javascript:" className="worldcup__slogan">Join our Discord server</a> and purr with the WorldCup community.
                </section>

                <div className="worldcup__header">
                    <div className="worldcup__logo">
                        <a href="/">CryptoWorldCup</a>
                    </div>
                    <div className="worldcup__menu">
                        <a href="/signin">Start World-Cup</a>
                        <a href="/marketplace">Marketplace</a>
                    </div>
                    <div></div>
                </div>
            </div>
        );
    }
}
