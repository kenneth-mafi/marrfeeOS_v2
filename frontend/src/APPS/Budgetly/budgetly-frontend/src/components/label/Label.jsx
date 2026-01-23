import { Link } from 'react-router-dom';
import '../label/label.css';

export function Label({title, link, to}) {
   return (
     <div className="label-contr">
        <h3>{title}</h3>
        <Link to={to} className='p-small'>{link}</Link >
     </div>
   )
}
export function SmallLabel({title, link, crypto=false}) {
   return (
     <div className={`label-contr ${crypto ? "small-label" : ""}`}>
        <p className='p-small'>{title}</p>
        <p className='p-small'>{link}</p>
     </div>
   )
}