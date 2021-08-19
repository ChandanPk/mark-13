import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Calender from '../img/calender.png'


const Home = () => {
    var date;
    const [startDate, setDate] = useState();
    const [dateAndDays, setDateAndDays] = useState(false);
    const [isItPalindrome, setIsItPalindrome] = useState(null);


    const check = (e)=> {
        e.preventDefault();
        const d = new Date(startDate);
        const yr = JSON.stringify(d.getFullYear());
        // const mth = ("0" + (d.getMonth() + 1)).slice(-2);
        const mth = d.getMonth() + 1;
        const dte = d.getDate();
        date = {day: dte, month:mth, year: yr};

        if (checkPalindromeForAllDateFormats(date)){
            if (dateAndDays) {
                setDateAndDays(null);
            }
            setIsItPalindrome(true);
        }else {
            getNextPalindromeDate(date);
        }
    }

    const reverseStr = str => {
        var listOfChars = str.split('');
        var reverseListOfChars = listOfChars.reverse();
        var reversedStr = reverseListOfChars.join('');
        return reversedStr;
      }
      
    const isPalindrome = str => {
        var reverse = reverseStr(str);
        return str === reverse;
      }
      
    const convertDateToStr = date => {
      
        var dateStr = { day: '', month: '', year: '' };
      
        if (date.day < 10) {
          dateStr.day = '0' + date.day;
        }
        else {
          dateStr.day = date.day.toString();
        }
      
        if (date.month < 10) {
          dateStr.month = '0' + date.month;
        }
        else {
          dateStr.month = date.month.toString();
        }
      
        dateStr.year = date.year.toString();
        return dateStr;
      }
      
    const getAllDateFormats = date => {
        var dateStr = convertDateToStr(date);
      
        var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
        var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
        var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
        var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
        var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
        var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
      
        return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
      }
      
    const checkPalindromeForAllDateFormats = date => {
        var listOfPalindromes = getAllDateFormats(date);
      
        var flag = false;
      
        for(var i=0; i < listOfPalindromes.length; i++){
          if(isPalindrome(listOfPalindromes[i])){
            flag = true;
            break;
          }
        }
        return flag;
      }
      
      // check for leap year
    const isLeapYear = year => {
        if(year % 400 === 0){
          return true;
        }
        if(year % 100 === 0){
          return false;
        }
        if(year % 4 === 0){
          return true;
        }
        return false;
      }
      
      // gets next date
    const getNextDate = date => {
        var day = date.day + 1; 
        var month = date.month;
        var year = date.year;
      
        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 0 - 11
      
         // check for february
        if(month === 2){ 
          // check for leap year
          if(isLeapYear(year)){ 
             if(day > 29){ 
               day = 1;
               month++;
             }
          }
          else {
             if(day > 28){
               day = 1;
               month++;
             }
          }
        }
        
        else {

          if(day > daysInMonth[month - 1]){ 
            day = 1; 
            month++;
          }
        }
      
        if(month > 12){
          month = 1;
          year++; 
        }
      
        return {
          day: day,  
          month: month,
          year: year
        };
      }
      
      // get next palindrome date
    const getNextPalindromeDate = date => {
        var ctr = 0;
        var nextDate = getNextDate(date);
      
        while(1){
          ctr++;
          var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
          if(isPalindrome){
            break;
          }
          nextDate = getNextDate(nextDate);
        }
        setDateAndDays([ctr, nextDate]);
        if (isItPalindrome) {
            setIsItPalindrome(null);
        }
        return [ctr, nextDate];
      }

    return (
        <>
            <div className="top-container">
                <div className="grid-theme"> <a href="https://chandankumar-portfolio.netlify.app/" id="theme">Portfolio</a><a href="https://github.com/ChandanPk/mark-13" id="github">Github Repo</a></div>

                <div className="grid">
                    <div className="box">
                        <h1 className="title">Check out if your <span className="word-style">Birthdate</span> is <span className="word-style">Palidrome.</span></h1>
                        <p>A palindrome is a word/number which reads the same backward as forward</p>
                        <a href="#form"><button className="btn-1 btn">Let's move</button></a>
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

                {isItPalindrome && <p className="results">🥳Hurray!!! Your birday is a palidrome day.🥳</p>}
                {dateAndDays && <p className="results">🙄Awww! Your birthdate is not palindrome. Nearest palindrome date is {dateAndDays[1].day + "/" + dateAndDays[1].month + "/" + dateAndDays[1].year}. You missed it by {dateAndDays[0]} days.</p>}

        </>
    );
}

export default Home;
