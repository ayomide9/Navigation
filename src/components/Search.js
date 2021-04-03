import react, { useState, useEffect } from "react";
import axios from 'axios';


const Search = () => {
    
    const [term, setTerm]= useState('programming');
    const [debouncedTerm, setDebouncedTerm ]= useState(term);
    const [results,  setResults]= useState([]);

   /* console.log(results); */

   useEffect (()=>{
       const timerId=setTimeout(()=> {
           setDebouncedTerm(term);
       },1000)
       return () => {
           clearTimeout(timerId);
       };
   },[term]);

   useEffect(()=> {
    const search = async () => {
        const { data } = await axios.get('https://en.wikipedia.org/w/api.php' , {
            params: {
                action : 'query',
                list: 'search',
                origin: '*',
                format: 'json',
                srsearch: debouncedTerm,
            },
        });

        setResults(data.query.search);
    };
        search();

   },[debouncedTerm]);


     const renderedResults= results.map((results) =>{
         return(
             <div key={results.pageid} className="item">
                 <div className= "right floated content">
                     <a
                     href={`http://en.wikipedia.org?curid=${results.pageid}`} 
                     className="ui button">
                            Go
                     </a>
                 </div>
                 <div className="content">
                     <div className="header">
                        {results.title}
                     </div>
                     <span dangerouslySetInnerHTML={{ __html:results.snippet }}></span>
                     
                 </div>
             </div>
         )
    })


    return (
        <div>
            <div className= "ui form">
                <div className= "field">
                    <label> Enter search term </label>
                    <input 
                    value={term}
                    onChange={(e) => setTerm(e.target.value) }
                    className="input"   />

                </div>
  
            </div>
            <div className= "ui celled list">
                {renderedResults}
            </div>
        </div>
    )
};

export default Search;



