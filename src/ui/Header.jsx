import Icon from '@mdi/react';
import Drawer from './Drawer';
import SerialConnectButton from './SerialConnectButton';

import { mdiPlusThick, mdiWifiPlus, mdiUsb } from '@mdi/js';
import { useState, useId, useRef } from 'react';
import {
  drawer,
  header,
  menu,
  menuToggle,
  menuToggleLabel,
  title as titleClass,
} from './Header.module.css';

import { title } from '../config';

function Header({ onAddController, onConnectSerialPort }) {
  // We want the menu items to be ordered in reverse
  // in their grid. I.e. the logically first item
  // should render on the right.
  // I tried using flex-direction: row-reverse first
  // but that caused issues with the 0fr -> 1fr animation
  // then going from right to left, instead of left to right.
  const order = (
    (i) => () =>
      (i = i - 1)
  )(0);

  const [isMenuOpen, setMenuOpen] = useState(false);
  const id = useId();
  const checkBoxRef = useRef(null);

  // We'll remove the menu buttons from tab order while
  // the menu is closed
  const menuButtonTabIndex = isMenuOpen ? 0 : -1;

  return (
    <header className={header}>
      <svg
        height="40px"
        width="120px"
        viewBox="0 0 538.32733 115.18269"
        fill-rule="evenodd"
      >
        <path d="m 19.280506,19.813915 v 3.5574 h 27.199 c 12.7771,0 23.737,4.457 32.8799,13.3702 9.1428,8.9133 13.7143,19.7204 13.7143,32.4207 0,12.7006 -4.5907,23.546 -13.7716,32.535795 -9.1811,8.9898 -20.122,13.4847 -32.8226,13.4847 -12.7007,0 -23.6223,-4.4949 -32.7652,-13.4847 C 4.5715064,92.708215 6.4432267e-6,81.862815 6.4432267e-6,69.162215 V 0.533415 C 5.2793064,0.533415 9.8125064,2.427015 13.599506,6.214415 c 3.7871,3.787 5.681,8.3202 5.681,13.5995 z m 54.2831,49.3483 c 0,-7.5744 -2.6203,-14.0584 -7.8803,-19.4525 -5.2409,-5.3937 -11.6677,-8.0909 -19.2611,-8.0909 h -27.1417 v 27.5434 c 0,7.5745 2.6203,14.097 7.8803,19.5673 5.241,5.4706 11.6677,8.2057 19.2614,8.2057 7.5934,0 14.0202,-2.7351 19.2611,-8.2057 5.26,-5.4703 7.8803,-11.9928 7.8803,-19.5673 z m 73.219504,-45.7909 c 12.7006,0 23.6223,4.4949 32.7651,13.485 9.1429,8.9898 13.7143,19.8349 13.7143,32.5355 0,12.7006 -4.5714,23.5075 -13.7143,32.420995 -9.1428,8.9133 -20.0645,13.3699 -32.7651,13.3699 -12.7006,0 -23.6032,-4.4566 -32.7078,-13.3699 -9.1046,-8.913495 -13.6568,-19.720395 -13.6568,-32.420995 0,-12.7006 4.5522,-23.5457 13.6568,-32.5355 9.1046,-8.9901 20.0072,-13.485 32.7078,-13.485 z m 0,18.2475 c -7.5744,0 -13.9822,2.7354 -19.2229,8.2057 -5.2409,5.4706 -7.8613,11.9929 -7.8613,19.5673 0,7.5745 2.6204,14.0587 7.8613,19.4525 5.2407,5.394 11.6485,8.0909 19.2229,8.0909 7.5745,0 14.0012,-2.6969 19.2804,-8.0909 5.2793,-5.3938 7.9186,-11.878 7.9186,-19.4525 0,-7.5744 -2.6393,-14.0967 -7.9186,-19.5673 -5.2792,-5.4703 -11.7059,-8.2057 -19.2804,-8.2057 z m 127.5027,27.773 c 0,-7.4979 -2.6394,-14.0012 -7.9186,-19.5097 -5.2793,-5.5089 -11.6677,-8.2633 -19.1656,-8.2633 -7.5745,0 -14.0012,2.7354 -19.2804,8.2057 -5.279,5.4706 -7.9186,11.9929 -7.9186,19.5673 v 26.5105 c 0,5.279195 -1.8938,9.812395 -5.6809,13.599495 -3.7871,3.7873 -8.3203,5.6809 -13.5995,5.6809 V 69.391815 c 0,-12.7006 4.5521,-23.5457 13.6567,-32.5355 9.1046,-8.9901 20.0455,-13.485 32.8227,-13.485 12.7006,0 23.6032,4.4949 32.7078,13.485 9.1046,8.9898 13.6568,19.8349 13.6568,32.5355 v 45.790895 c -5.279,0 -9.8121,-1.8936 -13.5995,-5.6809 -3.7871,-3.7871 -5.6809,-8.3203 -5.6809,-13.599495 z m 74.5968,45.790895 c -12.7006,0 -23.6032,-4.4566 -32.7078,-13.3699 -9.1046,-8.913495 -13.6568,-19.720395 -13.6568,-32.420995 0,-12.7006 4.5522,-23.5457 13.6568,-32.5355 9.1046,-8.9901 20.0072,-13.485 32.7078,-13.485 h 27.199 c 0,5.0497 -1.7977,9.3535 -5.3938,12.911 -3.596,3.5578 -7.9188,5.3365 -12.9685,5.3365 h -8.8367 c -7.4979,0 -13.8864,2.7544 -19.1656,8.2633 -5.279,5.5085 -7.9186,12.0118 -7.9186,19.5097 0,7.4979 2.6396,13.9629 7.9186,19.3952 5.2792,5.4321 11.6677,8.1482 19.1656,8.1482 h 8.8367 c 5.0497,0 9.3725,1.7788 12.9685,5.336495 3.5961,3.5578 5.3938,7.8613 5.3938,12.911 z m -6.4267,-55.086795 h 33.6257 c 0,5.0879 -1.7977,9.3914 -5.3938,12.9302 -3.596,3.5385 -7.9188,5.3172 -12.9685,5.3172 h -15.2634 c -2.5248,0 -4.6673,-0.8606 -6.4267,-2.6013 -1.7598,-1.7215 -2.6396,-3.8636 -2.6396,-6.4074 0,-2.6207 0.8606,-4.8204 2.582,-6.5798 1.7215,-1.779 3.8829,-2.6589 6.4843,-2.6589 z"></path>
        <path
          d="m 496.97721,2.373415 c 8.9215,2.6419 16.9702,7.4897 24.1452,14.5449 11.4699,11.2785 17.2049,24.8842 17.2049,40.8175 0,15.9335 -5.735,29.4916 -17.2049,40.6734 -11.4704,11.182095 -25.1722,16.773495 -41.106,16.773495 -15.933,0 -29.611,-5.5914 -41.0335,-16.773495 -11.4216,-11.1818 -17.1329,-24.7399 -17.1329,-40.6734 0,-15.9333 5.7113,-29.539 17.1329,-40.8175 7.1807,-7.0903 15.2532,-11.9503 24.2167,-14.5834 v 19.6608 c -13.3044,6.3238 -22.5029,19.885 -22.5029,35.5961 0,21.7559 17.6364,39.3922 39.3923,39.3922 21.7559,0 39.3922,-17.6363 39.3922,-39.3922 0,-15.7116 -9.199,-29.2729 -22.504,-35.5967 z M 409.09411,1.4998581e-5 V 23.250915 h -17.2797 c 0,0 17.2797,3.8378 17.2797,10.0366 v 9.3645 29.8789 42.651795 c -5.2792,0 -9.8124,-1.8936 -13.5995,-5.6806 -3.7873,-3.7871 -5.6806,-8.3214 -5.6806,-13.599795 v -4.0913 -54.3166 -18.2137 c 0,-5.2796 1.8938,-9.8124 5.6812,-13.5998 3.7871,-3.7871 8.3203,-5.680900001419 13.5989,-5.680900001419 z m 71.2344,0 c 2.5509,0 4.7409,0.915000001419 6.5707,2.744800001419 1.8298,1.8297 2.7448,4.0203 2.7448,6.5707 v 0.1601 14.5987 0.1602 5.3671 0.1602 14.5987 0.1601 c 0,2.5498 -0.915,4.7404 -2.7448,6.5702 -1.8298,1.8297 -4.0198,2.7448 -6.5707,2.7448 -2.5506,0 -4.7407,-0.9151 -6.5704,-2.7448 -1.8298,-1.8298 -2.7445,-4.0204 -2.7445,-6.5702 v -0.1601 -14.5987 -0.1602 -5.3671 -0.1602 -14.5987 -0.1601 c 0,-2.5504 0.9147,-4.741 2.7445,-6.5707 1.8297,-1.8298 4.0198,-2.744800001419 6.5704,-2.744800001419 z"
          fill="#055e8b"
        ></path>
      </svg>
      <h1 className={titleClass}>{title}</h1>
      <nav
        className={menu}
        onBlur={(e) => {
          // Check if the new element receiving focus is still within
          // the nav menu.
          if (!e.currentTarget.contains(e.relatedTarget)) {
            // If not, close the menu
            setMenuOpen(false);
          }
        }}
      >
        <input
          type="checkbox"
          id={id}
          className={menuToggle}
          checked={isMenuOpen}
          onChange={(e) => setMenuOpen(e.target.checked)}
          // Safari won't focus the input with keyboard inteactions
          // if tabIndex isn't set
          tabIndex={0}
          ref={checkBoxRef}
        />
        <div className={drawer}>
          <ul className={menu}>
            <li onClick={onAddController} style={{ order: order() }}>
              <button tabIndex={menuButtonTabIndex}>
                <Icon path={mdiWifiPlus} size={1} />
              </button>
            </li>
            <li style={{ order: order() }}>
              <SerialConnectButton
                tabIndex={menuButtonTabIndex}
                onConnectPort={(port) => onConnectSerialPort(port)}
              >
                <Icon path={mdiUsb} size={1} />
              </SerialConnectButton>
            </li>
          </ul>
        </div>
        <label
          htmlFor={id}
          className={menuToggleLabel}
          // Negative tabIndex will remove the label from
          // tab order, but will allow it to receive focus
          // This way, during nav onBlur delegation, we can
          // see if the label was clicked (relatedTarget).
          tabIndex={-1}
          // We don't actually want to have focus on the label
          // though, so redirect focus back to the checkbox input.
          onFocus={() => checkBoxRef.current.focus()}
        >
          <Icon path={mdiPlusThick} size={1} />
        </label>
      </nav>
    </header>
  );
}

export default Header;
