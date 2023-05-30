import React from "react";
import { Menu, ControllerButton, Input, Item } from "../Base/Components.js";
import { InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";

import Downshift from "downshift";

function UserSelect({ itemToString, items, ...rest }) {
  return (
    <Downshift itemToString={itemToString} {...rest}>
      {({
        getInputProps,
        getToggleButtonProps,
        getItemProps,
        isOpen,
        toggleMenu,
        clearSelection,
        selectedItem,
        inputValue,
        highlightedIndex,
      }) => (
        <div>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <span role="img" aria-label="user icon">
                  👨🏻‍💻
                </span>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              css={{ flexGrow: 15 }}
              {...getInputProps({
                isOpen,
                placeholder: "Choose the User",
              })}
            />
            {selectedItem ? (
              <ControllerButton
                onClick={clearSelection}
                aria-label="clear selection"
              >
                <i className="fa fa-times" />
              </ControllerButton>
            ) : (
              <ControllerButton {...getToggleButtonProps()}>
                <i className="fa fa-chevron-down" />
              </ControllerButton>
            )}
          </InputGroup>
          {!isOpen ? null : (
            <Menu>
              {items.map((item, index) => (
                <Item
                  key={`${item.email}-${index}`}
                  {...getItemProps({
                    item,
                    index,
                    isActive: highlightedIndex === index,
                    isSelected: selectedItem === item,
                  })}
                >
                  {itemToString(item)}
                </Item>
              ))}
            </Menu>
          )}
        </div>
      )}
    </Downshift>
  );
}

export default UserSelect;
