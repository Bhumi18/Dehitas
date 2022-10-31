import { useEffect } from "react";
import { useState } from "react";
import { connect } from "@tableland/sdk";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

import "./Myrepos.css"
function Mytest ()
{
    const [loading, setLoading] = useState(false);
    const [data,setData] = useState([]);
    const navigate = useNavigate();

    const cookies = new Cookies();
    useEffect(()=>{
        showTests()
    },[])
    async function showTests ()
    {
        const name = "creators_assesment_table_80001_2849";
        const tableland = await connect({
            network: "testnet",
            chain: "polygon-mumbai",
          });
            
          const creator_id = cookies.get('creatorID')
        
          
          const readRes = await tableland.read(`SELECT * FROM ${name} where creators_id='${creator_id}';`);
    console.log(readRes);
    for (let i = 0; i < readRes["rows"].length; i++) {
      data.push([
        readRes["rows"][i][0],
        readRes["rows"][i][10],
        readRes["rows"][i][2],
        readRes["rows"][i][3],
        readRes["rows"][i][4],
        readRes["rows"][i][5],
        readRes["rows"][i][6],
        readRes["rows"][i][7],
        readRes["rows"][i][8],
        readRes["rows"][i][9],
        readRes["rows"][i][10]
      ]);
    }
    setData(data);
    console.log(data);
    setLoading(true);
    }
    
     if (loading){   
        if(data.length > 0){

    return(
        <>
        <div className="parent-content">
            <div className='C_Content  pb-10'>
            <div className='title text-center font-primary font-bold py-8'>
                List of Assessment
            </div>
            <div className='Questions my-10'>
            {data.map((inde)=>{ 
                return(
                <div className='card-background uplift h-auto p-2 px-8 mb-4 rounded-md'>
                            <div className="Tittle font-primary w-40"><span className="hashtag">#</span> {inde[0]}</div>
                            <div className='Tittle font-primary'>
                                {inde[2]}
                            </div>
                            <div className="flex my-3 ">
                                <div className="mr-1 C_entity">
                                    No of Question:
                                </div>
                                <div className="values">
                                        {inde[8]}
                                </div> 
                                <div className="mr-1 ml-3 C_entity">
                                    Duration:
                                </div> 
                                <div className="values">
                                    {inde[6]}
                                </div>
                                
                                <div className="mr-1 ml-3 C_entity">
                                    Fix-price:
                                </div>
                                <div className="values">
                                        {inde[4]}
                                </div>
                                <div className="mr-1 ml-3 C_entity">
                                    Variable cost:
                                </div>
                                <div className="values">
                                        {inde[5]}
                                </div>
                            </div>

                   
                                <div className='font-secondary description'>
                                    {/* Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis, ducimus. Nesciunt ullam laudantium odio neque, maxime quaerat vero a voluptatibus ratione quidem quo dignissimos dolor libero vitae iusto odit facilis. */}
                                    {inde[3]}
                                </div>
                                <button className="create-assessment-btn p-4 rounded-md mb-3">
                                    View Assessment
                                </button>
                    
                </div>)
                })}
            </div>
          </div>
        
        </div>
        
        </>
    )
            }else{
                return (
                    <>
                      <div className="w-100% text-center flex items-center content-center h-screen">
                        <div className="w-fit m-auto">
                          <div className="text-4xl">
                            <span className="text-[#134e6f]">Ohh </span>
                            <span className="text-[#ff6150]">Snapp!!</span>
                          </div>
                          <div>
                            No Assessment Added Please add a Assessment by clicking{" "}
                            <span
                              className="cursor-pointer text-[#ff6150]"
                              onClick={() => {
                                navigate("/creator/assessment");
                              }}
                            >
                              here
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  );
              
            }

    }else{
        return "loading"
    }
}
export default Mytest;