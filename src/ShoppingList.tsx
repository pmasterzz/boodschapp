import React from "react";
import { ShoppingListItem } from "./ShoppingListItem";
import { ShoppingItem } from "./models/shopping-item.model";
const uuid = require("uuid/v4");

interface ShoppingListState {
  items: ShoppingItem[];
  newItemName: string;
}

export class ShoppingList extends React.Component<any, ShoppingListState> {
  constructor(props: any) {
    super(props);
    this.state = {
      items: [],
      newItemName: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitItem = this.submitItem.bind(this);
    this.handleInputKeyUp = this.handleInputKeyUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  public handleInputChange(event: any): void {
    this.setState({ ...this.state, newItemName: event.target.value });
  }

  public handleInputKeyUp(event: any): void {
    if (event.key === "Enter") {
      this.submitItem();
    }
  }

  public render(): JSX.Element {
    const shoppingItems = this.getShoppingListItems();

    return (
      <div className="shopping-list-container">
        <div className="row">
          <div className="form-group col-md-9">
            <input
              type="text"
              placeholder="Add a new item..."
              onKeyUp={this.handleInputKeyUp}
              className="form-control"
              value={this.state.newItemName}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="col-md-3 text-right">
            <button
              className="w-100 btn btn-primary add-item-btn"
              onClick={this.submitItem}
            >
              <i className="fas fa-plus"></i> Add
            </button>
          </div>
        </div>

        <div className="mt-3 shopping-list">{shoppingItems}</div>
      </div>
    );
  }

  public getShoppingListItems(): JSX.Element[] {
    const { items } = this.state;

    return items.map(item => {
      return (
        <ShoppingListItem
          key={item.id}
          onChange={this.handleChange}
          onDelete={id => this.handleDeleteItem(id)}
          shoppingItem={item}
        ></ShoppingListItem>
      );
    });
  }

  public handleChange(changedItem: ShoppingItem): void {
    const items: ShoppingItem[] = this.state.items.map(item => {
      if (item.id === changedItem.id) {
        item = changedItem;
      }

      return item;
    });

    if (changedItem.checked) {
        const index = items.findIndex((item) => item.id === changedItem.id);
        items.push(items.splice(index, 1)[0]);
    }

    this.setState({ ...this.state, items });
  }

  public submitItem(): void {
    if (this.state.newItemName.trim() !== "") {
      const items: ShoppingItem[] = [
        { id: uuid(), name: this.state.newItemName, amount: 1, checked: false },
        ...this.state.items
      ];

      this.setState({ items, newItemName: "" });
    }
  }

  public handleDeleteItem(id: string): void {
    const items = this.state.items.filter(item => item.id !== id);

    this.setState({
      items
    });
  }
}
