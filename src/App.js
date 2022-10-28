// import { WagmiConfig, createClient } from "wagmi";
// import { getDefaultProvider } from "ethers";
// import Profile from "./components/xmtp/xmtp";
import Createrepo from "./components/creator/CreateRepo";
import CreatorHeader from "./components/creator/CreatorHeader";
import CreateAssesment from "./components/creator/CreateAssesment";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddQuestion from "./components/creator/Addquestion";
import Viewquestion from "./components/creator/viewquestion";
import Myrepos from "./components/creator/Myrepos";
import MyAssesments from "./components/creator/Mytest";
import Editrepo from "./components/creator/Editrepo";
import EditAssesment from "./components/creator/EditAssesment";
import TestTakenpage from "./components/candidate/Test/testTakenpage";
import TestInstructionpage from "./components/candidate/Test/TestInstructionpage";
import LandingPage from "./components/LandingPage";
import CompanyHeader from "./components/company/CompanyHeader";
import RecruitmentDetails from "./components/company/RecruitmentDetails";
import CandidateHeader from "./components/candidate/CandidateHeader";
import CandidateFeed from "./components/candidate/feed/CandidateFeed";
import EmailVeficationPage from "./components/EmailVeficationPage";
import TestDescription from "./components/company/TestDescription";
import TestsFeed from "./components/company/TestsFeed";
import CreatorsList from "./components/company/CreatorsList";
import RoleSelector from "./components/RoleSelector";
import CompanyRegForm from "./components/registartionforms/CompanyRegForm";
import CandidateRegForm from "./components/registartionforms/CandidateRegForm";
import CreatorRegForm from "./components/registartionforms/CreatorRegForm";
import CandidateEducation from "./components/registartionforms/CandidateEducation";
import CandidateExperience from "./components/registartionforms/CandidateExperience";
import CreatorExperience from "./components/registartionforms/CreatorExperience";
import CandidateTestResults from "./components/candidate/Test/CandidateTestResults";
import CandidateTest from "./components/candidate/Test/CandidateTest";
import Profile from "./components/Profile/Profile";
import Jobpost from "./components/company/Jobpost";
import AvailableTest from "./components/company/Availabletest";
import InviteCandidate from "./components/company/Invitecandidate";
import JobApplicant from "./components/company/JobApplicant";
import Jobinsights from "./components/company/JobInsight";
import CreatorMessage from "./components/creator/CreatorMessages";
import CandidateMessage from "./components/candidate/CandidateMessages";
import CompanyMessage from "./components/company/CompanyMessages";
import EditQuestion from "./components/creator/EditQuestion";
import QuestionFeed from "./components/creator/questionFeed";
import CreatorEducation from "./components/registartionforms/CreatorEducation";
import CreatorSignRequest from "./components/CreatorSignRequest";
import Verifyquestion from "./components/creator/Verifyquestion";
import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
} from "wagmi";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

// import { getDefaultProvider } from "ethers";
// import Profile from "./xmtp/xmtp";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
// import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import CandidateAchive from "./components/registartionforms/CandidateAchive";
import CreatorAchive from "./components/registartionforms/CreatorAchive";
import CandidateApplications from "./components/candidate/CandidateApplications";
import SingleRepo from "./components/creator/SingleRepo";

function App() {
  const { chains, provider, webSocketProvider } = configureChains(
    defaultChains,
    [alchemyProvider({ apiKey: "yourAlchemyApiKey" }), publicProvider()]
  );

  const client = createClient({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({ chains }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: "wagmi",
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
        },
      }),
      // new InjectedConnector({
      //   chains,
      //   options: {
      //     name: "Injected",
      //     shimDisconnect: true,
      //   },
      // }),
    ],
    provider,
    webSocketProvider,
  });
  // const client_ = createClient({
  //   autoConnect: true,
  //   provider: getDefaultProvider(),
  // });
  return (
    <div className="App">
      <WagmiConfig client={client}>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="signup/ev" element={<EmailVeficationPage />}></Route>
            <Route path="role" element={<RoleSelector />}></Route>
            <Route path="role/creator" element={<CreatorSignRequest />}></Route>

            <Route path="companyregform" element={<CompanyRegForm />}></Route>
            <Route path="creatorregform" element={<CreatorRegForm />}></Route>
            <Route
              path="creatorregform/creator-education"
              element={<CreatorEducation />}
            ></Route>
            <Route
              path="creatorregform/creator-experience"
              element={<CreatorExperience />}
            ></Route>
            <Route
              path="creatorregform/creator-achivements"
              element={<CreatorAchive />}
            ></Route>

            <Route
              path="candidateregform"
              element={<CandidateRegForm />}
            ></Route>
            <Route
              path="candidateregform/candidate-education"
              element={<CandidateEducation />}
            ></Route>
            <Route
              path="candidateregform/candidate-experience"
              element={<CandidateExperience />}
            ></Route>
            <Route
              path="candidateregform/candidate-achivements"
              element={<CandidateAchive />}
            ></Route>

            <Route path="creator" element={<CreatorHeader />}>
              <Route path="creator_repo" element={<Createrepo />} />
              <Route path="assessment" element={<CreateAssesment />} />
              <Route path="question" element={<AddQuestion />} />
              <Route path="my_question" element={<Viewquestion />} />
              <Route path="my_repo" element={<Myrepos />} />
              <Route path="my_assessment" element={<MyAssesments />} />
              <Route path="edit_repo" element={<Editrepo />} />
              <Route path="edit_assesment" element={<EditAssesment />} />
              <Route path="message" element={<CreatorMessage />} />
              <Route path="VerifyQuestion" element={<Verifyquestion />} />

              <Route path="repo/:key" element={<SingleRepo />} />
              <Route path="" element={<QuestionFeed />} />
              <Route path="creator-profile" element={<Profile />} />
            </Route>

            <Route path="company" element={<CompanyHeader />}>
              <Route
                path="recruitment-details"
                element={<RecruitmentDetails />}
              />
              <Route path="" element={<TestsFeed />} />
              <Route path="creators" element={<CreatorsList />} />
              <Route path="testdescrption" element={<TestDescription />} />
              <Route path="jobpost" element={<Jobpost />} />
              <Route path="availabletests" element={<AvailableTest />} />
              <Route path="invitecandidates" element={<InviteCandidate />} />
              <Route path="jobapplicant" element={<JobApplicant />} />
              <Route path="jobinsights" element={<Jobinsights />} />
              <Route path="message" element={<CompanyMessage />} />
              <Route path="company-profile" element={<Profile />} />
            </Route>

            <Route path="candidate" element={<CandidateHeader />}>
              <Route path="" element={<CandidateFeed />} />
              <Route path="candidate-test" element={<CandidateTest />} />
              <Route
                path="candidate-test-results"
                element={<CandidateTestResults />}
              />
              <Route path="candidate-profile" element={<Profile />} />
              <Route path="applications" element={<CandidateApplications />} />
              <Route path="testtakenpage" element={<TestTakenpage />} />
              <Route path="testInstruction" element={<TestInstructionpage />} />
              <Route path="message" element={<CandidateMessage />} />
            </Route>
          </Routes>
        </Router>
      </WagmiConfig>
    </div>
  );
}

export default App;
