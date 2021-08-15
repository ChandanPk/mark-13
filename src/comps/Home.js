import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Calender from '../img/calender.png'


const Home = () => {
    const [startDate, setDate] = useState();
    const [palindrome, setPaladrom] = useState(false);



    const check = (e)=> {
        setPaladrom(prevPaladrom => null);
        e.preventDefault();
       console.log(getAlldateFormats());
       console.log(checkPalindromeForAlldates())

        
    }

    const getAlldateFormats = ()=> {
        
        const d = new Date(startDate);
        const year = JSON.stringify(d.getFullYear());
        const month = ("0" + (d.getMonth() + 1)).slice(-2);
        const date = ("0" + d.getDate()).slice(-2);

        const ddmmyyyy = date + month + year;
        const mmddyyyy = month + date + year;
        const yyyymmdd = year + month + date;
        const ddmmyy   = date + month + year.slice(-2);
        const mmddyy   = month + date + year.slice(-2);
        const yymmdd   = year.slice(-2) + month + date;

        return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
        }

    const checkPalindromeForAlldates = ()=> {
        let listOfPalindromes = getAlldateFormats(); 
        
        var isPalindrome = false;

        for(var i = 0; i < listOfPalindromes.length; i++) {
            if(isItPalindrome(listOfPalindromes[i])){
                isPalindrome = true;
                break;
            }
        }
        return isPalindrome;
    }

    const isItPalindrome = (str) => {
        let reverse = reverseString(str);
        if (str === reverse) {
            return true;
        } else {
            return false;
        }
    }

    const reverseString = (str) => {
        let reversedStr = str.split('').reverse().join('');
        return reversedStr;
    }





    return (
        <>
            <div className="top-container">
                <div className="grid-theme"> <p id="theme">click to change theme</p><a href="#form" id="github">Github Repo</a></div>

                <div className="grid">

                    <div className="box">
                        <h1 className="title">Check out if your <span className="word-style">Birthdate</span> is <span className="word-style">Palidrome.</span></h1>
                        <p>A palindrome is a word/number which reads the same backward as forward</p>
                        <button className="btn-1 btn">Let's move</button>
                    </div>

                    <div className="box">
                        <img src={Calender} width={400} alt="img" />
                    </div>
 
                </div>

            </div>

            <form onSubmit={(e)=> check(e)} className="middle-container" id="form">
                <h1 className="instruction-header">Enter your birthdate and we will tell you if your birthdate is a palindrome</h1>
                <p className="instruction">This app checks your birthdate in 4 formats yyyy-mm-dd, dd-mm-yyyy, mm-dd-yy, m-dd-yyyy</p>
                <p className="instruction">e.g. if your birthdate is 01 Aug 1995, then app will check for 19950801, 01081995, 080195, 1081995</p>
                <DatePicker 
                selected={startDate} 
                className="date" 
                onChange={(date)=> {setDate(date)}} 
                placeholderText="DD/MM/YYYY" 
                dateFormat="dd/MM/yyyy" 
                showYearDropdown 
                showMonthDropdown 
                required/>
                
                <button type="submit" className="btn-2 btn">Check</button>
            </form>

        </>
    );
}

export default Home;













































 // var count = 0;
        // var bool = false;
        // var breakLoop = false;
        
        // for (const item in dateFormats){
        //     var j = 7;
        //     var i = 0;
            
        //     if(bool === true){
        //         j = 7;
        //         i = 0;
        //     }
            
        //     for (i; i<=7; i++){
        //         if (dateFormats[item][i] === dateFormats[item][j]){
        //             count+= 1;
        //             // console.log(dateFormats[item][i], dateFormats[item][j]);
        //             console.log(count); 
        //         }
                
        //         if (i === 7){
        //             if (count === 8){
        //                 setPaladrom(prePaladrom => true);
        //                 breakLoop = true;
        //                 break;
        //             }
        //         } else {  
        //             bool = true;
        //         }
                
        //         j--;            
               
        //     }
        //     console.log(dateFormats[item], "break");
        //     if (breakLoop){
        //         break;
        //     }
        // }
        
        // console.log(paladrom);