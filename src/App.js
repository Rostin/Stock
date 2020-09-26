import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      capital: 0,
      riskRatio: 2,
      returnriskRatio: 2,
      noOfShares: 0,
      profitPerShare: 0,
      stopLossPerShare: 0,
      stopLossPrice: 0,
      entryPrice: 0,
      targetPrice: 0,
      return: 0,
      money: 0,
      potentialProfit: 0,
      potentialLoss: 0
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.stopLossCalculation = this.stopLossCalculation.bind(this);
    this.changeRisk = this.changeRisk.bind(this);
    this.returnRiskCalculation = this.returnRiskCalculation.bind(this);
    this.calculateBasedOnEntry = this.calculateBasedOnEntry.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = parseFloat(target.value);
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
  stopLossCalculation(event){
    const target = event.target;
    const value = parseFloat(target.value);
    const name = target.name;

    this.setState({
      [name]: value,
      ["stopLossPerShare"]: (this.state.entryPrice - value),
      ["noOfShares"]: ((this.state.capital * this.state.riskRatio / 100.00)  / (this.state.entryPrice - value)),
      ["targetPrice"]: ((this.state.entryPrice - value) * this.state.returnriskRatio + parseFloat(this.state.entryPrice)),
      ["profitPerShare"]: ((this.state.entryPrice - value) * this.state.returnriskRatio + parseFloat(this.state.entryPrice)) - this.state.entryPrice,
      ["return"]: this.state.riskRatio * this.state.returnriskRatio,
      ["money"]: this.state.entryPrice *  ((this.state.capital * this.state.riskRatio / 100.00)  / (this.state.entryPrice - value)),
      ["potentialProfit"]: ((this.state.capital * this.state.riskRatio / 100.00)  / (this.state.entryPrice - value))* (((this.state.entryPrice - value) * this.state.returnriskRatio + parseFloat(this.state.entryPrice)) - this.state.entryPrice),
      ["potentialLoss"]: ((this.state.capital * this.state.riskRatio / 100.00)  / (this.state.entryPrice - value))* (this.state.entryPrice - value)

    });
  }

  calculateBasedOnEntry(event){
    const target = event.target;
    const value = parseFloat(target.value);
    const name = target.name;

    this.setState({
      [name]: value,
      ["stopLossPerShare"]: (value - this.state.stopLossPrice),
      ["noOfShares"]: ((this.state.capital * this.state.riskRatio / 100.00)  / (value - this.state.stopLossPrice)),
      ["targetPrice"]: ((value - this.state.stopLossPrice) * this.state.returnriskRatio + parseFloat(value)),
      ["profitPerShare"]: ((value - this.state.stopLossPrice) * this.state.returnriskRatio + parseFloat(value)) - value,
      ["return"]: this.state.riskRatio * this.state.returnriskRatio,
      ["money"]: value *  ((this.state.capital * this.state.riskRatio / 100.00)  / (value - this.state.stopLossPrice)),
      ["potentialProfit"]: ((this.state.capital * this.state.riskRatio / 100.00)  / (value - this.state.stopLossPrice)) * (((value - this.state.stopLossPrice) * this.state.returnriskRatio + parseFloat(value)) - value),
      ["potentialLoss"]: ((this.state.capital * this.state.riskRatio / 100.00)  / (value - this.state.stopLossPrice)) * (value - this.state.stopLossPrice)
    });
  }


  changeRisk(event){
    const target = event.target;
    const value = parseFloat(target.value);
    const name = target.name;

    this.setState({
      [name]: value,
      ["noOfShares"]: this.state.capital * value/100  / this.state.stopLossPerShare,
      ["return"]: (parseFloat(value) * this.state.returnriskRatio)
    });
  }

  returnRiskCalculation(event){
    const target = event.target;
    const value = parseFloat(target.value);
    const name = target.name;

    this.setState({
      [name]: value,
      ["targetPrice"]: this.state.stopLossPerShare * value + this.state.entryPrice,
      ["return"]: this.state.riskRatio * value
    });
  }

  render() {
    return (
      <form>
        <label>
          <span>Current Capital:</span>
          <input
            name="capital"
            type="number"
            value={this.state.capital}
            onChange={this.handleInputChange} />

          <span>Profit per Share:</span>
          <input
            name="profitPShare"
            value={this.state.profitPerShare} 
            readOnly/>
        </label>

        <label>
        <span>Entry price:</span>
          <input
            name="entryPrice"
            type="number"
            value={this.state.entryPrice}
            onChange={this.calculateBasedOnEntry} />
        </label>
        
        

        
        
        
        <br />
        <label>
          <span>Stop Loss Price:</span>
          <input
            name="stopLossPrice"
            type="number"
            value={this.state.stopLossPrice}
            onChange={this.stopLossCalculation} />

         <span>Stop Loss Per Share:</span>
          <input
            name="stopLossPerShare"
            value={this.state.stopLossPerShare}
            readOnly
           />
        </label>
        
 



        <br />
        <label>
          <span>Return Risk Ratio:</span>
          <input
            name="returnriskRatio"
            type="number"
            value={this.state.returnriskRatio}
            onChange={this.returnRiskCalculation} />
          <span>Target Price:</span>
          <input
            name="targetPrice"
            value={this.state.targetPrice} 
            readOnly/>
        </label>

        <br />
        <label>
          <span>Risk Ratio:</span>
          <input
            name="riskRatio"
            type="number"
            value={this.state.riskRatio}
            onChange={this.changeRisk} />

          <span>Number of Shares:</span>
          <input
            name="noOfShares"
            value={this.state.noOfShares}
            readOnly
            />
        </label>

        <br />
        <label>
          <span>Amount to invest:</span>
	  <input
	    name="money"
	    value={this.state.money}
	    readOnly/>
          <span>Return:</span>
          <input
            name="return"
            value={this.state.return} 
            readOnly/>
        </label>

        <br />
        <label>
          <span></span>
          <span>Potential Profit:</span>
          <input
            name="potentialProfit"
            value={this.state.potentialProfit}
            readOnly />
        </label>
        <br />
        <label>
          <span></span>
          <span>Potential Loss:</span>
          <input
            name="potentialLoss"
            value={this.state.potentialLoss}
            readOnly />
        </label>

      </form>
    );
  }
}


export default App;
