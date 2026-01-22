import BottomNavbar from '../../navbar/BottomNavbar';
import './pageFrame.css';
import SubPageFrame from './SubPageFrame';

function MainPageFrame({ components, className="", bottomNav=false }) {
  const classname = !bottomNav ? `${className} no-bottom-nav`: className;
  return (
    <div className="digId-main-frame-contr">
          <SubPageFrame components={components} className={classname} />

      {bottomNav && <BottomNavbar />}
    </div>

  );

}


export default MainPageFrame;