import { useEffect, useState } from 'react';
import './popup.css';
import { IPopup } from './popup-model';

//  Custom Popup component
const Popup = (props: IPopup) => {
  const [show, setShow] = useState(false);

  const closeHandler = () => {
    setShow(false);
    props.onClose(false);
  };

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  return (
    <div
      style={{
        visibility: show ? 'visible' : 'hidden',
        opacity: show ? '1' : '0'
      }}
      className='overlay'
    >
      <div className='popup'>
        <h2>{props.title}</h2>
        <span className='close' onClick={closeHandler}>
          &times;
        </span>
        <div className='content'>{props?.children}</div>
      </div>
    </div>
  );
};


export default Popup;
