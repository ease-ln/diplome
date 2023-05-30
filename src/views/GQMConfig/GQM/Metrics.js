import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import {
    getListStyle,
    getItemStyle,
} from '../utils'

class Metrics extends React.Component {
    provided = this.props.provided
    snapshot = this.props.snapshot

    render() {
        return (
            <div
                className="p-1"
                ref={this.provided.innerRef}
                style={getListStyle(this.snapshot.isDraggingOver)}
            >
                {this.props.questionItems.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index} >
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style,
                                )}
                                className="mt-1 mb-2 mr-3 p-3"
                            >
                                {item.name || item.content}
                            </div>
                        )}
                    </Draggable>
                ))
                }
                {this.provided.placeholder}
            </div >
        )
    }
}

export default Metrics