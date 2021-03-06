import React from 'react';

export default class Header extends React.Component {
    render() {
        return (
            <div className="worldcup__banner">
                <section>
                    <a href="javascript:" className="worldcup__slogan">Join our Discord server</a> and purr with the WorldCup community.
                </section>

                <div className="worldcup__header">
                    <div className="worldcup__logo">
                        <i></i>
                        <a href="/">CryptoWorldCup</a>
                    </div>
                    <div id="worldcup__menu">
                        <a href="/signin">Start World-Cup</a>
                        <a href="/marketplace">Marketplace</a>
                        <a href="/groupstage">Group Stage</a>
                        <a href="/prizepool">PrizePool</a>
                    </div>
                    <div></div>
                </div>
            </div>
        );
    }
}
