import React from 'react';
import jsonp from 'jsonp';
import numeral from 'numeral';

export default class Currency extends React.Component{
  constructor(props){
    super(props);
    this.state = {ratio: 0, converted: 0};
    this.currencies = ["AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HRK", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PLN", "RON", "RUB", "SEK", "SGD", "THB", "TRY", "USD", "ZAR"];
    this.fetch = this.fetch.bind(this);
  }

  fetch(){
    const from = this.from.value;
    const to = this.to.value;
    const amount = +this.amount.value;
    jsonp(`http://api.fixer.io/latest?base=${from}`, null, (err, data) => {
      const ratio = data.rates[to];
      const converted = amount * ratio;
      this.setState({ratio, converted});
    });
  }

  render(){
    return (
      <div>
        <h1>Currency</h1>
        <div className="panel panel-default">
          <div className="panel-body">
            <label>From</label>
            <select ref={n => this.from = n}>{this.currencies.map((c, i) => <option key={i}>{c}</option>)}</select>
            <label>To</label>
            <select ref={n => this.to = n}>{this.currencies.map((c, i) => <option key={i}>{c}</option>)}</select>
            <input ref={n => this.amount = n} type="number" />
            <button onClick={this.fetch} className="btn btn-primary btn-sm">Convert</button>
          </div>
        </div>
        <div className="panel panel-info">
          <div className="panel-body">
            <h3>Ratio</h3>
            <div>{this.state.ratio}</div>
          </div>
        </div>
        <div className="panel panel-primary">
          <div className="panel-body">
            <h3>Converted</h3>
            <div>{numeral(this.state.converted).format('$0,0.00')}</div>
          </div>
        </div>
      </div>
    );
  }
}
