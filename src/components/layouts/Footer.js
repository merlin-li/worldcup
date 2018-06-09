import React from 'react';
import ReactDOM from 'react-dom';

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="worldcup__footer">
                <a href="javascript:">Terms of use</a>
                <a href="javascript:">Privacy policy</a>
                <a href="javascript:">&copy; 2018</a>
            </div>
        );
    }
}
