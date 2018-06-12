import React from 'react';
import ReactDOM from 'react-dom';

export default class Homepage extends React.Component {
    render() {
        return (
            <section>
                <div className="landing">
                    <div className="landing__description">
                        <h1 className="landing__headline">2018 RUSSIA</h1>
                        <h1 className="landing__headline">FIFA</h1>
                        <h1 className="landing__headline">Crypto World-Cup</h1>

                        <p className="landing__subheadline">2018 FIFA World Cup.</p>

                        <a className="button__largest" href="/signin">Start Now!</a>
                    </div>
                    <div className="landing__slots">
                        <div className="landing__pattern">
                            <div><img className="landing__country" src="/images/arg.jpeg" alt="Country 01" /></div>
                            <div><img className="landing__country" src="/images/aus.jpeg" alt="Country 02" /></div>
                            <div><img className="landing__country" src="/images/bel.jpeg" alt="Country 03" /></div>
                            <div><img className="landing__country" src="/images/brz.jpeg" alt="Country 04" /></div>
                            <div><img className="landing__country" src="/images/col.jpeg" alt="Country 05" /></div>
                            <div><img className="landing__country" src="/images/crc.jpeg" alt="Country 16" /></div>
                            <div><img className="landing__country" src="/images/cro.jpeg" alt="Country 06" /></div>
                            <div><img className="landing__country" src="/images/den.jpeg" alt="Country 07" /></div>
                            <div><img className="landing__country" src="/images/egy.jpeg" alt="Country 08" /></div>
                        </div>
                        <div className="landing__pattern">
                            <div><img className="landing__country" src="/images/eng.jpeg" alt="Country 06" /></div>
                            <div><img className="landing__country" src="/images/fra.jpeg" alt="Country 07" /></div>
                            <div><img className="landing__country" src="/images/ger.jpeg" alt="Country 08" /></div>
                            <div><img className="landing__country" src="/images/ice.jpeg" alt="Country 09" /></div>
                            <div><img className="landing__country" src="/images/irn.jpeg" alt="Country 11" /></div>
                            <div><img className="landing__country" src="/images/jpn.jpeg" alt="Country 17" /></div>
                            <div><img className="landing__country" src="/images/kor.jpeg" alt="Country 14" /></div>
                            <div><img className="landing__country" src="/images/mex.jpeg" alt="Country 15" /></div>
                            <div><img className="landing__country" src="/images/mor.jpeg" alt="Country 18" /></div>
                        </div>
                        <div className="landing__pattern">
                            <div><img className="landing__country" src="/images/irn.jpeg" alt="Country 11" /></div>
                            <div><img className="landing__country" src="/images/pan.jpeg" alt="Country 12" /></div>
                            <div><img className="landing__country" src="/images/per.jpeg" alt="Country 13" /></div>
                            <div><img className="landing__country" src="/images/pol.jpeg" alt="Country 14" /></div>
                            <div><img className="landing__country" src="/images/por.jpeg" alt="Country 15" /></div>
                            <div><img className="landing__country" src="/images/rus.jpeg" alt="Country 18" /></div>
                            <div><img className="landing__country" src="/images/sau.jpeg" alt="Country 01" /></div>
                            <div><img className="landing__country" src="/images/spa.jpeg" alt="Country 02" /></div>
                            <div><img className="landing__country" src="/images/swe.jpeg" alt="Country 03" /></div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
