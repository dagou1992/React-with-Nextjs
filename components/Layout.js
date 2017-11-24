import React, {Component} from 'react';

import Head from 'next/head';
import Logo from './Logo';

export default class Layout extends Component {
    state = {
        webUrl: '',
    }

    componentDidMount() {
        const a = document.getElementsByTagName('a');
        console.log(a.length);
        for(let i = 0; i< a.length; i++) {
            if(a[i].getAttribute('title') == '站长统计'){
                a[i].innerHTML = ''
            }
        }
    }

    render() {
        return (
            <div>
                <Head>
                    <title>汤姆猫商城</title>
                    <meta charset="UTF-8"/>
                    <meta name="viewport" id="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
                    <link rel='stylesheet' type='text/css'
                          href='https://cdn.bootcss.com/antd-mobile/1.4.0/antd-mobile.min.css'/>
                    <link rel="shortcut icon" href="/static/favicon.ico" />
                    <script dangerouslySetInnerHTML={{
                        __html: `
                        var _czc = _czc || [];
                        if(window.location.href.indexOf('test') > -1) {
                            id = '1264477970'
                        }else {
                            id = '1264477319'
                        }
                        _czc.push(["_setAccount", id]);
                        `
                    }}/>
                    <script dangerouslySetInnerHTML={{
                        __html: `
                        var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
                        if(window.location.href.indexOf('test') > -1) {
                            document.write(unescape("%3Cspan id='cnzz_stat_icon_1264477970'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s19.cnzz.com/z_stat.php%3Fid%3D1264477970' type='text/javascript'%3E%3C/script%3E"));
                        }else {
                            document.write(unescape("%3Cspan id='cnzz_stat_icon_1264477319'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s19.cnzz.com/z_stat.php%3Fid%3D1264477319' type='text/javascript'%3E%3C/script%3E"));
                        }
                        `}} />
                    <script src="/static/aes.js"></script>
                    <script src="/static/mode-ecb.js"></script>
                    <script dangerouslySetInnerHTML={{
                        __html: `(function (doc, win) {
                var docEl = doc.documentElement;
                resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
                recalc = function () {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                if(clientWidth>=640){
                docEl.style.fontSize = '100px';
            }else{
                docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
            }
            };

                if (!doc.addEventListener) return;
                win.addEventListener(resizeEvt, recalc, false);
                doc.addEventListener('DOMContentLoaded', recalc, false);
            })(document, window);
            `
                    }}/>
                </Head>
                <Logo />
                {this.props.children}
                <style jsx global>{`
                     body,p,ul,li,h1,h2,h3,h4,h5{
                        margin: 0;
                        padding: 0;
                     }
                     body{
                        background: #efefef;
                        font-family: "SimHei";
                     }
                     h1,h2,h3,h4,h5{
                        font-weight: 500;
                     }
                     a{
                        text-decoration: none;
                     }
                     .am-icon-lg{
                        display: none;
                     }
                     .am-modal-button-group-h .am-modal-button, .am-modal-button-group-v .am-modal-button{
                        height: 0.8rem;
                        line-height: 0.8rem;
                        font-size: 0.3rem;
                     }
                     .am-modal-button-group-h .am-modal-button:last-child, .am-modal-button-group-v .am-modal-button:last-child{
                        color: #C3221C;
                     }
                     .IsNoData{
                        position: absolute;
                        top: 40%;
                        left: 24%;
                        font-size: 0.3rem;
                     }
                     .am-modal-content{
                        z-index: 99999;
                     }
                     .am-toast-notice-content .am-toast-text{
                        min-width: 1.7rem;
                     }
              `}</style>
            </div>
        )
    }
}

