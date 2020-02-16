import { ShoppingItem } from "./models/shopping-item.model";
import React from "react";
import { Counter } from "./Counter";

interface ShoppingItemProps {
  shoppingItem: ShoppingItem;
  onDelete: (id: string) => void;
  onChange: (item: ShoppingItem) => void;
}

export class ShoppingListItem extends React.Component<ShoppingItemProps> {
  constructor(props: ShoppingItemProps) {
    super(props);

    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleCheckClick = this.handleCheckClick.bind(this);
  }

  public render(): JSX.Element {
    const { shoppingItem, onDelete } = this.props;

    return (
      <div
        className={
          "shopping-list-item " + (shoppingItem.checked ? " checked" : "")
        }
      >
        <div className="row">
          <div className="col-2 col-md-2">
            <Counter
              amount={shoppingItem.amount}
              onAmountChange={this.handleAmountChange}
            ></Counter>
          </div>

          <div className="col-10 col-md-7 align-vertical">
            <span className="title">{shoppingItem.name}</span>
          </div>

          <div className="col-md-3 buttons">
            <div className="row">
              <div className="col-6 col-md-12">
                <button
                  className="btn btn-danger w-100"
                  onClick={() => onDelete(shoppingItem.id)}
                >
                  <i className="fas fa-times"></i> Delete
                </button>
              </div>

              <div className="col-6 col-md-12">
                <button
                  className={
                    "btn btn-success w-100 " +
                    (shoppingItem.checked ? "d-none" : "")
                  }
                  onClick={this.handleCheckClick}
                >
                  <i className="fas fa-check"></i> Check
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  public handleCheckClick(): void {
    this.props.onChange({ ...this.props.shoppingItem, checked: true });
  }

  public handleAmountChange(amount: number): void {
    this.props.onChange({ ...this.props.shoppingItem, amount });
  }
}
