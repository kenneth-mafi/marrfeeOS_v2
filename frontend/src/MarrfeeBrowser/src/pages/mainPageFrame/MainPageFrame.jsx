import './mainPageFrame.css';
import SubPageFrame from '../subPageFrame/SubPageFrame';

function MainPageFrame({ components, className="" }) {
  return (
    <div className="MBr-main-frame-contr">
      <div className="MBr-scroll-area">
          <SubPageFrame components={components} className={className} />
      </div>
    </div>

  );

}


export default MainPageFrame;