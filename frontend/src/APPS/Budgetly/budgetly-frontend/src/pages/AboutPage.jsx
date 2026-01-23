import SubHeader from '../components/header/Header2';
import './aboutPage.css'

function AboutPage() {


    return (
      <div className="about-page">
          <SubHeader title={"About"} />
          <p>Budgetly v1.0.1</p>
          <p>Designed to help me track my income, expenses, and monitor my financial health</p>
      </div>
    )
}

export default AboutPage;