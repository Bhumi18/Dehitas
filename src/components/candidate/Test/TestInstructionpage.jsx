import "./testInstruction.css"

function TestInstructionpage()
{
    return(
        <>
            <div className='u_dashBoard'>
                            <h1 className='u_testName  text-center'>Test</h1>
                            <div id="u_landingtext"> Welcome To Company name Online Exam Portal. Kindly, Read the all instructions carefully. Candidates are requested to take the test honestly, ethically, and should follow all the instructions.
                            </div>
                            <p className='u_heading'>Instruction</p>
                            <div className='u_instruction'>
                                <p>1. Exam has total 20 Questions.</p>
                                <p>2. All questions are compulsory and each carries One mark. .</p>
                                <p>3. Total Time for exam is 60 Minutes.</p>
                                <p>4. Negative marking is applicable for wrong or unchecked answers.</p>
                                <p>5. The students just need to click on the Right Choice / Correct option from the
                                    multiple choices /options given with each question. For Multiple Choice Questions,
                                    each question has four options, and the candidate has to click the appropriate
                                    option.</p>
                            </div>
                            <h1 className='u_wish text-center'>Best Of Luck For Your Exam</h1>

                            <div className="w-full text-center"><button className='u_startButton' >Start</button></div>
                        </div>
        </>
    )
}
export default TestInstructionpage;