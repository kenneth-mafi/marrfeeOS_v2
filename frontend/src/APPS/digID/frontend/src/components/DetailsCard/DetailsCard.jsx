import './detailsCard.css';

const DetailsCard = ({customer, userName}) => {
    const color = customer === "" ? "red" : "";

    return (
      <div className={`digId-address-card-contr`}>
          <p className={`digId-client-name`}>{userName}</p>
          <p className={`digId-purpose`}>Identifing Yourself at:</p>
          <p className={`digId-request-location`}
             style={{color: color}}
          >
            {customer ? customer : "Unidentified Source"}</p>
      </div>
    )
}

export default DetailsCard;