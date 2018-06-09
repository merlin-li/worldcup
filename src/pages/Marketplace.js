import React from 'react';
import ReactDOM from 'react-dom';

export default class Marketplace extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <section className="marketplace__header">
                    <div>
                        <a href="javascript:">All Teams</a>
                    </div>
                </section>
                <ul className="marketplace__teams">
                    <li>
                        <div className="marketplace__box">
                            <span>Austri</span>
                            <img src="/images/arg.jpeg" />
                            <div>
                                Price: 3 ETH
                            </div>
                            <button>Buy</button>
                        </div>
                    </li>
                    <li>
                        <div className="marketplace__box">
                            <span>Austri</span>
                            <img src="/images/arg.jpeg" />
                            <div>
                                Price: 3 ETH
                            </div>
                            <button>Buy</button>
                        </div>
                    </li>
                    <li>
                        <div className="marketplace__box">
                            <span>Austri</span>
                            <img src="/images/arg.jpeg" />
                            <div>
                                Price: 3 ETH
                            </div>
                            <button>Buy</button>
                        </div>
                    </li>
                    <li>
                        <div className="marketplace__box">
                            <span>Austri</span>
                            <img src="/images/arg.jpeg" />
                            <div>
                                Price: 3 ETH
                            </div>
                            <button>Buy</button>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}
