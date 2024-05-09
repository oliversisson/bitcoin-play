import React from 'react';

class Transaction extends React.Component {
  constructor(props) {
    super(props);

    const {t} = this.props;
    this.state = {                           
      selected: !!t.selected,
    }
  }

  onClick = () => {
    const {t} = this.props;
    t.selected = !t.selected;
    this.setState({selected: t.selected});
  }

  render() {
    const {t} = this.props;
    const style = t.selected ? {color: 'red', fontWeight: 'bold'} : {};
    return (
//    <React.Fragment>
      <div onClick={this.onClick}>
        <p style={style}>Fee: {t.fee}</p>
      </div>
    );
  }
}

export default Transaction;
