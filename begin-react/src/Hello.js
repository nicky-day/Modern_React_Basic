import React, {Component} from 'react';

class Hello extends Component {
    static defaultProps = {
        name: '이름없음',
    }

    render() {
        const {isSpecial, name, color} = this.props;
        return (
            <div style={color}>
                {isSpecial && <b>*</b>}
                안녕하세요 {this.props.name}
            </div>
        );
    }
}

// function Hello({color, name, isSpecial}) {
//     return <div style={{
//         color
//     }}>
//         {isSpecial && <b>*</b>}
//         안녕하세요 {name}
//     </div>;
// }

// Hello.defaultProps = {
//     name: '이름없음'
// }

export default Hello;           // Hello 라는 컴포넌트를 만들어 리턴한다.
