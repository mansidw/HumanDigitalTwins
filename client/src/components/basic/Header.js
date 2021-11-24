import React from 'react'
import '../../assets/css/header.css'
import { logOut } from '../../services/firebase';
import {Link,useNavigate} from "react-router-dom"
import back from "../../assets/img/humantwins3-removebg-preview.png"

const ESC_KEY_CODE = 'Escape';

const NavigationMenu = (props) => {
  const {
    a,
    tabs,
    navOpen,
    navIsAnimating,
    closeNav,
  } = props;

  const navigate = useNavigate();

  const keyPressHandler = ({ key }) => {
    if (key === ESC_KEY_CODE && navOpen) {
      closeNav();
    }
  };

  const afunc=()=>{
    logOut()
    window.location.reload(false);
    navigate('/')
  }
  
  React.useEffect(() => {
    window.addEventListener('keydown', keyPressHandler);
    return () => {
      window.removeEventListener('keydown', keyPressHandler);
    };
  }, [navOpen]);


  const classes = `${navOpen ? ' active' : ''}${navIsAnimating ? ' is-animating' : ''}`;
  return (
    <div className={`navigation-menu${classes}`}>
      <div className="wrap">
        <div className="cols">
          <div className="col col-left col-links">
            <ul className="links">
              {Object.keys(tabs).map((key, index)=> {
                  return (<li className="link" key={index}>
                    <Link to={tabs[key]} >
                      {key}
                    </Link>
                  </li>)
                })}
               {a=="1"?(
                 <li className="link" >
                 <Link to="#" onClick={afunc} >
                   LOGOUT
                 </Link>
               </li>
               ):<></>}
                

            </ul>
          </div>
          <div className="col col-right col-image">
            <img
              className="astro"
              src={back}
              height="100px" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = (props) => {
    const {
        navOpen,
        navIsAnimating,
        toggleNavHandler,
      } = props;
      return (
        <header
          className="header"
        >
          <div className="wrap">
            <button
              className={`nav-button${navIsAnimating ? ' is-animating' : ''}`}
              type="button"
              aria-label="Toggle Navigation"
              onClick={event => toggleNavHandler(event)}
            >
              <span className={`label--nav-closed${!navOpen ? ' active' : ''} selfmade`}>MENU</span>
              <span className={`label--nav-open${navOpen ? ' active' : ''}`}>CLOSE</span>
            </button>
          </div>
        </header>
      );
}

export { NavigationMenu, Header };
