import { useState } from 'react'
import words from './wordList.json'
import GridViewCSV from './gridViewCSV';
import Css from './index.CSS';
const App: React.FC = () => { 
  const [filevalue, setfile]=useState<File|null>(null);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [InputKey, SetInputKey] = useState<number>(0);
<link rel="stylesheet" href="styles.css"></link>


const buttonStyle = {
  backgroundColor: '#007bff', /* Blue background color */
  color: '#fff', /* White text color */
  border: 'none', /* No border */
  padding: '10px 20px', /* Padding inside the button */
  cursor: 'pointer', /* Pointer cursor on hover */
  borderRadius: '5px', /* Rounded corners */
  margin: '5px', /* Margin around buttons */
  fontSize: '16px', /* Font size */
};

// Your component code goes here


  const handlefilechanges=(event: React.ChangeEvent<HTMLInputElement>)=>{
   if(event.target.files && event.target.files.length>0)
     setfile(event.target.files[0]);
   setCsvData([]);
  };
  const handlefileSelect=()=>{

    SetInputKey(value=>value+1);
   };
  const HandleFileSubmit = () => {
    if(!filevalue)
      alert('please select file first');
    else
    {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        parseCSV(text);
      };
      reader.readAsText(filevalue);
    
    }
  };

const GridComponent = () => {
  // setCsvData([]);
  // setfile(null);
  window.location.reload();
  };

  const parseCSV = (csvText: string) => {
    const rows = csvText.split('\n');
    const headers = rows[0].split(',').map(header => header.trim()); // Ensure headers are trimmed

    const data = rows.slice(1).map(row => {
      const values = row.split(',');
      if (values.length === headers.length) { // Check if number of columns matches headers
        return headers.reduce((obj: any, header, index) => {
          obj[header] = values[index].trim(); // Trim each value
          return obj;
        }, {});
      } else {
        return null; // Handle incomplete rows or mismatched data
      }
    }).filter(row => row !== null);

    setCsvData(data);
  };
  const HandleFileGetLatest=async()=>{

      try{
           const response= await fetch('https://localhost:44355/Home/GetFile',{
            method:'GET',
});
if(response.ok){
  const data= await response.json();
  console.log('file uploaded successfully');
}
else
{
  console.log('File nt uploades succesfully dur to:',response.statusText);
}
      }
      catch(error)
      
      {
        console.log(error);
      }
    
  };
  const HandleFileUpload=async()=>{
    if(!filevalue)
      alert('please select file first');
    else
    {
    const formData = new FormData();
        formData.append('file', filevalue);
      try{
           const response= await fetch('https://localhost:7299/home/Submit',{
            method:'POST',
           // headers:{'Content-Type': 'application/json',},
            //body:JSON.stringify(formData),
            body: formData,
});
if(response.ok){
  const data= await response.json();
  console.log('file uploaded successfully');
}
else
{
  console.log('File nt uploades succesfully dur to:',response.statusText);
}
      }
      catch(error)
      
      {
        console.log(error);
      }
    }
  };
  
  const [WordToGuess, setWordToGuess] = useState(()=>{
    return words[Math.floor(Math.random()* words.length)]
  })
  const [guesdLetters, setguesdLetters]= useState<string[]>([])
console.log(WordToGuess)
  return (
    <>
    
    
      <div style={{ textAlign: 'center', backgroundColor:'#ccffff' }}>
      <h1 className='upload-heading'style={{textAlign: 'center',backgroundColor: '#ccffff'}}>CSV FILE & DB CONVERSIONS</h1>
  
     
       <h3>Please Upload the File</h3>

        <input style={{ width:300 ,padding: 10,fontSize:20}} key={InputKey} type="file" onChange={handlefilechanges}>
        </input>
        <br />
        <br />
        <br />
        <button style={buttonStyle}onClick={HandleFileSubmit}>Submit</button><span>  </span>
        <button style={buttonStyle} onClick={HandleFileUpload}>Upload</button><span>  </span>
        <button style={buttonStyle} onClick={HandleFileGetLatest}>GetLatest</button>
        <button style={buttonStyle} onClick={GridComponent}>Clear</button>
        <GridViewCSV data={csvData} />
      </div>
       
    </>
  )
}

export default App;
