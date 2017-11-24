import React, {Component} from 'react';
import {Carousel} from 'antd-mobile';

export default class Banner extends Component {
    state = {
        initialHeight: 200,
    }

    componentDidMount() {

    }

    render() {
        const hProp = this.state.initialHeight ? {height: this.state.initialHeight} : {};
        return (
            <div>
                <Carousel
                    className="my-carousel"
                    autoplay={this.props.banner.length > 1 ? true : false}
                    autoplayInterval={5000}
                    dots={true}
                    infinite
                    selectedIndex={0}
                    swipeSpeed={150}
                >
                    {
                        this.props.banner.map((item, index) => {
                            return item.type == 0 ? <img key={index}
                                                         src={item.pic}
                                                         alt="icon"
                                                         onClick={() => this.props.uploadClickData({
                                                             clickId: item.id,
                                                             clickType: 'banner'
                                                         })}
                            /> : (item.type == 2 ? <a key={index} id={item.id} href={item.content} style={hProp}>
                                <img
                                    src={item.pic}
                                    alt="icon"
                                    onClick={() => this.props.uploadClickData({clickId: item.id, clickType: 'banner'})}
                                />
                            </a> :
                                <a key={index} id={item.id} href={'/productDetail?spuSn=' + item.content} style={hProp}>
                                    <img
                                        src={item.pic}
                                        alt="icon"
                                        onClick={() => this.props.uploadClickData({
                                            clickId: item.id,
                                            clickType: 'banner'
                                        })}
                                    />
                                </a>)
                        })
                    }
                </Carousel>
                <style jsx global>{`
                 .my-carousel{
                    box-shadow: 0 3px 10px #ccc;
                 }
                 .my-carousel img {
                    width: 6.4rem;
                    height: 2.8rem;
                 }
                 .slider-list {
                    height: 2.8rem !important;
                 }
                 .am-carousel-wrap {
                    margin-bottom: 0.15rem;
                 }
                 .am-carousel-wrap-dot>span {
                      width: 0.3rem;
                      height: 0.05rem;
                      border-radius: 30%;
                 }
                 .am-carousel-wrap-dot-active>span {
                    background: #fff;

                 }
              `}</style>
            </div>
        )
    }
}

