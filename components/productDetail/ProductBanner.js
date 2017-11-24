import React, {Component} from 'react';
import {Carousel} from 'antd-mobile';

export default class ProductBanner extends Component {
    state = {
        initialHeight: 200,
    }

    componentDidMount() {

    }

    render() {
        const hProp = this.state.initialHeight ? {height: this.state.initialHeight} : {};
        return (
            <div className="productBanner">
                <Carousel
                    className="my-carousel"
                    autoplay={this.props.banner.length == 1 ? false : true}
                    autoplayInterval={5000}
                    dots={true}
                    infinite
                    selectedIndex={0}
                    swipeSpeed={150}
                >
                    {
                        this.props.banner.map((item, index) => {
                            return <img key={index} src={item} alt="icon"/>
                        })
                    }
                </Carousel>
                <style jsx global>{`
                 .productBanner .slider-list img {
                    width: 100%;
                    height: 6.4rem;
                 }
                 .productBanner .slider-list {
                    height: 6.4rem !important;
                 }
                 .productBanner .am-carousel-wrap {
                    margin-bottom: 0.15rem;
                 }
                 .productBanner .am-carousel-wrap-dot>span {
                      border-radius: 50%;
                      background: #000;
                      opacity: 0.5;
                 }
                 .productBanner .am-carousel-wrap-dot-active>span {
                    background: #fff;

                 }
              `}</style>
            </div>
        )
    }
}
