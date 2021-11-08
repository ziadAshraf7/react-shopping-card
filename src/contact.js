
import { useHistory, useParams } from "react-router";
import NavBar from "./nav";

const Contact = (props) => {
    let ref = props.props
    return ( 
      <section className = "sec1">
          <NavBar ref={ref} />
          <div className = "components-wrapper">
              <h1>contact us </h1>
          </div>
      </section>
     );
}
 
export default Contact;