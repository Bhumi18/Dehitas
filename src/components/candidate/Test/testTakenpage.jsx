// import companyLogo from "../../creator/Images/Lampros_Tech_Logo.png";
import Cookies from "universal-cookie";
// import logout from "../../creator/Images/log-out-svgrepo-com.svg";
import congo from "../../creator/Images/congratulation.gif";
import "./testTaken.css";
function TestTakenpage() {
  const cookies = new Cookies();

  const logoutCookie = () => {
    cookies.remove("Token");
    cookies.remove("username");
    cookies.remove("email");
    navigator("/");
    window.location.reload();
  };
  return (
    <>
      <div className="u_parrent">
        <img className="u_congo" src={congo} alt=""></img>
        <div className="u_messageContainer">
          <div className="u_message">
            {/* <div class="zoom-in-out-box">Thank You for giving the Exam.</div> */}
            <div className="animated text-center fadeIn ">
              Thank You for giving the Exam.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default TestTakenpage;
