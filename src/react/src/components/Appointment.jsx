import React from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

export default class Appointment extends React.Component {
  state = {
    isShowingModal: false,
  }

  handleClick = () => this.setState({isShowingModal: true})
  
  handleClose = () => this.setState({isShowingModal: false})

  onDragStart = ev => {
    ev.dataTransfer.setData('calendar', this.props.data.id); 
  }
  
  render() {
    const {data} = this.props;

    return <li classNames="item" draggable="true" onDragStart={this.onDragStart} onClick={this.handleClick}>
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
    </li>;
  }
}