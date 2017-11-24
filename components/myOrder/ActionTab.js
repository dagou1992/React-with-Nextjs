import React, {Component} from 'react';
import {Tabs} from 'antd-mobile';
import OrderList from './OrderList';

const TabPane = Tabs.TabPane;

export default class ActionTab extends Component {
    state = {
        arr: [1, 2, 3, 4]
    }

    render() {
        return (
            <div className="actionTab">
                <Tabs
                    swipeable={false}
                    speed={1}
                >
                    <TabPane tab='全部' key="1">
                        <OrderList data={this.props.allOrder}/>
                    </TabPane>
                    <TabPane tab='待支付' key="2">
                        <OrderList data={this.props.undoneOrder}/>
                    </TabPane>
                    <TabPane tab='已支付' key="3">
                        <OrderList data={this.props.doneOrder}/>
                    </TabPane>
                </Tabs>
                <style jsx global>{`
                    .actionTab .am-tabs-bar .am-tabs-tab-active{
                        color: #C3221B;
                    }
                    .actionTab .am-tabs-ink-bar{
                        background: #C3221B;
                    }
                    .actionTab .am-tabs-bar .am-tabs-tab{
                        font-size: 0.24rem;
                        border-bottom: 0;
                    }
                `}</style>
            </div>
        )
    }
}
