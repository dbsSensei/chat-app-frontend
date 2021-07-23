import React from 'react';
import closeIcon from '../../../../assets/Chat/close-icon.svg';

function Header(props) {
  return (
    props.buttonActive && <div className='sc-header'>
      {/* <img className="sc-header--img" src={props.imageUrl} alt="" /> */}
      <img
        className='sc-header--img'
        src={
          props.currentRoom.img
        }
        alt=''
      />
      <div className='sc-header--team-name'> {props.currentRoom.name} </div>
      <div className='sc-header--close-button' onClick={props.onClose}>
        <img src={closeIcon} alt='' />
      </div>
    </div>
  );
}

export default Header;
