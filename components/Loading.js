import React, {Component} from 'react';
import {WhiteSpace, ActivityIndicator} from 'antd-mobile';

export default class Loading extends Component {
    render() {
        return (
            <div className="loading">
                <div>
                    <WhiteSpace size="lg"/>
                    <ActivityIndicator
                        text="加载中..."
                    />
                    <WhiteSpace size="lg"/>
                </div>
                <style jsx global>{`
                    .loading{
                        display: flex;
                        justify-content: center;
                        height: 3rem;
                    }
                `}</style>
            </div>
        )
    }
}