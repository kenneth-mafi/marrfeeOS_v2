import './mainPageFrame.css';
import BottomNavbar from '../../components/navbar/BottomNavbar';
import SubPageFrame from '../subPageFrame/SubPageFrame';

function MainPageFrame({ components, bottomNav=true, effect="fadeFast" }) {
  return (
    <div className="main-frame-contr">
      <div className="budgetly-scroll-area">
          <SubPageFrame components={components} effect={effect} />
      </div>
      
      {bottomNav && <BottomNavbar />}
    </div>
  );
}


export default MainPageFrame;