import React, { useState } from "react";
import { connect } from "@tableland/sdk";
// const connect_ = async () => {
//   const tableland = await connect({
//     network: "testnet",
//     chain: "polygon-mumbai",
//   });
//   console.log(tableland);
// };
export const create_creators_question_table = async () => {
  const tableland = await connect({
    network: "testnet",
    chain: "polygon-mumbai",
  });
  console.log(tableland);

  const name = await tableland.create(
    `creators_question_id integer primary key, wallet_address text, question text, option1 text, option2 text, option3 text, option4 text, option5 text, answer text, solution text, primary_tags text, secondary_tags text, nation_list text, added_at int, difficulty_level text, repo_name text, privacy int`, // Table schema definition
    {
      prefix: `creators_question_table`, // Optional `prefix` used to define a human-readable string
    }
  );
  console.log(name);
  return name;
};

export const create_creators_assessment_table = async () => {
  const tableland = connect({
    network: "testnet",
    chain: "polygon-mumbai",
  });
  console.log(tableland);
  const { name } = await tableland.create(
    `assesment_id integer primary key, creators_id integer, title text, description text, date_time int, fixed_cost int, variable_cost int, duration int, number_of_question int, created_at int, experiance_level int`, // Table schema definition
    {
      prefix: `creators_assesment_table`, // Optional `prefix` used to define a human-readable string
    }
  );

  console.log(name);
  return name;
};

export const create_creators_repo_table = async () => {
  const tableland = connect({
    network: "testnet",
    chain: "polygon-mumbai",
  });
  console.log(tableland);
  const { name } = await tableland.create(
    `repo_id integer primary key, wallet_address text, repo_name text, description text, visiblity int`, // Table schema definition
    {
      prefix: `creators_repo_table`, // Optional `prefix` used to define a human-readable string
    }
  );

  console.log(name);
  return name;
};

export const insert_creators_repo_table = async (
  tablename,
  wallet_address,
  repo_name,
  description,
  visiblity
) => {
  const tableland = await connect({
    network: "testnet",
    chain: "polygon-mumbai",
  });
  console.log(tablename);
  const allRepoName = await tableland.read(`SELECT * from ${tablename} where repo_name='${repo_name}'`);
  if (allRepoName['rows'].length > 0) {
    return { message: "repo already exists" };
  }
  const writeRes = await tableland.write(
    `INSERT INTO ${tablename} (wallet_address,repo_name,description,visiblity) VALUES ('${wallet_address}','${repo_name}','${description}',${visiblity});`
  );

  return writeRes
};

export const insert_creators_questions_table = async (
  tablename,
  wallet_address,
  question,
  option1,
  option2,
  option3,
  option4,
  option5,
  answer,
  solution,
  primary_tags,
  secondary_tags,
  nation_list,
  added_at,
  difficulty_level,
  repo_name,
  privacy
) => {
  const tableland = await connect({
    network: "testnet",
    chain: "polygon-mumbai",
  });
  const writeRes = await tableland.write(
    `INSERT INTO ${tablename} (wallet_address,question,option1,option2,option3,option4,option5,answer,solution,primary_tags,secondary_tags,nation_list,added_at,difficulty_level,repo_name,privacy) VALUES (${wallet_address},${question},${option1},${option2},${option3},${option4},${option5},${answer},${solution},${primary_tags},${secondary_tags},${nation_list},${added_at},${difficulty_level},${repo_name},${privacy});`
  );
  console.log(writeRes);
  return writeRes;
};

function TableQueries() {
  const [tableObject, setTableObject] = useState();

  //create question tabel
  const create_creators_question_table = async () => {
    const { name } = await tableObject.create(
      `creators_question_id integer primary key, creators_id integer, question text, option1 text, option2 text, option3 text, option4 text, option5 text, answer text, solution text, added_at int, difficulty_level text, repo_name text, privacy int`, // Table schema definition
      {
        prefix: `creators_question_table`, // Optional `prefix` used to define a human-readable string
      }
    );

    console.log(name);
    return name;
  };

  //create assessment table
  const create_creators_assessment_table = async () => {
    const { name } = await tableObject.create(
      `assesment_id integer primary key, creators_id integer, title text, description text, date_time int, fixed_cost int, variable_cost int, duration int, number_of_question int, created_at int, experiance_level int`, // Table schema definition
      {
        prefix: `creators_assesment_table`, // Optional `prefix` used to define a human-readable string
      }
    );

    console.log(name);
    return name;
  };
  //create repo table
  const create_creators_repo_table = async () => {
    const { name } = await tableObject.create(
      `repo_id integer primary key, creator_id integer, repo_name text, description text, visiblity int`, // Table schema definition
      {
        prefix: `creators_repo_table`, // Optional `prefix` used to define a human-readable string
      }
    );

    console.log(name);
    return name;
  };
  return <div>TableQueries</div>;
}

export default TableQueries;
