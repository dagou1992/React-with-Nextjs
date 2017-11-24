import React, {Component} from 'react';
import BaseComponent from '../BaseComponent';

export default class FAQPage extends BaseComponent {
    componentDidMount() {
        this.statisticsPv('AddressPage');
    }

    componentWillUnmount() {
        const nextUrl = window.location.pathname;
        _czc.push(["_trackPageview", nextUrl, "FAQ"]);
    }

    render() {
        return (
            <div style={{marginTop: '0.76rem'}}>
                <div className="modul">
                    <div className="title">客服</div>
                    <div className="cont">
                        <p>1.客服QQ：3374442702</p>
                        <p>2.工作日在线客服时间为9:00-12:00，13:30-18:00，不在线期间您可以留言，我们会尽快回复。</p>
                        <p>3.若联系客服按钮点击无反应，请手动添加客服为好友，谢谢。</p>
                    </div>

                </div>
                <div className="modul" style={{position: 'relative'}}>
                    <div className="title">微信公众号</div>
                    <div className="cont"><p>微信公众号：汤姆猫乐园</p><p>微信公众号二维码：</p></div>
                    <img style={{width: '2rem', position: 'absolute', right: '0.3rem', top: '0.3rem'}} src="https://app-public.oss-cn-shanghai.aliyuncs.com/tom/icon_secondCode.jpg" alt=""/>
                </div>
                <div className="modul">
                    <div className="title">购买</div>
                    <div className="cont"><p>产品图片大多为实景拍摄，但由于各个显示器不同，会存在少许色差，应以到手实物为准。</p></div>
                </div>
                <div className="modul">
                    <div className="title">发货</div>
                    <div className="cont">
                        <p>1.除预售定制外，按付款时间，我们会在工作日48小时内陆续发货完成。工作日中午截单我们会尽量去安排好当日发货，下午晚上拍的订单次日处理，我们会加速发货的，请耐心等待，单号会稍晚更新。</p>
                        <p>2.如遇意外情况不能及时发货，我们会在24小时内与您联系并告知情况。</p>
                        <p>3.发货地：杭州</p>
                        <p>4.快递时效：全国主要城市3-5天，新疆、西藏、辽宁、吉林、黑龙江、甘肃、海南地区5-7天左右，具体物流信息请查看：个人中心-我的订单-查看物流。</p>
                    </div>
                </div>
                <div className="modul">
                    <div className="title">为什么查不到物流信息</div>
                    <div className="cont"><p>
                        1.产品出库当天，应该都不会有物流更新的，原因是快递班车是晚上才发车，到了集散点才会扫件，才会显示同步的物流。建议您在发货后24小时以后再查看物流详情。</p><p>
                        2.快递显示“离开XX地，或正发往XX地”后一两天未更新是正常情况，实际上，快件是在途中，等快件到达下一个中转站，入网扫描，才会更新。</p></div>
                </div>
                <div className="modul">
                    <div className="title">签收</div>
                    <div className="cont"><p>
                        请联系客服查询，如果未发货，可以让客服为您修改地址。收到商品时，请在快递在场的情况下检查快递包装，并开箱查验商品是否损坏、数量是否短缺。若无问题请放心签收，若有问题请不要签收，并及时联系客服。在签收后再发现缺损的，请恕我们无法维护您的权益，一切问题将由您自行承担。</p>
                    </div>
                </div>
                <div className="modul">
                    <div className="title">退换货－质量问题</div>
                    <div className="cont"><p>1.如宝贝存在质量问题，请联系客服，我们将向您取证，可能需要您拍摄提供相关图片，请尽力配合客服的工作，非常感谢。</p>
                        <p>2.确认后，请按客服提供的地址寄回商品；请尽量妥善包装，以免寄运过程中再次受损。</p>
                        <p>3.请务必在发回的包裹内附便条写明您的收件人名字和联系方式，以便我们及时帮您处理。</p>
                        <p>4.请务必垫付退货时的快递费用，我们拒收一切运费到付的快件，由此产生的责任将由您承担。</p>
                        <p>5.收到包裹后，我们会再次检查，确认存在质量问题的，我们将依照您的要求进行退货退款或调换。</p>
                    </div>
                </div>
                <div className="modul">
                    <div className="title">退换货－非质量问题</div>
                    <div className="cont"><p>1.若因使用不当造成商品损坏、或商品附属件不齐全、或收到货物超过7天，恕不接受退货。</p>
                        <p>2.我们不承担非质量问题的退换货交通运输费用。</p>
                        <p>
                            3.如需退换货，请先与客服取得联系，并按照客服提供的地址寄回商品，请务必在发回的包裹内附便条说明您的收件人名字和联系方式，以便我们及时帮您处理。请按照此退换货流程操作，自行退回恕不接受。</p>
                        <p>4.寄回商品时请仔细包装，保证商品及商品包装在运输中不会受到损坏。</p>
                        <p>5.退回商品若出现包装损坏、附件缺失等影响二次销售的情况，将无法办理退换货，或视损毁程度折扣退款，具体金额视品情况判定。</p>
                    </div>
                </div>
                <div className="lxkf">
                    <span onClick={() => this.chatWithService()}>联系客服</span>
                </div>
                <style jsx global>{`
                      .modul{
                        background:#fff;
                        margin-bottom:0.24rem;
                        padding:0.6rem 0.3rem 0.3rem;
                      }
                      .title{
                        color:#000;
                        opacity:0.87;
                        font-size:0.3rem;
                        margin-bottom:0.3rem;
                      }
                      .cont{
                        color:#000;
                        opacity:87%;
                        font-size:0.24rem;
                      }
                      .cont p{
                        margin:0.3rem 0;
                      }
                      .lxkf{
                        width:100%;
                        position:fixed;
                        bottom:0;
                        right:0;
                        background:#C3211C;
                        height:0.8rem;
                        text-align:center;
                        line-height:0.8rem;

                      }
                      .lxkf span{
                        font-size:0.28rem;
                        color:#fff;
                        opacity:0.87;
                        font-weight:300;
                        width: 100%;
                        display: inline-block;
                      }
                `}</style>
            </div>
        )
    }
}
