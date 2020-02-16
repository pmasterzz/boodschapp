import React from "react";

interface CounterProps {
  amount: number;
  onAmountChange: (amount: number) => void;
}

export class Counter extends React.Component<CounterProps> {
  public render(): JSX.Element {
    const { amount } = this.props;
    return (
      <div className="counter text-center">
        <i
          className="fas fa-chevron-up"
          onClick={() => this.handleAmountChange(true)}
        ></i>
        {amount}
        <i
          className="fas fa-chevron-down"
          onClick={() => this.handleAmountChange(false)}
        ></i>
      </div>
    );
  }

  public handleAmountChange(increase: boolean): void {
    const amount = increase ? 1 : -1;

    if (this.props.amount + amount >= 0) {
      this.props.onAmountChange(this.props.amount + amount);
    }
  }
}
