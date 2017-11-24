import React, {Component} from 'react';

export default class Footer extends Component {
    render() {
        return (
            <div>
                <p>Copyright © 2010-2017</p>
                <p>Outfit7 Limited. All Rights Reserved.</p>
                <p><a href="http://www.miitbeian.gov.cn/" style={{color: '#3CB9FB'}}>浙ICP备15015088号-4</a></p>
                <style jsx>{`
                   div{
                    text-align: center;
                    margin-bottom: 0.3rem;
                   }
                   p{
                    font-size: 0.14rem;
                    line-height: 0.28rem;
                    opacity: 0.8;
                   }
              `}</style>
            </div>
        )
    }
}
