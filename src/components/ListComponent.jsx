import React, { Component } from "react";
import "./ListComponent.css";

class ListComponent extends Component {
  render() {
    const { items, title } = this.props;

    return (
      <div className="list-component">
        <h2>{title || "List Items"}</h2>
        <ul className="item-list">
          {items?.length ? (
            items.map((item, index) => (
              <li key={index} className="list-item">
                {typeof item === "object"
                  ? item.displayName ||
                    item.name ||
                    item.title ||
                    `${item.firstName || ""} ${item.lastName || ""}`.trim() ||
                    "Unknown Item"
                  : item}
              </li>
            ))
          ) : (
            <li className="no-items">No items to display</li>
          )}
        </ul>
      </div>
    );
  }
}

export default ListComponent;
