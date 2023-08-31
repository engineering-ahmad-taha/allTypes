import React, { useState, useRef } from 'react'
import trueImage from './images/true.png';
import falseImage from './images/false.png';
import edit from './images/edit.png';
import hourglass from './images/hourglass.png';

function App() {


  // totalTypes STATE
  const [totalTypes, settotalTypes] = useState([]);



  // FIB STATE
  
  const [fib, setFib] = useState([]);
  const [text, setText] = useState('');
  const [fibContainer, setFibContainer] = useState([]);
  


  // TRUE FALSE STATE

  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState([]);
  const textareaRef = useRef();














// START FAB FUNCTIONS


//   const addFibToContainer = () => {

//         // Reset properties of each fib question
//         const resetFib = fib.map(q => ({
//           ...q,
//           tempInput: "",
//           inputValues: {},
//           isSubmitted: false,
//           userAnswer: null,
//           isEditing: false,
//           is_correct: 0
//       }));

//     // Check if all fib questions are submitted
//     const allSubmitted = fib.every(q => q.isSubmitted);



//     // Create a new container object
//     const newContainer = {
//       id: Date.now(),
//       type: "fillBlank",
//       questions: resetFib,  // Use the reset fib questions
//       TotalMark: "",
//       allSubmitted  // this will be either true or false
//     };

//     // Add the new container to fibContainer
//     setFibContainer(prev => [...prev, newContainer]);
    
//     // Add fibContainer to settotalTypes
//     settotalTypes(totalTypes => [...totalTypes, newContainer]);

//     // Clear the fib questions
//     setFib([]);
// };




















// const addFibToContainer = () => {

//   // Reset properties of each fib question
//   const resetFib = fib.map(q => ({
//       ...q,
//       tempInput: "",
//       inputValues: {},
//       isSubmitted: false,
//       userAnswer: null,
//       isEditing: false,
//       is_correct: 0
//   }));

//   // Check if all fib questions are submitted
//   const allSubmitted = fib.every(q => q.isSubmitted);

//   // Create a new container object
//   const newContainer = {
//       id: Date.now(),
//       type: "fillBlank",
//       questions: resetFib,  // Use the reset fib questions
//       TotalMark: "",
//       allSubmitted  // this will be either true or false
//   };

//   // Add the new container to fibContainer and then add it to settotalTypes
//   setFibContainer(prev => {
//       const updatedContainers = [...prev, newContainer];
      
//       settotalTypes(totalTypes => {
//           const updatedTotalTypes = [...totalTypes, newContainer];

//           // Now that you've updated totalTypes, you can safely reset fib.
//           setFib([]);

//           return updatedTotalTypes;
//       });

//       return updatedContainers;
//   });
// };







































const addFibToContainer = () => {
  // Reset properties of each fib question
  const resetFib = fib.map(q => ({
    ...q,
    tempInput: "",
    inputValues: {},
    isSubmitted: false,
    userAnswer: null,
    isEditing: false,
    is_correct: 0
  }));

  // Check if all fib questions are submitted
  const allSubmitted = fib.every(q => q.isSubmitted);

  // Create a new container object
  const newContainer = {
    id: Date.now(),
    type: "fillBlank",
    questions: resetFib, // Use the reset fib questions
    TotalMark: "",
    allSubmitted // this will be either true or false
  };

  // Add the new container to fibContainer
  setFibContainer(prev => [...prev, newContainer]);

  // Add fibContainer to settotalTypes
  settotalTypes(prevTotalTypes => {
    const updatedTotalTypes = [...prevTotalTypes, newContainer];

    // Now that you've updated totalTypes, you can safely reset the fib questions.
    setFib([]);

    return updatedTotalTypes;
  });
};






























































  const handleInputChange2 = (e, index, fibId, containerId) => {
    const value = e.target.value;
    setFibContainer(prevContainers =>
      prevContainers.map(container => {
        if (container.id === containerId) {
          return {
            ...container,
            questions: container.questions.map(q =>
              q.id === fibId
                ? { ...q, inputValues: { ...q.inputValues, [index]: value } }
                : q
            )
          };
        }
        return container;
      })
    );
  };
  


  const handleInputChange = (e, index, fibId) => {
    setFib((prevFib) =>
      prevFib.map((q) =>
        q.id === fibId ? { ...q, inputValues: { ...q.inputValues, [index]: e.target.value } } : q
      )
    );
  };

  const convertToJSX = (text, inputValues, fibId, isSubmitted, options, userAnswer) => {
    if (!isSubmitted) {
      const parts = text.split(/({{{[^{}]*?}}})/g);
      return parts.map((part, index) => {
        if (part.startsWith('{{{') && part.endsWith('}}}')) {
          return (
            <input
              required
              key={index}
              name={`input-${index}`}
              type="text"
              className='input-fill-width'
              placeholder="Type"
              value={inputValues[index] || ''}
              onChange={(e) => handleInputChange(e, index, fibId)}
            />
          );
        }
        return part;
      });

    } else {
      return checkindeces(text, inputValues, fibId, options, userAnswer)
    }
  };







  const convertToJSX2 = (text, inputValues, fibId, isSubmitted, options, userAnswer, containerId) => {
    if (!isSubmitted) {
      const parts = text.split(/({{{[^{}]*?}}})/g);
      return parts.map((part, index) => {
        if (part.startsWith('{{{') && part.endsWith('}}}')) {
          return (
            <input
              required
              key={index}
              name={`input-${index}`}
              type="text"
              className='input-fill-width'
              placeholder="Type"
              value={inputValues[index] || ''}
              onChange={(e) => handleInputChange2(e, index, fibId, containerId)}
            />
          );
        }
        return part;
      });
    } else {
      return checkindeces(text, inputValues, fibId, options, userAnswer, containerId);
    }
  };
  








  const checkindeces = (text, inputValues, fibId, options, userAnswer) => {

    options = options.map(option => option.toLowerCase().trim())
    let allInsertedValues = Object.values(inputValues)
    allInsertedValues = allInsertedValues.map(value => value.toLowerCase().trim())

    const allInsertedValues2 = [];
    const options2 = [];
    let correctCount = 0;


    for (let i = 0; i < allInsertedValues.length; i++) {
      allInsertedValues2[i * 2 + 1] = allInsertedValues[i];
    }

    for (let i = 0; i < options.length; i++) {
      options2[i * 2 + 1] = options[i];
    }

    const parts = text.split(/({{{[^{}]*?}}})/g);
    const processedParts = parts.map((part, index) => {
      if (part.startsWith('{{{') && part.endsWith('}}}')) {
        if (allInsertedValues2[index] === options2[index]) {
          correctCount++;
        }
        return (
          <React.Fragment key={index}>
            <div
              style={{
                display: "inline-block",
                position: "relative",
                padding: '2px 6px',
                borderRadius: "5px",
                border: allInsertedValues2[index] === options2[index] ? "3px solid #137333" : "3px solid #B31412"
              }}
            >
              {inputValues[index]}

              <div style={{ position: "absolute", top: "-10px", left: "0px", width: "100%", display: "flex", justifyContent: "center" }}>
                {
                  allInsertedValues2[index] !== options2[index] ?
                    <img style={{ width: "20px" }} src={falseImage} alt="False" />
                    :
                    <img style={{ width: "20px" }} src={trueImage} alt="True" />
                }
              </div>

            </div>
          </React.Fragment>
        );
      }

      return part;
    })
    return [...processedParts, <React.Fragment key="final">
      <span style={{ color: 'rgb(16, 0, 158)', fontWeight: "bold" }}>
        {`  (${correctCount}/${options.length})`}
      </span></React.Fragment>];
  }


  const AddFib = (e) => {
    e.preventDefault();
    if (text.trim() !== '') {
      let sentence = text.replace(/{{{\s*}}}/g, "");

      let regex = /{{{([^{}]*?)}}}/g;
      let values = [];
      let match;

      while ((match = regex.exec(sentence)) !== null) {
        values.push(match[1].trim());
      }

      if (values.length === 0) {
        alert('question must contains fill-in-the-blank option');
        return;
      }

      const fibId = Date.now();

      setFib([...fib, {
        id: fibId,
        type: "fillBlank",
        question: sentence,
        options: values,
        tempInput: "",
        total_options: values.length, // initialize with the number of options
        inputValues: {},
        isSubmitted: false,
        userAnswer: null,
        isEditing: false,
        is_correct: 0  // initialize with 0
      }]);

    }
    setText('');
  };




  const toggleEditState = (fibId) => {
    setFib(prevFib =>
      prevFib.map(q => q.id === fibId ? { ...q, isEditing: !q.isEditing, tempInput: !q.isEditing ? q.question : q.tempInput } : q)
    );
  };



  // Add this function inside your App component
  const compareFunction = (inputValues, options) => {
    if (inputValues.length !== options.length) {
      return false;
    }

    for (let i = 0; i < inputValues.length; i++) {
      if (inputValues[i].trim() !== options[i]) {
        return false;
      }
    }

    return true;
  };


  const handleQuestionChange = (e, fibId) => {
    const newInput = e.target.value;

    setFib(prevFib =>
      prevFib.map(q =>
        q.id === fibId ?
          { ...q, tempInput: newInput } : q
      )
    );
  };




  const handleUpdateQuestion = (fibId, event) => {
    event.preventDefault();

    setFib(prevFib =>
      prevFib.map(q => {
        if (q.id === fibId) {
          const { cleanedSentence, options } = extractOptionsFromQuestion(q.tempInput);

          if (options.length < 1) {
            return q; // Return original question without modification
          }

          // Here, we determine the number of correct answers

          const correctAnswers = (q.userAnswer && Array.isArray(q.userAnswer))
            ? q.userAnswer.filter((ans, idx) => ans === options[idx]).length
            : 0;

          return {
            ...q,
            question: cleanedSentence,
            options: options,
            tempInput: '',
            isEditing: false,
            inputValues: {},
            userAnswer: [],
            isSubmitted: false,
            is_correct: correctAnswers,
            total_options: options.length
          };
        }
        return q;
      })
    );
  };



  const extractOptionsFromQuestion = (questionText) => {
    let sentence = questionText.replace(/{{{\s*}}}/g, "");
    let regex = /{{{([^{}]*?)}}}/g;
    let values = [];
    let match;

    while ((match = regex.exec(sentence)) !== null) {
      values.push(match[1].trim());
    }

    return {
      originalText: questionText,
      cleanedSentence: sentence,
      options: values
    };
  };



  const calculateQuestionResults = (question, options) => {
    const inputValues = question.inputValues;

    const hasNonEmptyAnswer = Object.values(inputValues).some(value => value.trim() !== '');

    if (!hasNonEmptyAnswer) {
      return { error: 'Please fill in the blanks before submitting.' };
    }

    const allInsertedValues = Object.values(inputValues);
    let correct = 0;

    for (let i = 0; i < allInsertedValues.length; i++) {
      if (allInsertedValues[i].toLowerCase().trim() == options[i].toLowerCase().trim()) {
        correct += 1;
      }
    }

    return {
      isSubmitted: true,
      userAnswer: Object.values(inputValues),
      is_correct: correct,
    };
};

const Answerquestion = (e, options, fibId) => {
    e.preventDefault();

    const questionToUpdate = fib.find((q) => q.id === fibId);
    const results = calculateQuestionResults(questionToUpdate, options);

    if (results.error) {
      alert(results.error);
      return;
    }

    setFib((prevFib) =>
      prevFib.map((q) =>
        q.id === fibId
          ? { ...q, ...results }
          : q
      )
    );
};

const AnswerQuestionInContainer = (e, options, fibId, containerId) => {
  e.preventDefault();

  setFibContainer(prevContainers => 
      prevContainers.map(container => {
          if (container.id === containerId) {
              const updatedQuestions = container.questions.map(q => {
                  if (q.id === fibId) {
                      const inputValues = q.inputValues;

                      const hasNonEmptyAnswer = Object.values(inputValues).some(value => value.trim() !== '');

                      if (!hasNonEmptyAnswer) {
                          alert('Please fill in the blanks before submitting.');
                          return q;
                      }

                      const isCorrect = compareFunction(Object.values(inputValues), options);

                      const allInsertedValues = Object.values(inputValues);
                      let correct = 0;

                      for (let i = 0; i < allInsertedValues.length; i++) {
                          if (allInsertedValues[i].toLowerCase().trim() == options[i].toLowerCase().trim()) {
                              correct += 1;
                          }
                      }

                      return {
                          ...q, 
                          isSubmitted: true, 
                          userAnswer: Object.values(inputValues), 
                          is_correct: correct
                      };
                  }
                  return q;
              });

              const allSubmitted = updatedQuestions.every(q => q.isSubmitted);
              const totalCorrect = updatedQuestions.reduce((sum, q) => sum + q.is_correct, 0);
              const totalOptions = updatedQuestions.reduce((sum, q) => sum + q.total_options, 0);

              return {
                  ...container,
                  questions: updatedQuestions,
                  allSubmitted: allSubmitted,
                  TotalMark: `${totalCorrect}/${totalOptions}`
              };
          }
          return container;
      })
  );
};





// END FAB FUNCTIONS





















// START TRUE FALSE FUNCTIONS


const addQuestion = (e) => {
  e.preventDefault();



  if (!e.target.checkbox) {
    return;
  }

  if (!e.target.checkbox.type == 'checkbox') {
    return
  }

  const questionText = e.target.sentence.value.trim();

  // Check if the sentence text is empty
  if (questionText === "") {
    alert("Please write the sentence");
    return;
  }


  const textarea = textareaRef.current;
  if (!textarea || textarea.name !== 'sentence' || textarea.placeholder !== 'Add a question sentence') {
    return (
      <textarea
        ref={textareaRef}
        name='sentence'
        placeholder='Add a question sentence'
        rows="2"
        style={{ width: "calc(100% - 89px)" }}
      />
    );
  }


  const newQuestion = {
    id: Date.now(),
    sentence: e.target.sentence.value,
    checkbox: e.target.checkbox.checked,
    mark: 0,
    counter: 0
  };

  setQuestion([...question, newQuestion]);

  // clear form inputs
  e.target.sentence.value = '';
  e.target.checkbox.checked = false;

}

const toggleCheckbox = (e, id) => {
  const updatedQuestion = question.map((q) => {
    if (q.id === id) {
      return {
        ...q,
        checkbox: e.target.checked,
      };
    }
    return q;
  });

  setQuestion(updatedQuestion);
};

const updateSentence = (e, id) => {
  const updatedQuestion = question.map((q) => {
    if (q.id === id) {
      return {
        ...q,
        sentence: e.target.value,
      };
    }
    return q;
  });

  setQuestion(updatedQuestion);
};




// const addAllSentence = () => {
//   // Check if any question has an empty sentence
//   const hasEmptySentence = question.some(q => q.sentence.trim() === "");

//   if (hasEmptySentence) {
//     alert("Please provide a sentence for empty text.");
//     return; // Exit the function early
//   }

//   let trueCount = 0;
//   let falseCount = 0;

//   for (let q of question) {
//     if (q.checkbox === true) {
//       trueCount++;
//     } else {
//       falseCount++;
//     }
//   }

//   if (trueCount === 0 || falseCount === 0) {
//     alert("Please ensure your questions contain both checked and unchecked boxes (true and false values) before submit.");

//     return; // Exit the function early
//   }

//   const userAnswer = question.map(q => ({ ...q, checkbox: null }));

//   setQuestions([...questions, { id: Date.now(), userAnswer, question, isSubmitted: false , type:"truefalse", TotalMark: 0 }]);

  
//   // Add True False to settotalTypes
//   settotalTypes([...totalTypes,{ id: Date.now(), userAnswer, question, isSubmitted: false,type:"truefalse", TotalMark: 0 }]);
  
//   setQuestion([])
  
// };







const addAllSentence = () => {
  // Check if any question has an empty sentence
  const hasEmptySentence = question.some(q => q.sentence.trim() === "");

  if (hasEmptySentence) {
    alert("Please provide a sentence for empty text.");
    return; // Exit the function early
  }

  let trueCount = 0;
  let falseCount = 0;

  for (let q of question) {
    if (q.checkbox === true) {
      trueCount++;
    } else {
      falseCount++;
    }
  }

  if (trueCount === 0 || falseCount === 0) {
    alert("Please ensure your questions contain both checked and unchecked boxes (true and false values) before submit.");
    return; // Exit the function early
  }

  const userAnswer = question.map(q => ({ ...q, checkbox: null }));

  const newEntry = {
    id: Date.now(),
    userAnswer,
    question,
    isSubmitted: false,
    type: "truefalse",
    TotalMark: 0
  };

  setQuestions(prevQuestions => [...prevQuestions, newEntry]);

  settotalTypes(prevTotalTypes => {
    const updatedTotalTypes = [...prevTotalTypes, newEntry];

    // Now that you've updated totalTypes, you can safely reset the question.
    setQuestion([]);

    return updatedTotalTypes;
  });
};













































const handleDelete = (e, id) => {
  const updatedQuestion = question.filter((q) => q.id !== id);
  setQuestion(updatedQuestion);
};

const handleOptionChange = (e, qesId, qId) => {
  setQuestions(prevQuestions =>
    prevQuestions.map(qes =>
      qes.id === qesId
        ? {
          ...qes,
          userAnswer: qes.userAnswer.map(q =>
            q.id === qId
              ? { ...q, checkbox: e.target.value === 'true' }
              : q)
        }
        : qes
    )
  );
};


const submitAnswers = (questionId) => {
  let targetQuestion = questions.find(qes => qes.id === questionId);
  
  if (!targetQuestion) {
      alert("Question not found");
      return; // Exit the function early
  }
  
  const allQuestionsAnswered = targetQuestion.userAnswer.every(q => q.checkbox !== null);
  
  if (!allQuestionsAnswered) {
      alert("Answer All Questions");
      return; // Exit the function early
  }
  
  let score = 0;
  
  // Calculate the total number of questions inside the current question set
  let numOfQuestions = targetQuestion.userAnswer.length;
  
  const updatedQuestions = questions.map((qes) => {
      if (qes.id !== questionId) return qes;
  
      const updatedUserAnswers = qes.userAnswer.map((ans, idx) => {
          if (ans.checkbox === qes.question[idx].checkbox) {
              score++;
              return { ...ans, counter: 1, mark: 1 };
          } else {
              return { ...ans, counter: 1, mark: 0 };
          }
      });
      
      // Compute the TotalMark as a ratio
      let totalMarkStr = `${score}/${numOfQuestions}`;
      
      return { ...qes, userAnswer: updatedUserAnswers, isSubmitted: true, TotalMark: totalMarkStr };
  });
  
  setQuestions(updatedQuestions);
  
  // Here score contains the total correct answers
  // alert(`Your Score is : ${score}`);
};


// END TRUE FALSE FUNCTIONS



























  return (
    <div>
      
      



<h1 style={{textAlign:"center",backgroundColor:"#FFF",margin:"7px"}}><span style={{color:"#5565EB"}}>Quiz</span>Master</h1>

<section style={{margin: "7px", padding: "5px",display:"flex",alignItems:"baseline",justifyContent:"space-between",flexDirection:"column"}}>
    <div style={{fontSize:"24px"}}>Title</div>
    <input type='text' placeholder='Enter a title for this quiz' style={{width:"500px",padding:"18px",border:"1px solid #E2E8F0",borderRadius:"10px",boxShadow:" 0 1px 2px #ccc"}} />
</section>


<section style={{margin: "7px", padding: "5px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
    <div style={{fontSize:"24px"}}>Questions</div>
    <div style={{border: "1px solid #D9E1EB",textAlign:"center",boxSizing:'border-box',padding:"7px",borderRadius:"10px",width:"191px",cursor:"pointer",fontSize:"16px",backgroundColor:"#FFFFFF",boxShadow:" 0 1px 2px #ccc"}}>  + &nbsp;  Add Question</div>
</section>

{totalTypes.length == 0 && 
<section style={{backgroundColor:"#F8FAFC",boxShadow:" 0 1px 2px #ccc",height:"416px",borderRadius:"8px",margin: "12px", padding: "5px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",justifyItems:"center"}}>

    <div style={{backgroundColor:"#ffffff",height:"96px",width:"96px",borderRadius:"50%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",justifyItems:"center"}}><img style={{width:"28px"}} src={hourglass} alt="hourglass" /></div>
    <div style={{fontWeight:"bold",padding:"8px"}}>You didn’t add any question yet!</div>
    <div style={{padding:"8px"}}>Click on “Add Question”, and start filling the required fields.</div>
    <div style={{backgroundColor:"#FFFFFF",border:"1px solid #D9E1EB",textAlign:"center",boxSizing:'border-box',padding:"10px",borderRadius:"10px",width:"191px",cursor:"pointer",fontSize:"16px",boxShadow:" 0 1px 2px #ccc"}}>  + &nbsp;  Add Question</div>

</section>
}




{/* Fill In The Blank */}

<>
      <form onSubmit={AddFib}  style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
        <textarea placeholder='Add Fill In The Blank Question' required style={{ width: "calc(100% - 70px)", padding: "4px", boxSizing: "border-box" }} value={text} onChange={(e) => setText(e.target.value)}></textarea>
        <input type='submit' style={{ margin: "0px 8px" }} />
      </form>

      {fib.map((q, index) => (
        <section key={q.id}>
          <div className='fill-sentence' >
            <form onSubmit={(e) => Answerquestion(e, q.options, q.id)} style={{ position: "relative", paddingRight: "25px" }} >



            { q.isEditing && <span style={{ position:"relative",bottom:"20px" ,backgroundColor: "#e2e8f0", padding: "5px", margin: "5px", color: "#000", borderRadius: "3px",alignItems:"center" }}>{`${(index + 1).toString().padStart(2, '0')}`}</span>}



              {/* Edit */}
              <div onClick={() => toggleEditState(q.id)}
                style={{
                  position: "absolute",
                  height: "28px", width: "28px", display: 'inline-block', right: "0px", top: "8px", display: 'flex', alignItems: "center", justifyContent: "center", borderRadius: "3px"
                }}>
                <img style={{ width: "20px" }} src={edit} />
              </div>
              {!q.isEditing && <span style={{ backgroundColor: "#e2e8f0", padding: "5px", margin: "5px", color: "#000", borderRadius: "3px",alignItems:"center" }}>{`${(index + 1).toString().padStart(2, '0')}`}</span>}


              {
                q.isEditing
                  ? (
                    <>
                      <textarea
  
                      style={{
                        width: "calc(100% - 130px)",
                        padding: "4px",
                        boxSizing:"border-box",
                        border: "2px solid #e2e8f0",
                        borderRadius: "8px",
                        color: "#10009E",
                        margin:"0px 5px",
                        outline: "none",
                        resize: "none",
                        position:"relative"
                      }}
                      
                        rows="3"
                        value={q.tempInput}
                        onChange={(e) => handleQuestionChange(e, q.id)}
                      ></textarea>


                      <div style={{display:"inline-block",height:"30px"}}>
                        <div style={{height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
                          <button style={{border:"none", padding:"5px", borderRadius: "4px", color: "rgb(16, 0, 158)", backgroundColor: "rgb(226, 232, 240)",position:"absolute",top:"15px",right:"35px", cursor: "pointer", margin: "0px 10px"}} onClick={(e) => handleUpdateQuestion(q.id, e)} disabled={q.isUpdating}>Update</button>
                        </div>
                      </div>





                    </>
                  )
                  : convertToJSX(q.question, q.inputValues, q.id, q.isSubmitted, q.options, q.userAnswer)
              }




              {!q.isEditing && !q.isSubmitted && <input type='submit' value="Submit" style={{ border: "none", padding: "5px", borderRadius: "4px", color: "#10009E", backgroundColor: "#e2e8f0", cursor: "pointer", margin: "0px 10px" }} />}



              {
                !q.isEditing && q.isSubmitted &&
                !compareFunction(
                  Object.values(q.inputValues).map(value => value.toLowerCase().trim()),
                  q.options.map(option => option.toLowerCase().trim())
                ) && (
                  <span style={{ color: "#B31412", backgroundColor: "#FAD2CF", padding: "5px", borderRadius: "4px", margin: "0px 10px" }}>
                    Right Answer is : {q.options.join(", ")}
                  </span>
                )
              }


              {/* {`${q.is_correct + "/" + q.total_options}`} */}


            </form>
          </div>
        </section>
      ))}


        { fib.length >0 &&  <button onClick={addFibToContainer}
        
        style={{margin:"7px",    border: "none",
        padding: "7px",
        borderRadius: "4px",
        color: "rgb(16, 0, 158)",
        backgroundColor: "rgb(226, 232, 240)",
        cursor: "pointer"
      }}
        
        >Add Questions To Quiz</button>}





    </>




































{/* True False  */}

<>
      <form onSubmit={addQuestion} style={{ display: "flex", alignItems: "center" }}>
        <textarea
          ref={textareaRef}
          name='sentence'
          placeholder='Add a question sentence'
          rows="2"
          style={{ width: "calc(100% - 89px)", padding: '3px' }}
        />
        <input name='checkbox' style={{ marginLeft: "5px" }} type='checkbox' />
        <button type="submit" style={{ width: "60px", height: "30px", margin: "5px", fontWeight: "bold" }}>Add</button>
      </form>


      {question.length > 0 &&
        <>
          <h2>Questions</h2>

          <section

            style={{
              margin: "7px",
              border: "2px solid #e2e8f0",
              padding: "5px",
              borderRadius: "5px"
            }}

          >


            {question.map((q, index) => (

              <div style={{ display: "flex", alignItems: "center", flexDirection: "row", margin: '3px 0px' }}>


                <span style={{ backgroundColor: "#e2e8f0", padding: "0px 7px", margin: "5px", borderRadius: "3px",color: "#000" }}>{`${(index + 1).toString().padStart(2, '0')}`}</span>

                <div style={{ margin: "5px" }}></div><textarea name='sentence' rows="2" value={q.sentence} style={{ width: "calc(100% - 100px)", padding: '3px',resize:"none",border: "2px solid rgb(226, 232, 240)" }} onChange={(e) => updateSentence(e, q.id)} />
                <input type="checkbox" style={{ marginLeft: "5px" }} checked={q.checkbox} onChange={(e) => toggleCheckbox(e, q.id)} />
                <button style={{ width: "60px", height: "30px", margin: "5px", fontWeight: "bold" }} onClick={(e) => handleDelete(e, q.id)}>Delete</button>
              </div>
            ))}

            <button 
                style={{margin:"7px",    border: "none",
                padding: "7px",
                borderRadius: "4px",
                color: "rgb(16, 0, 158)",
                backgroundColor: "rgb(226, 232, 240)",
                cursor: "pointer"
              }}
              onClick={addAllSentence}>Add Questions To Quiz
            </button>

          </section>
        </>

      }

    </>























{/* fieldset   legend */}





    <div>
    {totalTypes.map((item, index) => {
      if (item.type === "fillBlank") {
        const fibQuestion = fibContainer.find(q => q.id === item.id); // find the corresponding question in the fibContainer array using id
        if (!fibQuestion) return null; // If there's no matching question, return null

        return (
          <fieldset key={fibQuestion.id}  style={{border: "2px solid #e2e8f0", margin:"7px",borderRadius:"5px",padding:"5px" }}>
    {fibQuestion.allSubmitted && fibQuestion.TotalMark.trim() !== "" && (<legend style={{padding:"5px"}}>Total Marks: {fibQuestion.TotalMark}</legend>) }
    

    <div key={fibQuestion.id}>

        {fibQuestion.questions.map((q,index) => (
        <section key={q.id}>
        <div className='fill-sentence' >
          <form onSubmit={(e) => AnswerQuestionInContainer (e, q.options, q.id,fibQuestion.id)} style={{ position: "relative", paddingRight: "25px" }} >




            <span style={{ backgroundColor: "#e2e8f0", padding: "7px", margin: "5px", borderRadius: "3px",color: "#000" }}>{`${(index + 1).toString().padStart(2, '0')}`}</span>


            {convertToJSX2(q.question, q.inputValues, q.id, q.isSubmitted, q.options, q.userAnswer,fibQuestion.id)
            }




            {!q.isSubmitted && <input type='submit' value="Submit" style={{ border: "none", padding: "5px", borderRadius: "4px", color: "#10009E", backgroundColor: "#e2e8f0", cursor: "pointer", margin: "0px 10px" }} />}



            {
              q.isSubmitted &&
              !compareFunction(
                Object.values(q.inputValues).map(value => value.toLowerCase().trim()),
                q.options.map(option => option.toLowerCase().trim())
              ) && (
                <span style={{ color: "#B31412", backgroundColor: "#FAD2CF", padding: "5px", borderRadius: "4px", margin: "0px 10px" }}>
                  Right Answer is : {q.options.join(", ")}
                </span>
              )
            }


            {/* {`${q.is_correct + "/" + q.total_options}`} */}


          </form>
        </div>
      </section>
        ))}
    </div>

          </fieldset>
        );

      } else if (item.type === "truefalse") {
        const trueFalseQuestion = questions.find(qes => qes.id === item.id); // find the corresponding question in the questions array using id
        if (!trueFalseQuestion) return null; // If there's no matching question, return null

        return (
          <fieldset key={trueFalseQuestion.id} style={{
            margin: "7px",
            border: "2px solid #e2e8f0",
            padding: "5px",
            borderRadius: "5px"
          }}>

      {trueFalseQuestion.isSubmitted && <legend style={{padding:"5px"}}>Total Marks: {trueFalseQuestion.TotalMark}</legend>}




         
                              {trueFalseQuestion.userAnswer.map((q,index) =>
                                  <section key={q.id}>
                                      <div style={{
                                          border: q.counter === 1 ? (q.mark === 0 ? 'solid 4px #B31412' : (q.mark === 1 ? 'solid 4px #137333' : 'solid 4px transparent')) : 'solid 4px  #e2e8f0',
                                          boxSizing: 'border-box',
                                          position: 'relative',
                                          margin: "7px",
                                          padding: "5px",
                                          borderRadius: "5px",
                                          display:'flex',
                                          alignItems:"flex-start",                                          
                                      }}>
                                        <span style={{backgroundColor:"#e2e8f0",padding:"0px 7px",margin:"5px",borderRadius:"3px"}}>{`${(index + 1).toString().padStart(2, '0')}`}</span>
                                          

                                      <section>

                                          {q.counter > 0 &&
                                              <span style={{ position: 'absolute', top: '0px', right: '-12px', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                  {q.mark > 0 ? (
                                                      <img src={trueImage} alt="True" width="25px" />
                                                  ) : (
                                                      <img src={falseImage} alt="False" width="25px" />
                                                  )}
                                              </span>
                                          }


                                          {q.sentence}


                                          <small>
                                          <span style={{backgroundColor:"#CEEAD6",borderRadius:"3px",padding:"1px 3px",margin:"4px",display:"inline-block"}}>

                                          <input
                                              type="radio"
                                              name={`question-${q.id}`}
                                              value="true"
                                              checked={q.checkbox === true}
                                              onChange={e => handleOptionChange(e, trueFalseQuestion.id, q.id)}
                                              disabled={q.counter > 0}
                                              style={{margin:"0px",padding:"0px"}}
                                          />
                                          <label  style={{margin:"0px",padding:"0px"}} htmlFor={`question-${q.id}`}>True</label>

                                          </span>
                                         





                                          <span style={{backgroundColor:"#FAD2CF",borderRadius:"3px",padding:"1px 3px",margin:"4px",display:"inline-block"}}>

                                          <input
                                              type="radio"
                                              name={`question-${q.id}`}
                                              value="false"
                                              checked={q.checkbox === false}
                                              onChange={e => handleOptionChange(e, trueFalseQuestion.id, q.id)}
                                              disabled={q.counter > 0}
                                              style={{margin:"0px",padding:"0px"}}
                                          />
                                          <label  style={{margin:"0px",padding:"0px"}} htmlFor={`question-${q.id}`}>False</label>

                                          </span>
                                          
                                          </small>

                                          </section>
                                      </div>
                                  </section>
                              )}
                              {!trueFalseQuestion.isSubmitted  && 
                              <button style={{margin:"7px",    border: "none",
    padding: "7px",
    borderRadius: "4px",
    color: "rgb(16, 0, 158)",
    backgroundColor: "rgb(226, 232, 240)",
    cursor: "pointer",}} onClick={() => submitAnswers(trueFalseQuestion.id)}>Submit Answers to Get Your Mark</button>}
                          </fieldset>
        );
      }
      return null; // Return null if neither "fillBlank" nor "truefalse"
    })}
  </div>















































    </div>
  )
}

export default App
