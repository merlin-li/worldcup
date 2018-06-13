import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Marketplace from './Marketplace';
import Signin from './Signin';
import Header from '../components/layouts/Header';
import Footer from '../components/layouts/Footer';
import Prizepool from './Prizepool';
import GroupStage from './GroupStage';

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <section>
                    <Header />
                    <Route exact path='/' component={Homepage} />
                    <Route exact path='/signin' component={Signin} />
                    <Route exact path='/marketplace' component={Marketplace} />
                    <Route exact path='/prizepool' component={Prizepool} />
                    <Route exact path='/groupstage' component={GroupStage} />
                    <Footer />
                </section>
            </Router>
        )
    }
};
