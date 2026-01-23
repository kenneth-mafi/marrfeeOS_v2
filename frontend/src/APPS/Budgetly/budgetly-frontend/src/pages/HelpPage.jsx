import SubHeader from "../components/header/Header2";
import './helpPage.css'


function HelpPage() {
   return (
    <div className="help-div">
      <SubHeader title={"Help"}/>
      <div id="help-container">
        <p className="page-description">
          Need assistance? Check our guides or reach out to support.
        </p>
        <ul class="help-list">
          <li>📘 User Guide – Learn how to use Budget App</li>
          <li>❓ FAQs – Answers to common questions</li>
          <li>📩 Contact Support – support@budgetly.com</li>
        </ul>
      </div>
    </div>    
   )
}

export default HelpPage;