
import '../grids/grids.css';
import PlaceholderCard from '../cards/PlaceholderCard';
import { Label } from '../label/Label';
import { capitalize, generateId } from '../../utils/utils';
import { useBudget } from '../../hooks/useContexts';

export function ColumnGrid({ items = [], myCoin, label, limit, cards=false, to, placeholder, NewComponent, currency }) {
  const {getSpent} = useBudget();
  
  if (!items.length && placeholder) {
    return (
      <>
        {label && <Label title={label.props.title}/>}
        <PlaceholderCard
          icon={placeholder.icon}
          message={placeholder.message}
        />     
        {
          placeholder.Button && (
            <placeholder.Button {...placeholder.buttonProps}/>
          )
        } 
      </>

    );
  }

  return (
    <>
      {label && <Label title={label.props.title} link={
        limit && (items.length === limit && "Show more")}
        to={to}
      />}

      <div 
        className={`grid-container ${cards ? "secondary" : ""}`}
        
      >
        {items.map(item => {
          const derivedSpent = getSpent(item.category);

          if(NewComponent){
              const trProps = {
                category: capitalize(item.category),
                date: item.date,
                group: item.group,
                spent: derivedSpent,
                currency: "kr",
                target: item.target,
                message: item.message,
                title: item.title,
                amount: item.amount,
                label: capitalize(item.label)
              }
            return (
              <NewComponent
                key={generateId()}
                {...trProps}
                to={to}
              />
            );
          }else{
              const Component = item.Component;
              if (!Component) return null;
                  return (
                    <Component
                      key={generateId()}
                      {...item.props}
                      myCoin={myCoin}
                      currency={currency}
                    />
                  );
          }

        })}
      </div>    
    </>

  );
}




export function RowGrid({ items }) {
  return (
    <div className="row-grid-contr">
      {items.map(item => {
        const GridItem = item.Component;
        if (!GridItem) return null;

        return (
          <GridItem
            key={generateId()}
            {...item.props}
          />
        );
      })}
    </div>
  );
}
