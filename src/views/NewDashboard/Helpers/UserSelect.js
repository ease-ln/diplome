import React from "react";
import { Menu, ControllerButton, Input, Item } from "../../Base/Components.js";
import {
  InputGroup,
  // InputGroupAddon, InputGroupText
} from "reactstrap";

import Downshift from "downshift";

function UserSelect({ items, ...rest }) {
  return (
    <Downshift {...rest}>
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
        <div style={{ width: "max-content" }}>
          <InputGroup>
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
            <Menu
              style={{
                backgroundColor: "white",
                position: "relative",
                zIndex: 100,
                boxShadow: "0px 15px 15px 15px #f7f7f7",
              }}
            >
              {items.map((item, index) => (
                <Item
                  key={`${item}-${index}`}
                  {...getItemProps({
                    item,
                    index,
                    isActive: highlightedIndex === index,
                    isSelected: selectedItem === item,
                  })}
                >
                  {item}
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
