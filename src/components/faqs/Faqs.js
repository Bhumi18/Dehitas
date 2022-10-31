import "./faqs.css";
import React, { useEffect, useState } from "react";
import Faq from "react-faq-component";

const data = {
  title: "FAQs",
  rows: [
    {
      title: "Do I need a wallet to create an account on Dehitas?",
      content: `Yes, Dehitas is a completely decentralised platform and the user profiles are maintained using their wallet address.`,
    },
    {
      title:
        "I have confidential company data that we use for hiring. Will that be safe?",
      content: `Yes, any data provided to Dehitas platform is either stored on IPFS/Filecoin or Tableland. Thus, your data is also stored decentrally and is private and secure.`,
    },
    {
      title: "Should I create my account as a Company or a Creator?",
      content: ` If you want to hire someone, you should create a Company profile. You can buy any assessment test that you want to use for screening. However, if you would like to create a customised test, you can create the account as a Creator. Currently, only Creators can add questions or create tests.`,
    },
    {
      title: "How can I find right candidates on Dehitas?",
      content:
        "You can create a Job Post on Dehitas and buy the tests you would require for screening the candidates. Candidates will apply to your posted jobs and you can approve them to give the test. Additionally, you can also invite Candidates to take the test. From the applicants, you can select the right fit for the role and schedule interviews.The interviews will be held on our Hireverse.",
    },
    {
      title: "What is Hireverse?",
      content: `HireVerse is an adaptation of Metaverse and its features. It creates a life-like experience and changes how the remote hiring process exists today.
        You can create your own avatar. You will have different access as per your profile. The Companies can create their private rooms in Hireverse where they can conduct their recruitment drive. `,
    },
    // {
    //   title: "Curabitur laoreet, mauris vel blandit fringilla",
    //   content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
    //           Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
    //           Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
    //           Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
    // },
    // {
    //   title: "What is the package version",
    //   content: <p>current version is 1.2.1</p>,
    // },
  ],
};

const styles = {
  // bgColor: 'white',
  titleTextColor: "#282133",

  // rowContentColor: 'grey',
  arrowColor: "#ff6150",
};

const config = {
  // animate: true,
  // arrowIcon: "V",
  // tabFocus: true
};

function Faqs() {
  return (
    <>
      <div>
        <Faq data={data} styles={styles} config={config} />
      </div>
    </>
  );
}

export default Faqs;
