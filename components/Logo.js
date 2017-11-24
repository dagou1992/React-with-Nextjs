import React, {Component} from 'react';
import * as Mean from '../static/static_name';

export default class Logo extends Component {
    state = {
        showImg: true,
    }

    componentDidMount() {
        const url = window.location.href;
        url.indexOf('register') > -1 ? this.setState({showImg: false}) : null
    }

    render() {
        return (
            <div className="logoHeader">
                {
                    this.state.showImg ?
                        <img src={Mean.LOGO_SMALL} alt=""/> :
                        <span>登 录</span>
                }
                <style jsx>{`
                   .logoHeader{
                        height: 0.76rem;
                        line-height: 0.8rem;
                        border: 1px solid #DDD;
                        text-align: center;
                        overflow: hidden;
                        background: #fff;
                        position: fixed;
                        top:0;
                        width: 100%;
                        z-index: 1000;
                   }
                   .logoHeader img {
                        height: 100%;
                   }
                   .logoHeader span{
                        font-size: 0.3rem;
                   }
              `}</style>
            </div>
        )
    }
}
