import React from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import {DragSource, DropTarget} from 'react-dnd';
import ItemTypes from '../constants/itemTypes';

const appTSource = {
  beginDrag(props) {
    return { id: props.id };
  }
};

@DragSource(ItemTypes.APPT, appTSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class Appointment extends React.Component {
  state = {
    isShowingModal: false,
  }
  handleClick = () => this.setState({isShowingModal: true})
  handleClose = () => this.setState({isShowingModal: false})
  render() {
    const {connectDragSource, data} = this.props;

    return connectDragSource(<div onClick={this.handleClick}>
      <span>{data.title}</span>
      {
        this.state.isShowingModal &&
        <ModalContainer onClose={this.handleClose}>
          <ModalDialog onClose={this.handleClose}>
            <b>title:</b><span>{data.title}</span><br />
            <b>date:</b><span>{data.date}</span><br />
            <b>time:</b><span>{data.time}</span><br />
            <b>description:</b><span>{data.description}</span><br />
          </ModalDialog>
        </ModalContainer>
      }
    </div>);
  }
}
