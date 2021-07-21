import React from 'react';
import closeIcon from '../../../../assets/Chat/close-icon.svg';

function Header(props) {
  return (
    <div className='sc-header'>
      {/* <img className="sc-header--img" src={props.imageUrl} alt="" /> */}
      <img
        className='sc-header--img'
        src={
          'https://scontent.fcgk19-1.fna.fbcdn.net/v/t31.18172-8/18449719_288905068226376_1080667994610698649_o.jpg?_nc_cat=109&ccb=1-3&_nc_sid=09cbfe&_nc_eui2=AeFMjYAfvNhdNncbWEs82aiUCY5gXC25-eMJjmBcLbn548yzmIHVGCCqSddZ4H9bT8QdJHM98a1mlS7rBHTSU3SG&_nc_ohc=odagtZ_d0ZoAX-9Hf24&_nc_ht=scontent.fcgk19-1.fna&oh=a359c307316a03898b01c19de4e8c556&oe=60F4AF35'
        }
        alt=''
      />
      <div className='sc-header--team-name'> {props.teamName} </div>
      <div className='sc-header--close-button' onClick={props.onClose}>
        <img src={closeIcon} alt='' />
      </div>
    </div>
  );
}

export default Header;
