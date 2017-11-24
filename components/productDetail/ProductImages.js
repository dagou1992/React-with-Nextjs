import React, {Component} from 'react';
import LazyLoad from 'react-lazyload';

import Loading from '../Loading';

export default class ProductImages extends Component {
    render() {
        return (
            <div>
                <div className="productImages">
                    <div className="title">
                        <h1>商品详情</h1>
                    </div>
                    <div className="imagesList">
                        {
                            this.props.data && this.props.data.map((item, index) => {
                                return (
                                    <LazyLoad
                                        key={index}
                                        height={100}
                                        offset={100}
                                        once
                                        placeholder={<Loading/>}
                                    >
                                        <img
                                            src={item}
                                        />
                                    </LazyLoad>
                                )
                            })
                        }
                    </div>
                </div>
                <style jsx>{`
                    .productImages .title{
                        width: 100%;
                        height: 0.9rem;
                        background: #fff;
                        margin-top: 0.3rem;
                    }
                    .productImages .title h1{
                        font-size: 0.3rem;
                        color: #000;
                        opacity: 0.8;
                        padding: 0.3rem;
                    }
                    .productImages .imagesList{
                        width: 6.4rem;
                        font-size: 0;
                    }
                    .imagesList img{
                        width: 100%;
                        display: block;
                    }
                `}</style>
            </div>
        )
    }
}
